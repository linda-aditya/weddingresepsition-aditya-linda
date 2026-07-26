/* ==========================================
   Wedding Aditya & Linda
   Main Javascript
========================================== */

document.addEventListener("DOMContentLoaded", () => {

const loader = document.getElementById("loader");
const openButton = document.getElementById("openInvitation");
const music = document.getElementById("music");
const guestName = document.getElementById("guestName");
const musicButton = document.getElementById("musicButton");

/* ==========================
   Loader
========================== */

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.visibility = "hidden";

    },1200);

});

/* ==========================
   Guest Name
========================== */

const params = new URLSearchParams(window.location.search);

const guest = params.get("to");

if(guest){

    guestName.innerHTML = guest.replace(/\+/g," ");

}

/* ==========================
   Open Invitation
========================== */

const openingAnimation = document.getElementById("openingAnimation");
const openingVideo = document.getElementById("openingVideo");
const continueButton = document.getElementById("continueButton");

openButton.addEventListener("click", () => {

    // sembunyikan cover
    document.getElementById("cover").style.display = "none";

    // tampilkan video opening
    openingAnimation.classList.add("active");

    // putar video
    openingVideo.play();

    // putar musik
    music.play();

    // tampilkan tombol musik
    musicButton.classList.add("show");

});

// setelah video selesai
openingVideo.addEventListener("ended", () => {

    continueButton.style.display = "block";

});

// tombol lanjut
continueButton.addEventListener("click", () => {

    openingAnimation.style.display = "none";

    document.getElementById("opening").scrollIntoView({

        behavior:"smooth"

    });

});

/* ==========================
   Music Button
========================== */

let playing = true;

musicButton.addEventListener("click",()=>{

    if(playing){

        music.pause();

        musicButton.innerHTML="🔇";

    }else{

        music.play();

        musicButton.innerHTML="🎵";

    }

    playing=!playing;

});


/* ==========================
   Reveal Animation
========================== */

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.15
});

document.querySelectorAll("section").forEach(sec=>{

observer.observe(sec);

});


});
