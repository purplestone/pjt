/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 @example
	$$cookie.cookie('O_N')
 */

define(function () {
		
		var $ = {};

		var pluses = /\+/g;

		function raw(s) {
			return s;
		}

		function unRfc2068(value) {
			if (value.indexOf('"') === 0) {
				// This is a quoted cookie as according to RFC2068, unescape
				value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
			}
			return value;
		}

		function decoded(s) {
			return unRfc2068(decodeURIComponent(s.replace(pluses, ' ')));
		}


		function fromJSON(value) {
			return config.json ? JSON.parse(value) : value;
		}

		var config = $.cookie = function (key, value, options) {
			options = options || {};
			// write
			if (value !== undefined) {
				//options = $.extend({}, config.defaults, options);

				if (value === null) {
					options.expires = -1;
				}

				if (options.expires !== undefined && typeof options.expires === 'number') {
					var days = options.expires, t = options.expires = new Date();
					t.setDate(t.getDate() + days);
				}

				value = config.json ? JSON.stringify(value) : String(value);

				return (document.cookie = [
					encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
					options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
					options.path    ? '; path=' + options.path : '',
					options.domain  ? '; domain=' + options.domain : '',
					options.secure  ? '; secure' : ''
				].join(''));
			}

			// read
			var decode = config.raw ? raw : decoded;
			var cookies = document.cookie.split('; ');
			var result = key ? null : {};
			var i,l;
			for (i = 0, l = cookies.length; i < l; i++) {
				var parts = cookies[i].split('=');
				var name = decode(parts.shift());
				var cookie = decode(parts.join('='));

				if (key && key === name) {
					result = fromJSON(cookie);
					break;
				}

				if (!key) {
					result[name] = fromJSON(cookie);
				}
			}

			return result;
		};

		config.defaults = {};

		$.removeCookie = function (key, options) {
			if ($.cookie(key) !== null) {
				$.cookie(key, null, options);
				return true;
			}
			return false;
		};

		return $;

});
