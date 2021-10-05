"use strict";

/*export function slider({parentWrapper, wrapper, slides, sizeItem, size, flexDir, directions, prev, next}) {

const parent = document.querySelector(parentWrapper); //the most main div with elements
const innerWrapper = document.querySelector(wrapper);   //wrapper of elements
const slidersArray = document.querySelectorAll(slides); //just elements like img or etc

slidersArray.forEach(img => {
    img.style[sizeItem] = size; //sizeItem === height or width
}); //do all of them same size
const parametres = +(slidersArray[0].style[sizeItem]).replace(/\D/gi, ""); //get width or height from slides elements
parent.style[sizeItem] = `${parametres}px`;//set height or width of the parent 

let offset = 0;
let changeSlides = null;

innerWrapper.style[sizeItem] = `${100 * slidersArray.length}%`;
innerWrapper.style.display = "flex";
innerWrapper.style.flexDirection = flexDir;
innerWrapper.style.transition = "all .5s";

parent.style.overflow = "hidden";
activeAnimation();

try {
    const prevBtn = document.querySelector(prev);
    const nextBtn = document.querySelector(next);

    prevBtn.addEventListener("click", () => {
        if (offset === 0) {
            offset = parametres * (slidersArray.length - 1);
        } else {
            offset -= parametres;
        }
        innerWrapper.style.transform = `translateX(-${offset}px)`;
    });

    nextBtn.addEventListener("click", () => {
        if (offset === parametres * (slidersArray.length - 1)) {
            offset = 0;
        } else {
            offset += parametres;
        }
        innerWrapper.style.transform = `translateX(-${offset}px)`;
    });


} catch(e){
    
}

function activeAnimation() {
    if (directions === "vertical") {
        changeSlides = setInterval(() => {

            if (offset === parametres * (slidersArray.length - 1)) {
                offset = 0;
            } else {
                offset += parametres;
            }
            innerWrapper.style.transform = `translateY(-${offset}px)`;

        }, 5000);
    } else {
        parent.style.height = "450px";
        changeSlides = setInterval(() => {

            if (offset === parametres * (slidersArray.length - 1)) {
                offset = 0;
            } else {
                offset += parametres;
            }
            innerWrapper.style.transform = `translateX(-${offset}px)`;

        }, 5000);
    }

}

parent.addEventListener("mouseenter", () => {
    clearInterval(changeSlides);
});
parent.addEventListener("mouseleave", () => {
    activeAnimation();
});

}//slider*/

    export function slider(slides, directions, prev, next) {
    let index = 1;    //вариант из урока с классами

    let paused;
    const items = document.querySelectorAll(slides);
    

    showSlides(index);
    activateAnimation();
    
    try {
        const prevBtn = document.querySelector(prev);
        const nextBtn = document.querySelector(next);

        prevBtn.addEventListener("click", () => {
            changeSlide(-1);
            items[index - 1].classList.remove("slideInLeft");
            items[index - 1].classList.add("slideInRight");
        });

        nextBtn.addEventListener("click", () => {
            changeSlide(1);
            items[index - 1].classList.remove("slideInRight");
            items[index - 1].classList.add("slideInLeft");
        });


    } catch(e){
        
    }

    items[0].parentNode.addEventListener("mouseenter", () => {
        clearInterval(paused);
    });
    items[0].parentNode.addEventListener("mouseleave", () => {
        activateAnimation();
    });
    
    function activateAnimation() {
        if (directions === "vertical") {
            paused = setInterval(() => {
                changeSlide(1);
                items[index - 1].classList.add("slideInDown");
            }, 6000);
        } else {
            paused = setInterval(() => {
                changeSlide(1);
                items[index - 1].classList.remove("slideInRight");
                items[index - 1].classList.add("slideInLeft");
            }, 6000);
        }
    }
    
    function showSlides(n) {
        if (n > items.length) {
            index = 1;
        }

        if (n < 1) {
            index = items.length;
        }

        items.forEach(item => {
            item.classList.add("animated");
            item.style.display = "none";
        });

        items[index - 1].style.display = "block";
    }

    function changeSlide(n) {
        showSlides(index += n);
    }

}//slider
