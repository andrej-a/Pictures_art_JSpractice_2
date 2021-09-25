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

/*export const postDataFormToServer = async function(url, targetBody, message, value) {
    message.innerText = value;
    const result = await fetch(url, {
        method: "POST",
        body: targetBody
    });

    return await result.text();
};*/

export const postDataFormToServer = async function (url, target) {

    const result = await fetch(url, {
        method: "POST",
        body: target
    });

    return await result;
};

export const postDataFormToServerJSON = async function (url, target) {

    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: target
    });

    return await result;
};

export const getElements = async function (url) {

    const result = await fetch(url);

    if (!result.ok) {
        throw new Error("Что-то сломалось. Пожалуйста, попробуйте снова.");
    }

    return await result.json();
};