"use strict";

export function accordeon(trigger, collapsElement) {
    const titles = document.querySelectorAll(trigger);
    const content = document.querySelectorAll(collapsElement);

    hideAllContent();
    toggleContent();

    function hideAllContent() {
        content.forEach(div => {
            div.style.display = "none";
        });
    }

    function toggleContent() {
        titles.forEach((title, i) => {
            title.addEventListener("click", function () {
                if (this.nextElementSibling.style.display === "none") { //если кликаем на закрытый
                    hideAllContent(); //то все прячем
                    titles.forEach(title => { //всем заголовкам стандартный стиль
                        title.firstElementChild.style.cssText = `
                        color: #333;
                        border-bottom: 2px dotted #333;
                        `;
                    });

                    this.firstElementChild.style.cssText = `
                    color: #e950d7;
                    border-bottom: 0px;
                    `; //на таргет стиль активности

                    this.nextElementSibling.classList.add("animated", "fadeInDown"); //открываем div с индексом i
                    this.nextElementSibling.style.display = "";
                } else { //если кликаем на уже открытый
                    this.firstElementChild.style.cssText = `
                    color: #333;
                    border-bottom: 2px dotted #333;
                    `; //то убираем стиль активности

                    this.nextElementSibling.style.display = "none"; //закрываем div
                }
            });
        });
    }
}//accordeon