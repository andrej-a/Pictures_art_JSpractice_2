"use strict";

export function smoothScroll(upSelector, linksSelector) {
    const upElem = document.querySelector(upSelector);//up Button
    const links = document.querySelectorAll(linksSelector);

    window.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add("animated", "fadeIn");
            upElem.classList.remove("fadeOut");
        } else {
            upElem.classList.add("fadeOut");
            upElem.classList.remove("fadeIn");
        }
    });
    //JS scrolling
    /*const element = document.documentElement,
          body = document.body;

    const calcScroll = (elem) => {
        elem.addEventListener("click", function(event) {
            let scrollTop = Math.round(body.scrollTop || element.scrollTop);//расстояние от верха

            if(this.hash !== "") {//hash - хэш ссылки
                event.preventDefault();
                let hashElement = document.querySelector(this.hash),//элемент к которому листаем
                    hashElementTop = 0;//оставшееся к нему расстояние
                
                while (hashElement.offsetParent) {
                    hashElementTop += hashElement.offsetTop;//сколько пикселей до верхней гр. родит. элемен
                    hashElement = hashElement.offsetParent;
                }
                
                hashElementTop = Math.round(hashElementTop);

                doScroll(scrollTop, hashElementTop, this.hash);
            }
        });

        const doScroll = (from, to, hash) => {
            let timeInterval = 1,
                prevScrollTop,
                speed;
            
            if (to > from) {
                speed = 30;
            } else {
                speed = -30;
            }

            let move = setInterval(function() {
                let scrollTop = Math.round(body.scrollTop || element.scrollTop);

                if (
                    prevScrollTop === scrollTop ||
                    (to > from && scrollTop >= to) ||
                    (to < from && scrollTop <= to)
                ) {
                    clearInterval(move);
                    history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, "") + hash);
                } else {
                    body.scrollTop += speed;
                    element.scrollTop += speed;
                    prevScrollTop = scrollTop;
                }
            }, timeInterval);
        }; 
    };
    calcScroll(upElem);

    links.forEach(link => {
        calcScroll(link);
    });*/

    //requestAnimationFrame
    let hrefLinks = document.querySelectorAll(`[href^="#"]`); //получаем ссылки по атрибутам (все что начинается с #)
    let speed = 0.3;

    hrefLinks.forEach(link => {
        if (link.getAttribute("href") != "#") {//если ссылка не фальшивая
            link.addEventListener("click", function (event) {
                event.preventDefault();

                let widthTop = document.documentElement.scrollTop, //расстояние от верха
                    hash = this.hash, //хэш кликнутой ссылки
                    toBlock = document.querySelector(hash).getBoundingClientRect().top, //верх элемента к которому скроллим
                    start = null;

                requestAnimationFrame(step);

                function step(time) {
                    if (start === null) {
                        start = time;
                    }
                    let progress = time - start,
                        r = (toBlock < 0 ? Math.max(widthTop - progress / speed, widthTop + toBlock) : Math.min(widthTop + progress / speed, widthTop + toBlock));
                          //если листаем вверх toBlock отрицат.        //высота - сколько пролистали / скорость
                    document.documentElement.scrollTo(0, r);

                    if (r !== widthTop + toBlock) {
                        requestAnimationFrame(step);
                    } else {
                        location.hash = hash;
                    }
                }
            });
        }
    });
} //scroll