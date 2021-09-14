"use strict";
import {openModal, closeModal} from "../service/service";

export function showModalByTime(selector, time) {
    setTimeout(() => {
        let flag;

        document.querySelectorAll(["[data-modal]"]).forEach(item => {
            if (getComputedStyle(item).display !== "none") {
                flag = true;
            }
        });

        if (!flag) {
            document.querySelector(selector).style.display = "block";
            document.body.style.overflow = "hidden";
        }
    }, time);
}

export function modalWindow({buttonOpenSelectorItem, modalSelectorItem, buttonCloseSelectorItem}) {
    const buttonsPopup = document.querySelectorAll(buttonOpenSelectorItem);
    const modalWindow = document.querySelector(modalSelectorItem);

    
    buttonsPopup.forEach((elem) => {
        elem.addEventListener("click", () => {
            openModal(modalWindow);
        } );
    });
    
    modalWindow.addEventListener("click", (e) => {
        if (e.target&& e.target.matches(modalSelectorItem) || e.target.matches(buttonCloseSelectorItem) ) {
            closeModal(modalWindow);
        }
    });
    
}//modal