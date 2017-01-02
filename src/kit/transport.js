/**
	$$transport = require('kit/transport');

	var oApi = $$transport({
		"uploadApp" : c({
			uri : '/ajax/uploadApp',
			type : 'post',

			codeTips : {
				//'-1' : '应用安装包不能为空！'
			}

		})
	});

	oApi.uploadApp({
		data : oData,
		ok : function (oResp) {
			alert('提交测试成功！');
		},
		bad : function (oResp) {
			alert('未登录，无权限 等');
		}
	});

	oApi.uploadApp.uri | type | codeTips

	$.get('/xxx', {}, oApi().buildDoneFun({
		ok : function () {

		},
		bad : function () {
			//return false;
		}
	}));
*/
;define(['jquery'], function($){
	var _pri_static = {};
	var _pub_static = function (oApi, oSpec) {var _pri = {}, _pub = function(){return {buildDoneFun:function (oArgs) {return _pub_static.buildDoneFun(oArgs, oSpec)}};};
		var _main = function () {
			oSpec = oSpec || {};
			oSpec.dailog = oSpec.dailog || {
				alert : function (s) {
					alert(s);
				}
			};
			_pri["oSpec"] = oSpec;

			var i;
			for (i in oApi) {
				_pub[i] = _pub_static.build(oApi[i], oSpec);
			}

		};

		_main();
		return _pub;
	};

	_pri_static["fnBad"] = function (oData, oSpec, oTransport, oCustomTips) {
		//alert([oData.status, oData.request_id, oData.msg].join(', '));
		//oSpec.dailog.alert(oData.msg + '\n(' + oData.status + ', ' + oData.request_id + ')' );
		var s = _pub_static.codeTips(oData, oTransport, oCustomTips);
		oSpec.dailog.alert(s);
	};

	_pub_static["buildDoneFun"] = function (oArgs, oSpec, oTransport, oCustomTips) {
		return function (o) {
			var stopBadDefault;
			var fnDoError = function () {
				if(oArgs.bad) {
					stopBadDefault = oArgs.bad.apply(this, arguments) === false ? false : stopBadDefault;
				}
				if(stopBadDefault !== false) {
					_pri_static.fnBad.apply(this, arguments);
				}
			};
			if(o.code > -1) {
				oArgs.ok && oArgs.ok.apply(this, arguments);
			}else{
				fnDoError(o, oSpec, oTransport, oCustomTips);
			}
			//oArgs.end && oArgs.end.apply(this, arguments);

		};
	};


	_pub_static["build"] = function (oTransport, oSpec) {

		var oAjaxConfDef;
		switch(oTransport.type) {
			case 'get':
			case 'post':
				oAjaxConfDef = {
					type : oTransport.type,
					dataType : 'json'
				};
				break;
			case 'jsonp':
				return function (oArgs) {
					oAjaxConfDef = {
						type : 'jsonp',
						crossDomain : true,
						dataType : 'jsonp',
						jsonpCallback : oArgs.jsonpCallback
					};
				};
				break;

		}

		var send = function (oArgs) {
			oArgs = oArgs || {};
			var iRetryNum = 0;
			var oAjaxConf = $.extend(oAjaxConfDef, oArgs);
			oAjaxConf["url"] = oTransport.uri;
			oAjaxConf["data"] = oArgs.data;
			oAjaxConf["cache"] = false;

			var oXHR = $.ajax(oAjaxConf);
			oXHR
				["done"](_pub_static.buildDoneFun(oArgs, oSpec, oTransport, oArgs.codeTips))
				["fail"](oArgs.fail)
				["always"](oArgs.always)
			;
			return oXHR;
		};

		Object.keys(oTransport).forEach(function (s) {
			send[s] = oTransport[s];
		});

		return send;
	};

	_pub_static["codeTips"] = function (oData, oTransport, oCustomTips) {
		var sTips;
		if(oCustomTips && oCustomTips[oData.code]) {
			sTips = oCustomTips[oData.code];
		}else{
			sTips = oTransport && oTransport.codeTips && oTransport.codeTips[oData.code];
		}
		if(!sTips) {
			sTips = oData.msg || '发生异常错误。';
		}
		return sTips;
	};

	return _pub_static;

});
