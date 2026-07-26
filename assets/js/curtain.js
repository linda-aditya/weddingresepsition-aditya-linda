/* ==========================================
   CURTAIN EFFECT
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const openButton = document.getElementById("openInvitation");
    const cover = document.getElementById("cover");

    if (!openButton || !cover) return;

    openButton.addEventListener("click", () => {

        cover.classList.add("curtain-open");

        setTimeout(() => {

            cover.style.display = "none";

        }, 1500);

    });

});
