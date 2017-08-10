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
    widthInPixels: number;
    heightInPixels: number;
    widthInPercentage: number;
    heightInPercentage: number;
    private contextObject: mendix.lib.MxObject;
    private insertedEvent: string;
    private nextDate: Date;
    private dateFromMendix: Date;
    private currentDate: Date;

    postCreate() {
        this.createDaysLeft();
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
            this.createTable();
            dojoStyle.set(this.domNode, "display", "block");
        } else {
            dojoStyle.set(this.domNode, "display", "none");
        }
        dom.byId("mainContainer").setAttribute("style",
            "width:" + this.widthInPixels + "px;" + "height:" + this.heightInPixels + "px;");
        dom.byId("mainContainer").setAttribute("style",
            "width:" + this.widthInPercentage + "%;" + "height:" + this.heightInPercentage + "%;");
    }

    computeDays(): number {
        this.dateFromMendix = this.nextDate;
        this.currentDate = new Date();
        return (this.calculateDaysBetweendates(this.currentDate, this.dateFromMendix));
    }

    createTable() {
        domConstruct.empty(this.domNode);
        const leftDays = domConstruct.create("div", {
            class: "widgetDaysLeft",
            id: "mainContainer"
        }, this.domNode);

        domConstruct.create("table", {
            id: "setColor",
            innerHTML: `<span>
                          <tr>${this.computeDays()}</tr>
                        </span><br/>
                        <span>
                        <tr></tr>
                        </span><br/>
                        <span>
                           <tr>${this.insertedEvent}
                        </span>
                           </tr>`
        }, leftDays);

        if (this.computeDays() < 0) {
            this.setColour("setColor", "widgetDaysLeftSetToCyan");
            dom.byId("setColor").innerHTML =
             `<tr><td class = "widgetDaysLeftSetToCyan">${this.computeDays() * -1}</td></tr><br><br>
            <tr><td >Days Since</td></tr><br><br>
            <tr><td>${this.insertedEvent}<td></tr>`;
        } else if (this.computeDays() < 15) {
            this.setColour("setColor", "widgetDaysLeftSetToRed");
            dom.byId("setColor").innerHTML =
            `<tr><td class = "widgetDaysLeftSetToRed">${this.computeDays()}</td></tr><br><br>
            <tr><td>Days To</td></tr><br><br>
            <tr><td>${this.insertedEvent}<td></tr>`;
        } else if (this.computeDays() === 15) {
            this.setColour("setColor", "widgetDaysLeftSetToOrange");
            dom.byId("setColor").innerHTML =
            `<tr><td class = "widgetDaysLeftSetToOrange">${this.computeDays()}</td></tr><br><br>
            <tr><td>Days To</td></tr><br><br>
            <tr><td>${this.insertedEvent}<td></tr>`;
        } else {
            this.setColour("setColor", "widgetDaysLeftSetToGreen ");
            dom.byId("setColor").innerHTML =
             `<tr><td class = "widgetDaysLeftSetToGreen">${this.computeDays()}</td></tr><br><br>
            <tr><td>Days To</td></tr><br><br>
            <tr><td>${this.insertedEvent}<td></tr>`;
        }
    }
    private setColour(id: string, className: string) {
        dom.byId(id).innerHTML = `<tr><td class = "${className}">${this.computeDays()}</td></tr><br><br>
        <tr><td></td></tr><br><br>
        <tr><td>${this.insertedEvent}<td></tr>`;
    }

    private createDaysLeft() {
        domConstruct.create("div", {
            class: "widgetDaysLeft"
        }, this.domNode);
    }

    private calculateDaysBetweendates(date1: Date, date2: Date): number {
        const oneDay = 1000 * 60 * 60 * 24;
        const date1Microsec = date1.getTime();
        const date2Microsec = date2.getTime();
        const differenceInMicrosec = date2Microsec - date1Microsec;
        return Math.ceil(differenceInMicrosec / oneDay);
    }
}

// tslint:disable-next-line:only-arrow-functions
dojoDeclare("DaysLeft.widget.DaysLeft", [ WidgetBase ], function(Source: any) {
    const result: any = {};
    for (const i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
}(DaysLeft));
