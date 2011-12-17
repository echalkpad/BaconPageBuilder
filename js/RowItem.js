function addRow(evt ,_type) {
  if (evt != null) {
    _type = Number($(this).attr('name'));
  }
  var _class = '';
  if (0 == _type){
    _class = 'z1';
  } else {
    _class = 'z'+_type;
  }
  var _row = $('<div></div>', {'class':'banners', 'type': _type}).appendTo("#mains");
  _row.addClass(_class);
  _row.html(_frame_arr[_type]);
  // ͨ���ı�����Ե����༭
  _row.find('dt').attr('title', '����༭����');
  _row.find('dt').bind('click', editRowTitle);
  // ���ɾ����ť
  $('<div></div>').prependTo(_row);
  _down_btn.clone(true).prependTo(_row);
  _up_btn.clone(true).prependTo(_row);
  _remove_btn.clone(true).prependTo(_row);
  return _row;
}
/**
 * ɾ��ͨ��
 * @param {Object} e
 */ 
function removeRow(evt){
  $(this).parent().remove();
  setAddressContent(false);
}
function moveRow(evt) {
  if($(this).attr('name') == 'up' && $(this).parent().prev('div').length > 0) {
    $(this).parent().insertBefore($(this).parent().prev('div'));
  } else if ($(this).attr('name') == 'down' && $(this).parent().next('div').length > 0) {
    $(this).parent().insertAfter($(this).parent().next('div'));
  }
  setAddressContent(false);
}

function RowItem(colsNum) {
  /**
   * ���캯������
   */
  var self = this;
  var index = 0;
  var init = {};
  colsNum = colsNum == undefined ? 1 : colsNum;
  this.body = createBody(colsNum);
  /**
   * Public Methods
   */
  this.appendTo = function (parent) {
    $(parent).append(this.body);
  }
  /**
   * Private Functions
   */
  function createBody(colsNum){
    var result;
    if (colsNum > 1) {
      result = $('<div>', {
        'class' : 'column-' + colsNum
      });
      for (var i = 0; i < colsNum ; i++) {
        result.append(createDL());
      }
      result.find('dl').last().addClass('last-column');
    } else {
      result = createDL();
    }
    return result;
  }
  function createDL() {
    var result = $('<dl>', {
      'class' : 'row-item'
    }).append($('<dt>', {
      text: '����'
      }).toggle(editTitle, submitTitle)
    ).append($('<dd>', {
      text: '&nbsp;'
    }));
    return result;
  }
  /**
   * �༭ͨ������
   * @param {Object} event
   * @private
   */
  function editTitle(event) {
    var title = $('<input>', {
      val: body.text(),
      'title': '�س��򵥻��հ״�ȷ���޸�',
      change : submitTitle
    }).focus();
    body.append(title);
  }
  /**
   * ����༭�ı���
   * @param {Object} event
   * @private
   */
  function submitTitle(event) {
    if (evt.type == 'click' || (evt.type == 'keydown' && evt.keyCode == 13)){
      var dt = $(this).parent();
      dt.html($(this).val());
      _dt.attr('title', '����༭����');
      _dt.unbind('click', submitTitle);
      _dt.bind('click', editRowTitle);
    }
  }
}
