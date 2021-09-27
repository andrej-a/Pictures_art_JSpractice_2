"use strict";

export function getPictureHover(selector) {
    const parentBlocks = document.querySelectorAll(selector);

    parentBlocks.forEach((block) => {
        block.addEventListener("mouseover", () => {
            showIMG(block);
        });

        block.addEventListener("mouseout", () => {
            hideIMG(block);
        });
    });

    function showIMG(block) {
        const img = block.querySelector("img");
        img.src = img.src.slice(0,-4) + "-1.png";

        block.querySelectorAll("p:not(.sizes-hit)").forEach(p => {
            p.style.display = "none";
        });
    }

    function hideIMG(block) {
        const img = block.querySelector("img");
        img.src = img.src.slice(0,-6) + ".png";

        block.querySelectorAll("p:not(.sizes-hit)").forEach(p => {
            p.style.display = "";
        });
    }
}//getPictureHover