$(function (evt) {
  BannerMaker.install();
  Page.init('#pageContainer');
  GUI.init();
  // ���÷�������ģ��
  GUI.addressChangeHandler();
  SWFAddress.addEventListener(SWFAddressEvent.CHANGE, GUI.addressChangeHandler);
});