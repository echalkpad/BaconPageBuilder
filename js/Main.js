$(function (evt) {
  var banner = new com.meathill.pork.BannerMaker();
  banner.install(swfobject);
  var page = new com.meathill.pork.Page('#pageContainer');
  GUI.init();
  GUI.banner = banner;
  GUI.setPage(page);
  // ���÷�������ģ��
  GUI.addressChangeHandler();
  SWFAddress.addEventListener(SWFAddressEvent.CHANGE, GUI.addressChangeHandler);
});