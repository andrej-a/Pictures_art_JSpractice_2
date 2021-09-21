"use strict";

export function mask(selector) {

    function setCursorEnd(elem) {
        document.querySelectorAll(elem).forEach(input => {
            input.addEventListener("click", () => {
                    input.selectionStart = input.selectionEnd = input.value.length;
            });
        });
    }

    setCursorEnd(selector);

    function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) {//проверка поддержки старых браузеров
            elem.setSelectionRange(pos, pos);
        } else if (elem.createTextRange) {//ручной полифилл для ИЭ
            let range = elem.createTextRange();

            range.collapse(true);//границы диапазона
            range.moveEnd("character", pos);//конечная точка выделения
            range.moveStart("character", pos);//начальная точка
            range.select();//устанавливаем
        }
    }

    function createMask(event) {
        let matrix = "+375 (__) ___ __ __";//создаем матрицу. можно из БД или сервера
        let i = 0; //счетчик
        let def = matrix.replace(/\D/g, ""); 
        let value = this.value.replace(/\D/g, "");//работает на основе ввода пользователя

        if (def.length >= value.length) {
            value = def;
        }
                    /*каждый символ, и в а тоже*/
        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < value.length ? value.charAt(i++) : i >= value.length ? "" : a;
        });


        if (event.type === "blur") {
            if (this.value.length <= 5) {
                this.value = "";
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    let inputs = document.querySelectorAll(selector);
    inputs.forEach(input =>{
        input.addEventListener("input", createMask);
        input.addEventListener("focus", createMask);
        input.addEventListener("blur", createMask);
    });
}//mask