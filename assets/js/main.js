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

    const music = document.getElementById("music");
    const musicButton = document.getElementById("musicButton");

    const guestName = document.getElementById("guestName");


/* ==========================================
   LOADER
========================================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.classList.add("fade-out");

        setTimeout(() => {

            loader.remove();

        }, 800);

    }, 1200);

});

    /* ==========================================
       GUEST NAME
    ========================================== */

    const params = new URLSearchParams(window.location.search);
    const guest = params.get("to");

    if (guest) {

        guestName.innerHTML = guest.replace(/\+/g, " ");

    }


    /* ==========================================
       OPEN INVITATION
    ========================================== */

    openButton.addEventListener("click", () => {

        cover.classList.add("fade-out");

        setTimeout(() => {

            cover.style.display = "none";

            openingAnimation.classList.add("active");
            openingAnimation.classList.add("fade-in");

            document.body.style.overflow = "hidden";

            music.play();

            musicButton.classList.add("show");

            openingVideo.currentTime = 0;

            openingVideo.play();

        }, 800);

    });


    /* ==========================================
       VIDEO SELESAI
    ========================================== */

    openingVideo.addEventListener("ended", () => {

        continueButton.classList.add("show");

    });


    /* ==========================================
       LANJUT
    ========================================== */

    continueButton.addEventListener("click", () => {

        openingAnimation.classList.remove("fade-in");
        openingAnimation.classList.add("fade-out");

        setTimeout(() => {

            openingAnimation.style.display = "none";

            document.body.style.overflowY = "auto";

            document.getElementById("opening").scrollIntoView({

                behavior: "smooth"

            });

        }, 800);

    });


    /* ==========================================
       MUSIC
    ========================================== */

    let playing = true;

    musicButton.addEventListener("click", () => {

        if (playing) {

            music.pause();

            musicButton.innerHTML =
                '<i class="fa-solid fa-volume-xmark"></i>';

        } else {

            music.play();

            musicButton.innerHTML =
                '<i class="fa-solid fa-music"></i>';

        }

        playing = !playing;

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

});
