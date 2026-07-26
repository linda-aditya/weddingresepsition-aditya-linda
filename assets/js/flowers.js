/* ==========================================
   Floating Decorations
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("floatingDecorations");

    if (!container) return;

    const icons = [

        {
            class: "gold",
            icon: "✦"
        },

        {
            class: "gold",
            icon: "✧"
        },

        {
            class: "flower",
            icon: "❀"
        },

        {
            class: "flower",
            icon: "✿"
        },

        {
            class: "leaf",
            icon: "❃"
        }

    ];

    function createItem() {

        const data = icons[
            Math.floor(Math.random() * icons.length)
        ];

        const item = document.createElement("span");

        item.className = `float-item ${data.class}`;

        item.innerHTML = data.icon;

        item.style.left = Math.random() * 100 + "%";

        item.style.animationDuration =
            (8 + Math.random() * 6) + "s";

        item.style.animationDelay =
            Math.random() * 2 + "s";

        item.style.fontSize =
            (12 + Math.random() * 14) + "px";

        item.style.opacity =
            (0.3 + Math.random() * 0.5);

        container.appendChild(item);

        item.addEventListener("animationend", () => {

            item.remove();

        });

    }

    setInterval(createItem, 600);

});
