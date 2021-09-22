"use strict";
import { getElements } from "../service/service";

export function getElementsFromServer(trigger, parentSelector) {
    const button = document.querySelector(trigger);
    let parent = document.querySelector(parentSelector);
    
    button.addEventListener("click", () => {
        getElements("http://localhost:3000/styles")
        .then(result => {
            for (let i = 0; i < result.length; i++) {
                let {src, title, link} = result[i];
                parent.innerHTML += createCard(src, title, link);
            }
            button.style.display = "none";
        })
        .catch(e => console.log(e));
    });


    function createCard(srcItem, title, linkItem) {
        const card = `
        <div class="animated fadeInUp col-sm-3 col-sm-offset-0 col-xs-10 col-xs-offset-1">
        <div class=styles-block>
            <img width=153px height=214px src=${srcItem} alt>
            <h4>${title}</h4>
            <a href="${linkItem}">Подробнее</a>
        </div>
    </div>
        `;
        return card;
    }
}