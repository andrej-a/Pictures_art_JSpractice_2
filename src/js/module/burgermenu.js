"use strict";

export function burger(triger, menuSelector) {
    const burgerBTN = document.querySelector(triger);
    const menuList = document.querySelector(menuSelector);
    
    menuList.style.display = "none";

    burgerBTN.addEventListener("click", () => {
        if (menuList.style.display === "none" && window.screen.availWidth < 993) {
            menuList.style.display = "block";
        } else {
            menuList.style.display = "none";
        }
    });

    window.addEventListener("resize", () => {
        if (menuList.style.display === "block" && window.screen.availWidth > 992) {
            menuList.style.display = "none";
        }
    });
}//burger