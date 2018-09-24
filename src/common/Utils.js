/**
 * @module utils
 * TODO: Documentation is pending
 */
import {clone as _clone, cloneDeep} from 'lodash/lang';

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
 * @param absolute
 * @returns {object}
 */
export function getViewportDimensions    (absolute) {
    // Detect screen size
    var screen_width = screen.width,
        screen_height = screen.height;
    if(getOrientation() == 'landscape' && screen_width < screen_height) {
        screen_width = screen.height;
        screen_height = screen.width;
    }
    // Absolute mode
    if(absolute) {
        return {
            width: screen_width,
            height: screen_height
        };
    }
    // Relative mode
    else {
        var w = window.innerWidth,
            h = window.innerHeight;
        if(!w || !h || w > screen_width || h > screen_height || w == 980) {
            w = window.outerWidth;
            h = window.outerHeight;
        }
        if(!w || !h || w > screen_width || h > screen_height) {
            w = screen.availWidth;
            h = screen.availHeight;
        }
        return {width: w, height: h};
    }
}

/**
 * @function
 * @returns {string} - returns if it is 'landscape' or 'portrait'
 */
export function getOrientation () {
    var landscape;
    if('orientation' in window) {
        // Mobiles
        var orientation = window.orientation;
        landscape = (orientation == 90 || orientation == -90);
    }
    else {
        // Desktop browsers
        landscape = window.innerWidth > window.innerHeight;
    }
    return landscape ? 'landscape' : 'portrait';
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


