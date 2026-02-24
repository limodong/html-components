var config = {
    curentPaper: null,
    containerEl: document.querySelector(".container"),
    paperEl: document.querySelector(".paper"),
    formEl: document.querySelector(".inp-container form"),
    inpEl: document.querySelector(".inp-container form input")
}

window.onmousedown = function (e) {
    if (config.curentPaper instanceof HTMLElement) {
        config.curentPaper.style.zIndex = 1;
    }
    config.curentPaper = getPaper(e.target);
    if (config.curentPaper) {
        config.curentPaper.style.zIndex = 999;
        config.curentPaper.onmousemove = function (e) {
            var left = parseFloat(getComputedStyle(this).left.slice(0, -2));
            var top = parseFloat(getComputedStyle(this).top.slice(0, -2));
            left += e.movementX;
            top += e.movementY;
            config.curentPaper.style.left = left + "px";
            config.curentPaper.style.top = top + "px";
        }
    }
}

window.onmouseup = function () {
    if (config.curentPaper) {
        config.curentPaper.onmousemove = null;
    }
}

window.onclick = function (e) {
    if (e.target.tagName === "SPAN") {
        if (e.target.parentElement && e.target.parentElement.className === "paper") {
            config.containerEl.removeChild(e.target.parentElement);
        }
    }
}

config.formEl.onsubmit = function (e) {
    e.preventDefault();
    var newPaper = config.paperEl.cloneNode(true);
    newPaper.children[0].innerHTML = config.inpEl.value;
    var { left, top } = getPosition();
    console.log(`left: ${left}  top: ${top}`);
    newPaper.style.left = left + "px";
    newPaper.style.top = top + "px";
    var { r, g, b } = getPaperBgColor();
    newPaper.style.backgroundColor = `rgb(${r},${g},${b})`;
    config.containerEl.appendChild(newPaper);
    config.inpEl.value = "";
}
function getPaper(el) {
    if (el.className === "paper") {
        return el;
    } else if (el.tagName === "P") {
        if (el.parentElement && el.parentElement.className === "paper") {
            return el.parentElement;
        }
    }
}
function getPaperBgColor() {
    return {
        r: Math.floor(Math.random() * 255) + 1,
        g: Math.floor(Math.random() * 255) + 1,
        b: Math.floor(Math.random() * 255) + 1
    }
}
function getPosition() {
    var maxLeft = document.documentElement.clientWidth - parseFloat(getComputedStyle(config.paperEl).width.slice(0, -2));
    var maxTop = document.documentElement.clientHeight - parseFloat(getComputedStyle(config.paperEl).height.slice(0, -2));
    return { left: Math.floor(Math.random() * maxLeft) + 1, top: Math.floor(Math.random() * maxTop) + 1 }
}
