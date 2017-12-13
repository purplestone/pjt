var $$express = require('express')
	, $$bodyParser = require('body-parser')
	, $$colors = require('colors')
	, $$path = require('path')
	, $$fs = require('fs')
	, $$serveStatic = require('serve-static')
	, $$nunjucks = require('nunjucks')
	, $$process = require('process')
;

module.exports = (function () {

	var _pub_static = function () {var _pub = {}, _pri = {}, _pro = {};
		var _init = function () {
			
			$$envConf = require('./src/envConf.njs');
			$$appConf = require('./src/appConf.njs');

			var iPort = $$envConf.port;

			var app = $$express();
			
			app.use($$bodyParser.json()); // for parsing application/json

			//app.set('views', __dirname+'/tpl');
			//$$nunjucksJs.bindExpress(app);
			$$nunjucks.configure('tpl', {
				autoescape: true,
				noCache : true,
				express: app
			});

			app.use(function (req, res, next) {
				req.appConf = $$appConf;
				res.api = (function () {
					var _fun = function (oSpec) {
						if (!_fun.res.length) {
							res.send(JSON.stringify(oSpec));
						}
						_fun.res.push(oSpec);
					};

					_fun["res"] = [];

					_fun["bind"] = function (iFileNum) {
						var fn = function (oSpec) {
							_fun(oSpec);
						};
						fn.ok = _fun.ok;
						fn.err = function (msg, code, data) {
							var args = [].slice.call(arguments, 0);
							if (args[0] instanceof Error) {
								if (args[0].heap) {
									args = args[0].heap[0];
								}else{
									args.shift();
								}
							}
							args[1] = - (iFileNum + parseFloat('0.' + args[1] + '9'));
							_fun.err.apply(null, args);
						};
						fn.Error = function () {
							var args = [].slice.call(arguments, 0);
							var err;
							if (args[0] instanceof Error) {
								err = args[0];
								args.shift();
							}else{
								err = new Error();
							}
							err.heap = err.heap || [];
							err.heap.push(args);
							return err;
						};
						return fn;
					};
				
					_fun["ok"] = function (data, msg, code) {
						_fun({
							code: code || 0,
							data: data || null,
							msg: msg || '',
						});
					};

					_fun["err"] = function (msg, code, data) {
						_fun({
							code: code || -1,
							data: data || null,
							msg: msg || '请求发生异常',
						});
					};
				
					return _fun;
				}());
				_pri.clearAppMd();
				require('./src/router.njs')(req, res, next);
			});

			app.use($$envConf.urlPrefix, function (req, res, next) {

				if(['css', 'map', 'tpl.js'].some(function (s) {return RegExp('.*\.'+s+'$').test(req.path);})) {
					$$serveStatic(__dirname + '/build/')(req, res, next);
				}else{
					next();
				}

			});

			app.use($$envConf.urlPrefix, $$serveStatic(__dirname + '/src/'));

			app.on('error', function(err, ctx){
				var showNotes = err.message;
				if(err.status) {
					showNotes += ' : ' + ctx.url;
				}else{
					showNotes += err.stack;
				}
				console.log('server error \n'.red, showNotes);
				_pri.clearAppMd();
			});

			app.listen(iPort);
			console.log($$colors.green(`loc server is ok \n127.0.0.1:${iPort} ...`));
			$$process.title = $$envConf.urlPrefix + ' loc server';
			
		};

		
		_pri["clearAppMd"] = function () {
			var sPath = $$path.resolve(__dirname, './src').toLowerCase() + $$path.sep;
			var sSelf = $$path.resolve(__dirname, './devKit').toLowerCase();
			var i;
			for (i in require.cache) {
				if(
					i.toLowerCase().indexOf(sPath) > -1
					|| i.toLowerCase().indexOf(sSelf) > -1
				) {
					//debugApp('clear ' + i);
					//console.log('clear ' + i);
					delete require.cache[i];
				}
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

	_pub_static["createEnvConf"] = function () {
		createEnvConf();
	};

	return _pub_static;

}());

function createEnvConf() {
	if(!$$fs.existsSync('./src/envConf.njs')) {
		$$fs.writeFileSync('./src/envConf.njs', $$fs.readFileSync('./src/envConf.demo.njs'));
	}
};

///////////////////////////////////////////////////////////////////

if(!module.parent) {
	var assert = require('assert');
	var goTest = function () {
		var oArgs = {
			
		};

		module.exports.createEnvConf();
		var oC = module.exports.call('test', oArgs);
		oC._init();

	};goTest();

}
