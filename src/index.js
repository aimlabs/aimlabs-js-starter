import events from './events';
import {utils} from './common';
import {axios} from 'axios';

let eventDispatcher = new events.EventBus();
eventDispatcher.on("test", function (evt, evtData) {
 console.log("Inside Event Hanlder :" + this.subscribedEvents.toString());
}, eventDispatcher, true, {sample : 'test'});
var evt = new events.Event("test", {testData : "Test"});
evt.remove();
eventDispatcher.fireEvent(evt, {});
eventDispatcher.fireEvent(new events.Event("test", {testData : "Test"}), {});

var e1 = new events.Event("Test", {});
var e2 = utils.clone(e1);

console.log("Are they equal? " + (typeof e1 === typeof e2));
console.log(e2 instanceof events.Event);
console.log(e1 instanceof events.Event);
console.log(utils.getClassName(e1));
console.log(utils.getClassName(e2));
console.log(utils.getClassName(eventDispatcher));
console.log(utils.getViewportDimensions(true));
console.log(utils.getViewportDimensions(false));
console.log(utils.getOrientation());
//e2.remove();
//console.log (e1);
//console.log (e2);
