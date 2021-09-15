"use strict";

export function calcScroll() {
    let div = document.createElement("div");

    div.style.width = "50px";
    div.style.height = "50px";
    div.style.overflowY = "scroll";
    div.style.visibility = "hidden";

    document.body.appendChild(div);

    let scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    return scrollWidth;
}

export function closeModal(element) {
    document.body.style.overflow = "";
    document.body.style.marginRight = `0px`;
    element.style.display = "none";
}


export function openModal(element) {
    document.body.style.overflow = "hidden";
    document.body.style.marginRight = `${calcScroll()}px`;
    element.style.display = "block";
}