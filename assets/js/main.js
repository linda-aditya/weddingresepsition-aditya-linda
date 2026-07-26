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

    const cover = document.getElementById("cover");

    const openInvitation =
        document.getElementById("openInvitation");

    const guestName =
        document.getElementById("guestName");

    const music =
        document.getElementById("music");

    const musicButton =
        document.getElementById("musicButton");

    const openingVideo =
        document.getElementById("openingVideo");

    const videoSection =
        document.getElementById("videoOpening");

    const coverScroll =
        document.querySelector(".cover-scroll");

    /* ==========================================
       APPLICATION STATE
    ========================================== */

    let musicPlaying = false;

    let invitationOpened = false;

    let videoFinished = false;

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
       GUEST NAME FROM URL
       ?to=Nama Tamu
    ========================================== */

    function setGuestName() {

        const params =
            new URLSearchParams(window.location.search);

        const guest =
            params.get("to");

        if (!guestName) return;

        if (guest && guest.trim() !== "") {

            guestName.textContent =
                decodeURIComponent(guest);

        } else {

            guestName.textContent =
                "Bapak / Ibu / Saudara / i";

        }

    }

    setGuestName();

    /* ==========================================
       REVEAL ANIMATION
    ========================================== */

    const revealElements = document.querySelectorAll(

        "#opening .container",
        "#couple .container",
        "#saveDate .container",
        "#countdownSection .container",
        "#location .container",
        "#rsvp .container",
        "#gift .container",
        "#closing .closing-content"

    );

    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });

    const revealObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    revealObserver.unobserve(entry.target);

                }

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
       SCROLL HINT
    ========================================== */

    function hideCoverHint() {

        if (!coverScroll) return;

        coverScroll.style.opacity = "0";

        coverScroll.style.transform =
            "translateY(15px)";

    }

    /* ==========================================
       NEXT PART
       (Cover -> Music -> Video)
    ========================================== */
                              /* ==========================================
       MUSIC
    ========================================== */

    function playMusic() {

        if (!music) return;

        music.play()
            .then(() => {

                musicPlaying = true;

                if (musicButton) {

                    musicButton.classList.add("playing");

                }

            })
            .catch(() => {});

    }

    function pauseMusic() {

        if (!music) return;

        music.pause();

        musicPlaying = false;

        if (musicButton) {

            musicButton.classList.remove("playing");

        }

    }

    /* ==========================================
       MUSIC BUTTON
    ========================================== */

    if (musicButton) {

        musicButton.addEventListener("click", () => {

            if (musicPlaying) {

                pauseMusic();

            } else {

                playMusic();

            }

        });

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

            playMusic();

            setTimeout(() => {

                showVideo();

                videoSection.scrollIntoView({

                    behavior: "smooth"

                });

            }, 350);

        });

    }

    /* ==========================================
       VIDEO END
    ========================================== */

    if (openingVideo) {

        openingVideo.addEventListener("ended", () => {

            hideVideo();

            document
                .getElementById("opening")
                ?.scrollIntoView({

                    behavior: "smooth"

                });

        });

    }

    /* ==========================================
       USER CAN SCROLL ANYTIME
    ========================================== */

    let scrollLocked = false;

    window.addEventListener("scroll", () => {

        if (scrollLocked) return;

        if (!invitationOpened) return;

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
       NEXT PART
       RSVP + COPY BUTTON
    ========================================== */
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

    /* ==========================================
       LOCAL STORAGE KEY
    ========================================== */

    const STORAGE_KEY = "wedding_guestbook";

    /* ==========================================
       LOAD MESSAGES
    ========================================== */

    function loadMessages() {

        if (!guestMessages) return;

        guestMessages.innerHTML = "";

        const data = JSON.parse(

            localStorage.getItem(STORAGE_KEY)

            || "[]"

        );

        if (data.length === 0) {

            guestMessages.innerHTML = `

                <div class="empty-message">

                    Belum ada ucapan.

                </div>

            `;

            return;

        }

        data.reverse().forEach((item) => {

            const card = document.createElement("div");

            card.className = "guest-card";

            card.innerHTML = `

                <div class="guest-card-header">

                    <strong>${item.name}</strong>

                    <span>${item.status}</span>

                </div>

                <p>

                    ${item.message}

                </p>

            `;

            guestMessages.appendChild(card);

        });

    }

    /* ==========================================
       SAVE MESSAGE
    ========================================== */

    function saveMessage(data) {

        const messages = JSON.parse(

            localStorage.getItem(STORAGE_KEY)

            || "[]"

        );

        messages.push(data);

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(messages)

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

            if (

                name === "" ||

                status === ""

            ) {

                alert(

                    "Silakan lengkapi data terlebih dahulu."

                );

                return;

            }

            saveMessage({

                name,

                status,

                message

            });

            rsvpForm.reset();

            loadMessages();

            alert(

                "Terima kasih atas doa dan ucapan Anda."

            );

        });

    }

    loadMessages();

    /* ==========================================
       COPY REKENING
    ========================================== */

    const copyButtons =

        document.querySelectorAll(

            ".copyButton"

        );

    copyButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const value =

                button.dataset.copy;

            navigator.clipboard

                .writeText(value)

                .then(() => {

                    const oldText =

                        button.innerHTML;

                    button.innerHTML =

                        "✓ Berhasil Disalin";

                    setTimeout(() => {

                        button.innerHTML =

                            oldText;

                    }, 2000);

                });

        });

    });

    /* ==========================================
       UTILITY
    ========================================== */

    function smoothScroll(id) {

        document

            .getElementById(id)

            ?.scrollIntoView({

                behavior: "smooth"

            });

    }

    /* ==========================================
       NEXT PART
       INITIALIZATION
    ========================================== */
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
       PREVENT DOUBLE CLICK
    ========================================== */

    if (openInvitation) {

        openInvitation.addEventListener("dblclick", (event) => {

            event.preventDefault();

        });

    }

    /* ==========================================
       PRELOAD VIDEO
    ========================================== */

    if (openingVideo) {

        openingVideo.load();

    }

    /* ==========================================
       ESC KEY
       Close video if still open
    ========================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (!videoFinished) {

                hideVideo();

            }

        }

    });

    /* ==========================================
       WINDOW RESIZE
    ========================================== */

    window.addEventListener("resize", () => {

        // Reserved for future responsive logic

    });

    /* ==========================================
       PAGE VISIBILITY
       Pause music when tab inactive
    ========================================== */

    document.addEventListener(

        "visibilitychange",

        () => {

            if (document.hidden) {

                if (musicPlaying) {

                    music.pause();

                }

            } else {

                if (

                    invitationOpened &&

                    musicPlaying

                ) {

                    music.play().catch(() => {});

                }

            }

        }

    );

    /* ==========================================
       SMOOTH INTERNAL LINKS
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
       FINISHED
    ========================================== */

    console.log(

        "Wedding Invitation Ready."

    );

});
