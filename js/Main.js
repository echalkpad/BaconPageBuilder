$(function (evt) {
  var banner = new com.meathill.bacon.BannerMaker();
  banner.install(swfobject);
  var page = new com.meathill.bacon.Page('#page-container');
  GUI.init();
  GUI.banner = banner;
  GUI.page = page;
  // ������������С
  GUI.onResize();
  $(window).resize(GUI.onResize);
  // ���÷�������ģ��
  GUI.addressChangeHandler();
  SWFAddress.addEventListener(SWFAddressEvent.CHANGE, GUI.addressChangeHandler);
});