/**
	, 'common/pagination/pagination'

	oPager = $$pager({
		elm : $('._taskListPager'),
		total : 103,
		current : 2
	});

	oPager.on('act', function (evt, o) {
		actCb(o.index);
	});
*/
define(['jquery', 'lodash', 'lib/nunjucks', 'common/pagination/pagination.tpl'], function($, _, $$nunjucks, $$tplPagination){

	var _pub_static = function () {var _pri = {}, _pub = {};

		var _init = function (oSpec) {
			oSpec.total = Math.ceil(oSpec.total);
			_pri["oSpec"] = oSpec;
			_pri["$dom"] = $(oSpec.elm);
			_pri.bindUiEvent();

			setTimeout(function() {
				_pri.act(1);
			}, 0);
		};

		_pri["bindUiEvent"] = function () {
			_pri.$dom
				.on('click', 'a', function (evt) {
					evt.preventDefault();
					_pri.act($(this).data('index'));
				})
				.on('click', '.btn', function (evt) {
					_pri.act($('input[type=text]', evt.delegateTarget).val());
				});
		};

		_pri["renderPager"] = function (oSpec) {
			var sHtml = $$nunjucks.renderString($$tplPagination+'{{pagination(current, total)}}', {
				current : +oSpec.current,
				total : oSpec.total || _pri.oSpec.total,
			});
			_pri.$dom.html(sHtml);
		};

		_pub["set"] = function (oSpec) {
			_pri.renderPager(oSpec);
		};

		_pub['current'] = function() {
			return _pri.oSpec.current;
		};

		_pub['next'] = function() {
			_pri.renderPager({
				current: _pri.current + 1,
			});
		};

		_pub['prev'] = function() {
			_pri.renderPager({
				current: _pri.current - 1,
			});
		};

		_pri["act"] = function (iIndex) {
			if(!iIndex || iIndex > _pri.oSpec.total) {
				return;
			}
			if(_pri.$_pub.triggerHandler('act', {
				index : iIndex,
			}) !== false) {
				_pri.renderPager({
					current : iIndex,
				});
			}
		};

		_pri["$_pub"] = $(_pub);

		_pub["on"] = _pri.$_pub.on.bind(_pri.$_pub);

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
