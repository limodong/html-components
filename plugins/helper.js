var plugin = {};
plugin.mixin = function () { }
/**
 * 
 * @param {Object} obj 一个引用类型对象，不包含Function类型
 * @param {*} deep 是否深克隆
 * @returns 
 */
plugin.clone = function (obj, deep) {
    var newObj;
    if (Array.isArray(obj)) {
        newObj = [];
        for (const e of obj) {
            if (deep) {
                newObj.push(plugin.clone(e, true));
            } else {
                newObj.push(e);
            }
        }
        return newObj;
    } else if (typeof obj === "object") {
        newObj = {};
        for (const prop in obj) {
            if (deep) {
                newObj[prop] = plugin.clone(obj[prop], true);
            } else {
                newObj[prop] = obj[prop];
            }
        }
        return newObj;
    } else {
        // obj是一个基本数据类型，直接返回
        return obj;
    }
}
/**
 * 防抖（在一定间隔时间里，每次调用函数都会计算间隔时间）
 * @param {Function} callback 回调函数
 * @param {Number} time 有效防抖时间
 * @returns function
 */
plugin.debounce = function (callback, time) {
    var timer;
    return function () {
        clearTimeout(timer);
        var that = arguments[0];
        var args = Array.from(arguments).slice(1, arguments.length);
        timer = setTimeout(() => {
            callback.apply(that, args);
        }, time);
    }
}
/**
 * 节流（在一定间隔时间里没有任务就触发，有任务执行则不触发）
 * @param {Function} callback 回调函数
 * @param {Number} time 节流间隔时间
 * @param {Boolean} immediate 是否立即执行
 * @returns function
 * 
 * 
 * 
 */
plugin.throttle = function (callback, time, immediate) {
    if (immediate) {
        var t;
        return function () {
            if (!t || Date.now() - t > time) {
                t = Date.now();
                callback.apply(null, arguments);
            }
        }
    } else {
        var timer;
        return function () {
            if (timer) {
                return;
            }
            var args = arguments;
            timer = setTimeout(function () {
                callback.apply(null, args);
                clearTimeout(timer);
                timer = null;
            }, time);
        }
    }
}
plugin.curry = function (func) {
    // 从下标为1的位置开始获取固定的参数
    var args = Array.prototype.slice.call(arguments, 1);
    var that = this;
    return function () {
        var currentArgs = Array.from(arguments);
        var totalArgs = args.concat(currentArgs); // 将固定的参数和传入的参数合并
        if (totalArgs.length >= func.length) { // 如果参数个数满足函数形参的个数要求就执行该函数
            return func.apply(null, totalArgs);
        } else { // 如果不满足函数的形参个数就继续返回curry函数
            totalArgs.unshift(func); // 将函数放置在参数集合的第一个，因为curry函数的第一个必传的就是func函数
            return that.curry.apply(that, totalArgs); // 绑定this指向，传入固定的函数和固定的参数
        }
    }
}
/**
 * 管道函数：参数是多个函数，但是每个函数的形参必须要是一个。如果调用时函数有多个参数就可以使用curry函数来实现把多参数函数变成单参数函数
 * 管道函数应用在将一个参数传入管道后经过多个函数进行处理，最后返回出最终需要的结果
 * @returns function
 */
plugin.pipe = function () {
    var args = Array.from(arguments);
    return function (str) {
        // 第一种普通方式
        // args.forEach(func => {
        //     str = func(str)
        // });
        // return str;

        // 高阶写法
        return args.reduce(function (result, func) {
            return func(result);
        }, str)
    }
}