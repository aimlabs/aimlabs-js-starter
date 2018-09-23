/**
 * @classdesc BaseObject is the root object for all the classes and will have common re-usable methods
 */
class BaseObject extends Object {

    /**
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * To String method displays class name and timestamp
     * @function
     * @returns {string}
     */
    toString () {
        return "[" + this.constructor.name + ":" + Date.now() + "]";
    }
}

export default BaseObject;