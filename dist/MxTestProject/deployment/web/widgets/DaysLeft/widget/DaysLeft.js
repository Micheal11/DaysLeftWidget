(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("dojo/_base/declare"), require("dojo/dom"), require("dojo/dom-construct"), require("mxui/widget/_WidgetBase"));
	else if(typeof define === 'function' && define.amd)
		define(["dojo/_base/declare", "dojo/dom", "dojo/dom-construct", "mxui/widget/_WidgetBase"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("dojo/_base/declare"), require("dojo/dom"), require("dojo/dom-construct"), require("mxui/widget/_WidgetBase")) : factory(root["dojo/_base/declare"], root["dojo/dom"], root["dojo/dom-construct"], root["mxui/widget/_WidgetBase"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
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
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(3), __webpack_require__(4), __webpack_require__(2), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, dojoDeclare, domConstruct, WidgetBase, dom) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DaysLeft = (function (_super) {
        __extends(DaysLeft, _super);
        function DaysLeft() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        DaysLeft.prototype.postCreate = function () {
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
            domConstruct.create("input", {
                class: "Event-Name",
                id: "EventName",
                placeholder: "Enter Your Event",
                textValue: "Insert any string",
                type: "text"
            }, this.domNode);
            domConstruct.create("div", {
                innerHTML: "<br/>"
            }, this.domNode);
            domConstruct.create("input", {
                class: "Date-Of-Event",
                id: "DateName",
                placeholder: "Choose Your Date",
                textValue: "Input date",
                type: "date"
            }, this.domNode);
            domConstruct.create("div", {
                innerHTML: "<br/>"
            }, this.domNode);
            domConstruct.create("input", {
                class: "buttonOne",
                id: "Namek",
                type: "button",
                value: "save"
            }, this.domNode).addEventListener("click", function () {
                _this.calculateDaysLeft();
                _this.createEvent();
                _this.display();
            }, false);
            domConstruct.create("input", {
                class: "buttonTwo",
                type: "button",
                value: "Cancel"
            }, this.domNode).addEventListener("click", function () {
                if (_this.MicroflowToRun !== "") {
                    _this.ExecuteMicroflow(_this.MicroflowToRun, _this.contextObject.getGuid());
                }
            });
<<<<<<< HEAD
            domConstruct.create("div", {
                class: "days-left-widget",
                id: "dayswidget",
            }, this.domNode);
=======
>>>>>>> 0bdbf882ed741fddb20cc4634400568d326e87b6
        };
        DaysLeft.prototype.display = function () {
            this.x = dom.byId("EventName").value;
            this.y = dom.byId("DateName").value;
            dom.byId("dayswidget").innerHTML = "<table><tr><td allign='center'>" + this.x +
                "</td></tr> <tr><td allign='center'>" + this.y + "</td></tr></table>";
        };
        DaysLeft.prototype.updateRendering = function () {
            this.customize();
            if (this.contextObject) {
            }
            else {
            }
        };
        DaysLeft.prototype.calculateDaysLeft = function () {
            dom.byId("DateName").value;
            this.displayDate = new Date().toLocaleDateString();
            this.currentDay = parseInt(this.displayDate.split("/")[1], 0);
            var x = parseInt(dom.byId("DateName").value.split("-")[1], 0) - parseInt(this.displayDate.split("/")[1], 0);
            return 0;
        };
        DaysLeft.prototype.createEvent = function () {
            var _this = this;
            mx.data.create({
                callback: function (obj) {
                    obj.set(_this.Name, dom.byId("EventName").value);
                    obj.set(_this.Date, dom.byId("DateName").value);
                    _this.saveEvent(obj);
                    console.log("Object created on server");
                },
                entity: this.Deadline,
                error: function (errors) {
                    console.log("an error occured: " + errors);
                }
            });
        };
        DaysLeft.prototype.saveEvent = function (contextObject, callback) {
            mx.data.commit({
                callback: function () {
                    console.log("Object committed");
                },
                mxobj: contextObject
            });
        };
        DaysLeft.prototype.ExecuteMicroflow = function (mf, guid, cb) {
            if (mf && guid) {
                mx.ui.action(mf, {
                    callback: function (objs) {
                        if (cb && typeof cb === "function") {
                            cb(objs);
                        }
                    },
                    params: {
                        applyto: "selection",
                        guids: [guid]
                    },
                    error: function (error) {
                    }
                }, this);
            }
        };
        return DaysLeft;
    }(WidgetBase));
    dojoDeclare("DaysLeft.widget.DaysLeft", [WidgetBase], function (Source) {
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