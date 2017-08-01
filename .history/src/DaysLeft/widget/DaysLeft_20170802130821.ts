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
    Name: string;
    public Deadline: any;
    private futureDate: Date;
    private contextObject: mendix.lib.MxObject;
    private input: string;
    private insertedEvent: string;
    private insertedDate: any;
    private nextDate: Date;
    private mendixDate: Date;
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
        // tslint:disable-next-line:max-line-length
        this.mendixDate = new Date(this.nextDate.getMonth(), this.nextDate.getDate(), this.nextDate.getFullYear());
        this.currentDate = new Date();
        return (this.DatedaysBetween(this.currentDate, this.mendixDate));
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
            this.insertedEvent = this.contextObject.get(this.Name).toString();
            this.insertedDate = this.contextObject.get(this.DateInserted);
            // alert(insertedDate);
            // alert(typeof(insertedDate));
            const parseDate = Number(this.insertedDate);
            this.nextDate = new Date(parseDate);
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
