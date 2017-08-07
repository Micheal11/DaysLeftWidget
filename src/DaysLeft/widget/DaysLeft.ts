import * as dojoDeclare from "dojo/_base/declare";
import * as domConstruct from "dojo/dom-construct";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import * as dojoClass from "dojo/dom-class";
import * as dojoStyle from "dojo/dom-style";
import * as dojoHtml from "dojo/html";
import * as dom from "dojo/dom";
import "./ui/DaysLeft.css";

class DaysLeft extends WidgetBase {
    DateInserted: any;
    NameOfEvent: string;
    private contextObject: mendix.lib.MxObject;
    private insertedEvent: string;
    private insertedDate: any;
    private nextDate: Date;
    private mendixDateGot: Date;
    private currentDate: Date;
    private tableRow: any;

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
    htmlTable() {
        domConstruct.empty(this.domNode);
        const leftDays = domConstruct.create("div", {
            class: "days-left-widget"
        }, this.domNode);
        const raw1 = domConstruct.create("table", {
           id: "setColor",
            // tslint:disable-next-line:max-line-length
            innerHTML: `<tr>${this.computeDays() }</tr><span><br><tr>${this.insertedEvent}</span></tr>`
        }, leftDays);
        if (this.computeDays() < 0) {
            // tslint:disable-next-line:max-line-length
            dom.byId("setColor").innerHTML = `<tr><td class = "set-to-cyan">${this.computeDays() * -1 + " " + "Days Since"}</td></tr><br><tr><td>${this.insertedEvent}<td></tr>`;
        } else if (this.computeDays() <= 50) {
            // tslint:disable-next-line:max-line-length
            dom.byId("setColor").innerHTML = `<tr><td class = "set-to-red">${this.computeDays() + " " + "Days to"}</td></tr><br><tr><td>${this.insertedEvent}<td></tr>`;
        } else if (this.computeDays() <= 100) {
            // tslint:disable-next-line:max-line-length
            dom.byId("setColor").innerHTML = `<tr><td class = "set-to-orange">${this.computeDays() + " " + "Days to"}</td></tr><br><tr><td>${this.insertedEvent}<td></tr>`;
        } else {
            // tslint:disable-next-line:max-line-length
            dom.byId("setColor").innerHTML = `<tr><td class = "set-to-crystalClear">${this.computeDays() + " " + "Days to"}</td></tr><br><br><tr><td>${this.insertedEvent}<td></tr>`;
        }
    }
    private customize() {
        domConstruct.create("div", {
            class: "days-left-widget",
            id: "dayswidget"
        }, this.domNode);
    }
    public computeDays(): number {
        this.mendixDateGot = this.nextDate;
        this.currentDate = new Date();
        return (this.DatedaysBetween(this.currentDate, this.mendixDateGot));
    }
    private DatedaysBetween(date1: Date, date2: Date): number {
        const oneDay = 1000 * 60 * 60 * 24;
        const date1Microsec = date1.getTime();
        const date2Microsec = date2.getTime();
        const differenceInMicrosec = date2Microsec - date1Microsec;
        return Math.ceil(differenceInMicrosec / oneDay);
    }
    updateRendering() {
        if (this.contextObject) {
            this.insertedEvent = this.contextObject.get(this.NameOfEvent).toString();
            this.insertedDate = this.contextObject.get(this.DateInserted);
            const parseDate = Number(this.insertedDate);
            this.nextDate = new Date(parseDate);
            this.htmlTable();
            dojoStyle.set(this.domNode, "display", "block");
        } else {
            dojoStyle.set(this.domNode, "display", "none");
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
