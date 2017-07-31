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
    private currentDay: number;
    private x: string;
    displayDate: string;
    private y: string;

    postCreate() {
        // this.customize();
    }
    update(object: mendix.lib.MxObject, callback?: () => void) {
        this.contextObject = object;
        this.updateRendering();

        if (callback) {
            callback();
        }
    }
    private customize() {
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
        }, this.domNode).addEventListener("click", () => {
            this.createEvent();
            this.display();
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
            id: "dayswidget",
            // tslint:disable-next-line:max-line-length
        }, this.domNode);
    }
    display() {
        this.x = dom.byId("EventName").value;
        this.y = dom.byId("DateName").value;
        dom.byId("dayswidget").innerHTML = "<table><tr><td allign='center'>" + this.x +
            "</td></tr> <tr><td allign='center'>" + this.y + "</td></tr></table>";
    }
    updateRendering() {
        this.customize();
        if (this.contextObject) {
            // comment
        } else {
            // comment
        }
    }

    private calculateDaysLeft(first: string, second: string): number {
        dom.byId("DateName").value;
        const fir = this.parseDate(first);
        const sec = this.parseDate(second);
        alert(Math.round((sec - fir) / (1000 * 60 * 60 * 24)));
        return Math.round((sec - fir) / (1000 * 60 * 60 * 24));
    }
    private parseDate(str: string): any {
        let mdy: any;
        mdy = str.split("/");
        return new Date(mdy[2], mdy[0] - 1, mdy[1]);
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
                    guids: [guid]
                },
                error: (error) => {
                    // console.debug(error.description);
                }
            }, this);
        }
    }
}
dojoDeclare("DaysLeft.widget.DaysLeft", [WidgetBase], function (Source: any) {
    const result: any = {};
    for (const i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
}(DaysLeft));
