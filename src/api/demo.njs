var $$cb2p = require('cb2p');

module.exports = (function () {
	var _pub_static = function () {var _pub = {}, _pri = {}, _pro = {};
	
		_pri["fileNo"] = 99999999;
	
		var _init = function (req, res, next) {
			_pri["req"] = req;
			_pri["res"] = res;
			_pri["next"] = next;
			
			_pri.api = _pri.res.api.bind(_pri.fileNo);

			// res.set({
			// 	Location:"https://login"
			// });
			// res.status(302).end('');
			// _pri.api.ok(`save ok`);
			// _pri.api.err(`error`);
			
			_pri.main(_pri.req.body).catch((err)=>{
				_pri.api.err(err);
				return err;
			}).then((err)=>{
				console.log(err);
				_pri.res.api.err(`发生接口异常错误`, -_pri.fileNo);
			});
			
		};
		
		_pri["main"] = async function (oReq) {
			var sName = oReq.name;

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
	let assert = require('assert');
	var goTest = function () {
		var oArgs = {
			
		};

		var oC = module.exports.call('test', oArgs);
		oC._init();
		console.log(oC);


	};goTest();

}