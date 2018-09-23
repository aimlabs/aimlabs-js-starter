/**
 * @module utils
 */
import {clone as _clone, cloneDeep} from 'lodash';

/**
 * @function
 * @returns {boolean}
 */
export function isIFrame () {
    try {
        return window.self !== window.top;
    } catch (a) {
        return false;
    }
}

/**
 * @function
 * @returns {boolean}
 */
export function isTouch () {
    return 'ontouchstart' in window;
}

/**
 * @function
 * @param {object} source
 * @returns {object}
 */
export function clone (source) {
    return _clone(source);
}

/**
 * @function
 * @param {object} source
 * @returns {object}
 */
export function deepClone (source) {
    return cloneDeep(source);
}

/**
 * @function
 * @param {object} obj
 * @returns {string}
 */
export function getClassName (obj) {
    return 'undefined' == typeof obj || null == obj ? obj : obj.constructor.toString().split(' ')[1].split('(')[0]
}


