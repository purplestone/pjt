define([
	
], function () {

	var _pub_static = function () {var _pub = {}, _pri = {}, _pro = {};
		var _init = function (aFn, assert) {
			_pri.assert = assert;
			_pri.timeStart = +new Date();
			_pri.aFnList = aFn || [];
			_pri.done = function () {};_pri.i = 0;
			_pri.exec();
		};

		_pri["exec"] = function () {
			var f = _pri.aFnList.shift();
			var oExecThis = {};
			if (f) {
				_pri.done = _pri.assert.async();
				// console.log(++_pri.i);
				setTimeout(function() {
					if (_pub_static.getCb(f.toString())) {
						//console.log('exec time', +new Date() - _pri.timeStart);
						//console.log(f+'');
						f.call(oExecThis, function() {
							_pri.checkExecThis({
								delay : 0
							});
							// console.log(_pri.i);
							_pri.done();
							_pri.exec();
						});
					} else {
							//console.log('exec time', +new Date() - _pri.timeStart);
							//console.log(f+'');
							f.call(oExecThis);
							_pri.checkExecThis(oExecThis);
							// console.log(_pri.i);
							_pri.done();
							_pri.exec();
					}
				}, _pri.getGap());
			}
		};

		_pub["add"] = function (aFn) {
			if({}.toString.call(aFn) !== '[object Array]') {
				aFn = [aFn];
			}
			_pri.aFnList = _pri.aFnList.concat(aFn);
		};

		_pri["getGap"] = function () {
			var iGap = _pub.gap;
			if('tmpGap' in _pri) {
				iGap = _pri.tmpGap;
				delete _pri.tmpGap;
			}
			return iGap;
		};

		_pri["checkExecThis"] = function (oExecThis) {
			if(oExecThis.delay !== undefined) {
				_pri.tmpGap = oExecThis.delay;
			}
		};

		_pub["gap"] = 200;


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

	

	_pub_static["getCb"] = function (sFn) {
		var oM = sFn.match(/.*?\((.*?)\)/);

		if (oM) {
			oM = oM[1].trim();
		}

		return oM;
	};

	return _pub_static;

});