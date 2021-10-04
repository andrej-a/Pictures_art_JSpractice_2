import {modalWindow, showModalByTime} from "./module/modal";
import {slider} from "./module/slider";
import {forms} from "./module/form";
import {mask} from "./module/mask";
import {easyGetElements} from "./module/easyGetElements";
import {getElementsFromServer} from "./module/server";
import {calculate} from "./module/calculate";
import {tabs} from "./module/tabs";
import {getPictureHover} from "./module/hover";
import {accordeon} from "./module/accordeon";
import {burger} from "./module/burgermenu";
import {smoothScroll} from "./module/smoothScroll";
import {drop} from "./module/drag&drop";

modalWindow( //buttonDesign
    {
        buttonOpenSelectorItem: ".button-design",
        modalSelectorItem: ".popup-design",
        buttonCloseSelectorItem: ".popup-close",

    }
);

modalWindow( //consultation
    {
        buttonOpenSelectorItem: ".button-consultation",
        modalSelectorItem: ".popup-consultation",
        buttonCloseSelectorItem: ".popup-close",
    }
);

modalWindow( //gift
    {
        buttonOpenSelectorItem: ".fixed-gift",
        modalSelectorItem: ".popup-gift",
        buttonCloseSelectorItem: ".popup-close",
    }
);

//showModalByTime(".popup-consultation", 60000);

//slider(".main-slider > div > img", "vertical");    variants from class with .classes
//slider(".feedback-slider-item", "", ".main-prev-btn", ".main-next-btn");

slider({
    parentWrapper: ".main-slider",
    wrapper: ".main-slider-wrapper",
    slides: ".main-slider-wrapper > div > img",
    sizeItem: "height",
    size: "669px",
    flexDir: "column",
    directions: "vertical"
});

slider({
    parentWrapper: ".feedback-slider",
    wrapper: ".feedback-wrapper",
    slides: ".feedback-wrapper > div",
    sizeItem: "width",
    size: `1141px`,
    flexDir: "row",
    directions: "horizontal",
    prev: ".main-prev-btn",
    next: ".main-next-btn",
});

forms();

mask("[name='phone']");

//easyGetElements(".button-styles", ".hidden-lg");

getElementsFromServer(".button-styles", ".styles .container .row");

calculate();

tabs();

getPictureHover(".sizes-block");

accordeon(".accordion-heading", ".accordion-block");

burger(".burger", ".burger-menu", );

smoothScroll(".pageup", "#up a");

drop();