import {BaseObject} from '../common';
/**
 * @classdesc Model representing Event
 * @memberOf module:events
 */
class Event extends BaseObject {

    /**
     * @constructor
     * @param {string} eventType - Event type takes string and is required
     * @param {object} eventData - Event data is optional
     */
    constructor (eventType, eventData) {
        super();
        if ( 'undefined' == typeof eventType ) throw new Error('Please provide an event type');
        this.type = eventType;
        this.data = eventData ? eventData : null;
    }

    /**
     * Event type
     * @type {string}
     */
    type;

    /**
     * Event data
     * @type {object}
     */
    data;

    /**
     * Indicator whether an event is removed defaults to false
     * @type {boolean}
     */
    removed = false;

    /**
     * Marks event for removal
     * @function
     */
    remove () {
        this.removed = true;
    }

}

export default Event;