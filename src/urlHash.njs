var $$path = require('path')
	, $$fs = require('fs')
	, $$co = require('co')
	, $$cb2p = require('cb2p')
	, $$colors = require('colors')
	, $$envConf = require('./envConf.njs')
;

module.exports = (function () {

	var _pub_static = function () {var _pub = {}, _pri = {}, _pro = {};
		var _init = function (req) {
			_pri.loadHashList();
			_pri.buildRes(req);
		};

		_pri["loadHashList"] = function () {

			_pri.add('/demo').to('/page/demo/demo.tpl')






		};


		_pri["buildRes"] = function (req) {
			var oHashItem = _pri.oCache[req.path];
			if(oHashItem) {
				_pub["path"] = oHashItem.toPath;
				if(oHashItem.tplData) {
					_pub["data"] = {
						data : oHashItem.tplData,
						path : oHashItem.tplDataPath || ('urlHash.njs : ' + oHashItem.org)
					};
				}
			}
		};

		_pri["oCache"] = {};

		_pub["getHashUrl"] = function () {
			return Object.keys(_pri.oCache);
		};

		_pri["add"] = function (sUrlPath) {
			var oHash = new _pri.HashItem(sUrlPath);
			_pri.oCache[sUrlPath] = oHash;
			return oHash;
		};

		_pri["HashItem"] = (function () {
			var _fun = function (sUrlPath) {
				this.org = sUrlPath;
			}
		
			_fun.prototype["to"] = function (sPath) {
				this.toPath = sPath;
				return this;
			};

			_fun.prototype["data"] = function (sPath) {
				if({}.toString.call(sPath) === '[object String]') {
					this.tplData = $$fs.readFileSync($$path.join(__dirname, sPath)).toString();
					this.tplDataPath = sPath;
					this.tplData = JSON.parse(this.tplData);
				}else{
					this.tplData = sPath;
				}
				
				return this;
			};

		
			return _fun;
		}());

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
		//oC._init();
		//console.log();


	};goTest();

}