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
            dom.byId("dayswidget").innerHTML = "<table><tr><td allign='center'>" + this.insertedEvent +
                "</td></tr> <tr><td allign='center'>" + this.computeDays() + "</td></tr></table>";

            const row = domConstruct.toDom("<tr><td>bar</td><td>Bar is also good</td></tr>");
            domConstruct.place(row, "example");

            dojoStyle.set(this.domNode, "display", "block");

        } else {
            dojoStyle.set(this.domNode, "display", "none");
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
                    guids: [guid]
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
