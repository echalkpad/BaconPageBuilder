/**
 * ҳ����
 * @author Meathill
 * @version 0.1(2011-12-17)
 */
jQuery.namespace('com.meathill.bacon');
com.meathill.bacon.Page = function (target) {
  /**
   * Variables
   */
  var body = null;
  var self = this;
  /**
   * ���캯��
   * @constructor
   */
  body = $(target);
  /**
   * Properties
   */
  /**
   * Public Methods
   */
  this.createNewRow = function (colsNum, isTitled) {
    colsNum = colsNum || 1;
    var row = new com.meathill.bacon.RowItem(colsNum, isTitled);
    row.appendTo(body);
  }
  this.clearAll = function (bl) {
    body.find('img').unbind('click', start);
    body.find('div').remove();
  }
}
