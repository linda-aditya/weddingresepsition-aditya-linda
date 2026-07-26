/* ==========================================
   MUSIC CONTROLLER
========================================== */

const music = document.getElementById("music");
const musicButton = document.getElementById("musicButton");

let isPlaying = false;

// Putar musik
function playMusic() {

    if (!music) return;

    music.play().then(() => {

        isPlaying = true;

        if (musicButton) {

            musicButton.innerHTML = "🎵";

        }

    }).catch(err => {

        console.log(err);

    });

}

// Pause musik
function pauseMusic() {

    if (!music) return;

    music.pause();

    isPlaying = false;

    if (musicButton) {

        musicButton.innerHTML = "🔇";

    }

}

// Toggle musik
if (musicButton) {

    musicButton.addEventListener("click", () => {

        if (isPlaying) {

            pauseMusic();

        } else {

            playMusic();

        }

    });

}
window.playMusic = playMusic;
window.pauseMusic = pauseMusic;
