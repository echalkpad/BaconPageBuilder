var model = {
  setTemplateName : function (name) {
    $('#templateName').val(name);
  },
  refreshHTML : function () {
    if (_title_txt.parent().length > 0 && _title_txt.parent().attr('id') != 'timg') {
      _title_txt.parent().click();
    }
    var str =$("#templateContainer").html().toLowerCase();
    // �Ƴ�input��ǩ�Ϳհ�div�����ж���ı༭����
    str = str.replace(/<input[^>]*>/gim,"");
    str = str.replace(/<div[^>]*><\/div>/gim,'');
    str = str.replace(/\stitle=([^\s|^>]+)/gim, '');
    var mts = str.match(/<img.*?>/gim);
    for(var i=0;i<mts.length;i++){str=str.replace(mts[i],divs[mts[i].match(/.*\/(.*?).[gif|jpg]/)[1]]);}
    str = str.replace('<!-- link css -->','<link href="http://icon.zol.com.cn/article/templateDIY/css/' + $('#cssSelector').val() + '.css" type="text/css" rel="stylesheet" />');;
    str += '</div><!--ҳβ end--><norunscript>topicDIY.init();</norunscript></body></html>';
    // �Ƿ�ʹ��ģ���ͷ
    if (BannerMaker.headPic != '') {
      str = str.replace('http://icon.zol.com.cn/article/templateDIY/images/head.jpg', BannerMaker.headPic);
    }
    $("#texts").val(str);
  },
  submit : function () {
    this.refreshHTML();
    $('#htmlCodeForm').submit();
  }
}
