"use strict";

export function tabs() {
const tabsArray = document.querySelectorAll(".portfolio-menu > li");

const portfolioWrapper = document.querySelector('.portfolio-wrapper');
const blocksAll = portfolioWrapper.querySelectorAll('.all');

const no = document.querySelector('.portfolio-no');

tabsArray.forEach((item, i) => {
    item.addEventListener("click", () => {
        filter(portfolioWrapper.querySelectorAll(`.${item.classList[0]}`));
        setActiveClass(tabsArray, i);
    });
});

function filter(blocks) {
    blocksAll.forEach((elem) => {
        elem.style.display = 'none';
        elem.classList.remove('animated', 'fadeIn');
    });

    no.style.display = 'none';
    no.classList.remove('animated', 'fadeIn');

    if (blocks) {
        blocks.forEach((block) => {
            block.style.display = 'block';
            block.classList.add('animated', 'fadeIn');
        });
    }
    if (blocks.length === 0) {
        no.style.display = 'block';
        no.classList.add('animated', 'fadeIn');
    }
}

function setActiveClass(array, i = 0) {
    array.forEach((item) => {
        item.classList.remove("active");
    });
    array[i].classList.add("active");
}
 
}//tabs