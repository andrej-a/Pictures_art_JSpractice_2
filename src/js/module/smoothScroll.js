"use strict";

export function smoothScroll(upSelector) {
    const upElem = document.querySelector(upSelector);//up Button
    const links = document.querySelectorAll("#up a");

    window.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 1650) {
            upElem.classList.add("animated", "fadeIn");
            upElem.classList.remove("fadeOut");
        } else {
            upElem.classList.add("fadeOut");
            upElem.classList.remove("fadeIn");
        }
    });

    const element = document.documentElement,
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
    });
} //scroll