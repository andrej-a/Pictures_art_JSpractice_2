"use strict";

export function getPictureHover(selector) {
    const parentBlocks = document.querySelectorAll(selector);

    parentBlocks.forEach((block) => {
        const img = block.querySelector("img");

        block.addEventListener("mouseover", () => {
            toggleIMG(block, `${img.src.slice(0,-4)}-1.png`, img);
        });

        block.addEventListener("mouseout", () => {
            toggleIMG(block, `${img.src.slice(0,-6)}.png`, img);
        });
    });

    function toggleIMG(block, srcValue, img) {
        img.src = srcValue;

        block.querySelectorAll("p:not(.sizes-hit)").forEach(p => {
            p.style.display === "none" ? p.style.display = "" : p.style.display = "none";
        });
    }

}//getPictureHover