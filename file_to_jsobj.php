<?php 
/*
	1. �ܹ���ȡһ��Ŀ¼�������ļ�����
	2. ����һ��js�ַ���
	3. ������
		a) dir	Ŀ¼
		b) var	������
	4. ���أ��ļ����в�Ҫ��չ��
		a) var $var={�ļ���1:���ļ����ݡ�,�ļ���2:���ļ����ݡ�,��.};
	5. ע�����
		a) ҳ���ڵ��÷�ʽ<script src=��xxx.php�� type=��text/javascript��></script>
		b) ���ı���GBK������json��
		c) �����������ݲ����л��У����������Ҫת��

 */



$dir = $_REQUEST['dir'];
$var = $_REQUEST['var'];

if(isset($dir) && isset($var)){

	$path = realpath($dir);
	
	$cdh = opendir('cache');
	$flag = 0;
	while(false !== $file = readdir($cdh)){
		$m_time = substr($file,6,-3);
		if(filemtime ($path) == $m_time)
			$flag = 1;
	}
	$cur_static_file_name = 'cache/cache_'.$var.'_'.str_replace('/','-',$dir).'_'.filemtime($path).'.js';
	if(file_exists($cur_static_file_name) && ($flag == 1) && '777' != $_REQUEST['refresh']){
		include($cur_static_file_name);
		exit();
	}else{
		ob_start();
		
		if ( is_dir ( $path ) ) {
			$dh = opendir($path);
			if (!$dh) {
				exit();
			}
			echo 'var '.$var.' = {';
			$str = '';
			while(false !== $file = readdir($dh)){
				if(!is_dir($file)){
					$file_name_arr = explode('.',$file);
					$file_name = $file_name_arr[0];
					$file_content = file_get_contents($path.'/'.$file);
//					if (mb_check_encoding($file_content, 'UTF8'))
//						$file_content = iconv('UTF8','GBK', $file_content);
					$encode = mb_detect_encoding($file_content, array("ASCII",'UTF-8','GB2312',"GBK",'BIG5'));
					if ($encode == 'UTF-8'){
						$file_content = iconv('UTF-8','GBK',$file_content);
					}
					$str .= $file_name.':';
					$str .= "'".addslashes(preg_replace('[\r|\n]','',$file_content))."',";
				}
			}
			echo substr($str,0,-1);
			echo '};';
		} else {
			exit();
		}
		
		$the_content = ob_get_contents();
		ob_end_flush(); 
		$fp = fopen($cur_static_file_name , "w");
		fputs($fp, $the_content);
		fclose($fp);
	}
}else{
	exit();
}

?>