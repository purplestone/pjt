/**
	tpl:
		{% import 'common/fileUploadGroup/fileUploadGroup.js.tpl' %}
		{{fileUploadGroup()}}
	
	js:
		, 'common/fileUploadGroup/fileUploadGroup'

		var oFileUploadGroup = $$fileUploadGroup({
			elm : $('._uploadApp'),
			ok : function (o) {
				oFileUploadGroup.setResId(o.data.resId);
			},
			bad : function (o) {
				oFileUploadGroup.warnTips(o.msg);
			}
		});

*/

;define(['jquery', 'lodash', 'common/ajaxApi'], function($, _, $$t){

	var _pub_static = function () {var _pri = {}, _pub = {}; 
 
		var _init = function (oSpec) { 
			oSpec.uploadApi = oSpec.uploadApi || $$t.uploadPic.uri;
			_pri["oSpec"] = oSpec;
			_pri["dom"] = oSpec.elm;

			_pri.bindUiEvent();
		}; 

		_pub["warnTips"] = function (sMsg) {
			$('.file-upload-tips', _pri.dom)
				.addClass('bg-danger')
				.find('.text-tips')
					.html(sMsg)
			;
		};
 
		_pri["bindUiEvent"] = function () { 

			$(_pri.dom)
				.on('click', function (evt) {
					$('input[type=file]', this).click();
				})
				.on('change', 'input[type=file]', function (evt) {
					var eGroup = evt.delegateTarget;
					if(this.value) {
						_pri.uploadFile($(this).parent(), {
							url: _pri.oSpec.uploadApi,
							dataType : 'json',
							beforeSend: function() {_pri.renderPercent(eGroup, 1);},
							success: $$t().buildDoneFun({
								ok : function (o) {
									_pri.renderPercent(eGroup, 100);
									_pri.oSpec.ok(o);
								},
								bad : function (o) {
									$(eGroup).find('.text-tips').html('');
									_pri.oSpec.bad(o);
								}
							}),
							error: function() {},
							uploadProgress: function(event, position, total, percentComplete) {
								_pri.renderPercent(eGroup, percentComplete);
							},
						});
					}else{
						_pri.renderPercent(eGroup, 0);
					}
				})
				.on('click', 'input[type=file]', function (evt) {
					evt.stopPropagation();
				})
			;
		};

		_pri["renderPercent"] = function (eGroup, iPercentComplete) {
			$('.file-upload-tips', _pri.dom)
				.removeClass('bg-danger')
			;
			if(iPercentComplete >= 100) {
				$(eGroup).find('.text-tips')
					.removeClass('progress-bar')
					.css('width', 0)
					.html($('input[type=file]', eGroup).val())
				;
			}else if(!iPercentComplete) {
				$(eGroup).find('.text-tips')
					.removeClass('progress-bar')
					.css('width', 0)
					.html('')
				;
			}else{
				var sP = +iPercentComplete+'%';
				$(eGroup).find('.text-tips')
					.addClass('progress-bar')
					.css('width', sP)
					.html(sP)
				;
			}
		};

		_pri["uploadFile"] = function ($fileSpan, opt) {
			$fileSpan = $($fileSpan);
			var $file = $('input[type=file]', $fileSpan);
			var $form = $('<form enctype="multipart/form-data" method="post"></form>').append($file);
			$form.ajaxSubmit(opt);
			$fileSpan.append($file);
		};
 
		switch(this+'') { 
			case 'test': 
				_pub._pri = _pri; 
			case 'extend': 
				_pub._init = _init; 
				break; 
			default: 
				delete _pub._init; 
				_init.apply(_pub, arguments); 
		} 
 
		return _pub; 
	}; 
 
	 
 
	return _pub_static; 
 
}); 
 
