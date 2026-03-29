// 手写Promise
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise{
    
    /**
     * 创建一个Promise
     * @param {Function} executor 任务执行器，立即执行
     */
    constructor(executor){
        this._state = PENDING; //默认状态为pending 等待
        this._value = undefined;
        try{
            // 这里需要使用bind方法绑定this指向
            executor(this._resolve.bind(this),this._reject.bind(this));
        }catch(e){
            // 如果在运行代码中报错就直接返回调用失败状态
            this._reject(e);
        }
        
    }

    _changeState(state,data){
        // 因为Promise只有已解决和未解决，所以当状态发生变化后，就无法再次变更状态。（如果已经有已解决或未解决状态，后续无论再多次改变状态都无效）
        if (this._state !== PENDING) {
            return;
        }
        this._state = state;
        this._value = data
    }

    /**
     * 状态成功
     * @param {any} data 传入的值（可以是任意类型） 
     */
    _resolve(data){
        this._changeState(FULFILLED,data)
    }

    /**
     * 状态失败
     * @param {any} reason 传入的值
     */
    _reject(reason){
        this._changeState(REJECTED,reason)
    }

}
const myPromise = new MyPromise((resolve,reject) => {
    // throw new Error("111");
    resolve(123); // 因为resolve函数是直接调用，所以它的this指向是指向全局对象，但在class中是严格模式，所以this指向undefined
    reject(Error("自定义错误"))
})
console.log(
    myPromise
);

 // 需要实现then方法（Promise中的then catch 都是微任务，所以还要实现微任务且微任务的实现需要兼容node环境和浏览器环境）