$(function (evt) {
  var banner = new com.meathill.bacon.BannerMaker();
  banner.install(swfobject);
  var page = new com.meathill.bacon.Page('#pageContainer');
  GUI.init();
  GUI.banner = banner;
  GUI.page = page;
  // ���÷�������ģ��
  GUI.addressChangeHandler();
  SWFAddress.addEventListener(SWFAddressEvent.CHANGE, GUI.addressChangeHandler);
});