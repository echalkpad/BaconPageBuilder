jQuery.namespace('com.meathill.bacon');
com.meathill.bacon.Navi = Backbone.View.extend({
  tagName: "ul",
  className: 'navi',
  subClass: 'sub-navi',
  editable: false,
  addItemButton: null,
  items: [],
  count: 0,
  events: {
    "click .add-item-button": "addButton_clickHandler"
  },
  initialize: function (option) {
    if (option != null) {
      this.editable = option.editable || this.editable;
      this.className = option.className || this.className;
    }
    this.render();
  },
  render: function () {
    this.make();
    if (this.editable) {
      this.addItemButton = this.createAddItemButton();
      this.$el.append(this.addItemButton);
    }
  },
  createAddItemButton: function () {
    var init = {
      "class": "add-item-button",
      html: "<span>add</span>",
      "title": "Add"
    }
    var button = $('<li>', init)
                   .append($('<span>', {"class": "add-icon"}));
    return button;
  },
  addChild: function (label, link, target) {
    var child;
    if (link) {
      var init = {"title": label, text: label, "href": link};
      if (target) {
        init.target = target;
      }
      child = $('<li>').append($('<a>', init));
    } else {
      child = $('<li>', {text: label});
    }
    if (this.editable) {
      child.insertBefore(this.addItemButton);
      var nextLevel = new com.meathill.bacon.Navi({editable: this.editable, className: this.subClass});
      if (this.$el.hasClass(self.subClass)) {
        nextLevel.moveTo(child.width(), 0);
      }
      nextLevel.$el.appendTo(child);
    } else {
      this.$el.append(child)
    }
    this.items.push(child);
  },
  getChildAt: function (index) {
    return this.items[index];
  },
  removeChildAt: function (index) {
    this.$(this.items[index]).remove();
    this.items.splice(index, 1);
  },
  moveTo: function (x, y) {
    this.$el
      .css('left', x + 'px')
      .css('top', y + 'px');
  },
  child_clickHandler: function (event) {
    count = 0;
    var child = $(this).children().not('ul');
    var inputs = com.meathill.bacon.LinkEditorWindow.find('input');
    inputs.first().val(child.attr('href'));
    inputs.last().val(child.text());
    com.meathill.bacon.LinkEditorWindow
      .addClass('edit')
      .addClass('target' + $(this).parent().children().index($(this)))
      .submit(self.editor_submitHandler)
      .on('close', self.editor_closeHandler)
      .dialog({title: "�༭ " + child.text()})
      .dialog("open")
      .find('select').val(child.attr('target'));
    return false;
  },
  addButton_clickHandler: function (event) {
    count = 0;
    com.meathill.bacon.LinkEditorWindow
      .addClass('add')
      .submit(self.editor_submitHandler)
      .on('close', self.editor_closeHandler)
      .dialog({title: "����²˵���"})
      .dialog("open")
      .find('input, select').val('');
    event.stopPropagation();
  },
  editor_submitHandler: function (event) {
    var inputs = $(this).find('input');
    var label = inputs.last().val();
    var link = inputs.first().val();
    var target = $(this).find('select').val();
    if ($(this).hasClass('add')) {
      $(this).removeClass('add');
      self.addChild(label, link, target);
    } else {
      $(this).removeClass('edit');
      var classes = $(this).attr('class');
      var index = classes.match(/target(\d)/)[1];
      var target = body.children().eq(index);
      if (link) {
        var init = {"title": label, text: label, "href": link};
        if (target) {
          init.target = target;
        }
        var a = $('<a>', init);
        target.empty().append(a);
      } else {
        target.text(label);
      }
      $(this).removeClass('target' + index);
    }
    com.meathill.bacon.LinkEditorWindow.off();
  },
  editor_closeHandler: function (event) {
    com.meathill.bacon.LinkEditorWindow.off();
  }
});
com.meathill.bacon.LinkEditorWindow = $('<div>', {"class": "link-editor-window"})
  .append($('<label>', {"for": "link-editor-window-link", text: '����'}))
  .append($('<input>', {"id": "link-editor-window-link"}))
  .append('<br>')
  .append($('<label>', {"for": "link-editor-window-title", text: '����'}))
  .append($('<input>', {"id": "link-editor-window-title"}))
  .append('<br>')
  .append($('<label>', {"for": "link-editor-window-type", text: '�򿪷�ʽ'}))
  .append(
    $('<select>', {"id": 'link-editor-window-type'})
      .append($('<option>', {val: "", text: "���գ�"}))
      .append($('<option>', {val: "_blank", text: "_blank"}))
      .append($('<option>', {val: "_self", text: "_self"}))
      .append($('<option>', {val: "_top", text: "_top"})));
// statrup
$(function () {
  com.meathill.bacon.LinkEditorWindow.dialog({
    autoOpen: false,
    modal: true,
    resizable: false,
    buttons: {
      "ȷ��": function () {
        $(this).dialog("close");
        $(this).submit();
      },
      "ȡ��": function () {
        $(this).dialog("close");
        $(this).trigger('close');
      }
    }
  });
});      
  
