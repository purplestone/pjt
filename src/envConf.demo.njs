
module.exports = (function () {

	var port = 8237;
	var urlPrefix = '/s';
	var resHost = 'http://localhost:' + port + urlPrefix;
	var oConf = {
		javaTplDir : '填入模版目录/tpl',
		port,
		resHost,
		urlPrefix,
		resPath : resHost + ''
	};

	return oConf;

}());


