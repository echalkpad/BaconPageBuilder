$(function (evt) {
  var page = new com.meathill.bacon.Page({
    attributes: {
      id: 'page-container'
    }
  });
  page.header.install(swfobject);
  GUI= new com.meathill.bacon.GUI({
    page: page
  });
});
var GUI;