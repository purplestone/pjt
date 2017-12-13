/**
	var $$tab = require('kit/tab');
	_pri.oTab = $$tab({
		tab : $('#menu-bar [data-tab-target]'),
		content : $('#newcontainer>[data-tab-content]'),
		eventType : 'mouseenter',
		activeClass : 'active'
	});
	on disable act
*/


;define(['jquery', 'lodash'

], function ($) {

	var _pub_static = function () {var _pub = {}, _pri = {}, _pro = {};
		var _init = function (oSpec) {
			_pri.oSpec = oSpec;
			_pri.$tabs = $(_pri.oSpec.tab);
			_pri.$contents = $(_pri.oSpec.content);
			_pri.activeClass = _pri.oSpec.activeClass || 'on';
			_pri.preventDefault = _pri.oSpec.preventDefault === undefined ? true : !!_pri.oSpec.preventDefault ;
			_pri.oSpec.eventType = _pri.oSpec.eventType || 'click';

			_pri.fillAttrData();
			_pri.$tabs.on(_pri.oSpec.eventType, function (evt) {
				if(_pri.preventDefault) {
					evt.preventDefault();
				}
				_pri.act(this.getAttribute('data-tab-target'));
			});

			_pri.init();
		};

		_pri["fillAttrData"] = function () {
			var i = 0;
			_pri.$tabs.each(function () {
				if (!this.getAttribute('data-tab-target')) {
					this.setAttribute('data-tab-target', i++);
				}
			});
			i = 0;
			_pri.$contents.each(function () {
				if (!this.getAttribute('data-tab-content')) {
					this.setAttribute('data-tab-content', i++);
				}
			});
		};

		_pri["$_pub"] = $(_pub);

		_pub["on"] = _pri.$_pub.on.bind(_pri.$_pub);

		_pri["init"] = function () {
			var $initActiveTab = _pri.$tabs.filter('.'+_pri.activeClass).eq(0);
			var sTarget = $initActiveTab.attr('data-tab-target');
			if(!sTarget) {
				sTarget = _pri.$tabs.eq(0).attr('data-tab-target');
			}
			_pri.act(sTarget);
		};

		_pri["act"] = function (sTarget, oData) {
			var oHide = _pri.clearActive();
			var $tab = _pri.$tabs.filter('[data-tab-target="'+sTarget+'"]');
			var $content = _pri.$contents.filter('[data-tab-content="'+sTarget+'"]');
			_pri.actTab($tab);
			_pri.actContent($content);
			_pri.currTarget = sTarget;
			oHide.aHideContent.forEach(function (eContent) {
				var sHideTarget = $(eContent).attr('data-tab-content');
				var $tab = _pri.$tabs.filter('[data-tab-target="'+sHideTarget+'"]');
				if(sHideTarget !== sTarget) {
					_pri.$_pub.triggerHandler('disable', {
						target : sHideTarget,
						tab : $tab[0],
						content : eContent,
					});
				}
			});
			_pri.$_pub.triggerHandler('act', {
				target : sTarget,
				tab : $tab[0],
				content : $content[0],
				data : oData
			});
		};

		_pub["act"] = function (sTarget, oData) {
			if(Object.prototype.toString.call(sTarget) !== '[object String]') {
				if(Object.prototype.toString.call(sTarget) === '[object Number]') {
					sTarget = _pri.$tabs.eq(sTarget).attr('data-tab-target');
				}else{
					sTarget = $(sTarget).attr('data-tab-target');
				}
			}
			if(!_pri.$tabs.filter('[data-tab-target="'+sTarget+'"]').length) {
				sTarget = $(sTarget).attr('data-tab-target') || sTarget;
			}
			_pri.act(sTarget, oData);
		};

		_pri["clearActive"] = function () {
			var aHideContent = [];
			_pri.$tabs.each(function () {
				$(this).removeClass(_pri.activeClass);
			});
			_pri.$contents.each(function () {
				if($(this).css('display') !== 'none') {
					aHideContent.push(this);
				}
				$(this).hide();
			});
			return {
				aHideContent : aHideContent
			};
		};

		_pri["actTab"] = function ($tab) {
			$tab.addClass(_pri.activeClass);
		};

		_pri["actContent"] = function ($content) {
			$content.show();
		};

		_pub["getCurrTab"] = function () {
			return {
				index : _pri.$tabs.index(_pri.$tabs.filter('[data-tab-target="'+_pri.currTarget+'"]')[0]),
				target : _pri.currTarget
			};
		};

		_pub["actPrev"] = function (bLoop) {
			var iC = _pub.getCurrTab().index;
			var iT = iC - 1;
			if(iT > -1) {
				_pub.act(iT);
			}else if(bLoop) {
				_pub.act(_pri.$tabs.length - 1);
			}
		};

		_pub["actNext"] = function (bLoop) {
			var iC = _pub.getCurrTab().index;
			var iT = iC + 1;
			if(iT < _pri.$tabs.length) {
				_pub.act(iT);
			}else if(bLoop) {
				_pub.act(0);
			}
		};

		switch(this+'') {
			case 'test':
				_pub._pri = _pri;
			case 'extend':
				_pub._pro = _pro;
				_pub._init = _init;
				break;
			default:
				delete _pub._init;
				delete _pub._pro;
				_init.apply(_pub, arguments);
		}
		return _pub;
	};

	

	return _pub_static;
});