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
/**
 * �༭ͨ������
 * @param {Object} evt
 */
function editRowTitle(evt) {
  if (_title_txt.parent().length > 0 && _title_txt.parent().attr('id') != 'timg') {
    submitTitle({type : 'click'});
  };
  _title_txt.val($(this).html());
  $(this).unbind('click', editRowTitle);
  $(this).bind('click', submitTitle);
  $(this).html('');
  $(this).append(_title_txt);
  $(this).attr('title', '�س��򵥻��հ״�ȷ���޸�');
  _title_txt.focus();
}
function submitTitle(evt, bl) {
  if (evt.type == 'click' || (evt.type == 'keydown' && evt.keyCode == 13) || bl){
    var _dt = _title_txt.parent();
    $('#timg').append(_title_txt);
    _dt.html(_title_txt.val());
    _dt.attr('title', '����༭����');
    _dt.unbind('click', submitTitle);
    _dt.bind('click', editRowTitle);
  }
}

function RowItem() {
  this.appendTo = function (parent) {
    
  }
  
  /**
   * ���캯������
   */
  var self = this;
  var index = 0;
  var init = {};
  this.body = $('<dl>', init);
  
}
