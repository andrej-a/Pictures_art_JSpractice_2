"use strict";

export function calculate() {
    const order = {
        "Размер картины": "",
        "Материал картины": "",
        "Дополнительные услуги": "",
        "Стоимость": "",
    };

    const form = document.querySelector(".calc form");
    const selects = form.querySelectorAll("select");
    const orderBox = form.querySelector(".calc-price");
    
    selects.forEach(select => {
        select.addEventListener("change", createOrder);
    });


}//calculate