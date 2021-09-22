"use strict";

export function easyGetElements(trigger, styles) {
    const button = document.querySelector(trigger);
    const cards = document.querySelectorAll(styles);

    cards.forEach(card => {
        card.classList.add("animated", "fadeInUp");
    });

    button.addEventListener("click", () => {
        button.style.display = "none";

        cards.forEach(card => {
            card.classList.remove("hidden-lg", "hidden-md", "hidden-sm", "hidden-xs", "styles-2");
            card.classList.add("col-sm-3", "col-sm-offset-0", "col-xs-10", "col-xs-offset-1");
        });
    });
}    