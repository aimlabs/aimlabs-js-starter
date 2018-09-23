import {BaseObject} from '../common';
import Event from './Event';
/**
 * @classdesc Event Dispatcher
 * @memberOf module:events
 */
class EventBus extends BaseObject {

    /**
     * @constructor
     */
    constructor () {
        super();
        this.subscribedEvents = {};
    };

    /**
     * Subscribed events
     * @type {object}
     */
    subscribedEvents;

    /**
     *
     * @function
     * @param {string} type - Event type
     * @param {function} handler - handler function that takes two arguments Event and Data
     * @param {object} scope - scope to be used for this operator
     * @param {boolean} onlyOnce - Indicator if subscription is only for once
     * @param {object} data - event contextual data
     * @param {number} priority - Priority of event. If nothing is specified priority will be set to length
     * @returns {function} - handler function
     */
    on (type, handler, scope, onlyOnce, data, priority) {
        if ('undefined' == typeof type) throw new Error('Event Type cannot be null');
        if ('undefined' == typeof handler) throw new Error('Event handler cannot be null');

        this.subscribedEvents.hasOwnProperty(type) || (this.subscribedEvents[type] = []);
        this.subscribedEvents[type].push({
            func : handler,
            scope : scope || this,
            once : onlyOnce || false,
            data : data || null,
            priority : priority || this.subscribedEvents[type].length
        });
        this.subscribedEvents[type].sort((e1, e2) => e1.priority - e2.priority );
        return handler;
    };

    /**
     * @function
     * @param {string} eventType
     * @param {function} handler
     * @returns {*}
     */
    off (eventType, handler) {
        if ('undefined' == typeof eventType) throw new Error('Event type cannot be null');
        if ( this.subscribedEvents.hasOwnProperty(eventType) ) {
            var index,
                noOfSubscriptions = this.subscribedEvents[eventType].length;
            if (noOfSubscriptions) {
                if (1 === noOfSubscriptions ) return void delete this.subscribedEvents[eventType];
                for (index = noOfSubscriptions - 1 ; index > -1;  index--) {
                    if (this.subscribedEvents[eventType][index].func === handler) {
                        this.subscribedEvents[eventType].splice(index, 1);
                        break;
                    }
                }
            } else {
                delete this.subscribedEvents[eventType];
            }
        }
    }

    /**
     * Fires an event
     * @function
     * @param {string|module:events.Event} event - An event object or event type
     * @param {object} eventData - data to be passed for the event significant only if first parameter is string
     */
    fireEvent (eventObj, eventData) {
        if ('undefined' == typeof eventObj) throw new Error('Event type cannot be null');
        var eventObj = 'string' == typeof eventObj ? new Event(eventObj, eventData) : eventObj;
        if (this.subscribedEvents.hasOwnProperty(eventObj.type)) {
            let noOfSubscriptions = this.subscribedEvents[eventObj.type].length;
            var index = null,
                subscription = null;
            if (noOfSubscriptions) {
                for (index = noOfSubscriptions - 1; index > -1; index--) {
                    subscription = this.subscribedEvents[eventObj.type][index];
                    eventObj.timestamp = +new Date;
                    eventObj.target = subscription.scope || this;
                    subscription.func.call(subscription.scope, eventObj, subscription.data);
                    if (subscription.once || eventObj.removed) {
                        1 === this.subscribedEvents[eventObj.type].length ? delete this.subscribedEvents[eventObj.type]
                            : this.subscribedEvents[eventObj.type].splice(index, 1);
                    }
                }
            }
            eventObj = null;
        }
    }

    /**
     * @function
     * @param {string} eventType
     * @returns {boolean}
     */
    hasEvent (eventType) {
        return !(!this.subscribedEvents.hasOwnProperty(eventType) || !this.subscribedEvents[eventType].length)
    }

}

export default EventBus;