/* ==========================================
   Wedding Invitation
   Floating Decorations
========================================== */

(() => {

    const container = document.getElementById("floatingDecorations");

    if (!container) return;

    /* ==========================================
       Decoration List
    ========================================== */

    const decorations = [

        {
            icon: "✦",
            className: "gold"
        },

        {
            icon: "✧",
            className: "gold"
        },

        {
            icon: "❀",
            className: "flower"
        },

        {
            icon: "✿",
            className: "flower"
        },

        {
            icon: "❃",
            className: "leaf"
        }

    ];

    /* ==========================================
       Create Item
    ========================================== */

    function createDecoration() {

        const data =
            decorations[
                Math.floor(
                    Math.random() * decorations.length
                )
            ];

        const item =
            document.createElement("span");

        item.className =
            `float-item ${data.className}`;

        item.textContent =
            data.icon;

        item.style.left =
            Math.random() * 100 + "%";

        item.style.animationDuration =
            (8 + Math.random() * 8) + "s";

        item.style.animationDelay =
            Math.random() * 2 + "s";

        item.style.fontSize =
            (12 + Math.random() * 16) + "px";

        item.style.opacity =
            (0.35 + Math.random() * 0.45);

        container.appendChild(item);

        item.addEventListener(
            "animationend",
            () => {

                item.remove();

            },
            {
                once: true
            }
        );

    }

    /* ==========================================
       Initial Decorations
    ========================================== */

    for (let i = 0; i < 12; i++) {

        setTimeout(
            createDecoration,
            i * 250
        );

    }

    /* ==========================================
       Continuous Decorations
    ========================================== */

    setInterval(
        createDecoration,
        800
    );

})();
