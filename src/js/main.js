import {modalWindow, showModalByTime} from "./module/modal";

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

showModalByTime(".popup-consultation", 60000);