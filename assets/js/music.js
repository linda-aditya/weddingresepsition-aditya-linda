"use strict";

/* =========================================================
   WEDDING RECEPTION
   Aditya & Linda
   Music.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       DOM ELEMENTS
    ========================================== */

    const music =
        document.getElementById("music");

    const musicButton =
        document.getElementById("musicButton");

    if (!music || !musicButton) {

        return;

    }

    /* ==========================================
       APPLICATION STATE
    ========================================== */

    let isPlaying = false;

    /* ==========================================
       BUTTON UI
    ========================================== */

    function updateButton() {

        if (isPlaying) {

            musicButton.classList.add("playing");

            musicButton.innerHTML =

                '<i class="fa-solid fa-pause"></i>';

        } else {

            musicButton.classList.remove("playing");

            musicButton.innerHTML =

                '<i class="fa-solid fa-music"></i>';

        }

    }

    /* ==========================================
       PLAY MUSIC
    ========================================== */

    async function play() {

        try {

            await music.play();

            isPlaying = true;

            updateButton();

        } catch (error) {

            console.warn(

                "Music autoplay blocked.",

                error

            );

        }

    }

    /* ==========================================
       PAUSE MUSIC
    ========================================== */

    function pause() {

        music.pause();

        isPlaying = false;

        updateButton();

    }

    /* ==========================================
       NEXT PART
       Toggle + Public API
    ========================================== */
                              /* ==========================================
       TOGGLE MUSIC
    ========================================== */

    function toggle() {

        if (isPlaying) {

            pause();

        } else {

            play();

        }

    }

    /* ==========================================
       PUBLIC API
    ========================================== */

    window.WeddingMusic = {

        play,

        pause,

        toggle,

        isPlaying() {

            return isPlaying;

        }

    };

    /* ==========================================
       MUSIC BUTTON
    ========================================== */

    musicButton.addEventListener("click", () => {

        toggle();

    });

    /* ==========================================
       AUDIO EVENTS
    ========================================== */

    music.addEventListener("play", () => {

        isPlaying = true;

        updateButton();

    });

    music.addEventListener("pause", () => {

        isPlaying = false;

        updateButton();

    });

    music.addEventListener("ended", () => {

        isPlaying = false;

        updateButton();

    });

    /* ==========================================
       INITIAL BUTTON STATE
    ========================================== */

    updateButton();

    /* ==========================================
       NEXT PART
       Visibility + Auto Resume
    ========================================== */
                              /* ==========================================
       PAGE VISIBILITY
    ========================================== */

    document.addEventListener(

        "visibilitychange",

        () => {

            if (document.hidden) {

                if (isPlaying) {

                    music.pause();

                }

            } else {

                if (isPlaying) {

                    music.play().catch(() => {});

                }

            }

        }

    );

    /* ==========================================
       AUTOPLAY RECOVERY
    ========================================== */

    let firstInteraction = false;

    function recoverAutoplay() {

        if (firstInteraction) return;

        firstInteraction = true;

        if (isPlaying) {

            music.play().catch(() => {});

        }

    }

    [

        "click",

        "touchstart",

        "keydown"

    ].forEach((eventName) => {

        document.addEventListener(

            eventName,

            recoverAutoplay,

            {

                once: true

            }

        );

    });

    /* ==========================================
       KEYBOARD SHORTCUT
       Press "M"
    ========================================== */

    document.addEventListener(

        "keydown",

        (event) => {

            if (

                event.target.tagName === "INPUT" ||

                event.target.tagName === "TEXTAREA"

            ) {

                return;

            }

            if (

                event.key === "m" ||

                event.key === "M"

            ) {

                toggle();

            }

        }

    );

    /* ==========================================
       AUDIO ERROR HANDLER
    ========================================== */

    music.addEventListener(

        "error",

        () => {

            console.warn(

                "Music file failed to load."

            );

        }

    );

    /* ==========================================
       AUDIO READY
    ========================================== */

    music.addEventListener(

        "canplay",

        () => {

            console.log(

                "Music ready."

            );

        }

    );

    /* ==========================================
       NEXT PART
       Initialization + Finish
    ========================================== */
                              /* ==========================================
       INITIALIZATION
    ========================================== */

    function initializeMusic() {

        /* Volume awal */

        music.volume = 0.5;

        /* Sinkronkan tombol */

        updateButton();

        console.log(
            "%cMusic Module",
            "color:#D4AF37;font-weight:bold;"
        );

        console.log(
            "Music controller initialized."
        );

    }

    initializeMusic();

    /* ==========================================
       BEFORE UNLOAD
    ========================================== */

    window.addEventListener("beforeunload", () => {

        pause();

    });

    /* ==========================================
       DEBUG (Development Only)
    ========================================== */

    window.WeddingMusic.version = "1.0.0";

    window.WeddingMusic.getAudio = () => music;

    /* ==========================================
       FINISHED
    ========================================== */

    console.log(

        "Wedding Music Ready."

    );

});
