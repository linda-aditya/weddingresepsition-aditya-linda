/* ==========================================================
   Wedding Reception
   Main Javascript
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       ELEMENT
    ====================================================== */

    const loader =
        document.getElementById("loader");

    const cover =
        document.getElementById("cover");

    const openButton =
        document.getElementById("openInvitation");

    const openingAnimation =
        document.getElementById("openingAnimation");

    const openingVideo =
        document.getElementById("openingVideo");

    const continueButton =
        document.getElementById("continueButton");

    const guestName =
        document.getElementById("guestName");

    /* ======================================================
       LOADER
    ====================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            if(loader){

                loader.classList.add("fade-out");

                setTimeout(() => {

                    loader.remove();

                },800);

            }

        },1200);

    });
       /* ======================================================
       GUEST NAME
    ====================================================== */

    const params =
        new URLSearchParams(window.location.search);

    const guest =
        params.get("to");

    if(guest && guestName){

        guestName.textContent =
            decodeURIComponent(guest.replace(/\+/g," "));

    }

    /* ======================================================
       OPEN INVITATION
    ====================================================== */

    if(openButton){

        openButton.addEventListener("click", () => {

            openButton.disabled = true;

            cover.classList.add("fade-out");

            setTimeout(() => {

                cover.style.display = "none";

                document.body.style.overflowY = "hidden";

                openingAnimation.classList.add("active");

                openingAnimation.classList.add("fade-in");

                openingVideo.currentTime = 0;

                openingVideo.play().catch(()=>{});

            },700);

        });

    }
       /* ======================================================
       VIDEO END
    ====================================================== */

    if(openingVideo){

        openingVideo.addEventListener("ended", () => {

            continueButton.classList.add("show");

        });

        openingVideo.addEventListener("error", () => {

            continueButton.classList.add("show");

        });

    }

    /* ======================================================
       CONTINUE
    ====================================================== */

    if(continueButton){

        continueButton.addEventListener("click", () => {

            openingAnimation.classList.remove("fade-in");

            openingAnimation.classList.add("fade-out");

            setTimeout(() => {

                openingAnimation.classList.remove("active");

                openingAnimation.style.display="none";

                openingVideo.pause();

                openingVideo.currentTime=0;

                document.body.style.overflowY="auto";

                document.getElementById("opening")
                    .scrollIntoView({

                        behavior:"smooth"

                    });

            },700);

        });

    }
       /* ======================================================
       SCROLL REVEAL
    ====================================================== */

    const observer = new IntersectionObserver(

        (entries)=>{

            entries.forEach((entry)=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("show");

                }

            });

        },

        {

            threshold:.15

        }

    );

    document

        .querySelectorAll(".reveal")

        .forEach((section)=>{

            observer.observe(section);

        });

});
