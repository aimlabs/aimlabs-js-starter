import {clone, cloneDeep} from 'lodash';
/**
 * @memberOf moduel:common
 */
class Utils {

    static isIFrame = () => {
        try {
            return window.self !== window.top;
        } catch (a) {
            return false;
        }
    }

    static isTouch = () => {
        return 'ontouchstart' in window;
    }

    static clone = (source) => {
        return clone(source);
    }

    static deepClone = (source) => {
        return cloneDeep(source);
    }

    static getClassName = (obj) => {
        return 'undefined' == typeof obj || null == obj ? obj : obj.constructor.toString().split(' ')[1].split('(')[0]
    }
}

export default Utils;