/* ==========================================
   Wedding Invitation
   Premium Sparkle Effect
========================================== */

(() => {

    /* ==========================================
       Configuration
    ========================================== */

    const MAX_SPARKLES = 18;

    let sparkleCount = 0;

    /* ==========================================
       Create Sparkle
    ========================================== */

    function createSparkle() {

        if (sparkleCount >= MAX_SPARKLES) return;

        sparkleCount++;

        const sparkle = document.createElement("span");

        sparkle.className = "sparkle";

        sparkle.style.left =
            Math.random() * window.innerWidth + "px";

        sparkle.style.top =
            Math.random() * window.innerHeight + "px";

        sparkle.style.width =
            (4 + Math.random() * 6) + "px";

        sparkle.style.height =
            sparkle.style.width;

        sparkle.style.animationDuration =
            (2 + Math.random() * 2) + "s";

        sparkle.style.animationDelay =
            Math.random() * 0.5 + "s";

        document.body.appendChild(sparkle);

        sparkle.addEventListener("animationend", () => {

            sparkle.remove();

            sparkleCount--;

        }, {
            once: true
        });

    }

    /* ==========================================
       Initial Sparkles
    ========================================== */

    for (let i = 0; i < 8; i++) {

        setTimeout(createSparkle, i * 250);

    }

    /* ==========================================
       Continuous Sparkles
    ========================================== */

    setInterval(createSparkle, 700);

})();
