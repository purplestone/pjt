;define(['jquery', 'lodash'

], function($, _){


	var _pub_static = function () {var _pri = {}, _pub = {}; 
 
		var _init = function (oSpec) { 
			_pri.oSpec = oSpec || {};
			switch (oSpec.size) {
				case 'big':
				case 'large':
					_pri.sizeClass = 'modal-lg';
					break;
				case 'small':
				case 'little':
					_pri.sizeClass = 'modal-sm';
					break;
				default:
					_pri.sizeClass = '';
					break;
			}
			_pri.buildDom(); 
			_pri.bindEvent();
 		}; 

		_pri["bindEvent"] = function () {
			$(_pub.dom).on('click', '._closeBtn', function () {
				_pub.close();
			});
			$(_pub.dom).on('click', '._okBtn', function () {
				_pri.$.triggerHandler('ok', _pub.dom);
			});
		};
 
		_pri["buildDom"] = function () {
			_pub.dom = $(_pri.tpl());
			if (_pri.oSpec.title) {
				$('.modal-title', _pub.dom).html(_pri.oSpec.title);
			}
			if (_pri.oSpec.header) {
				$('.modal-header', _pub.dom).html(_pri.oSpec.header);
			}
			if (_pri.oSpec.body) {
				$('.modal-body', _pub.dom).html(_pri.oSpec.body);
			}
			if (_pri.oSpec.footer) {
				$('.modal-footer', _pub.dom).html(_pri.oSpec.footer);
			}
		};

		_pri["tpl"] = function () {
			return ['<div class="modal'+(_pri.oSpec.className || '')+'" role="dialog">',
			'<div class="modal-dialog '+_pri.sizeClass+'" role="document"><div class="__loading loading-mask" style="display:none;"></div>',
				'<div class="modal-content">',
					'<div class="modal-header">',
						'<button type="button" class="close _closeBtn"><span aria-hidden="true">&times;</span></button>',
						'<div class="modal-title"></div>',
					'</div>',
					'<div class="modal-body"></div>',
					'<div class="modal-footer">',
						'<button type="button" class="btn btn-default _closeBtn">取消</button>',
						'<button type="button" class="btn btn-primary _okBtn">'+(_pri.oSpec.okBtnTxt || '确定')+'</button>',
					'</div>',
				'</div>',
			'</div>',
		  '</div>'
			].join('');
		};

		_pub["okBtn"] = {
			loading: function () {
				$('._okBtn', _pub.dom).button('loading');
			},
			loaded: function () {
				$('._okBtn', _pub.dom).button('reset');
			},
		}

		_pub["loading"] = function () {
			$('.__loading', _pub.dom).show();
			return this;
		};

		_pub["loaded"] = function () {
			$('.__loading', _pub.dom).hide();
			return this;
		};

		_pub["show"] = function () {
			if (!_pub.domHasInserted) {
				$('body').append(_pub.dom);
				_pub.domHasInserted = true;
			}
			// $(_pub.dom).show();
			$(_pub.dom).modal('show')
			_pri.$.triggerHandler('show');
			return this;
		};

		_pub["hide"] = function () {
			// $(_pub.dom).hide();
			$(_pub.dom).modal('hide');
			_pri.$.triggerHandler('hide');
			return this;
		};
		
		_pub["close"] = function () {
			$(_pub.dom).modal('hide');
			$(_pub.dom).remove();
			_pri.$.triggerHandler('close');
			_pri.$.off();
			_pub = null;
			_pri = null;
		};

		_pri["$"] = $(_pub);

		_pub["on"] = function (aEvtName, cb) {
			_pri.$.on.apply(_pri.$, arguments);
			return this;
		};

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
 
