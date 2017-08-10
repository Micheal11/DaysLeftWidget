import * as dojoDeclare from "dojo/_base/declare";
import * as domConstruct from "dojo/dom-construct";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import * as dojoClass from "dojo/dom-class";
import * as dojoStyle from "dojo/dom-style";
import * as dojoHtml from "dojo/html";
import * as dom from "dojo/dom";
import "./ui/DaysLeft.css";

class DaysLeft extends WidgetBase {
    dateInserted: string;
    eventName: string;
    width: number;
    height: number;
    private contextObject: mendix.lib.MxObject;
    private insertedEvent: string;
    private nextDate: Date;
    private dateFromMendix: Date;
    private currentDate: Date;

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
    updateRendering() {
        if (this.contextObject) {
            this.insertedEvent = this.contextObject.get(this.eventName).toString();
            const parseDate = Number(this.contextObject.get(this.dateInserted));
            this.nextDate = new Date(parseDate);
            this.createDisplay();
            dojoStyle.set(this.domNode, "display", "block");
        } else {
            dojoStyle.set(this.domNode, "display", "none");
        }
        dom.byId("mainContainer").setAttribute("style",
            "width:" + this.width + "px;" + "height:" + this.height + "px;");
    }

    computeDays(): number {
        this.dateFromMendix = this.nextDate;
        this.currentDate = new Date();
        return (this.dateDaysBetween(this.currentDate, this.dateFromMendix));
    }

    createDisplay() {
        domConstruct.empty(this.domNode);
        const leftDays = domConstruct.create("div", { 
            id: "mainContainer",
            innerHtml: `<span>
                            ${this.computeDays()}
                        </span><br/>
                        <span>
                            'Days to'
                        </span><br/>
                        <span>
                            ${this.insertedEvent}
                        </span><br/>`
        }, this.domNode);

        domConstruct.create("div", {
            class: "widgetDaysLeft",
            id: "setColor"
        }, this.domNode);

        if (this.computeDays() < 0) {
            this.setColour("setColor", "Days Since", "widgetDaysLeftSetToCyan");
        } else if (this.computeDays() < 15) {
            this.setColour("setColor", "Days To", "widgetDaysLeftSetToRed");
        } else if (this.computeDays() === 15) {
            this.setColour("setColor", "Days To", "widgetDaysLeftSetToOrange");
        } else {
            this.setColour("setColor", "Days To", "widgetDaysLeftSetToGreen ");
        }
    }
    private setColour(id: string, condition: string, className: string) {
        dom.byId(id).innerHTML = `<div class = "${className}">
                                    ${this.computeDays()}
                                  </div><br/>
                                  <div>
                                    ${condition}
                                  </div><br/>
                                  <div>
                                    ${this.insertedEvent}
                                  <div>`;
    }

    private customize() {
        domConstruct.create("div", {
            class: "widgetDaysLeft",
            id: "dayswidget"
        }, this.domNode);
    }

    private dateDaysBetween(date1: Date, date2: Date): number {
        const oneDay = 1000 * 60 * 60 * 24;
        const date1Microsec = date1.getTime();
        const date2Microsec = date2.getTime();
        const differenceInMicrosec = date2Microsec - date1Microsec;
        return Math.ceil(differenceInMicrosec / oneDay);
    }

}

// tslint:disable-next-line:only-arrow-functions
dojoDeclare("DaysLeft.widget.DaysLeft", [WidgetBase], function (Source: any) {
    const result: any = {};
    for (const i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
}(DaysLeft));
