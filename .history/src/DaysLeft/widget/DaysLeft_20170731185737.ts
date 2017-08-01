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
    private insertedEvent: string;
    private insertedDate: string;
    private inputDate: string;

    postCreate() {
        //this.customize();
    }
    update(object: mendix.lib.MxObject, callback?: () => void) {
        this.contextObject = object;
        this.updateRendering();

        if (callback) {
            callback();
        }
    }
    resize(box: any) {
        logger.debug(this.id + ".resize");
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
            "</td></tr> <tr><td allign='center'>" + this.computeDays() + "</td></tr></table>";
    }
    updateRendering() {
        this.customize();
        if (this.contextObject) {
            // comment
        } else {
            // comment
        }
    }

    public computeDays(): number {
        this.insertedDate = dom.byId("DateName").value;
        const futureDate = new Date(this.insertedDate);
        const mendixDate = new Date(futureDate.getFullYear(), futureDate.getMonth(), futureDate.getDate());
        const TodayDate = new Date();
        return (this.DatedaysBetween(TodayDate, futureDate));
    }

    DatedaysBetween(date1: Date, date2: Date): number {
        const oneDay = 1000 * 60 * 60 * 24;
        const date1Microsec = date1.getTime();
        const date2Microsec = date2.getTime();
        const differenceInMicrosec = date2Microsec - date1Microsec;
        return Math.ceil(differenceInMicrosec / oneDay);
    }
    private changeColors() {
        this.inputDate = dom.byId("DateName").value;
        if(this.computeDays === 0)
            return(set.DateName)
            
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
                error: (error) => {
                    // console.debug(error.description);
                },
                params: {
                    applyto: "selection",
                    guids: [ guid ]
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
