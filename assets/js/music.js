/* ==========================================
   Wedding Invitation
   Music Controller
========================================== */

(() => {

    const music = document.getElementById("music");
    const button = document.getElementById("musicButton");

    if (!music || !button) return;

    let playing = false;

    /* ==========================================
       Update Button
    ========================================== */

    function updateButton() {

        if (playing) {

            button.classList.add("playing");

            button.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

        } else {

            button.classList.remove("playing");

            button.innerHTML =
                '<i class="fa-solid fa-music"></i>';

        }

    }

    /* ==========================================
       Play Music
    ========================================== */

    async function playMusic() {

        try {

            await music.play();

            playing = true;

            updateButton();

        } catch (error) {

            console.warn("Music blocked:", error);

        }

    }

    /* ==========================================
       Pause Music
    ========================================== */

    function pauseMusic() {

        music.pause();

        playing = false;

        updateButton();

    }

    /* ==========================================
       Toggle
    ========================================== */

    function toggleMusic() {

        if (playing) {

            pauseMusic();

        } else {

            playMusic();

        }

    }

    /* ==========================================
       Button Click
    ========================================== */

    button.addEventListener("click", toggleMusic);

    /* ==========================================
       Sync State
    ========================================== */

    music.addEventListener("play", () => {

        playing = true;

        updateButton();

    });

    music.addEventListener("pause", () => {

        playing = false;

        updateButton();

    });

    music.addEventListener("ended", () => {

        playing = false;

        updateButton();

    });

    /* ==========================================
       Global Function
    ========================================== */

    window.playMusic = playMusic;
    window.pauseMusic = pauseMusic;
    window.toggleMusic = toggleMusic;

    updateButton();

})();
