"use strict";
import {closeModal, postDataFormToServer} from "../service/service";
export let flagInput = false;   //check upload.files.length
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
        flagInput = true;
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

        let api;
        form.closest(".popup-design") || form.classList.contains("set-picture") ? api = path.designer : api = path.question;

            if (api === path.designer && !form.querySelector("[name='upload']").files[0]) {
                
                message.innerText = "Пожалуйста, загрузите файл для картины.";

                setTimeout(() => {
                    message.remove();
                    form.style.display = "";
                }, 3000);

            } else {
                let statusIMG = document.createElement("img");
                statusIMG.setAttribute("src", statusMessage.waitingGif);
                message.innerText = statusMessage.waiting;
                message.appendChild(statusIMG);

                const formData = new FormData(form);

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
                            flagInput = false;
                            message.remove();
                            form.style.display = "";
                            form.reset();
                            form.querySelector("[name='upload']").previousElementSibling.innerText = "Файл не выбран";
                            if (form.classList.contains("toclose") && form.classList.contains("design")) {
                                closeModal(document.querySelector(".popup-design"));
                            } else if (form.classList.contains("toclose") && form.classList.contains("question")) {
                                closeModal(document.querySelector(".popup-consultation"));
                            }
                        }, 3000);
                    }); //finally
            } // else
    });
    }


function checkLanguages(array) {
    array.forEach(input => {
        input.addEventListener("input", event => {
            if (event.target.name === "name" || event.target.name === "message") {
                if (/[^а-яё 0-9]/gi.test(event.target.value)) {
                    event.target.value = event.target.value.replace(/[^а-яё 0-9]/gi, "");
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