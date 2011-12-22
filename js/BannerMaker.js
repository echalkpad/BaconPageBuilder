/**
 * ��ͷ������JS
 * @author Meathill
 * @version 0.1 (2011-11-18)
 */
jQuery.namespace('com.meathill.bacon');
com.meathill.bacon.BannerMaker = function () {
  var headPicUrl = ''; // ��ͷͼƬurl
  var callback = null;
  var isChanged = false;
  var saveURL = '';
  var domID = "bannerMaker";
  /**
   * @constructor
   */
  var self = this;
  /**
   * Public Methods 
   */
  this.install = function (so, domid) {
    domid = domid || domID;
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
    so.embedSWF(src, domid, width, height, version, express, flashvars, param);
  }
  /**
   * ����ͷͼƬ�滻��ҳ�������
   * @param {Object} id ��ͷͼƬid
   * @private
   */
  var setHeadPic = function (url) {
    this.headPicUrl = url;
    if (this.callback != null) {
      callback();
    }
  }
  /**
   * �л�ģ���ı��ͷ�ߴ�
   * @param {Object} height
   * @private
   */
  var setBannerHeight = function (height){
    $('#bannerMaker').height(height);
  }
  var setBannerChanged = function (bl) {
    this.isChanged = bl;
  }
  
}