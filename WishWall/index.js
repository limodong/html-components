var config = {
    curentPaper: null,
    containerEl: document.querySelector(".container"),
    paperEl: document.querySelector(".paper"),
    inpEl: document.querySelector(".inp"),
    paperWidth: 170,
    paperHeight: 170,
    zIndex: 1,
    vWidth: document.documentElement.clientWidth, // 当前视口的宽度
    vHeight: document.documentElement.clientHeight // 当前视口的高度
}

window.onmousedown = function (e) {
    config.curentPaper = getPaper(e.target);
    if (config.curentPaper) {
        config.curentPaper.style.zIndex = config.zIndex;
        config.zIndex++;
        config.curentPaper.onmousemove = function (e) {
            var left = parseFloat(getComputedStyle(this).left.slice(0, -2));
            var top = parseFloat(getComputedStyle(this).top.slice(0, -2));
            left += e.movementX; // movementX和movementY会受到电脑显示分辨率的缩放影响，如果电脑显示分辨率的缩放不是100%就需要使用pageX和pageY去替换movementX和movementY
            top += e.movementY;
            // 边界判断
            if (top <= 0) {
                top = 0;
            }
            if (top > document.documentElement.clientHeight - config.paperHeight - 60) {
                top = document.documentElement.clientHeight - config.paperHeight - 60
            }
            if (left < 0) {
                left = 0;
            }
            if (left > document.documentElement.clientWidth - config.paperWidth) {
                left = document.documentElement.clientWidth - config.paperWidth;
            }
            console.log(top, document.documentElement.clientHeight);
            config.curentPaper.style.left = left + "px";
            config.curentPaper.style.top = top + "px";
        }
    }

    window.onmouseup = function () {
        if (config.curentPaper) {
            config.curentPaper.onmousemove = null;
        }
    }
}

window.onclick = function (e) {
    if (e.target.tagName === "SPAN") {
        if (e.target.parentElement && e.target.parentElement.className === "paper") {
            config.containerEl.removeChild(e.target.parentElement);
        }
    }
}

config.inpEl.onkeydown = function (e) {
    if (e.key === "Enter") {
        writeWish(config.inpEl.value)
    }
}

/**
 * 当可视窗口的尺寸变化时，元素的位置也等比发生变化
 * @param {*} e 
 */
window.onresize = function (e) {
    var paperEls = document.querySelectorAll(".paper");
    paperEls.forEach(e => {
        var leftRate = parseFloat(e.style.left.slice(0, -2)) / (config.vWidth - config.paperWidth); // 左边距的比例
        var topRate = parseFloat(e.style.top.slice(0, -2)) / (config.vHeight - config.paperHeight); // 上边距的比例

        if (config.vWidth !== document.documentElement.clientWidth) {
            e.style.left = (document.documentElement.clientWidth - config.paperWidth) * leftRate + "px";
        }

        if (config.vHeight !== document.documentElement.clientHeight) {
            e.style.top = (document.documentElement.clientHeight - config.paperHeight) * topRate + "px";
        }
    })
    config.vWidth = document.documentElement.clientWidth;
    config.vHeight = document.documentElement.clientHeight;

}

/**
 * 写入文本
 * @param {String} text 
 */
function writeWish(text) {
    var div = document.createElement("div");
    div.className = "paper";
    div.innerHTML = `<p>${text}</p><span>×</span>`;
    var maxLeft = document.documentElement.clientWidth - config.paperWidth;
    var maxTop = document.documentElement.clientHeight - config.paperHeight - 50;
    div.style.left = getRandomNum(0, maxLeft) + "px";
    div.style.top = getRandomNum(0, maxTop) + "px";
    div.style.backgroundColor = `rgb(${getRandomNum(100, 255)},${getRandomNum(100, 255)},${getRandomNum(100, 255)})`;
    config.containerEl.appendChild(div);
    config.inpEl.value = "";
}
/**
 * 获取Paper元素
 * @param {HTMLElement} dom 
 * @returns 
 */
function getPaper(dom) {
    if (dom.className === "paper") {
        return dom;
    } else if (dom.tagName === "P") {
        if (dom.parentElement && dom.parentElement.className === "paper") {
            return dom.parentElement;
        }
    }
}
/**
 * 获取随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @returns 
 */
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function initWishWall(wishs) {
    for (let i = 0; i < wishs.length; i++) {
        const text = wishs[i];
        writeWish(text);
    }
}
initWishWall(["世界和平", "天下之最"])