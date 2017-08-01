import * as dojoDeclare from "dojo/_base/declare";
import * as domConstruct from "dojo/dom-construct";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import * as dojoClass from "dojo/dom-class";
import * as dojoStyle from "dojo/dom-style";
import * as dojoHtml from "dojo/html";
import * as dom from "dojo/dom";
import "./ui/DaysLeft.css";

class DaysLeft extends WidgetBase {
    DateInserted: Date;

    Name: string;
    MicroflowToRun: string;
    public Deadline: any;
    private futureDate: Date;
    private contextObject: mendix.lib.MxObject;
    private input: string;
    private insertedEvent: string;
    private insertedDate: Date;

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
    resize(box: any) {
        logger.debug(this.id + ".resize");
    }
    private customize() {
        domConstruct.create("input", {
            class: "event-name",
            id: "EventName",
            placeholder: "Enter Your Event",
            textValue: "Insert any string",
            type: "text"
        }, this.domNode);
        domConstruct.create("div", {
            innerHTML: "<br/>"
        }, this.domNode);
        domConstruct.create("input", {
            class: "date-of-event",
            id: "DateName",
            placeholder: "Choose Your Date",
            textValue: "Input date",
            type: "date"
        }, this.domNode);
        domConstruct.create("div", {
            innerHTML: "<br/>"
        }, this.domNode);
        domConstruct.create("input", {
            class: "button-one",
            id: "showButton",
            type: "button",
            value: "Display"
        }, this.domNode).addEventListener("click", () => {
            this.display();
        }, false);
        domConstruct.create("input", {
            class: "button-two",
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
        // this.insertedEvent = dom.byId("EventName").value;
        dom.byId("dayswidget").innerHTML = "<table><tr><td allign='center'>" + this.insertedEvent +
            "</td></tr> <tr><td allign='center'>" + this.computeDays() + "</td></tr></table>";
    }
    public computeDays(): number {
        // this.insertedDate = this.DateInserted;
        // alert(typeof(this.insertedDate));
        this.futureDate = new Date(this.DateInserted);
        // alert(typeof(this.DateInserted));
        alert(typeof(this.futureDate));
        // tslint:disable-next-line:max-line-length
        const mendixDate = new Date(this.futureDate.getMonth(), this.futureDate.getDate(), this.futureDate.getFullYear());
        // alert(typeof(mendixDate));
        const TodayDate = new Date();
        return (this.DatedaysBetween(TodayDate, mendixDate));
    }
    private DatedaysBetween(date1: Date, date2: Date): number {
        const oneDay = 1000 * 60 * 60 * 24;
        const date1Microsec = date1.getTime();
        const date2Microsec = date2.getTime();
        const differenceInMicrosec = date2Microsec - date1Microsec;
        return Math.ceil(differenceInMicrosec / oneDay);
    }
    updateRendering() {
        //this.customize();
        if (this.contextObject) {
            this.insertedEvent = this.contextObject.get(this.Name).toString();
            dom.byId("dayswidget").innerHTML = "<table><tr><td allign='center'>" + this.insertedEvent +
            "</td></tr> <tr><td allign='center'>" + this.computeDays() + "</td></tr></table>";
        } else {
            // comment
        }
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
dojoDeclare("DaysLeft.widget.DaysLeft", [ WidgetBase ], function(Source: any) {
    const result: any = {};
    for (const i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
}(DaysLeft));
