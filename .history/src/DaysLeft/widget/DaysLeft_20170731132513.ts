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
    private insertedEvent: string;
    private displayDate: string;
    private first: string;
    private second: string;

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
            id: "dayswidget"
        }, this.domNode);
    }
    display() {
        this.insertedEvent = dom.byId("EventName").value;
        dom.byId("dayswidget").innerHTML = "<table><tr><td allign='center'>" + this.insertedEvent +
            "</td></tr> <tr><td allign='center'>" + this.calculateDaysLeft() + "</td></tr></table>";
    }
    updateRendering() {
        this.customize();
        if (this.contextObject) {
            // comment
        } else {
            // comment
        }
    }

    private calculateDaysLeft(): number {
        this.first = dom.byId("DateName").value;
        alert(this.first);
        const myDate = new Date();
        const today = this.parseDate((myDate).toString());
        alert(today);
        // const myMonth = myDate.getMonth() + 1;
        const myDay = myDate.getUTCDay();
        alert(myDay);
        // const myYear = myDate.getFullYear();
        // const today = myMonth + "/" + myDay + "/" + myYear;

        const mendixDate = new Date(this.first);
        const mendixToday = this.parseDate((mendixDate).toString());
        // const mendixMonth = mendixDate.getMonth() + 1;
        // const mendixDay = mendixDate.getDay();
        // const mendixYear = mendixDate.getFullYear();
        // const mendixToday = mendixMonth + "/" + mendixDay + "/" + mendixYear;
        alert(mendixDate);

        alert(Math.round(((mendixToday) - (myDay)) / (1000 * 60 * 60 * 24)));
        // alert(typeof (mendixToday));
        return Math.round(((mendixToday) - (myDay)) / (1000 * 60 * 60 * 24));
    }
    private parseDate(theDate: string): any {
        let useDate: any;
        useDate = theDate.split("/");
        return new Date(useDate[2], useDate[0] - 1, useDate[1]);
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
dojoDeclare("DaysLeft.widget.DaysLeft", [ WidgetBase ], function(Source: any) {
    const result: any = {};
    for (const i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
}(DaysLeft));
