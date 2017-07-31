(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("dojo/_base/declare"), require("dojo/dom"), require("dojo/dom-construct"), require("mxui/widget/_WidgetBase"));
	else if(typeof define === 'function' && define.amd)
		define(["dojo/_base/declare", "dojo/dom", "dojo/dom-construct", "mxui/widget/_WidgetBase"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("dojo/_base/declare"), require("dojo/dom"), require("dojo/dom-construct"), require("mxui/widget/_WidgetBase")) : factory(root["dojo/_base/declare"], root["dojo/dom"], root["dojo/dom-construct"], root["mxui/widget/_WidgetBase"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(0), __webpack_require__(2), __webpack_require__(3), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, dojoDeclare, domConstruct, WidgetBase, dom) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DaysLeft = (function (_super) {
        __extends(DaysLeft, _super);
        function DaysLeft() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DaysLeft.prototype.postCreate = function () {
            this.customize();
        };
        DaysLeft.prototype.update = function (object, callback) {
            this.contextObject = object;
            this.updateRendering();
            if (callback) {
                callback();
            }
        };
        DaysLeft.prototype.customize = function () {
            var _this = this;
            domConstruct.create("div", {
                innerHTML: "<br/>"
            }, this.domNode);
            domConstruct.create("input", {
                id: "name",
                textValue: "Insert any string",
                type: "text"
            }, this.domNode);
            domConstruct.create("input", {
                class: "buttonOne",
                type: "button",
                value: "save"
            }, this.domNode).addEventListener("click", function () {
                _this.createTag();
            }, false);
            domConstruct.create("input", {
                class: "buttonTwo",
                type: "button",
                value: "cancel"
            }, this.domNode).addEventListener("click", function () {
                _this.uninitialize();
            }, false);
        };
        DaysLeft.prototype.updateRendering = function () {
            if (this.contextObject) {
                domConstruct.empty(this.domNode);
                this.customize();
            }
            else {
            }
        };
        DaysLeft.prototype.createTag = function () {
            var _this = this;
            mx.data.create({
                callback: function (obj) {
                    _this.input = dom.byId("name");
                    obj.set(_this.insertText, _this.input.value);
                    _this.saveDate(obj);
                },
                entity: this.reverseEntity,
                error: function (errors) {
                }
            });
        };
        DaysLeft.prototype.saveDate = function (contextObject, callback) {
            mx.data.commit({
                callback: function () {
                },
                mxobj: contextObject
            });
        };
        return DaysLeft;
    }(WidgetBase));
    dojoDeclare("widget.DaysLeft", [WidgetBase], function (Source) {
        var result = {};
        for (var i in Source.prototype) {
            if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
                result[i] = Source.prototype[i];
            }
        }
        return result;
    }(DaysLeft));
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })
/******/ ]);
});
//# sourceMappingURL=DaysLeft.js.map