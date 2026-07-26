document.addEventListener("DOMContentLoaded", function () {

    function createFlower() {

        const flower = document.createElement("div");

        flower.className = "flower";

        flower.innerHTML = "🌸";

        flower.style.left = Math.random() * window.innerWidth + "px";

        flower.style.fontSize = (Math.random() * 15 + 18) + "px";

        flower.style.animationDuration = (Math.random() * 4 + 8) + "s";

        document.body.appendChild(flower);

        setTimeout(() => {

            flower.remove();

        },12000);

    }

    setInterval(createFlower,700);

});
