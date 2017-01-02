;define(['jquery', 'lodash'], function($, _){


	var _pub_static = function () {var _pri = {}, _pub = {}; 
 
		var _init = function () { 
 
			_pri.bindUiEvent(); 
 
		}; 
 
		_pri["bindUiEvent"] = function () { 

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
 
/***
setTimeout(function() {
	//assert.equal(value,
		//expect,
		//'value——expect'
	//);
	//assert.deepEqual(value,[
		
	//], 'value——expect');

	requests(['page/demo/demo', 'css!lib/qunit/qunit-2.0.1.css', 'lib/qunit/qunit-2.0.1'], function ($$p) {
		$('body').before('<div id="qunit"></div><div id="qunit-fixture"></div>');

		var oP = $$p.call('test');
		
		QUnit.test( "test case name", function( assert ) {

			assert.deepEqual(value,[
				
			], 'value——expect');

		});

	});
});
/***/