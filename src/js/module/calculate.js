"use strict";
import {postDataFormToServerJSON} from "../service/service";
import {flagInput} from "./form";//checkPicture InImput

export function calculate() {

    let order = {
        "Размер картины": "Выберите размер картины",
        "Материал картины": "Выберите материал картины",
        "Дополнительные услуги": "",
        "Стоимость" : 0,
        "Скидка": false,
    };

    const form = document.querySelector(".calc form");
    const selects = form.querySelectorAll("select");
    const button = form.querySelector(".button-order");
    const orderBox = form.querySelector(".calc-price");//div for information
    const saleInput = form.querySelector(".promocode");//input for promocode
    
    let flag = false;//check two select

    let sizeCost = 0,
    materialCost = 0,
    optionsCost = 0;

    saleInput.addEventListener("change", () => {
        checkSale();
    });

    button.disabled = true;//block button while flag === false

    selects.forEach(select => {
        select.addEventListener("change", (even) => {
            
            switch(even.target.getAttribute("id")) {
                case "size":
                        order["Размер картины"] = even.target.options[even.target.selectedIndex].value;
                        sizeCost = +even.target.options[even.target.selectedIndex].dataset.price;
                        checkFlag();
                    break;
                case "material":
                    order["Материал картины"] = even.target.options[even.target.selectedIndex].value;
                    materialCost = +even.target.options[even.target.selectedIndex].dataset.price; 
                    checkFlag();
                break;
                case "options":
                    order["Дополнительные услуги"] = even.target.options[even.target.selectedIndex].value;
                    optionsCost = +even.target.options[even.target.selectedIndex].dataset.price;
                break;
            }

            checkSale();

            if (!flag) {
                orderBox.innerHTML = `
                Для расчета нужно выбрать размер картины и материал картины 
                `;
                button.disabled = true;
            } else {
                button.disabled = false;
            }
        });
    });

    form.addEventListener("submit", () => {
        const json = JSON.stringify( order );

        if (flagInput || form.querySelector("[name='upload']").files[0]) {
            postDataFormToServerJSON("http://localhost:3000/fastOrder", json)
            .then(result => {
                result.json();
                console.log(result);
            })
            .catch()
            .finally(() => {
                orderBox.innerHTML = "Для расчета нужно выбрать размер картины и материал картины";
                sizeCost = 0,
                materialCost = 0,
                optionsCost = 0;
                order = {
                    "Размер картины": "Выберите размер картины",
                    "Материал картины": "Выберите материал картины",
                    "Дополнительные услуги": "",
                    "Стоимость" : 0,
                    "Скидка": false,
                };
                button.disabled = true;
            });
        }
    });

    function checkFlag() {
        if (order["Размер картины"] !== "Выберите размер картины" && order["Материал картины"] !== "Выберите материал картины") {
            flag = true;
        } else {
            flag = false;
        }
    }

    function checkSale() {
        if (saleInput.value === "IWANTPOPART") {
            order["Стоимость"] = (sizeCost + materialCost + optionsCost) -( (sizeCost + materialCost + optionsCost)  / 100 * 30);
            order["Скидка"] = true;
        } else {
            order["Стоимость"] = (sizeCost + materialCost + optionsCost);
            order["Скидка"] = false;
        }

        if (flag) {
            orderBox.innerHTML = `
                Стоимость: ${order["Стоимость"]}`;
        }
        
        console.log(order);
    }

}//calculate