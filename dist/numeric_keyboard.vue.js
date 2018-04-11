(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["NumericKeyboard"] = factory(require("vue"));
	else
		root["NumericKeyboard"] = factory(root["Vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_145__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 129);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(23)('wks');
var uid = __webpack_require__(20);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(13)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var createDesc = __webpack_require__(15);
module.exports = __webpack_require__(3) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);
var IE8_DOM_DEFINE = __webpack_require__(41);
var toPrimitive = __webpack_require__(34);
var dP = Object.defineProperty;

exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ZERO = exports.ZERO = 0;
var ONE = exports.ONE = 1;
var TWO = exports.TWO = 2;
var THREE = exports.THREE = 3;
var FOUR = exports.FOUR = 4;
var FIVE = exports.FIVE = 5;
var SIX = exports.SIX = 6;
var SEVEN = exports.SEVEN = 7;
var EIGHT = exports.EIGHT = 8;
var NINE = exports.NINE = 9;
var DOT = exports.DOT = '.';
var DEL = exports.DEL = 'del';
var ENTER = exports.ENTER = 'enter';
var ESC = exports.ESC = 'esc';

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(0);
var ctx = __webpack_require__(33);
var hide = __webpack_require__(4);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(27);
var defined = __webpack_require__(16);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(49), __esModule: true };

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(23)('keys');
var uid = __webpack_require__(20);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(42);
var enumBugKeys = __webpack_require__(24);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(16);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(5).f;
var has = __webpack_require__(7);
var TAG = __webpack_require__(1)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(14);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(22);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(36);
var $export = __webpack_require__(9);
var redefine = __webpack_require__(45);
var hide = __webpack_require__(4);
var has = __webpack_require__(7);
var Iterators = __webpack_require__(11);
var $iterCreate = __webpack_require__(61);
var setToStringTag = __webpack_require__(25);
var getPrototypeOf = __webpack_require__(46);
var ITERATOR = __webpack_require__(1)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ }),
/* 31 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(75);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(51);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(14);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 35 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(6);
var dPs = __webpack_require__(62);
var enumBugKeys = __webpack_require__(24);
var IE_PROTO = __webpack_require__(18)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(26)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(63).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(64)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(29)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(30);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(3) && !__webpack_require__(13)(function () {
  return Object.defineProperty(__webpack_require__(26)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(7);
var toIObject = __webpack_require__(10);
var arrayIndexOf = __webpack_require__(53)(false);
var IE_PROTO = __webpack_require__(18)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(17);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(58);
var global = __webpack_require__(2);
var hide = __webpack_require__(4);
var Iterators = __webpack_require__(11);
var TO_STRING_TAG = __webpack_require__(1)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(7);
var toObject = __webpack_require__(21);
var IE_PROTO = __webpack_require__(18)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(66);
var ITERATOR = __webpack_require__(1)('iterator');
var Iterators = __webpack_require__(11);
module.exports = __webpack_require__(0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(30);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(50);
module.exports = __webpack_require__(0).Object.assign;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(9);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(52) });


/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(19);
var gOPS = __webpack_require__(35);
var pIE = __webpack_require__(28);
var toObject = __webpack_require__(21);
var IObject = __webpack_require__(27);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(13)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(10);
var toLength = __webpack_require__(43);
var toAbsoluteIndex = __webpack_require__(54);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(17);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mixins = exports.Options = exports.Key = undefined;

var _getIterator2 = __webpack_require__(56);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = __webpack_require__(12);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(39);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(40);

var _createClass3 = _interopRequireDefault(_createClass2);

var _theme = __webpack_require__(69);

var _theme2 = _interopRequireDefault(_theme);

var _layouts = __webpack_require__(71);

var _layouts2 = _interopRequireDefault(_layouts);

var _keys = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Key = exports.Key = function () {
  function Key(code) {
    (0, _classCallCheck3.default)(this, Key);

    this._code = code;
    this._label = null;
    this._style = null;
    this._activeStyle = null;
  }

  (0, _createClass3.default)(Key, [{
    key: 'addLabel',
    value: function addLabel(label) {
      this._label = label;
    }
  }, {
    key: 'addStyle',
    value: function addStyle(style) {
      var active = {};
      for (var name in style) {
        var s = style[name];
        if (Array.isArray(s) && s.length === 2) {
          style[name] = s[0];
          active[name] = s;
        }
      }
      this._style = style;
      this._activeStyle = active;
    }
  }, {
    key: 'active',
    value: function active(target) {
      if (this._activeStyle) {
        for (var name in this._activeStyle) {
          target.style[name] = this._activeStyle[name][1];
        }
      }
    }
  }, {
    key: 'deactive',
    value: function deactive(target) {
      if (this._activeStyle) {
        for (var name in this._activeStyle) {
          target.style[name] = this._activeStyle[name][0];
        }
      }
    }
  }, {
    key: 'code',
    get: function get() {
      return this._code;
    }
  }, {
    key: 'icon',
    get: function get() {
      return this._label || this._code;
    }
  }, {
    key: 'style',
    get: function get() {
      return this._style;
    }
  }]);
  return Key;
}();

var Options = exports.Options = {
  layout: 'number',
  theme: 'default',
  entertext: 'enter'
};

var Mixins = exports.Mixins = {
  init: function init(options) {
    var layout = options.layout,
        theme = options.theme,
        entertext = options.entertext;

    var keys = {};
    if (typeof layout === 'string') {
      if (!_layouts2.default.hasOwnProperty(layout)) {
        throw new Error(layout + ' is not a build-in layout.');
      }
      layout = _layouts2.default[layout];
    } else {
      if (!Array.isArray(layout) || !layout.every(function (i) {
        return Array.isArray(i);
      })) {
        throw new Error('custom layout must be a two-dimensional array.');
      }
    }

    if (typeof theme === 'string') {
      if (!_theme2.default.hasOwnProperty(theme)) {
        throw new Error(theme + ' is not a build-in theme.');
      }
      theme = _theme2.default[theme];
    } else {
      theme = (0, _assign2.default)({}, _theme2.default.default, theme);
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = (0, _getIterator3.default)(layout), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var r = _step.value;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (0, _getIterator3.default)(r), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var c = _step2.value;

            keys[c.key] = new Key(c.key);
            keys[c.key].addStyle((0, _assign2.default)({}, theme.global, theme.key[c.key]));
            if (c.key === _keys.ENTER) {
              keys[c.key].addLabel(entertext);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this._layout = layout;
    this._theme = theme;
    this._keys = keys;
  },
  dispatch: function dispatch() /* event, ...args */{
    throw new Error('dispatch method must be overrided!');
  },
  ontouchstart: function ontouchstart(key, event) {
    key.active(event.target);
  },
  ontouchend: function ontouchend(key, event) {
    key.deactive(event.target);
    event.stopPropagation();
    this.dispatch('press', key.code);
  },
  onclick: function onclick() {
    // this.dispatch('press', key.code)
  }
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(57), __esModule: true };

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(44);
__webpack_require__(38);
module.exports = __webpack_require__(65);


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(59);
var step = __webpack_require__(60);
var Iterators = __webpack_require__(11);
var toIObject = __webpack_require__(10);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(29)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(37);
var descriptor = __webpack_require__(15);
var setToStringTag = __webpack_require__(25);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(4)(IteratorPrototype, __webpack_require__(1)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(5);
var anObject = __webpack_require__(6);
var getKeys = __webpack_require__(19);

module.exports = __webpack_require__(3) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(17);
var defined = __webpack_require__(16);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(6);
var get = __webpack_require__(47);
module.exports = __webpack_require__(0).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(22);
var TAG = __webpack_require__(1)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(68);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(9);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(3), 'Object', { defineProperty: __webpack_require__(5).f });


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _default = __webpack_require__(70);

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  default: _default2.default
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(48);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  global: {
    color: '#000000',
    backgroundColor: ['#ffffff', '#929ca8']
  },
  key: (0, _defineProperty3.default)({}, _keys.ENTER, {
    color: '#ffffff',
    backgroundColor: ['#007aff', '#0051a8']
  })
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _number = __webpack_require__(72);

var _number2 = _interopRequireDefault(_number);

var _tel = __webpack_require__(73);

var _tel2 = _interopRequireDefault(_tel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  number: _number2.default,
  tel: _tel2.default
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(8);

var keys = _interopRequireWildcard(_keys);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = [[{
  key: keys.ONE
}, {
  key: keys.TWO
}, {
  key: keys.THREE
}, {
  key: keys.DEL,
  rowspan: 2
}], [{
  key: keys.FOUR
}, {
  key: keys.FIVE
}, {
  key: keys.SIX
}], [{
  key: keys.SEVEN
}, {
  key: keys.EIGHT
}, {
  key: keys.NINE
}, {
  key: keys.ENTER,
  rowspan: 2
}], [{
  key: keys.DOT
}, {
  key: keys.ZERO
}, {
  key: keys.ESC
}]];

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(8);

var keys = _interopRequireWildcard(_keys);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = [[{
  key: keys.ONE
}, {
  key: keys.TWO
}, {
  key: keys.THREE
}], [{
  key: keys.FOUR
}, {
  key: keys.FIVE
}, {
  key: keys.SIX
}], [{
  key: keys.SEVEN
}, {
  key: keys.EIGHT
}, {
  key: keys.NINE
}], [{
  key: keys.DEL
}, {
  key: keys.ZERO
}, {
  key: keys.ENTER
}]];

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = "data:application/font-woff;base64,d09GRgABAAAAAAfsAAwAAAAAB5wAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABHAAAAHIAAABy2arcWE9TLzIAAAGQAAAAYAAAAGAPEgWBY21hcAAAAfAAAABsAAAAbOm3AapnYXNwAAACXAAAAAgAAAAIAAAAEGdseWYAAAJkAAACfAAAAnw0f1YEaGVhZAAABOAAAAA2AAAANg8HzfloaGVhAAAFGAAAACQAAAAkB8IDzWhtdHgAAAU8AAAAMAAAADAOAABgbG9jYQAABWwAAAAaAAAAGgKeAfxtYXhwAAAFiAAAACAAAAAgAB4ATm5hbWUAAAWoAAACIgAAAiI2PD88cG9zdAAAB8wAAAAgAAAAIAADAAAAAQAAAAoAHgAsAAFsYXRuAAgABAAAAAAAAAABAAAAAWxpZ2EACAAAAAEAAAABAAQABAAAAAEACgAAAAEADAADABYAIgAuAAEAAwAFAAYACwABAAQACQADAAYABwABAAQACgADAAgABAABAAQACgACAAsAAAADA1UBkAAFAAACmQLMAAAAjwKZAswAAAHrADMBCQAAAAAAAAAAAAAAAAAAAAEQAAAAAAAAAAAAAAAAAAAAAEAAAOkCA8D/wABAA8AAQAAAAAEAAAAAAAAAAAAAACAAAAAAAAMAAAADAAAAHAABAAMAAAAcAAMAAQAAABwABABQAAAAEAAQAAMAAAABACAAZQBsAHPpAv/9//8AAAAAACAAYwBsAHPpAP/9//8AAf/j/6H/m/+VFwkAAwABAAAAAAAAAAAAAAAAAAAAAAABAAH//wAPAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAADAGAAgAOgAwAAGwA8AEgAAAEhIgYHDgExDgEVFBYXMBYXHgEzITI2NRE0JiMTFAYHDgEjISImLwEuATU0Nj8BPgE3PgEzITIWFx4BFRElNycHJwcXBxc3FzcDFv62RlsrK2UICAgIVzk5T0QBSjpQUDpqEA8PJxX+tjE+KqsDBQUDphIkFBQpFwFKFScPDxD++X8df38df38df38dAwBUKytqCRUMDBYIXjk5SFQ6AWg6UP4OFigPEBEvLLIDCwcHCwOsEyINDg0PDxAmFv6Ysn8df34dfn4dfn8dAAAAABEAAABSBAADLgADAAgADAAQABQAGAAcACEAJgArADAANQA6AD8AQwBIAEsAACUhESEBIREhERMzFSM3MxUjNzMVIzczFSM3MxUjJTMVIzU7ARUjNTsBFSM1OwEVIzU7ARUjNTsBFSM1ATMVIzUhMxUjJSEVITUFBycEAPwABAD8LAOo/FiEV1eSWFiSWFiSWFiTV1f9bVhYk1dXklhYklhYk1dXklhY/TNYWAK+WFj91AHy/g4BbnV11gJY/dQCAP4AATNYWFhYWFhYWFjqV1dXV1dXV1dXV1dX/txYWFhYWFj5WFgAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAABAAAtcRXTXw889QALBAAAAAAA1fTE5wAAAADV9MTnAAAAAAQAAy4AAAAIAAIAAAAAAAAAAQAAA8D/wAAABAAAAAAABAAAAQAAAAAAAAAAAAAAAAAAAAwEAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAABgBAAAAAAAAAAAAAAAAAoAFAAeACgAMgA8AEYAUADAATQBPgAAAAEAAAAMAEwAEQAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAOAK4AAQAAAAAAAQAUAAAAAQAAAAAAAgAHANUAAQAAAAAAAwAUAF0AAQAAAAAABAAUAOoAAQAAAAAABQALADwAAQAAAAAABgAUAJkAAQAAAAAACgAaASYAAwABBAkAAQAoABQAAwABBAkAAgAOANwAAwABBAkAAwAoAHEAAwABBAkABAAoAP4AAwABBAkABQAWAEcAAwABBAkABgAoAK0AAwABBAkACgA0AUB2dWUtbnVtZXJpYy1rZXlib2FyZAB2AHUAZQAtAG4AdQBtAGUAcgBpAGMALQBrAGUAeQBiAG8AYQByAGRWZXJzaW9uIDEuMABWAGUAcgBzAGkAbwBuACAAMQAuADB2dWUtbnVtZXJpYy1rZXlib2FyZAB2AHUAZQAtAG4AdQBtAGUAcgBpAGMALQBrAGUAeQBiAG8AYQByAGR2dWUtbnVtZXJpYy1rZXlib2FyZAB2AHUAZQAtAG4AdQBtAGUAcgBpAGMALQBrAGUAeQBiAG8AYQByAGRSZWd1bGFyAFIAZQBnAHUAbABhAHJ2dWUtbnVtZXJpYy1rZXlib2FyZAB2AHUAZQAtAG4AdQBtAGUAcgBpAGMALQBrAGUAeQBiAG8AYQByAGRGb250IGdlbmVyYXRlZCBieSBJY29Nb29uLgBGAG8AbgB0ACAAZwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABJAGMAbwBNAG8AbwBuAC4AAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

/***/ }),
/* 75 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mixins = exports.Options = undefined;

var _assign = __webpack_require__(12);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requestAnimationFrame = window.requestAnimationFrame || window.setTimeout;
var animation = function animation(iterable) {
  var done = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  var frames = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 60;

  var running = true;
  var frame = 0;
  function closure(timestamp) {
    if (!running) {
      return;
    }
    iterable(timestamp, ++frame, frames);
    if (frame < frames) {
      requestAnimationFrame(closure, 0);
    } else {
      done();
    }
  }
  requestAnimationFrame(closure, 0);
  return function () {
    running = false;
  };
};

var KeyboardCenter = function () {

  var activeInput = void 0;

  return {
    register: function register(input) {
      this.unregister();
      activeInput = input;
      document.addEventListener('touchend', this.unregister, false);
    },
    unregister: function unregister() {
      if (!activeInput) {
        return;
      }
      activeInput.closeKeyboard();
      activeInput = null;
      document.removeEventListener('touchend', this.unregister, false);
    }
  };
}();

var Options = exports.Options = {
  type: 'number',
  value: '',
  autofocus: false,
  disabled: false,
  readonly: false,
  maxlength: null,
  name: null,
  placeholder: null,
  format: '^',
  keyboard: null
};

var Mixins = exports.Mixins = {
  init: function init(props) {
    this.kp = (0, _assign2.default)({}, props);
    if (typeof props.format === 'string') {
      this.kp.format = function (val) {
        return new RegExp(props.format).test(val);
      };
    }
    this.ks = {
      inputElement: null,
      keyboardElement: null,
      keyboard: null,
      rawValue: [],
      cursorPos: 0,
      cursorColor: null,
      cursorTimer: null
    };
  },
  destroy: function destroy() {
    KeyboardCenter.unregister();
  },
  set: function set(key, value) {
    this.ks[key] = value;

    if (key === 'cursorPos' && this.ks.cursorTimer) {
      this.moveCursor();
    }
  },
  setValue: function setValue(val) {
    if (val != null) {
      this.set('rawValue', val.toString().split(''));
    } else {
      this.set('rawValue', []);
    }

    this.set('cursorPos', this.ks.rawValue.length);
  },
  moveCursor: function moveCursor() {
    var cursor = this.ks.inputElement.querySelector('i');
    if (this.ks.cursorPos) {
      var charactor = this.ks.inputElement.querySelector('span:nth-of-type(' + this.ks.cursorPos + ')');
      cursor.style.left = charactor.offsetLeft + charactor.offsetWidth + 'px';
    } else {
      cursor.style.left = 0;
    }
  },
  openKeyboard: function openKeyboard() {
    var _this = this;

    if (this.ks.keyboard) {
      return;
    }

    var container = document.createElement('div');
    var shadow = document.createElement('div');
    var keyboard = document.createElement('div');
    container.style.cssText = 'position:fixed; bottom:0; left:0; width:100%; height:36%;';
    shadow.style.cssText = 'height:100%;';
    keyboard.style.cssText = 'position:absolute; top:0; right: 0; bottom: 0; left:0; transform: translateY(100%); box-shadow: 0 -2px 4px 0 #cfd4da';
    container.appendChild(shadow);
    container.appendChild(keyboard);
    document.body.appendChild(container);

    this.set('keyboardElement', keyboard);
    this.set('keyboard', this.createKeyboard(keyboard, (0, _assign2.default)({ layout: this.kp.type }, this.kp.keyboard), function (key) {
      _this.input(key);
    }));
    animation(function (timestamp, frame, frames) {
      keyboard.style.transform = 'translateY(' + (frames - frame) / frames * 100 + '%)';
    }, function () {}, 10);

    this.set('cursorTimer', 1);
    this.set('cursorPos', this.ks.rawValue.length);

    KeyboardCenter.register(this);
    this.dispatch('focus');
  },
  closeKeyboard: function closeKeyboard() {
    var _this2 = this;

    if (!this.ks.keyboard) {
      return;
    }

    var keyboard = this.ks.keyboard;
    var keyboardElement = this.ks.keyboardElement;
    animation(function (timestamp, frame, frames) {
      keyboardElement.style.transform = 'translateY(' + frame / frames * 100 + '%)';
    }, function () {
      setTimeout(function () {
        _this2.destroyKeyboard(keyboard, keyboardElement);
        document.body.removeChild(keyboardElement.parentNode);
      }, 300);
    }, 10);

    this.set('keyboard', null);
    this.set('keyboardElement', null);

    this.set('cursorTimer', null);
    this.set('cursorPos', 0);

    KeyboardCenter.unregister();
    this.dispatch('blur');
  },
  input: function input(key) {
    var _this3 = this;

    var p = this.kp;
    var s = this.ks;
    var input = function input(key) {
      var isAdd = typeof key !== 'undefined';
      var cursorPos = s.cursorPos;
      var args = isAdd ? [cursorPos, 0, key] : [cursorPos - 1, 1];
      var rawValue = s.rawValue.slice();
      rawValue.splice.apply(rawValue, args);
      if (p.format(rawValue.join(''))) {
        _this3.set('rawValue', rawValue);
        _this3.set('cursorPos', isAdd ? cursorPos + 1 : cursorPos - 1);
        var val = rawValue.join('');
        if (val && p.type === 'number') {
          val = parseFloat(val, 10);
        }
        _this3.dispatch('input', val);
      }
    };
    switch (key) {
      case 'esc':
      case 'enter':
        this.closeKeyboard();
        break;
      case 'del':
        if (s.cursorPos > 0) {
          input();
        }
        break;
      case '.':
        if (s.rawValue.indexOf(key) === -1) {
          if (p.type === 'number' && s.rawValue.length === 0) {
            input(0);
            input(key);
          } else {
            input(key);
          }
        }
        break;
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        if (p.type === 'number' || p.maxlength == null || s.rawValue.length < p.maxlength) {
          input(key);
        }
        break;
    }
  },
  onMounted: function onMounted(el) {
    if (this.kp.autofocus && !this.kp.readonly && !this.kp.disabled) {
      this.openKeyboard();
    }
    this.set('cursorColor', window.getComputedStyle(el).getPropertyValue('color'));
    this.set('inputElement', el);
    this.setValue(this.kp.value);
  },
  onFocus: function onFocus(e) {
    e.stopPropagation();
    this.openKeyboard();
    this.set('cursorPos', +e.target.dataset.index || this.ks.rawValue.length);
  },
  createKeyboard: function createKeyboard() /* el, options, callback */{
    throw new Error('createKeyboard method must be overrided!');
  },
  destroyKeyboard: function destroyKeyboard() /* keyboardClass */{
    throw new Error('destroyKeyboard method must be overrided!');
  },
  dispatch: function dispatch() /* event, ...args */{
    throw new Error('dispatch method must be overrided!');
  }
};

/***/ }),
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_keyboard_vue__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_keyboard_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_keyboard_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6b03be9a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_keyboard_vue__ = __webpack_require__(140);
function injectStyle (ssrContext) {
  __webpack_require__(130)
}
var normalizeComponent = __webpack_require__(96)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_keyboard_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6b03be9a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_keyboard_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 96 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(133);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keys = exports.NumericInput = exports.NumericKeyboard = undefined;

var _keyboard = __webpack_require__(95);

var _keyboard2 = _interopRequireDefault(_keyboard);

var _input = __webpack_require__(141);

var _input2 = _interopRequireDefault(_input);

var _keys = __webpack_require__(8);

var keys = _interopRequireWildcard(_keys);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.NumericKeyboard = _keyboard2.default;
exports.NumericInput = _input2.default;
exports.keys = keys;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(131);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(32)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6b03be9a\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/stylus-loader/index.js!./keyboard.styl", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6b03be9a\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/stylus-loader/index.js!./keyboard.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(31)(undefined);
// imports


// module
exports.push([module.i, "\n@font-face {\n  font-family: numeric-keyboard;\n  src: url(" + __webpack_require__(74) + ") format('woff');\n  font-weight: normal;\n  font-style: normal;\n}\n.numeric-keyboard {\n  width: 100%;\n  height: 100%;\n}\n.numeric-keyboard table {\n  width: 100%;\n  height: 100%;\n  background: #cfd4da;\n  table-layout: fixed;\n  border-collapse: separate;\n  border-spacing: 1px;\n  font-size: 2em;\n  text-align: center;\n}\n.numeric-keyboard td {\n  touch-action: manipulation;\n  transition: background-color 0.5s;\n}\n.numeric-keyboard td[data-icon]::before {\n  content: attr(data-icon);\n  font-family: inherit !important;\n}\n.numeric-keyboard td[data-icon=del]::before,\n.numeric-keyboard td[data-icon=esc]::before {\n  content: attr(data-icon);\n  font-family: numeric-keyboard !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  letter-spacing: 0;\n  -webkit-font-feature-settings: \"liga\";\n  font-feature-settings: \"liga\";\n  -webkit-font-variant-ligatures: discretionary-ligatures;\n  font-variant-ligatures: discretionary-ligatures;\n  -webkit-font-smoothing: antialiased;\n}\n", ""]);

// exports


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(97);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keyboard = __webpack_require__(55);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [{
    methods: _keyboard.Mixins
  }],
  props: function () {
    var props = {};
    for (var name in _keyboard.Options) {
      props[name] = {
        default: _keyboard.Options[name]
      };
    }
    return props;
  }(),
  data: function data() {
    return {
      _layout: null,
      _keys: null
    };
  },
  created: function created() {
    this.init(this._props);
  },

  methods: {
    dispatch: function dispatch(event) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.$emit.apply(this, [event].concat((0, _toConsumableArray3.default)(args)));
    }
  }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(134), __esModule: true };

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38);
__webpack_require__(135);
module.exports = __webpack_require__(0).Array.from;


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(33);
var $export = __webpack_require__(9);
var toObject = __webpack_require__(21);
var call = __webpack_require__(136);
var isArrayIter = __webpack_require__(137);
var toLength = __webpack_require__(43);
var createProperty = __webpack_require__(138);
var getIterFn = __webpack_require__(47);

$export($export.S + $export.F * !__webpack_require__(139)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(6);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(11);
var ITERATOR = __webpack_require__(1)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(5);
var createDesc = __webpack_require__(15);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(1)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"numeric-keyboard"},[_c('table',_vm._l((_vm._layout),function(r,i){return _c('tr',{key:i},_vm._l((r),function(c){return _c('td',{key:c.key,style:(_vm._keys[c.key].style),attrs:{"rowspan":c.rowspan,"colspan":c.colspan,"data-icon":_vm._keys[c.key].icon},on:{"touchstart":function($event){_vm.ontouchstart(_vm._keys[c.key], $event)},"touchend":function($event){_vm.ontouchend(_vm._keys[c.key], $event)},"click":function($event){_vm.onclick(_vm._keys[c.key], $event)}}})}))}))])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_input_vue__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_input_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_input_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5a5b0b02_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_input_vue__ = __webpack_require__(146);
function injectStyle (ssrContext) {
  __webpack_require__(142)
}
var normalizeComponent = __webpack_require__(96)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_input_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5a5b0b02_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_input_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(143);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(32)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5a5b0b02\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/stylus-loader/index.js!./input.styl", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5a5b0b02\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/stylus-loader/index.js!./input.styl");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(31)(undefined);
// imports


// module
exports.push([module.i, "\n.numeric-input {\n  display: inline-block;\n  background: #fff;\n  width: 12em;\n  height: 1.2em;\n  padding: 2px;\n  text-align: left;\n}\n.numeric-input.readonly,\n.numeric-input.disabled {\n  opacity: 0.5;\n  pointer-events: none;\n}\n.numeric-input div {\n  position: relative;\n  height: 100%;\n}\n.numeric-input span {\n  float: left;\n  height: 100%;\n  display: table-cell;\n  vertical-align: middle;\n}\n.numeric-input i {\n  pointer-events: none;\n  position: absolute;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  width: 1px;\n  animation: numeric-input-cursor 1s infinite;\n}\n.numeric-input-placeholder {\n  color: #757575;\n}\n@-moz-keyframes numeric-input-cursor {\nfrom {\n    opacity: 1;\n}\nto {\n    opacity: 0;\n}\n}\n@-webkit-keyframes numeric-input-cursor {\nfrom {\n    opacity: 1;\n}\nto {\n    opacity: 0;\n}\n}\n@-o-keyframes numeric-input-cursor {\nfrom {\n    opacity: 1;\n}\nto {\n    opacity: 0;\n}\n}\n@keyframes numeric-input-cursor {\nfrom {\n    opacity: 1;\n}\nto {\n    opacity: 0;\n}\n}\n", ""]);

// exports


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(97);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _vue = __webpack_require__(145);

var _vue2 = _interopRequireDefault(_vue);

var _keyboard = __webpack_require__(95);

var _keyboard2 = _interopRequireDefault(_keyboard);

var _input = __webpack_require__(76);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [{
    methods: _input.Mixins
  }],
  props: function () {
    var props = {};
    for (var name in _input.Options) {
      props[name] = {
        default: _input.Options[name]
      };
    }
    return props;
  }(),
  data: function data() {
    return {
      ks: null
    };
  },
  created: function created() {
    this.init(this._props);
  },
  mounted: function mounted() {
    this.onMounted(this.$el);
  },
  beforeDestroy: function beforeDestroy() {
    this.destroy();
  },

  watch: {
    value: {
      handler: function handler(val) {
        var current = this.ks.rawValue.join('');
        if (this.kp.type === 'number') {
          current = parseFloat(current, 10);
          if (current === val || isNaN(current) && isNaN(val)) {
            return;
          }
        } else if (current === val) {
          return;
        }
        this.setValue(val);
      }
    }
  },
  methods: {
    moveCursor: function moveCursor() {
      var _this = this;

      this.$forceUpdate();
      this.$nextTick(function () {
        _input.Mixins.moveCursor.call(_this);
      });
    },
    createKeyboard: function createKeyboard(el, options, callback) {
      var keyboard = new _vue2.default({
        render: function render(h) {
          return h(_keyboard2.default, {
            props: options,
            on: {
              press: callback
            }
          });
        }
      });
      keyboard.$mount();
      el.appendChild(keyboard.$el);
      return keyboard;
    },
    destroyKeyboard: function destroyKeyboard(keyboard) {
      keyboard.$destroy();
    },
    dispatch: function dispatch(event) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      this.$emit.apply(this, [event].concat((0, _toConsumableArray3.default)(args)));
    }
  }
}; //
//
//
//
//
//
//
//
//

/***/ }),
/* 145 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_145__;

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"numeric-input",class:{ readonly: _vm.readonly, disabled: _vm.disabled },on:{"touchend":_vm.onFocus}},[_c('input',{attrs:{"type":"hidden","name":_vm.name},domProps:{"value":_vm.value}}),_vm._v(" "),(_vm.ks)?_c('div',[(_vm.ks.rawValue.length === 0)?_c('span',{staticClass:"numeric-input-placeholder"},[_vm._v(_vm._s(_vm.placeholder))]):_vm._e(),_vm._l((_vm.ks.rawValue),function(c,i){return _c('span',{key:i,attrs:{"data-index":i + 1}},[_vm._v(_vm._s(c))])}),(_vm.ks.cursorTimer)?_c('i',{style:({backgroundColor: _vm.ks.cursorColor})}):_vm._e()],2):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })
/******/ ]);
});