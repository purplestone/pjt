module.exports = (function () {

	var _pub_static = function () {var _pub = {}, _pri = {}, _pro = {};
		var _init = function (req, res, next) {
			_pri["req"] = req;
			_pri["res"] = res;
			_pri["next"] = next;
			
			res.set({
				Location:"https://login"
			});
			res.status(302).end('');
			
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

}());


///////////////////////////////////////////////////////////////////

if(!module.parent) {
	var assert = require('assert');
	var goTest = function () {
		var oArgs = {
			
		};

		var oC = module.exports.call('test', oArgs);
		oC._init();
		console.log(oC);


	};goTest();

}