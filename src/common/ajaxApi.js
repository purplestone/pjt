/**
	, 'common/ajaxApi'

	$$t.createTest({
		data : oData,
		ok : function (oRes) {
			alert('提交测试成功！');
		},
		bad : function (oRes) {
			alert('未登录，无权限 等');
		}
	});

	$$t().buildDoneFun({
		ok : function (oRes) {

		},
		bad : function (oRes) {
			//return false;
		}
	});
*/
define(['kit/transport'], function($$transport){

	var c = function (o) {
		var urlBase = '';
		o.uri = urlBase + o.uri;
		return o;
	};

	return $$transport({

		/**
			uploadFile=a 传文件过来的参数名
		*/
		"uploadPic" : c({
			uri : '/post/upload',
			type : 'post',
		})

	});

});
