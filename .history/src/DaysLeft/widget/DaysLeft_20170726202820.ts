import * as dojoDeclare from "dojo/_base/declare";
import * as domConstruct from "dojo/dom-construct";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import * as dojoClass from "dojo/dom-class";
import * as dojoStyle from "dojo/dom-style";
import * as dojoHtml from "dojo/html";
import * as dom from "dojo/dom";
import "./ui/DaysLeft.css";

class DaysLeft extends WidgetBase {
    Date: Date;
    Name: string;
    public Deadline: any;
    private contextObject: mendix.lib.MxObject;
    private input: any;

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
    private customize() {
        domConstruct.create("div", {
            id: "outer-div"
        }, this.domNode);

        domConstruct.create("div", {
            id: "top-div",
            innerHTML: "<span>top-div</span>",
            placeholder: "Your Event"
        }, dom.byId("outer-div"));

        domConstruct.create("div", {
            id: "bottom-div",
            innerHTML: "<span>bottom-div</span>",
            placeholder: "Days Left"
        }, dom.byId("outer-div"));


    }
    updateRendering() {
        if (this.contextObject) {
            domConstruct.empty(this.domNode);
            this.customize();
        } else {
            // comment
        }
    }
    private createEvent(): void {
        mx.data.create({
            callback: (obj: mendix.lib.MxObject) => {
                this.input = dom.byId("Name");
                obj.set(this.Name, this.input.value);
                this.saveEvent(obj);
                // console.log("Object created on server");
            },
            entity: this.Deadline,
            error: (errors) => {
                // console.log("an error occured: " + errors);
            }
        });
    }
    private saveEvent(contextObject: any, callback?: () => void) {
        mx.data.commit({
            callback: () => {
                // console.log("Object committed");
            },
            mxobj: contextObject
        });
    }
    computeDays(FirstDate: number, SecondDate: number): number {
        if (FirstDate < SecondDate)
            return (SecondDate - FirstDate);
        else if (FirstDate === SecondDate)
            return 0;
        else
            return (FirstDate - SecondDate);
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
