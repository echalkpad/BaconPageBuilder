$(function (evt) {
  BannerMaker.install();
  GUI.init();
  // ���÷�������ģ��
  GUI.addressChangeHandler();
  SWFAddress.addEventListener(SWFAddressEvent.CHANGE, GUI.addressChangeHandler);
});