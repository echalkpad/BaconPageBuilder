/***************************************
 *  ��ͨ��
 * @author Meathill
 * @version 0.1(2011-12-22)
 * ************************************/
jQuery.namespace('com.meathill.bacon');
jQuery.namespace('com.meathill.bacon.LangBundle');
com.meathill.bacon.LangBundle.RowItem = {
  editText: '�༭����',
  dragHere: '�뽫�Ҳ��ģ���Ϸ�����',
  defaultTitle: '����',
  upButtonTitle: '������ͨ������',
  upBattonValue: '����',
  downButtonTitle: '������ͨ������',
  downBattonValue: '����',
  removeButtonTitle: 'ɾ��ͨ��',
  removeBattonValue: 'ɾ��',
}
com.meathill.bacon.RowItem = Backbone.View.extend({
  tagName: 'div',
  className: 'rows clr',
  colsNum: 1,
  isTitled: '',
  langBundle: com.meathill.bacon.LangBundle.RowItem,
  events: {
    "mouseover h3": "h3_mouseOverHandler",
    "mouseout h3": "h3_mouseOutHandler",
    "focusin h3": "h3_focusInHandler",
    "focusout h3": "h3_focusOutHandler",
    "click .up": "upButton_clickHandler",
    "click .down": "downButton_clickHandler",
    "click .remove": "removeButton_clickHandler",
    "drop dd": "dropHandler"
  },
  /**
   * ���캯��
   */
  initialize: function () {
    this.colsNum = this.options.colsNum || this.colsNum;
    this.isTitled = this.options.isTitled || this.isTitled;
    this.render();
    //this.initDroppable();
  },
  render: function () {
    this.make(this.tagName);
    for (var i = 0; i < this.colsNum ; i++) {
      this.$el.append(this.createDL(this.colsNum));
    }
    if (this.colsNum > 1) {
      this.$el.find('dl').last().addClass('last-column');
    }
    this.createButtons();
  },
  /**
   * ����dl��dl�ǻ����ṹ
   * @private
   */
  createDL: function (colsNum) {
    var h3 = $('<h3>', {
      text: this.langBundle.defaultTitle,
      "contenteditable": true,
    });
    var result = $('<dl>', {
      'class': 'row-item column-' + colsNum
    })
      .append($('<dt>', {
          'title': this.langBundle.editText
        }).append(h3))
      .append($('<dd>', {
        text: this.langBundle.dragHere
      }));
    return result;
  },
  /**
   * �������ܰ�ť
   * @param {jQuery Object} container
   * @private
   */
  createButtons: function () {
    var upButton = $('<button>', {
      'class': 'operation-buttons up',
      'title': this.langBundle.upButtonTitle,
      val: this.langBundle.upBattonValue
    }).button({
      icons: {
        primary: "ui-icon-arrowthick-1-n"
      },
      text: false
    });
    var downButton = $('<button>', {
      'class': 'operation-buttons down',
      'title': this.langBundle.downButtonTitle,
      val: this.langBundle.downBattonValue
    }).button({
      icons: {
        primary: "ui-icon-arrowthick-1-s"
      },
      text: false
    });
    var removeButton = $('<button>', {
      'class': 'operation-buttons remove',
      'title': this.langBundle.removeButtonTitle,
      val: this.langBundle.removeBattonValue
    }).button({
      icons: {
        primary: "ui-icon-close"
      },
      text: false
    });
    this.$el
      .append(upButton)
      .append(downButton)
      .append(removeButton);
  },
  /**
   * ��ʼ������ͼƬ�Ĺ���
   * @param {jQuery Object} body
   * @private
   */
  initDroppable: function () {
    this.$el.find('dd').droppable({
      scope: "element",
      hoverClass: "row-drag-hover"
    })
  },
  dropHandler: function (event, ui) {
    var item = ui.draggable.clone();
    item
      .removeClass('ui-draggable')
      .addClass('element-item');
    if (event.currentTarget.innerHTML == this.langBundle.dragHere) {
      event.currentTarget.innerHTML = '';
    }
    $(event.currentTarget).append(item);
    this.trigger("addItem");
  },
  h3_mouseOverHandler: function (event) {
    $(event.currentTarget).addClass('row-title');
  },
  h3_mouseOutHandler: function (event) {
    if (!$(event.currentTarget).hasClass('editing')) {
      $(event.currentTarget).removeClass('row-title');
    }
  },
  h3_focusInHandler: function (event) {
    $(event.currentTarget).addClass('editing');
  },
  h3_focusOutHandler: function (event) {
    $(event.currentTarget).removeClass('editing row-title');
  },
  /**
   * ����ͨ��
   * @param {Object} event
   * @private
   */
  upButton_clickHandler: function (event) {
    this.$el.insertBefore(this.$el.prev());
  },
  /**
   * ����ͨ��
   * @param {Object} event
   * @private
   */
  downButton_clickHandler: function (event) {
    this.$el.insertAfter(this.$el.next());
  },
  removeButton_clickHandler: function (event) {
    this.off();
    this.$el.remove();
  }
});