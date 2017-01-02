var gulp = require('gulp')
	, $$path = require('path')
	, $$less = require('gulp-less')
	, $$sourcemaps = require('gulp-sourcemaps')
	, $$colors = require('colors')
	, $$through2 = require('through2')
	, $$co = require('co')
	, $$fs = require('fs')
	, $$process = require('process')
	//, $$multistream = require('multistream')
	//, $$buildLess = require('buildLess')
	, $$locServer = require('./loc_server.js')
;
$$locServer.createEnvConf();
var $$envConf = require('./src/envConf.njs');
const gutil = require('gulp-util');


var dirConfig = {
	src : 'src',
	tpl : 'tpl',
	build : 'build',
};
$$colors.setTheme({
  file: 'green',
  time: 'cyan',
  data: 'magenta',
  info: 'green',
  error: 'red',
});



//gulp.task('build', function() {
	//// place code for your default task here
	//gulp.src(oEnv.feDir + '/*.scss')
		//.pipe($$sourcemaps.init())
		//.pipe($$sass())
		//.pipe($$sourcemaps.write())
		//.pipe(gulp.dest(oEnv.cssDir))
		//.pipe($$through2.obj(function (file, enc, cb) {
			//console.log('bulit css file :' + (file.path+'').file);
			//cb(null, file);
		//}))
	//;
	//console.log('bulid ok!');
//});

//gulp.task('watchScss', function(){
	//gulp.watch(oEnv.feDir + '/**', function(evt) {
		//if ($$path.extname(evt.path) === '.scss') {
			//var sLessPath = $$path.relative(oEnv.feDir, evt.path);
			//console.log('File ' + evt.path.cyan + ' was ' + evt.type + ', running task : scss2css...');
			////$$buildLess(evt.path);

			////gulp.src(oEnv.feDir + '/**/*.scss')
			//gulp.src(evt.path)
				//.pipe($$sourcemaps.init())
				//.pipe($$sass())
				//.pipe($$sourcemaps.write())
				//.pipe(gulp.dest(oEnv.cssDir))
				//.pipe($$through2.obj(function (file, enc, cb) {
					//console.log('bulit css file :' + (file.path+'').file);
					//cb(null, file);
				//}))
			//;

		//};

	//});
//});

gulp.task("watch", function () {
	var watcher1 = gulp.watch(toDir(['/**/*.less', '/**/*.css']));
	var watcher2 = gulp.watch(toTplDir('/**/*.js.tpl'), ['buildJsTpl']);
	//gulp.watch(toDir('/**/*.js'), ['copyToBuild']);

	watcher1.on('change', function(evt) {
		if(evt.path.slice(-4) === '.css') {
			console.log('File ' + evt.path.cyan + ' was ' + evt.type + ', copying task : css2build...');
			gulp.src(evt.path, { base: toDir() }).pipe(gulp.dest('./build'));
		}else{
			console.log('File ' + evt.path.cyan + ' was ' + evt.type + ', running task : less2css...');
			var oo = buildLess();
		}
	});
	watcher2.on('change', function(evt) {
		gutil.log('File ' + evt.path.cyan + ' was ' + evt.type + ', running task : js.tpl2js...');
	});

	$$process.title = $$envConf.urlPrefix + ' watch';
});



gulp.task("copyCssToBuild", function () {
	return gulp.src(toDir([
			'/**/*.css',
		])).pipe(gulp.dest('./build'))
	;
});

gulp.task("buildLess", ['copyCssToBuild'], function () {
	return buildLess();
});

function buildLess() {
	return gulp.src(toDir('/**/*.less'))
		.pipe($$through2.obj(function (file, enc, cb) {
			var cssPath = file.path.replace('.less', '.css');
			$$fs.stat(cssPath, function (err, oStats) {
				if(!err) {
					gutil.log('del css file, because a same name less file was exist :\n' + (cssPath+'').red+'\u0007\u0007\u0007\u0007\u0007');
				}
			});
			cb(null, file);
		}))
		.pipe($$sourcemaps.init())
		.pipe($$less({
			paths : __dirname+'/src'
			//, rootpath : 'YunOS-FE/ecosphere/'
			, relativeUrls : true,
			/**
				0: "paths"
				1: "relativeUrls"
				2: "rootpath"
				3: "strictImports"
				4: "insecure"
				5: "dumpLineNumbers"
				6: "compress"
				7: "syncImport"
				8: "chunkInput"
				9: "mime"
				10: "useFileCache"
				11: "processImports"
				12: "pluginManager"
			*/
		})).on('error', function (err) {gutil.log(err.toString()+'\u0007\u0007\u0007');})
		.pipe($$sourcemaps.write('./'))
		.pipe(gulp.dest('./build'))
	;
}

gulp.task("buildJsTpl", function () {
	return gulp.src(toTplDir('/**/*.js.tpl'))
		.pipe($$through2.obj(function (file, enc, cb) {
			file.path = file.path.replace('.js.tpl', '.tpl.js');
			//gutil.log('bulit tpl.js file :' + (file.path+'').file);
			file.contents = new Buffer(tplToSeajs(file.contents.toString()));
			cb(null, file);
		}))
		.pipe(gulp.dest('./build'))
	;
});

gulp.task("default", ['buildLess', 'buildJsTpl', 'copyToBuild']);


gulp.task("copyToBuild", ['buildLess', 'buildJsTpl'], function () {
	return gulp.src(toDir([
		'/**/*.css',
		'/**/*.js',
		'/**/*.jpg',
		'/**/*.gif',
		'/**/*.png',
		'/**/*.{eot,svg,ttf,woff,woff2}',
	])).pipe(gulp.dest('./build'))
	;
});

gulp.task("test", function () {
	return gulp.src(toDir([
			'/**/*.css',
		]))
		.pipe($$through2.obj(function (file, enc, cb) {
			gutil.log('file :' + (file.path+'').file);
			cb(null, file);
		}))
		//.pipe(gulp.dest('./build'))
	;
});


gulp.task("copyToJavaTpl", function () {
	return gulp.src(toTplDir([
			'/**/*.*',
		]))
		.pipe(gulp.dest($$envConf.javaTplDir))

	;
});


function tplToSeajs(s) {
	s = [
		';define(function(require, exports, module){',
			'return [',
				s.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n').map(function (sLine) {
					sLine = sLine.replace(/^(\s*)(.+)/, function (s, sS, sC) {
						return sS + "'" + sC.replace(/\\/g, '\\\\').replace(/'/g, '\\\'') + "'";
					});
					return sLine;
				}).filter(function (s) {return s;}).join(',\n'),
			'\n].join(\'\\n\');',
		'});'
	].join('\n');
	return s;
}

function toDir(sPath) {
	sPath = sPath || '';
	if(sPath.map) {
		return sPath.map(function (s) {
			return $$path.resolve(dirConfig.src + s);
		});
	}else{
		return $$path.resolve(dirConfig.src + sPath);
	}

}
function toTplDir(sPath) {
	if(sPath.map) {
		return sPath.map(function (s) {
			return $$path.resolve(dirConfig.tpl + s);
		});
	}else{
		return $$path.resolve(dirConfig.tpl + sPath);
	}

}


///////////////////////////////////////////////////////////////////

if(!module.parent) {
	var assert = require('assert');
	var goTest = function () {
		//console.log(Object.keys(gulp));
		var sP = '/common.css'

		gulp.src(sP, { base: toDir() }).pipe(gulp.dest('./build'));
	};goTest();

}
