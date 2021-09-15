"use strict";
import {openModal, closeModal, calcScroll} from "../service/service";
let flagСatchScroll = false;

export function modalWindow({buttonOpenSelectorItem, modalSelectorItem, buttonCloseSelectorItem}) {
    const buttonsPopup = document.querySelectorAll(buttonOpenSelectorItem);
    const modalWindow = document.querySelector(modalSelectorItem);

    catchScroll(document.querySelector(".fixed-gift"));
    
    

    buttonsPopup.forEach((btn) => {
        btn.addEventListener("click", (event) => {
                flagСatchScroll = true;

            if (event.target.classList.contains("fixed-gift")) {
                event.target.style.display = "none";
                modalWindow.classList.add("animated", "fadeIn");
                openModal(modalWindow);
            } else {
                modalWindow.classList.add("animated", "fadeIn");
                openModal(modalWindow);
            }
            
            
        } );
    });
    
    modalWindow.addEventListener("click", (e) => {
        if (e.target&& e.target.matches(modalSelectorItem) || e.target.matches(buttonCloseSelectorItem) ) {
            closeModal(modalWindow);
        }
    });
    
}//modal

export function showModalByTime(selector, time) {
    setTimeout(() => {
        let flagModalByTime = false;
        document.querySelectorAll(["[data-modal]"]).forEach(item => {
            if (getComputedStyle(item).display !== "none") {//срабатывает в момент окончания таймера
                flagModalByTime = true;
            }
        });

        if (!flagModalByTime) {//срабатывает в момент окончания таймера
            document.querySelector(selector).style.display = "block";
            document.querySelector(selector).classList.add("animated", "fadeIn");
            document.body.style.overflow = "hidden";
            document.body.style.marginRight = `${calcScroll()}px`;
        }
    }, time);
}

function catchScroll(element) {

    window.addEventListener("scroll", () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        if (!flagСatchScroll && (window.scrollY + document.documentElement.clientHeight ) >= scrollHeight - 1) {
            flagСatchScroll = true;
            element.click();//ручной вызов события 
        }
    });
}