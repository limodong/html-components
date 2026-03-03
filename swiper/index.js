var config = {
    data: ["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg"],
    bannerWidth: 520,
    bannerHeight: 300,
    doms: {
        imgsEl: document.querySelector(".banner .imgs"),
        arrowLeft: document.querySelector(".banner .arrow .left"),
        arrowRight: document.querySelector(".banner .arrow .right"),
        indicator: decodeURIComponent.querySelector(".banner .indicator")
    }
}
function initBanner() {
    var bannerFrament = document.createDocumentFragment();
    config.data.forEach(url => {
        var a = document.createElement("a");
        a.innerHTML = `<img src="${url}">`;
        bannerFrament.appendChild(a);
    })
    config.doms.imgsEl.style.width = config.bannerWidth * config.daata.length;
}
initBanner();