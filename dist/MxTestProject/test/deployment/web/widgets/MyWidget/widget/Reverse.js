define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/text!Reverse/widget/template/Reverse.html"],
    function (declare, _WidgetBase, _TemplatedMixin,
        dom, lang, dojoText,
        dojoHtml, widgetTemplate) {
    "use strict" // this is using strict
        return declare("Reverse.widget.Reverse", [_WidgetBase, _TemplatedMixin], {
            templateString: widgetTemplate,
            reverseText: null,
            reversingFunction: function () {
                this.reverseText.innerHTML = ":" + reversedString(this.myPointedString.value);
            },
            reversedString: function () {
                this.reverseText.innerHTML = this.myPointedString.value.split("").reverse().join("");
            },            
        });
    });
require(["Reverse/widget/Reverse"]);
