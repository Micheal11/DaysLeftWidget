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
    MicroflowToRun: string;
    public Deadline: any;
    private contextObject: mendix.lib.MxObject;
    private input: any;
    private dateInput: any;

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
              class: "Event-Name",
             id: "EventName",
            textValue: "Insert any string",
            type: "text"
        }, this.domNode);
        domConstruct.create("div", {
            innerHTML: "<br/>"
        }, this.domNode);
        domConstruct.create("input", {
            class: "Date-Of-Event",
            id: "DateName",
            textValue: "Insert any string",
            type: "date"
        }, this.domNode);
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
            if (this.MicroflowToRun !== "") {
                this.ExecuteMicroflow(this.MicroflowToRun, this.contextObject.getGuid());
            }
        });
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
                this.input = dom.byId("EventName");
                obj.set(this.Name, this.input.value);
                this.saveEvent(obj);
                this.dateInput = dom.byId("DateName");
                obj.set(this.Name, this.dateInput.value);
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
    private ExecuteMicroflow(mf: string, guid: string, cb?: (obj: mendix.lib.MxObject) => void) {
        if (mf && guid) {
            mx.ui.action(mf, {
                callback: (objs: mendix.lib.MxObject) => {
                    if (cb && typeof cb === "function") {
                        cb(objs);
                    }
                },
                params: {
                    applyto: "selection",
                    guids: [ guid ]
                },
                error: (error) => {
                    // console.debug(error.description);
                }
            }, this);
        }
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
