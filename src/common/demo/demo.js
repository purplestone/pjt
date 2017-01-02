;define(function(require,exports){
	require('jquery');
	require('lodash');


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
 
