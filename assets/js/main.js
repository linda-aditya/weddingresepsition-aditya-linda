"use strict";

/* =========================================================
   WEDDING RECEPTION
   Aditya & Linda
   Main.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       DOM ELEMENTS
    ========================================== */

    const loader = document.getElementById("loader");

    const openInvitation =
        document.getElementById("openInvitation");

    const guestName =
        document.getElementById("guestName");

    const openingVideo =
        document.getElementById("openingVideo");

    const videoSection =
        document.getElementById("videoOpening");

    const coverScroll =
        document.querySelector(".cover-scroll");

    /* ==========================================
       APPLICATION STATE
    ========================================== */

    let invitationOpened = false;

    let videoFinished = false;

    let scrollLocked = false;

    /* ==========================================
       LOADER
    ========================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

            loader.style.pointerEvents = "none";

        }, 800);

    });

    /* ==========================================
       GUEST NAME
    ========================================== */

    function setGuestName() {

        const params =
            new URLSearchParams(window.location.search);

        const guest =
            params.get("to");

        if (!guestName) return;

        guestName.textContent =

            guest && guest.trim() !== ""

                ? decodeURIComponent(guest)

                : "Bapak / Ibu / Saudara / i";

    }

    setGuestName();

    /* ==========================================
       REVEAL ANIMATION
    ========================================== */

    const revealElements = document.querySelectorAll(

        "#opening .container," +
        "#couple .container," +
        "#saveDate .container," +
        "#countdownSection .container," +
        "#location .container," +
        "#rsvp .container," +
        "#gift .container," +
        "#closing .closing-content"

    );

    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });

    const revealObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("active");

                revealObserver.unobserve(entry.target);

            });

        },

        {

            threshold: 0.15

        }

    );

    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

    /* ==========================================
       COVER HINT
    ========================================== */

    function hideCoverHint() {

        if (!coverScroll) return;

        coverScroll.style.opacity = "0";

        coverScroll.style.transform =
            "translateY(15px)";

    }

    /* ==========================================
       VIDEO
    ========================================== */

    function showVideo() {

        if (!videoSection || !openingVideo) return;

        videoSection.classList.add("active");

        openingVideo.currentTime = 0;

        openingVideo.play().catch(() => {});

    }

    function hideVideo() {

        if (!videoSection || !openingVideo) return;

        videoSection.classList.remove("active");

        openingVideo.pause();

        videoFinished = true;

    }
       /* ==========================================
       OPEN INVITATION
    ========================================== */

    if (openInvitation) {

        openInvitation.addEventListener("click", () => {

            if (invitationOpened) return;

            invitationOpened = true;

            hideCoverHint();

            /* Play Music */

            if (window.WeddingMusic) {

                window.WeddingMusic.play();

            }

            /* Show Video */

            setTimeout(() => {

                showVideo();

                videoSection?.scrollIntoView({

                    behavior: "smooth"

                });

            }, 350);

        });

        /* Prevent Double Click */

        openInvitation.addEventListener("dblclick", (event) => {

            event.preventDefault();

        });

    }

    /* ==========================================
       VIDEO END
    ========================================== */

    if (openingVideo) {

        openingVideo.addEventListener("ended", () => {

    setTimeout(() => {

        hideVideo();

        document
            .getElementById("opening")
            ?.scrollIntoView({

                behavior: "smooth"

            });

    }, 1200); // tunggu 1,2 detik setelah video selesai

});

    }

    /* ==========================================
       USER CAN SCROLL ANYTIME
    ========================================== */

    window.addEventListener("scroll", () => {

        if (scrollLocked) return;

        if (!invitationOpened) return;

        if (!videoSection) return;

        const trigger = window.innerHeight * 0.45;

        if (

            window.scrollY >

            (videoSection.offsetTop + trigger)

        ) {

            scrollLocked = true;

            hideVideo();

        }

    });

    /* ==========================================
       SCROLL INDICATOR
    ========================================== */

    const scrollIndicator =

        document.querySelector(".scrollIndicator");

    if (scrollIndicator) {

        setInterval(() => {

            scrollIndicator.classList.toggle("pulse");

        }, 1200);

    }

    /* ==========================================
       ESC CLOSE VIDEO
    ========================================== */

    document.addEventListener("keydown", (event) => {

        if (

            event.key === "Escape" &&

            !videoFinished

        ) {

            hideVideo();

        }

    });

    /* ==========================================
       PRELOAD VIDEO
    ========================================== */

    if (openingVideo) {

        openingVideo.load();

    }

    /* ==========================================
       PAGE VISIBILITY
    ========================================== */

    document.addEventListener(

        "visibilitychange",

        () => {

            if (!window.WeddingMusic) return;

            if (!invitationOpened) return;

            if (document.hidden) {

                window.WeddingMusic.pause();

            } else {

                window.WeddingMusic.play();

            }

        }

    );
       /* ==========================================
       RSVP ELEMENTS
    ========================================== */

    const rsvpForm =
        document.getElementById("rsvpForm");

    const guestInput =
        document.getElementById("guestInput");

    const guestStatus =
        document.getElementById("guestStatus");

    const guestMessage =
        document.getElementById("guestMessage");

    const guestMessages =
        document.getElementById("guestMessages");

    const STORAGE_KEY = "wedding_guestbook";

    /* ==========================================
       LOAD GUEST BOOK
    ========================================== */

    function loadMessages() {

        if (!guestMessages) return;

        guestMessages.innerHTML = "";

        const data = JSON.parse(

            localStorage.getItem(STORAGE_KEY) || "[]"

        );

        if (data.length === 0) {

            guestMessages.innerHTML = `

                <div class="empty-message">

                    Belum ada ucapan.

                </div>

            `;

            return;

        }

        data
            .slice()
            .reverse()
            .forEach((item) => {

                const card = document.createElement("div");

                card.className = "guest-card";

                card.innerHTML = `

                    <div class="guest-card-header">

                        <strong>${item.name}</strong>

                        <span>${item.status}</span>

                    </div>

                    <p>${item.message || "-"}</p>

                `;

                guestMessages.appendChild(card);

            });

    }

    /* ==========================================
       SAVE MESSAGE
    ========================================== */

    function saveMessage(name, status, message) {

        const data = JSON.parse(

            localStorage.getItem(STORAGE_KEY) || "[]"

        );

        data.push({

            name,

            status,

            message,

            date: Date.now()

        });

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(data)

        );

    }

    /* ==========================================
       RSVP SUBMIT
    ========================================== */

    if (rsvpForm) {

        rsvpForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const name =
                guestInput.value.trim();

            const status =
                guestStatus.value;

            const message =
                guestMessage.value.trim();

            if (!name || !status) {

                alert(

                    "Silakan lengkapi nama dan konfirmasi kehadiran."

                );

                return;

            }

            saveMessage(

                name,

                status,

                message

            );

            rsvpForm.reset();

            loadMessages();

            alert(

                "Terima kasih atas doa dan ucapannya."

            );

        });

    }

    loadMessages();

    /* ==========================================
       COPY REKENING
    ========================================== */

    const copyButtons =

        document.querySelectorAll(".copyButton");

    copyButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const number =

                button.dataset.copy;

            navigator.clipboard

                .writeText(number)

                .then(() => {

                    const originalText =

                        button.innerHTML;

                    button.innerHTML =

                        '<i class="fa-solid fa-check"></i> Berhasil Disalin';

                    button.disabled = true;

                    setTimeout(() => {

                        button.innerHTML =

                            originalText;

                        button.disabled = false;

                    }, 2000);

                })

                .catch(() => {

                    alert(

                        "Nomor gagal disalin."

                    );

                });

        });

    });
/* ==========================================
   SMOOTH SCROLL
========================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener("click", (event) => {

            const target =
                document.querySelector(
                    link.getAttribute("href")
                );

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        });

    });

/* ==========================================
   INITIALIZATION
========================================== */

function initializeApplication() {

    console.log(
        "%cWedding Reception",
        "color:#D4AF37;font-size:16px;font-weight:bold;"
    );

    console.log(
        "Application initialized successfully."
    );

}

initializeApplication();

/* ==========================================
   WINDOW RESIZE
========================================== */

window.addEventListener("resize", () => {

});

/* ==========================================
   FINISHED
========================================== */

console.log(
    "Wedding Invitation Ready."
);

}); // <-- PENUTUP document.addEventListener("DOMContentLoaded", ...)
