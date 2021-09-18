"use strict";
import {closeModal} from "../service/service";
export function forms() {
const statusMessage = {
    waitingGif: "assets/img/spinner.gif",
    donePNG: "assets/img/ok.png",
    errorPNG: "assets/img/fail.png",
    waiting: "Загрузка",
    done: "Ваш запрос отправлен! Спасибо!",
    error: "Что-то пошло не так. Попробуйте снова"
};

const path = {
    designer: "assets/server.php",
    question: "assets/question.php"
};

const message = document.createElement("div");
message.style.fontSize = "20px";

const formsArray = document.querySelectorAll("form");
const inputs = document.querySelectorAll("input");
const comments = document.querySelectorAll("textarea");
const upload = document.querySelectorAll('[name="upload"]');
const uploadName = document.querySelectorAll(".file-name");
let count = null;

formsArray.forEach(form => {
    postDate(form);
});

checkLanguages(inputs);
checkLanguages(comments);

upload.forEach((item, i) => {
    item.addEventListener("input", () => {
        count = i;
        if (item.files[0].name.length > 7) {
            item.previousElementSibling.innerText = `${item.files[0].name.slice(0, 7)}... ${item.files[0].type.replace(/.+\//gi, "\.")}`;
        } else {
            item.previousElementSibling.innerText = `${item.files[0].name} ${item.files[0].type.replace(/.+\//gi, "\.")}`;
        }
    });
});

function postDate(form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const message = document.createElement("div");
        message.style.fontSize = "20px";
        form.parentElement.appendChild(message);

        form.parentElement.style.cssText = `
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        form.style.display = "none";

        uploadName[count].innerText = "Файл не выбран";
            
        let statusIMG = document.createElement("img");
        statusIMG.setAttribute("src", statusMessage.waitingGif);
        message.innerText = statusMessage.waiting;
        message.appendChild(statusIMG);

        const formData = new FormData(form);

        let api;
        form.closest(".popup-design") || form.classList.contains("set-picture") ? api = path.designer : api = path.question;
        
        postDataFormToServer(api, formData)
            .then(result => result.text())
            .then(result => {
                console.log(result);
                statusIMG.setAttribute("src", statusMessage.donePNG);
                message.innerText = statusMessage.done;
            })
            .catch((e) => {
                statusIMG.setAttribute("src", statusMessage.errorPNG);
                message.innerText = statusMessage.error;
            })
            .finally(() => {
                setTimeout(() => {
                    message.remove();
                    form.style.display = "";
                    form.reset();
                    if (form.classList.contains("toclose") && form.classList.contains("design")) {
                        closeModal(document.querySelector(".popup-design"));
                    } else if (form.classList.contains("toclose") && form.classList.contains("question")) {
                        closeModal(document.querySelector(".popup-consultation"));
                    }
                }, 3000);
            });
    });
}

const postDataFormToServer = async function (url, target) {

    const result = await fetch(url, {
        method: "POST",
        body: target
    });

    return await result;
};

function checkLanguages(array) {
    array.forEach(input => {
        input.addEventListener("input", event => {
            if (event.target.name === "name" || event.target.name === "message") {
                if (/[^а-я]/gi.test(event.target.value)) {
                    event.target.value = event.target.value.replace(/[^а-я]/gi, "");
                    event.target.style.border = "1px solid red";
                    message.innerText = "Вы можете ввести эти данные только на русском языке";
                    event.target.parentElement.appendChild(message);
                    setTimeout(() => {
                        event.target.style.border = "";
                        message.remove();
                    }, 2000);
                }
            }
        });
    });
}
}//forms