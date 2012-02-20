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
  currentCSS: '',
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
    }).click(function (event) {
      $('#help-panel').dialog('open');
    });
    $('.step-button')
      .click(this.switchStepContent)
      //.eq(1)
      //.click()
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
    $('#css-list').find('li').click(this.changeCss);
    
    // ����
    $('#settings').dialog({
      autoOpen: false,
      width: 400,
      height: 400,
      modal: true,
      title: '����'
    });
    $('#help-panel').dialog({
      autoOpen: false
    })
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
  changeCss : function (event, isSetURL){
    isSetURL = isSetURL == undefined ? true : isSetURL;
    var css = "css/" + $(this).attr('class') + ".css";
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
    
    GUI.currentCSS = $(this).attr('class');
    $('#css-list .activated').removeClass('activated');
    $(this).addClass('activated');
    
    if (isSetURL) {
      GUI.setAddressContent(false);
    }
  },
  onResize : function (event) {
    var screenHeight = $(window).height();
    $('.module-thumbs').height(screenHeight - 292);
    $('.step-content').height(screenHeight - 209)
    $('#cover').height(screenHeight - 20);
  }
}