import * as dojoDeclare from "dojo/_base/declare";
import * as domConstruct from "dojo/dom-construct";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import * as dojoClass from "dojo/dom-class";
import * as dojoStyle from "dojo/dom-style";
import * as dojoHtml from "dojo/html";
import * as dom from "dojo/dom";
import "./ui/DaysLeft.css";

class DaysLeft extends WidgetBase {
    Date: Date;
    Name: string;
    public Deadline: any;
    private contextObject: mendix.lib.MxObject;
    private input: any;

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
            class: "buttonOne",
            id: "Name",
            type: "button",
            value: "save"
        }, this.domNode).addEventListener("click", () => {
            this.createEvent();
        }, false);
        domConstruct.create("input", {
            class: "buttonTwo",
            type: "button",
            value: "Cancel"
        }, this.domNode).addEventListener("click", () => {
            this.uninitialize();
        }, false);
    }
    updateRendering() {
        if (this.contextObject) {
            domConstruct.empty(this.domNode);
            this.customize();
        } else {
            // comment
        }
    }
    private createEvent(): void {
        mx.data.create({
            callback: (obj: mendix.lib.MxObject) => {
                this.input = dom.byId("Name");
                obj.set(this.Name, this.input);
                this.saveEvent(obj);
                // console.log("Object created on server");
            },
            entity: this.Deadline,
            error: (errors) => {
                // console.log("an error occured: " + errors);
            }
        });
    }
    private saveEvent(contextObject: any, callback?: () => void) {
        mx.data.commit({
            callback: () => {
                // console.log("Object committed");
            },
            mxobj: contextObject
        });
    }
    computeDays(FirstDate: number, SecondDate: number): number {
        if (FirstDate < SecondDate)
            return (SecondDate - FirstDate);
        else if (FirstDate === SecondDate)
            return 0;
        else
            return (FirstDate - SecondDate);
    }
}
dojoDeclare("DaysLeft.widget.DaysLeft", [ WidgetBase ], function(Source: any) {
    const result: any = {};
    for (const i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
}(DaysLeft));
