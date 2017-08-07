import * as dojoDeclare from "dojo/_base/declare";
import * as domConstruct from "dojo/dom-construct";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import * as dojoClass from "dojo/dom-class";
import * as dojoStyle from "dojo/dom-style";
import * as dojoHtml from "dojo/html";
import * as dom from "dojo/dom";
import "./ui/DaysLeft.css";

class DaysLeft extends WidgetBase {
    Date: string;
    Name: string;
    MicroflowToRun: string;
    public Deadline: any;
    private contextObject: mendix.lib.MxObject;
    private input: string;
    private dateInput: string;

    displayDate: string;

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
        }, this.domNode).addEventListener("click", () => {
            this.calculateDaysLeft();
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
        domConstruct.create("div", {
            class: "days-left-widget",
            id: "daysHtml",
            innerHTML: "<span> Event </span>"
        }, this.domNode);
    }
    updateRendering() {
        if (this.contextObject) {
            domConstruct.empty(this.domNode);
            this.customize();
        } else {
            // comment
        }
    }

    private calculateDaysLeft(): number {
        dom.byId("daysHtml").value;
        this.displayDate = new Date().toLocaleDateString();
        const currentDay = this.displayDate.split("/")[1];
        alert(currentDay);

        return 0;
    }

    private createEvent(): void {
        mx.data.create({
            callback: (obj: mendix.lib.MxObject) => {
                obj.set(this.Name, dom.byId("EventName").value);
                obj.set(this.Date, dom.byId("DateName").value);
                this.saveEvent(obj);
                console.log("Object created on server");
            },
            entity: this.Deadline,
            error: (errors) => {
                console.log("an error occured: " + errors);
            }
        });
    }
    private saveEvent(contextObject: any, callback?: () => void) {
        mx.data.commit({
            callback: () => {
                console.log("Object committed");
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
dojoDeclare("DaysLeft.widget.DaysLeft", [ WidgetBase ], function (Source: any) {
    const result: any = {};
    for (const i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
}(DaysLeft));
