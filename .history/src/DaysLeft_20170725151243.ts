import * as dojoDeclare from "dojo/_base/declare";
import * as domConstruct from "dojo/dom-construct";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import * as dojoClass from "dojo/dom-class";
import * as dojoStyle from "dojo/dom-style";
import * as dojoHtml from "dojo/html";
import * as dom from "dojo/dom";

class DaysLeft extends WidgetBase {
      dateInsertion: Date;
      mfToExecute: string;
  
    private contextObject: mendix.lib.MxObject;

    postCreate() {
        this.customize();
    }
    update(object: mendix.lib.MxObject, callback?: () => void) {
        this.contextObject = object;
        this.updateRendering();

        if (callback) {
            callback();
        }
    }
    private customize() {
        domConstruct.create("div", {
            innerHTML: "<br/>"
        }, this.domNode);
        domConstruct.create("input", {
             id: "name",
            textValue: "Insert a date",
            type: "date"
        }, this.domNode);
        domConstruct.create("input", {
            class: "buttonOne",
            type: "button",
            value: "save"
        }, this.domNode).addEventListener("click", () => {
            this.createDate();
        }, false);
        domConstruct.create("input", {
            class: "buttonTwo",
            type: "button",
            value: "cancel"
        }, this.domNode).addEventListener("click", () => {
            this.uninitialize();
        }, false);
        }
    updateRendering() {
        if (this.contextObject) {
            domConstruct.empty(this.domNode);
             this.customize();
        } else {
            }
    }
    private createDate(): void {
        mx.data.create({
            callback: (obj: mendix.lib.MxObject) => {
                this.input = dom.byId("name");
                obj.set(this.insertText, this.input.value);
                this.saveDate(obj);
                // console.log("Object created on server");
            },
            entity: this.reverseEntity,
            error: (errors) => {
                // console.log("an error occured: " + errors);
            }
        });
    }
    private saveDate(contextObject: any, callback?: () => void) {
        mx.data.commit({
            callback: () => {
                // console.log("Object committed");
            },
            mxobj: contextObject
        });
    }  
}
dojoDeclare("widget.DaysLeft", [ WidgetBase ], function(Source: any) {
    const result: any = {};
    for (const i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
}(DaysLeft));
