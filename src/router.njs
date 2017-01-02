var $$path = require('path')
	, $$fs = require('fs')
	, $$co = require('co')
	, $$cb2p = require('cb2p')
	, $$colors = require('colors')
	, $$envConf = require('./envConf.njs')
	, $$urlHash = require('./urlHash.njs')
	, $$debug = require('debug')
	, $$walkDir = require('../devKit/walkDir.njs')
;

module.exports = (function () {
	var debug = $$debug('router');
	var _pub_static = function () {var _pub = {}, _pri = {}, _pro = {};
		var _init = function (req, res, next) {
			var sPath = req.path;
			_pri["req"] = req;
			_pri["res"] = res;
			_pri["next"] = next;
			_pri["reqPath"] = sPath;

			var oUrlHash =  _pri.oUrlHash = $$urlHash(_pri.req);
			var sPath = oUrlHash.path || _pri.req.path;

			if(['js', 'css', 'jpg', 'png', 'gif', 'map', 'ico', 'eot', 'svg', 'ttf', 'woff', 'woff2'].some(function (s) {
				return $$path.extname(sPath) === '.'+s;
			})) {
				if(req.hostname === '127.0.0.1') {
					res.status(400).send('Please don\'t visit host:127.0.0.1 to dev res.(you can visit "localhost" or other domain) Bad Request: ' + sPath);
				}
				if(['eot', 'svg', 'ttf', 'woff', 'woff2'].some(function (s) {
					return $$path.extname(sPath) === '.'+s;
				})) {
					res.set({
						'Access-Control-Allow-Origin' : '*'
					});
				}
				return next();
			}


			if(req.hostname !== '127.0.0.1') {
				return res.status(400).send('Please visit host:127.0.0.1 to dev tpl.   Bad Request: ' + sPath);
			}


			if($$path.extname(sPath) == '.do') {
				if(oUrlHash.data) {
					console.log('load data: ' + oUrlHash.data.path);
					//res.json(oUrlHash.data.data);
					res.set('Content-Type', 'application/json');
					res.send(JSON.stringify(oUrlHash.data.data));
					res.end();
				}else{
					var sPath = $$path.join(__dirname, sPath);
					_pri.tryFiles(sPath, function (err, sPath) {
						if(sPath) {
							res.set('Content-Type', 'application/json');
							res.send($$fs.readFileSync(sPath).toString());
							res.end();
						}else{
							res.status(400).send('Bad Request: ' + sPath);
						}
					});
					
				}

			}else{
				_pri.goDynamic(sPath, oUrlHash);
			}

			
		};

		_pri["goDynamic"] = function (sPath, oUrlHash) {
			
			_pri["oTplData"] = oUrlHash.data;

			var bGo;
			$$co(function *() {
				bGo = 
					(yield $$cb2p(_pri.tryScript)(sPath))
					|| (yield $$cb2p(_pri.tryTpl)(sPath))
				;
			}).then(function () {
				if(!bGo) {
					console.log('######################'.red);
					console.log('#'.red, _pri.findFiles.join('\n# '.red));
					console.log('### not find file! \n\n'.red);
					_pri.next();
				}
			}).catch(function () {
				console.log(arguments);
			});
		
		};

		_pri["tryScript"] = function (sPath, cb) {
			if($$path.extname(sPath) === '.njs') {
				console.log('\nurl : ' + _pri.reqPath.yellow);
				console.log('script : ' + sPath.green+'\n');
				require('./' + sPath)(_pri.req, _pri.res, _pri.next, $$envConf);
				cb(null, sPath);
			}else{
				cb();
			}
		};

		_pri["tryTplPath"] = function (sPath, cb) {
			var aPath = [].concat(sPath).concat([
				sPath + '.tpl',
				sPath + $$path.basename(sPath) + '.tpl',
				sPath + $$path.sep + $$path.basename(sPath) + '.tpl'
			]);
			var aTplPath = aPath.map(function (sPath) {
				return sPath && $$path.join(__dirname, '../tpl', sPath);
			});
			debug('tryTpl:aTplPath'.yellow, aTplPath);

			$$cb2p(_pri.tryFiles)(aTplPath)
			.then(function (sPathTarget) {
				cb(sPathTarget);
			});
		};

		_pri["tryTpl"] = function (sPath, cb) {
			_pri.tryTplPath(sPath, function (sPathTarget) {
				if(sPathTarget && _pri.isTpl(sPathTarget)) {
					_pri.renderPage(sPathTarget).then(function () {
						cb(null, sPathTarget);
					});
				}else{
					if(_pri.oTplData) {
						_pri.renderPage(sPathTarget).then(function () {
							cb(null, true);
						});
					}else{
						cb();
					}
				}
			});
		};

		_pri["isTpl"] = function (sTplPath) {
			var sNameEx = $$path.extname(sTplPath);
			return sNameEx === '.tpl' || sNameEx === '.html';
		};

		_pri["renderPage"] = function (sTplPath, oTplData) {
			return $$co(function *() {
				var oData = _pri.oTplData || (yield $$cb2p(_pri.tryTplData)([sTplPath]));
				oTplData = oTplData || (oData && oData.data) || {};
				//console.log(oData);

				console.log(('\n\nurl : ' + _pri.req.originalUrl).yellow);
				oData && console.log('load data : ' + oData.path.green);

				oTplData['c'] = $$envConf;
				oTplData['j'] = JSON.stringify(oTplData.v || '');

				if(_pri.req.path.slice(-9) === '/demo.tpl' || _pri.req.path.slice(-5) === '/demo') {
					oTplData.hashList = _pri.oUrlHash.getHashUrl();
					oTplData.tplList = _pri.getTplList();
				}
				//console.log(oTplData);


				if(sTplPath && !_pri.req.param._dump) {
					_pri.res.render(sTplPath, oTplData);
					console.log('load tpl : ' + sTplPath.green);
				}else{
					_pri.res.end(JSON.stringify(oTplData));
				}
			});
		};

		_pri["getTplList"] = function () {
			var sPagePath = 'page';
			var sTplDir = $$path.join(__dirname, '../tpl/', sPagePath);
			return $$walkDir(sTplDir, function () {return true;}, function (n) {
				n.path = sPagePath + n.path;
				return n;
			});
		};

		_pri["tryTplData"] = function (aTplPath, cb) {

			aTplPath = [].concat(aTplPath).filter(function (o) {return o});
			var aDataPath = aTplPath.map(function (sPath) {
				return _pri.findDataByTplPath(sPath);
			});
			debug('tryTplData:aDataPath'.yellow, aDataPath);
			_pri.tryFiles(aDataPath, function (err, sDataPath) {
				if(sDataPath) {
					var oData = {
						data : JSON.parse($$fs.readFileSync(sDataPath)),
						path : sDataPath
					};
					cb(null, oData);
				}else{
					cb();
				}
			});
		};

		_pri["findDataByTplPath"] = function (sTplPath) {
			sTplPath = sTplPath.replace($$path.join(__dirname, '../tpl'), $$path.join(__dirname, '../src'));
			return sTplPath.replace('.test.html', '.html').replace('.html', '.tpl').replace('.tpl', '.json');
		};

		_pri["findFiles"] = [];

		_pri["tryFiles"] = function (aPath, cb) {
			if({}.toString.call(aPath) !== '[object Array]') {
				aPath = [aPath];
			}
			Promise.all(aPath.map(function (sPath) {
				_pri.findFiles.push(sPath);
				return $$cb2p(_pri.getFileStat)(sPath);
			})).then(function (aResp) {
				var sPathTarget = null;
				aResp.some(function (o) {
					if(o && o.isFile()) {
						sPathTarget = o.path;
						return true;
					}
				});
				cb(null, sPathTarget);
			}).catch(function () {
				console.log('err');
				console.log(arguments);
			});
		};

		_pri["getFileStat"] = function (s, cb) {
			//console.log(s);
			try{
				$$fs.stat(s, function (err, o) {
					o = o || null;
					if(o) {
						o.path = s;
					}
					cb(null, o);
				});
			}catch(e) {
				cb(null, null);
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

}());


///////////////////////////////////////////////////////////////////

if(!module.parent) {
	var assert = require('assert');
	var goTest = function () {
		var oArgs = {
			
		};

		var oC = module.exports.call('test', oArgs);
		//oC._init();
		assert.deepEqual(oC._pri.findDataByTplPath('aaaa/bbbb/ccc/ddd.tpl'),
			'aaaa/bbbb/ccc/ddd.json'
		);

		assert.ok(oC._pri.isTpl('basd/sdfa/aa.tpl'));
		assert.ok(!oC._pri.isTpl('basd/sdfa/aa.css'));
		//console.log();


	};goTest();

}