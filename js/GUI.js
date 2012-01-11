var _is_refill = false;
/*****************************************
 * ���ֱ��ʵ�����Ķ���������������ϵĲ���
 * ��Ϊ��ҳ����϶ȼ��ߣ����ԾͲ�����д������
 * ���ɿ�ʼ���еĶ�����������Ҫȫ��ʹ�õĶ���Ҳ�������������ȡ
 * 
 * @author Meathill
 * @version 0.2(2011-12-27)
 ****************************************/
var GUI = {
  banner : null,
  page : null,
  isAnimating : false,
  init : function () {
    // ��ʾ��������
    $('#preloader').remove();
    $('.hidden').fadeIn();
    
    // ��ť�¼���
    $('#toggle-panel-button')
      .button({
        icons: {
          primary: "ui-icon-circle-triangle-e"
        },
        text: false
      })
      .click(this.togglePanel);
    $("#submit-button")
      .button({
        icons: {
          primary: 'ui-icon-upload'
        }
      })
      .click(this.uploadTemplate);
    $("#save_button")
      .button({
        icons: {
          primary: 'ui-icon-disk'
        }
      })
      .click(this.saveTemplate);
    $(".add-row-button").click(this.insertRow);
    $('#config-button')
      .button({
        icons: {
          primary: 'ui-icon-wrench'
        },
        text: false
      })
      .click(function (event) {
        $('#settings').dialog('open');
      });
    $('#help-button').button({
      icons: {
        primary: 'ui-icon-help'
      },
      text: false
    })
    $('.step-button')
      .click(this.switchStepContent)
      .eq(1)
      .click()
      .parent()
      .buttonset();
    
    // �϶�
    $("#modules")
      .tabs()
      .find('img')
        .draggable({
          opacity: 0.7,
          helper: 'clone',
          scope: 'element'
        });
        
    // ��ʽ�л�
    $('#css-selector').change(this.changeCss);
    
    // ����
    $('#settings').dialog({
      autoOpen: false,
      width: 400,
      height: 400,
      modal: true,
      title: '����'
    });
  },
  togglePanel : function (event) {
    var icon = $(this).children().first();
    if ($('#sidebar').hasClass('outside')) {
      $('#sidebar').animate({"right": 0}, 400, function () {
        $(this).removeClass('outside')
      });
      icon
        .removeClass('ui-icon-circle-triangle-w')
        .addClass('ui-icon-circle-triangle-e');
    } else {
      $('#sidebar').animate({"right": -20 - $('#sidebar').width()}, 400, function () {
        $(this).addClass('outside');
      });
      icon
        .removeClass('ui-icon-circle-triangle-e')
        .addClass('ui-icon-circle-triangle-w');
    }
  },
  switchStepContent : function (event) {
    if (GUI.isAnimating) {
      event.stopPropagation();
      return;
    }
    GUI.isAnimating = true;
    var index = $('.step-button').index($(this));
    $('#step-contents').animate({scrollLeft: index * ($('#step-contents').width() + 10)}, 400, function () { GUI.isAnimating = false});
  },
  insertRow : function (event) {
    var colsNum = $(this).attr('class').match(/column-(\d)/)[1];
    var isTitled = $(this).hasClass('no-title') ? ' no-title' : '';
    console.log(isTitled);
    GUI.page.createNewRow(colsNum, isTitled);
  },
  //��������� 
  uploadTemplate : function (event){
    $('#submit-button').prop('disabled', true);
    if (BannerMaker.isChanged) {
      if (window.confirm('���ڴ�ͷ����������еĲ�����δ���棬�����ύģ��Ļ���Щ����������Ч��ȷ��ô��')) {
        Model.submit();
      } else{
        alert('������ͷ�������еġ����桱��ť�������ͷ��Ȼ���ٵ㡰�ϴ�ģ�塱');
      }
    } else {
      Model.submit();
    }
  },
  saveTemplate : function (event) {
    
  },
  log : function (str, isReset){
    if (isReset) {
      $('#output').html(str);
    } else {
      $('#output').append(str); 
    }
  },
  changeCss : function (evt, isSetURL){
    isSetURL = isSetURL == undefined ? true : isSetURL;
    var css = "css/" + $('#cssSelector').val() + ".css";
    if ($('#custom-style').length > 0) {
      $('#custom-style').attr('href', css);
    } else {
      var init = {
        href : css,
        id : 'custom-style',
        rel : 'stylesheet'
      }
      $('<link>', init).appendTo($('head'));
    }
    if (isSetURL) {
      GUI.setAddressContent(false);
    }
  },
  onResize : function (evt) {
    var screenHeight = $(window).height();
    $('.module-thumbs').height(screenHeight - 292);
    $('.step-content').height(screenHeight - 209)
    $('#cover').height(screenHeight - 20);
  },
  /**
   * ���õ�ַ��
   * ֻ���������ݵ�ͨ��
   */
  setAddressContent : function (bl) {
    var _result = '/' + $('#css-selector').val() + '/';
    var _is_cols = false;
    bl = bl == undefined ? true : bl;
    $("#refreshHTML div").each(function(i) {
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
            _at = '@' + $('#refreshHTML div:eq(' + i + ') dd').index($(this).parent());
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
  },
  // ʹ�õ�ַ����ĵ�ַ������ģ��
  addressChangeHandler : function (evt) {
    var _param_num = SWFAddress.getPathNames().length;
    if (_is_refill && _param_num > 0) {
      if (SWFAddress.getPathNames()[0] != $('#css-selector').val()) {
        $('#css-selector').val(SWFAddress.getPathNames()[0]);
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
          _row.appendTo($('#refreshHTML'));
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
}