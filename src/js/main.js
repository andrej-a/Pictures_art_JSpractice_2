import {modalWindow, showModalByTime} from "./module/modal";

modalWindow( //popupEngineerButton
    {
        buttonOpenSelectorItem: ".button-design",
        modalSelectorItem: ".popup-design",
        buttonCloseSelectorItem: ".popup-close",

    }
);

modalWindow( //backCallButton
    {
        buttonOpenSelectorItem: ".button-consultation",
        modalSelectorItem: ".popup-consultation",
        buttonCloseSelectorItem: ".popup-close",
    }
);

showModalByTime(".popup-consultation", 60000);