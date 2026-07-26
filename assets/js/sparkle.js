document.addEventListener("DOMContentLoaded", () => {

    function createSparkle() {

        const sparkle = document.createElement("div");

        sparkle.className = "sparkle";

        sparkle.style.left = Math.random() * window.innerWidth + "px";
        sparkle.style.top = Math.random() * window.innerHeight + "px";

        sparkle.style.animationDuration =
            (Math.random() * 2 + 2) + "s";

        document.body.appendChild(sparkle);

        setTimeout(() => {

            sparkle.remove();

        },3000);

    }

    setInterval(createSparkle,250);

});
