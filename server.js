var $$express = require('express')
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

			var iPort = $$envConf.port;

			var app = $$express();

			//app.set('views', __dirname+'/tpl');
			//$$nunjucksJs.bindExpress(app);
			$$nunjucks.configure('tpl', {
				autoescape: true,
				noCache : true,
				express: app
			});

			app.use(function (req, res, next) {
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
