/**
 * ��ͷ������JS
 * @author Meathill
 * @version 0.1 (2011-11-18)
 */
var BannerMaker = {
  headPicUrl : '', // ��ͷ
  callback : null,
  isChanged : false,
  saveURL : '',
  /**
   * ����ͷͼƬ�滻��ҳ�������
   * @param {Object} id ��ͷͼƬid
   */
  setHeadPic : function (url) {
    this.headPicUrl = url;
    if (this.callback != null) {
      callback();
    }
  },
  /**
   * �л�ģ���ı��ͷ�ߴ�
   * @param {Object} height
   */
  setBannerHeight : function (height){
    $('#bannerMaker').height(height);
  },
  setBannerChanged : function (bl) {
    this.isChanged = bl;
  },
  install : function () {
    var param = {
      allowScriptAccess: 'always',
      wmode:'window'
    };
    var flashvars = {};
    var width = 960;
    var height = 220;
    var src = "swf/bannerProducer.swf";
    var express = "swf/expressInstall.swf";
    var version = '11';
    swfobject.embedSWF(src, "bannerMaker", width, height, version, express, flashvars, param);
  }
}