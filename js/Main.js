$(function (evt) {
  var banner = new com.meathill.bacon.BannerMaker();
  banner.install(swfobject);
  var page = new com.meathill.bacon.Page('#page-container');
  GUI.init();
  GUI.banner = banner;
  GUI.page = page;
  // 调整功能面板大小
  GUI.onResize();
  $(window).resize(GUI.onResize);
});