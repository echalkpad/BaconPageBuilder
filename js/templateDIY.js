/********
 * ά��ҳ���еĹ���
 */
var topicDIY = {
  adjustRow : function () {
    $('.z2,.z4').each(function (i) {
      var _max = 0;
      $(this).find('dd.z_con').each(function (j) {
        _max = $(this).height() > _max ? $(this).height() : _max;
      })
      $(this).find('dd.z_con').css('height', _max + 'px');
    });
    $('.z3').each(function(m) {
      // Ѱ���������е�Сģ�飬����topֵ���ж��Ƿ���ͬһ�У�ͬһ�е������ø߶�һ��
      var _pos_arr = [], _y = 0, _max = 0;
      $(this).find('.z3a1,.z3a2,.z3a3').each(function(j) {
        if ($(this).position().top != _y) {
          for (var i = 0, len = _pos_arr.length; i < len; i++) {
            _max = _pos_arr[i].find('dd').height() > _max ? _pos_arr[i].find('dd').height() : _max;
          }
          for (var i = 0, len = _pos_arr.length; i < len; i++) {
            _pos_arr[i].find('dd').css('height', _max + 'px');
          }
          _pos_arr = [];
          _y = $(this).position().top;
        }
        _pos_arr.push($(this));
      });
      for (var i = 0, len = _pos_arr.length; i < len; i++) {
        _max = _pos_arr[i].find('dd').height() > _max ? _pos_arr[i].find('dd').height() : _max;
      }
      for (var i = 0, len = _pos_arr.length; i < len; i++) {
        _pos_arr[i].find('dd').css('height', _max + 'px');
      }
    });
  },
  init : function () {
    // ҳ���ʼ�����������ڽ����ֶ������ӵ���Ҫ�ĵط�
    $('.z1n20').each(function (i) {
      $(this).children('.t').find('img').each(function (j) {
        if ($(this).parent().is('a')) {
          $(this).unwrap();
        }
        $(this).attr('id', 'z1n20_' + i + '_' + j);
        $(this).css('cursor', 'pointer').bind('click' ,function (evt) {
          var _index = Number(this.id.substring(this.id.lastIndexOf('_') + 1));
          var _con = $(this).parents('div.z1n20').find('div.r');
          _con.animate({scrollLeft : _index * _con.find('img').width()}, 800);
        });
      });
    });
    this.adjustRow();
  }
}
