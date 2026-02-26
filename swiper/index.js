var cfg = {
    data: [
        { src: "./img/1.jpg" },
        { src: "./img/2.jpg" },
        { src: "./img/3.jpg" },
        { src: "./img/4.jpg" },
        { src: "./img/5.jpg" }
    ],
    swiper: document.querySelector(".swiper"),
    indicator: document.querySelector(".indicator"),
}

function initSwiper() {
    var indicatorFragment = document.createDocumentFragment();
    var swiperFragment = document.createDocumentFragment();
    for (let i = 0; i < cfg.data.length; i++) {
        indicatorFragment.appendChild(document.createElement("li"));
        var li = document.createElement("li");
        li.style.background = `url(${cfg.data[i].src}) no-repate/100% 100%`
        swiperFragment.appendChild(li);

    }
    cfg.indicator.appendChild(indicatorFragment);
    cfg.swiper.appendChild(swiperFragment);
}

initSwiper()