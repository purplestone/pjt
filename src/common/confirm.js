/**
	var $$confirm = require('common/confirm');

	var oConfirm = $$confirm('提交测试成功！');

	oConfirm.on('hidden.bs.modal', function () {
		alert('hidden.bs.modal');
	});

	event:
		ok
		show.bs.modal
		shown.bs.modal
		hide.bs.modal
		hidden.bs.modal
		loaded.bs.modal
*/
;define(['jquery', 'lodash'], function($, _){

	var _pri_static = {};
	var _pub_static = function () {var _pri = {}, _pub = {}; 
 
		var _init = function (oSpec) { 
			if(_.isString(oSpec)) {
				oSpec = {content:oSpec};
			}
			_pri.oSpec = oSpec;

			_pri.buildConfirm();

			_pri.$dom.modal(oSpec);
 
		}; 

		_pub["show"] = function () {
			_pri.$dom.modal('show');
		};

		_pub["hide"] = function () {
			_pri.$dom.modal('hide');
		};

		_pub["toggle"] = function () {
			_pri.$dom.modal('toggle');
		};

		_pri["buildConfirm"] = function () {
			_pri.$dom = _pri.getTpl();
			_pri.$dom.find('._modalTilte').html(_pri.oSpec.title || '提示');
			_pri.$dom.find('._modalBody').html(_pri.oSpec.content);
			
			_pri.$dom
				.on('click', '._okBtn', function () {
					_pri.$_pub.triggerHandler('ok');
					if(_pri.oSpec.ok) {
						_pri.oSpec.ok();
					}
				})
				.on('click', '._cancelBtn', function () {
					_pri.$_pub.triggerHandler('cancel');
					if(_pri.oSpec.cancel) {
						_pri.oSpec.cancel();
					}
				})
			;

			_pri["$_pub"] = _pri.$dom;

			_pub["on"] = _pri.$_pub.on.bind(_pri.$_pub);
		};
 
		_pri["getTpl"] = function () {
			if(_pri.oSpec.hold) {
				_pri.$dom = (_pri_static.$dom = _pri_static.$dom || $(_pri.tpl));
			}else{
				_pri["$dom"] = $(_pri.tpl);
			}
			return _pri.$dom;
		};

		_pri["tpl"] = [
			'<div class="modal bs-example-modal-sm alert-modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" data-backdrop="">',
				'<div class="modal-dialog modal-sm">',
					'<div class="modal-content">',
						'<div class="modal-header">',
							'<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">✕</span><span class="sr-only">Close</span></button>',
							'<h4 class="modal-title _modalTilte"></h4>',
							'</div>',
						'<div class="modal-body _modalBody"></div>',
						'<div class="modal-footer">',
							'<button type="button" class="btn btn-primary _okBtn" data-dismiss="modal">确认</button>',
							'<button type="button" class="btn btn-default _cancelBtn" data-dismiss="modal">关闭</button>',
						'</div>',
					'</div>',
				'</div>',
			'</div>'
		].join('\n');


 
		switch(this+'') { 
			case 'test': 
				_pub._pri = _pri; 
			case 'extend': 
				_pub._init = _init; 
				break; 
			default: 
				delete _pub._init; 
				_init.apply(_pub, arguments); 
		} 
 
		return _pub; 
	}; 
 
	 
 
	return _pub_static; 
 
}); 
 
