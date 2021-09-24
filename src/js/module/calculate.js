"use strict";

export function calculate() {
    const order = {
        "Размер картины": "Выберите размер картины",
        "Материал картины": "Выберите материал картины",
        "Дополнительные услуги": "",
        "Стоимость" : 0,
    };

    const form = document.querySelector(".calc form");
    const selects = form.querySelectorAll("select");
    const orderBox = form.querySelector(".calc-price");
    const saleInput = form.querySelector(".promocode");
    
    let flag = false;
    let sizeCost = 0,
    materialCost = 0,
    optionsCost = 0;

    saleInput.addEventListener("change", () => {
        if (saleInput.value === "IWANTPOPART" && flag) {
            orderBox.innerHTML = `
                "Размер картины": ${order["Размер картины"]}<br />
                "Материал картины": ${order["Материал картины"]}<br />
                "Дополнительные услуги": ${order["Дополнительные услуги"]}<br />
                "Стоимость": ${order["Стоимость"] = (sizeCost + materialCost + optionsCost) -( (sizeCost + materialCost + optionsCost)  / 100 * 30)}<br />
                "Скидка": ${order["Скидка"] = true}
                `;
                console.log(order);
        }
    });


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

            if (flag) {
                orderBox.innerHTML = `
                "Размер картины": ${order["Размер картины"]}<br />
                "Материал картины": ${order["Материал картины"]}<br />
                "Дополнительные услуги": ${order["Дополнительные услуги"]}<br />
                "Стоимость": ${order["Стоимость"]}
                `;
            } else {
               orderBox.innerHTML = "Для расчета нужно выбрать размер картины и материал картины"; 
            }


        });
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
        } else {
            order["Стоимость"] = (sizeCost + materialCost + optionsCost);
        }

        console.log(order);
    }

}//calculate