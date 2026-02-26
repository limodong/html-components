var h1 = document.createElement("h1");
var h2 = document.createElement("h1");
var timer;
document.body.appendChild(h1);
document.body.appendChild(h2);
function interval(callback, duration) {
    timer = setTimeout(function () {
        callback();
        interval(callback, duration);
    }, duration)
}
function init() {

    interval(function () {
        var date = new Date();
        var Y = date.getFullYear();
        var M = (date.getMonth() + 1).toString().padStart(2, 0);
        var D = date.getDate().toString().padStart(2, 0);
        var h = date.getHours().toString().padStart(2, 0);
        var m = date.getMinutes().toString().padStart(2, 0);
        var s = date.getSeconds().toString().padStart(2, 0);
        h1.innerHTML = `${Y}-${M}-${D} ${h}:${m}:${s}`;
    }, 1000);
    
    setInterval(function () {
        var date = new Date();
        var Y = date.getFullYear();
        var M = (date.getMonth() + 1).toString().padStart(2, 0);
        var D = date.getDate().toString().padStart(2, 0);
        var h = date.getHours().toString().padStart(2, 0);
        var m = date.getMinutes().toString().padStart(2, 0);
        var s = date.getSeconds().toString().padStart(2, 0);
        h2.innerHTML = `${Y}-${M}-${D} ${h}:${m}:${s}`;
    }, 1000)

}

init()