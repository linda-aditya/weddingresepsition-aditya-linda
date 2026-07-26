/* ==========================================
   Wedding Aditya & Linda
   Main Javascript
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ELEMENT
    ========================================== */

    const loader = document.getElementById("loader");
    const cover = document.getElementById("cover");
    const openButton = document.getElementById("openInvitation");

    const openingAnimation = document.getElementById("openingAnimation");
    const openingVideo = document.getElementById("openingVideo");
    const continueButton = document.getElementById("continueButton");

    const musicButton =
       document.getElementById("musicButton");

    const guestName = document.getElementById("guestName");

    const floatingContainer =
        document.getElementById("floatingDecorations");

    /* ==========================================
       LOADER
    ========================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("fade-out");

            loader.addEventListener("animationend", () => {

                loader.remove();

            }, { once: true });

        }, 1200);

    });

    /* ==========================================
       GUEST NAME
    ========================================== */

    const params = new URLSearchParams(window.location.search);

    const guest = params.get("to");

    if (guest && guestName) {

        guestName.innerHTML =
            guest.replace(/\+/g, " ");

    }

/* ==========================================
   OPEN INVITATION
========================================== */

openButton.addEventListener("click", () => {

    openButton.disabled = true;

    cover.classList.add("fade-out");

    cover.addEventListener("animationend", () => {

        cover.style.display = "none";

        openingAnimation.classList.add("active");
        openingAnimation.classList.add("fade-in");

        document.body.style.overflow = "hidden";

        openingVideo.currentTime = 0;

        openingVideo.play().catch((err) => {

            console.log(err);

        });

        console.log("Klik Open");

console.log("playMusic =", typeof playMusic);

console.log("=== OPEN INVITATION DIKLIK ===");

console.log("Status fungsi playMusic:", typeof playMusic);

if (typeof playMusic === "function") {

    console.log("✅ Fungsi playMusic ditemukan, mencoba memutar musik...");

    playMusic();

} else {

    console.error("❌ Fungsi playMusic TIDAK ditemukan.");

}
        musicButton.classList.add("show");

    }, { once: true });

});
    /* ==========================================
       VIDEO FINISHED
    ========================================== */

    openingVideo.addEventListener("ended", () => {

        continueButton.classList.add("show");

        continueButton.focus();

    });
   
    /* ==========================================
       VIDEO ERROR
    ========================================== */

    openingVideo.addEventListener("error", () => {

        continueButton.classList.add("show");

    });

    /* ==========================================
       CONTINUE
    ========================================== */

    continueButton.addEventListener("click", () => {

        openingAnimation.classList.remove("fade-in");

        openingAnimation.classList.add("fade-out");

        setTimeout(() => {

            openingAnimation.classList.remove("active");

            openingAnimation.style.display = "none";

            continueButton.classList.remove("show");

            openingVideo.pause();

            openingVideo.currentTime = 0;

            document.body.style.overflowY = "auto";

            document.getElementById("opening").scrollIntoView({

                behavior: "smooth"

            });

        }, 800);

    });

    /* ==========================================
       SCROLL ANIMATION
    ========================================== */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.15

    });

    document.querySelectorAll("section").forEach((section) => {

        observer.observe(section);

    });

    /* ==========================================
       FLOATING DECORATIONS
    ========================================== */

    if (floatingContainer) {

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
                icon: "🌸"
            },

            {
                class: "leaf",
                icon: "🍃"
            }

        ];

        function createFloatingItem() {

            const data =
                icons[Math.floor(Math.random() * icons.length)];

            const item =
                document.createElement("span");

            item.className =
                `float-item ${data.class}`;

            item.innerHTML =
                data.icon;

            item.style.left =
                Math.random() * 100 + "%";

            item.style.animationDuration =
                (8 + Math.random() * 6) + "s";

            item.style.animationDelay =
                Math.random() * 2 + "s";

            item.style.opacity =
                0.3 + Math.random() * 0.5;

            item.style.fontSize =
                (14 + Math.random() * 18) + "px";

            floatingContainer.appendChild(item);

            item.addEventListener("animationend", () => {

                item.remove();

            });

        }

        setInterval(createFloatingItem, 600);

    }

});
