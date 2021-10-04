"use strict";
export function drop() {
    const fileInputs = document.querySelectorAll("[name='upload']");

    ["dragenter", "dragleave", "dragover", "drop"].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function highLight(elem) {
        elem.closest(".file_upload").style.border = "5px solid yellow";
        elem.closest(".file_upload").style.backgroundColor = "rgba(0,0,0, .7)";
    }

    function unHighLight(elem) {
        elem.closest(".file_upload").style.border = "none";

        if (elem.closest(".calc")) {
            elem.closest(".file_upload").style.backgroundColor = "#fff";
        } else {
            elem.closest(".file_upload").style.backgroundColor = "#ededed";
        }
    }

    ["dragenter", "dragover"].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highLight(input), false);
        });
    });

    ["dragleave", "drop"].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unHighLight(input), false);
        });
    });

    fileInputs.forEach((input, i) => {
        input.addEventListener("drop", (event) => {
            console.log(event.dataTransfer.files[0].type.match(/image\/(jpeg|png)/gi));
            if (event.dataTransfer.files[0].type.match(/image\/(jpeg|png)/gi)) {
                input.files = event.dataTransfer.files;

                if (input.files[0].name.length > 7) {
                    input.previousElementSibling.innerText = `${input.files[0].name.slice(0, 7)}... ${input.files[0].type.replace(/.+\//gi, "\.")}`;
                } else {
                    input.previousElementSibling.innerText = `${input.files[0].name} ${input.files[0].type.replace(/.+\//gi, "\.")}`;
                }
                
            } else {
                input.previousElementSibling.innerText = "Файл не выбран";
                input.files[0] = undefined;
            }

        });
    });
}//d&d