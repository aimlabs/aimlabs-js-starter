import * as events from './events';
import {Utils} from './common';

let eventDispatcher = new events.EventBus();
eventDispatcher.on("test", function (evt, evtData) {
 console.log("Inside Event Hanlder :" + this.subscribedEvents.toString());
}, eventDispatcher, true, {sample : 'test'});
var evt = new events.Event("test", {testData : "Test"});
evt.remove();
eventDispatcher.fireEvent(evt, {});
eventDispatcher.fireEvent(new events.Event("test", {testData : "Test"}), {});

var e1 = new events.Event("Test", {});
var e2 = Utils.clone(e1);

console.log("Are they equal? " + (typeof e1 === typeof e2));
console.log(e2 instanceof events.Event);
console.log(e1 instanceof events.Event);
console.log(Utils.getClassName(e1));
console.log(Utils.getClassName(e2));
console.log(Utils.getClassName(eventDispatcher));
//e2.remove();
//console.log (e1);
//console.log (e2);
