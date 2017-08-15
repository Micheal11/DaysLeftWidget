import * as dojoDeclare from "dojo/_base/declare";
import * as domConstruct from "dojo/dom-construct";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import * as dojoStyle from "dojo/dom-style";
import * as dom from "dojo/dom";
import "./ui/DaysLeft.css";

class DaysLeft extends WidgetBase {
    dateInserted: string;
    eventName: string;
    width: number;
    height: number;
    backgroundColor: string;
    differentColor: string;
    otherColor: string;
    microflowToRun: string;
    private contextObject: mendix.lib.MxObject;
    private insertedEvent: string;
    private nextDate: Date;
    private dateFromMendix: Date;
    private currentDate: Date;

    // tslint:disable-next-line:no-empty
    postCreate() {
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
        let chosenColor = "";
        if (this.backgroundColor === "otherColor") {
            chosenColor = this.useDifferentColor();
        } else {
            chosenColor = "#" + this.backgroundColor.split("").splice(1, 6).join("");
        }
        dom.byId("setColor").setAttribute("style", "width:" + this.width + "px;" + "height:" + this.height + "px;" +
            "background-color: " + chosenColor );
    }

    useDifferentColor() {
        return this.differentColor;
    }

    computeDays(): number {
        this.dateFromMendix = this.nextDate;
        this.currentDate = new Date();
        return (this.dateDaysBetween(this.currentDate, this.dateFromMendix));
    }

    createDisplay() {
        domConstruct.empty(this.domNode);
        domConstruct.create("div", {
            class: "widgetDaysLeft",
            id: "setColor"
        }, this.domNode).addEventListener("onclick", () => {
            if (this.microflowToRun !== "") {
                this.ExecuteMicroflow(this.microflowToRun, this.contextObject.getGuid());
            }
        });
        if (this.computeDays() < 0) {
            this.setTheColour("setColor", "Days Since", "widgetDaysLeftSetToCyan");
        } else if (this.computeDays() < 15) {
            this.setTheColour("setColor", "Days To", "widgetDaysLeftSetToDarkRed");
        } else if (this.computeDays() === 15) {
            this.setTheColour("setColor", "Days To", "widgetDaysLeftSetToOrange");
        } else {
            this.setTheColour("setColor", "Days To", "widgetDaysLeftSetToGreen ");
        }
    }
    private setTheColour(id: string, condition: string, className: string) {
        dom.byId(id).innerHTML = `<div class = "${className}">
                                    ${this.computeDays()}
                                  </div><br/>
                                  <div class="widgetCondition">
                                    ${condition}
                                  </div><br/>
                                  <div class="widgetEvent">
                                    ${this.insertedEvent}
                                  </div>`;
    }
    private dateDaysBetween(date1: Date, date2: Date): number {
        const oneDay = 1000 * 60 * 60 * 24;
        const date1Microsec = date1.getTime();
        const date2Microsec = date2.getTime();
        const differenceInMicrosec = date2Microsec - date1Microsec;
        return Math.ceil(differenceInMicrosec / oneDay);
    }

    private ExecuteMicroflow(mf: string, guid: string, cb?: (obj: mendix.lib.MxObject) => void) {
        if (mf && guid) {
            mx.ui.action(mf, {
                callback: (objs: mendix.lib.MxObject) => {
                    if (cb && typeof cb === "function") {
                        cb(objs);
                    }
                },
                error: () => {
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
