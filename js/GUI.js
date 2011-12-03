/**
 * ��ʼ��קͨ��
 * @param {Object} evt
 */
function start(evt) {
  if ($(this).hasClass("dimg")) {
    _drag_item = $(this);
		_drag_item.removeClass('dimg');
		_drag_item.unbind('click', start);
		_token.insertBefore(_drag_item);
  } else {
		_drag_item = $(this).clone();
    $('#timg').append(_token);
  }
  $("#mains").parent().append(_drag_item);
  _drag_item.addClass("oimg");
  _drag_item.css('left', evt.pageX - 10 + "px");
  _drag_item.css('top', evt.pageY - 10 + "px");
  _drag_item.bind("click", end);
  $(document).bind("mousemove", drag);
	
	// ����token��С
	_token.css('width', _drag_item.width() - 22 + 'px');
	
	// �ɹ�������ݵ�����
	_con_arr = $('#mains div.'+_drag_item.attr('n')+' dd.z_con');
	$('#mains div.' + _drag_item.attr('n')).addClass('light_on');
}
function drag(evt) {
  if (!_drag_item) {
    return
  }
  _x = evt.pageX;
  _y = evt.pageY;
  _drag_item.css('left', _x - 10 + "px");
  _drag_item.css('top', _y - 10 + "px");
	var _count = 0;
  for (var i = 0; i < _con_arr.length; i++) {
		var _obj = _con_arr.eq(i).offset();
    if (_x > _obj.left && _x < _obj.left + _con_arr.eq(i).width() && _y > _obj.top && _y < _obj.top + _con_arr.eq(i).height()) {
			var _imgs = _con_arr.eq(i).children('img');
      if (_imgs.length == 0) {
        _con_arr.eq(i).html('');
        _con_arr.eq(i).append(_token);
        return;
      } else {
        for (var j = 0; j < _imgs.length; j++) {
          var _t = _imgs.eq(j).offset().top;
          var _h = _imgs.eq(j).height();
          var _s = _t + _h / 2;
          if (_y > _t && _y < _s) {
            _token.insertBefore(_imgs.eq(j));
            return;
          } else if (_y > _s && _y < _t + _h) {
            _token.insertAfter(_imgs.eq(j));
          }
        }
      }
    } else {
      if (0 == _con_arr.eq(i).children('img').length) {
        _con_arr.eq(i).html('&nbsp;');
      }
			_count++;
    }
  }
  if (_count == _con_arr.length) {
    $('#timg').append(_token)
  }
}
function end(evt) {
  _drag_item.unbind("click", end);
  $(document).unbind("mousemove", drag);
  if (_token.parent().attr('id') == "timg") {
    _drag_item.remove();
  } else {
    _drag_item.insertAfter(_token);
		_drag_item.removeClass('oimg');
		_drag_item.addClass('dimg');
		_drag_item.bind('click', start);
		$('#timg').append(_token);
  }
	
	$('#mains div.' + _drag_item.attr('n')).removeClass('light_on');
  
  // �ı��ַ��
  setAddressContent(false);
}
// ʹ�õ�ַ����ĵ�ַ������ģ��
function addressChangeHandler(evt) {
  var _param_num = SWFAddress.getPathNames().length;
  if (_is_refill && _param_num > 0) {
    if (SWFAddress.getPathNames()[0] != $('#fg').val()) {
      $('#fg').val(SWFAddress.getPathNames()[0]);
      changeCss(null, false);
    }
    if (_param_num > 1) {
      var _arr = decodeURIComponent(SWFAddress.getPathNames()[1]).split('|');
      clearHandler();
      for (var i = 0, len = _arr.length; i < len; i++) {
        var _type = Number(_arr[i].substr(0, 1));
        var _img_arr = _arr[i].substr(2).split(',');
        var _row = addRow(null, _type);
        _row.find('dd').html('');
        _row.appendTo($('#mains'));
        for (var j = 0, jlen = _img_arr.length; j < jlen; j++) {
          var _img = $('<img></img>', {'class':'dimg'});
          var _at = 0;
          if (_img_arr[j].indexOf('@') != -1) {
            _at = Number(_img_arr[j].substr(_img_arr[j].indexOf('@') + 1));
            _img_arr[j] = _img_arr[j].substring(0, _img_arr[j].indexOf('@'));
          }
          _img.attr('src', './images/' + _img_arr[j]);
          _img.bind('click', start);
          _img.appendTo(_row.find('dd').eq(_at));
        }
      }
    }
  }
}
/**
 * ���õ�ַ��
 * ֻ���������ݵ�ͨ��
 */
function setAddressContent(bl){
  var _result = '/' + $('#fg').val() + '/';
  var _is_cols = false;
  bl = bl == undefined ? true : bl;
  $("#mains div").each(function(i) {
    if ($(this).find('img').length > 0) {
      _result += $(this).attr('type') + '-';
      if ($(this).children('dl').length > 1) {
        _is_cols = true;
      }
      $(this).find('img').each(function(j){
        var _src = $(this).attr('src');
        var _at = '';
        if (_is_cols) {
          // ȡ��߻����ұ�
          _at = '@' + $('#mains div:eq(' + i + ') dd').index($(this).parent());
        }
        _result += _src.substr(_src.lastIndexOf('/') + 1) + _at + ',';
      });
      _result = _result.slice(0, -1);
      _result += '|';
      _is_cols = false;
    }
  });
  _result = _result.slice(0, -1);
  _result +=  '/';
  _is_refill = bl;
  SWFAddress.setValue(_result);
}
// ��ֹ�¼�ð��
function stopEvent(evt){
  evt.stopPropagation();
}

var _cur_type=0, _sh = 500;  // ��ǰģ������/�������
var _panel_visible = true, _is_refill = true;  // ����Ƿ���ʾ; // �϶�������

// �����ͷ������

var GUI = {
  token : null,
  init : function () {
    // ��ʾ��������
    $('#preloader').remove();
    $('.hidden').fadeIn();
    this.token = $('#token').remove();
    // ��ť�¼���
    $('#togglePanelButton')
      .button()
      .click(function(event) {
        $('#sidebar').slideToggle('normal');
      });
    $("#submitButton")
      .button()
      .click(this.uploadTemplate);
    // ������������С
    this.onResize();
    $(window).resize(this.onResize);
    // �϶�
    $("#moduleThumbs img").draggable({
      opacity: 0.7,
      helper: 'clone'
    });
    return;
    
    
    
    
    $("#element_type li").bind("click", change_type);
    $('#fg').bind('change', changeCss);
    $('#tpl_name').bind('change', function() {
      $('#template_name').val($(this).val())
    });
    $(".addRowBtn").bind('click', addRow);
    
    // ���÷�������ģ��
    addressChangeHandler();
    SWFAddress.addEventListener(SWFAddressEvent.CHANGE, addressChangeHandler);
    
    // ����̽����ġ����ܡ���ť��
    $('#controls_btn').colorbox({width:'600px', inline:true, href:'#control_panel', opacity:'0.5',
                                 onOpen:function () { $('#bannerMaker').css('visibility', 'hidden'); },
                                 onClosed:function () { $('#bannerMaker').css('visibility', 'visible');}
                               });
    $('a[rel="help_group"]').colorbox({rel:'help_group', opacity:'0.5', current:'{current} / {total}',
                             onOpen:function () { $('#bannerMaker').css('visibility', 'hidden'); },
                             onClosed:function () { $('#bannerMaker').css('visibility', 'visible');}
                           });
    $('#survey_btn').colorbox({width:'60%', height:'400px', iframe:true,
                             onOpen:function () { $('#bannerMaker').css('visibility', 'hidden'); },
                             onClosed:function () { $('#bannerMaker').css('visibility', 'visible');}
                             });
    $('#version_btn').colorbox({width:'60%', height:'400px',
                             onOpen:function () { $('#bannerMaker').css('visibility', 'hidden'); },
                             onClosed:function () { $('#bannerMaker').css('visibility', 'visible');}
                             });
    
    
  },
  clearAll : function (bl) {
    $('#mains div img').unbind('click', start);
    $('#mains div').remove();
    if (bl) {
      setAddressContent();
    }
  },
  //��������� 
  uploadTemplate : function (){
    $('#submitButton').prop('disabled', true);
    GUI.reText();
    if (BannerMaker.isChanged) {
      if (window.confirm('���ڴ�ͷ����������еĲ�����δ���棬�����ύģ��Ļ���Щ����������Ч��ȷ��ô��')) {
        $("#code_form").submit();
      } else{
        alert('������ͷ�������еġ����桱��ť�������ͷ��Ȼ���ٵ㡰�ϴ�ģ�塱');
      }
    } else {
      $("#code_form").submit();
    }
  },
  showInfo : function (str, is_reset){
    if (is_reset) {
      $('#output').append(str); 
    } else {
      $('#output').html(str);
    }
  },
  /**
 * �л�����ѡ�
 * @param {Object} e
 */
  change_type : function (evt) {
    $("#elist dl").eq(_cur_type).removeClass("show");
    $("#element_type li").eq(_cur_type).removeClass('cur');
  
    var _index = $(this).index();
    if('����' == $(this).html()) {
      reText();
    }
    $("#elist dl").eq(_index).addClass("show");
    $(this).addClass("cur");
    _cur_type = _index;
  },
  changeCss : function (evt, bl){
    bl = bl == undefined ? true : bl;
    var _css = "css/" + $('#fg').val() + ".css";
    $("#css_tag").attr('href', _css);
    if (bl) setAddressContent(false);
  },
  refreshHTML : function () {
    if (_title_txt.parent().length > 0 && _title_txt.parent().attr('id') != 'timg') {
      _title_txt.parent().click();
    }
    var str =$("#mains").html().toLowerCase();
    // �Ƴ�input��ǩ�Ϳհ�div�����ж���ı༭����
    str = str.replace(/<input[^>]*>/gim,"");
    str = str.replace(/<div[^>]*><\/div>/gim,'');
    str = str.replace(/\stitle=([^\s|^>]+)/gim, '');
    var mts = str.match(/<img.*?>/gim);
    for(var i=0;i<mts.length;i++){str=str.replace(mts[i],divs[mts[i].match(/.*\/(.*?).[gif|jpg]/)[1]]);}
    str = str.replace('<!-- link css -->','<link href="http://icon.zol.com.cn/article/templateDIY/css/' + $('#fg').val() + '.css" type="text/css" rel="stylesheet" />');;
    str += '</div><!--ҳβ end--><norunscript>topicDIY.init();</norunscript></body></html>';
    // �Ƿ�ʹ��ģ���ͷ
    if (BannerMaker.headPic != '') {
      str = str.replace('http://icon.zol.com.cn/article/templateDIY/images/head.jpg', BannerMaker.headPic);
    }
    $("#texts").val(str);
  },
  onResize : function (evt) {
    var screenHeight = $(window).height();
    $('#moduleThumbs dd, #moduleThumbs ul').height(screenHeight - 203);
    $('#cover').height(screenHeight);
  },
  // ��ܴ���
  frameCodeArr : ["<dl><dt class='z_con' style='display:none'>��Ŀ����</dt><dd class='z_con'>&nbsp;</dd></dl>",
  "<dl class='z_con'><dt class='z_con'>��Ŀ����</dt><dd class='z_con'>&nbsp;</dd></dl>",
  "<dl class='z_con'><dt class='z_con'>��Ŀ����1</dt><dd class='z_con'>&nbsp;</dd></dl><dl class='z_con ml10'><dt class='z_con'>��Ŀ����2</dt><dd class='z_con'>&nbsp;</dd></dl>",
  "<dl class='lf'><dt class='z_con'>��Ŀ����1</dt><dd class='z_con'>&nbsp;</dd></dl><dl class='rt'><dt class='z_con'>��Ŀ����2</dt><dd class='z_con'>&nbsp;</dd></dl>",
  "<dl class='z_con'><dt class='z_con'>��Ŀ����1</dt><dd class='z_con'>&nbsp</dd></dl><dl class='z_con ml9'><dt class='z_con'>��Ŀ����2</dt><dd class='z_con'>&nbsp</dd></dl><dl class='z_con ml9'><dt class='z_con'>��Ŀ����3</dt><dd class='z_con'>&nbsp</dd></dl>"],
}