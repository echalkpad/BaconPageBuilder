$(function (evt) {
  var banner = new com.meathill.bacon.BannerMaker();
  var styleThumbs= new com.meathill.bacon.StyleThumbList();
  banner.install(swfobject);
  var page = new com.meathill.bacon.Page('#page-container');
  GUI.init();
  GUI.banner = banner;
  GUI.page = page;
  // ������������С
  GUI.onResize();
  $(window).resize(GUI.onResize);
});