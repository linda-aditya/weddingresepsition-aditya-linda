// ================================
// Wedding Aditya & Linda
// Main JavaScript
// ================================

// Ambil nama tamu dari URL
const params = new URLSearchParams(window.location.search);
const guest = params.get("to");

if (guest) {
    document.getElementById("guestName").textContent =
        decodeURIComponent(guest);
}

// Tombol Open Invitation
const openButton = document.getElementById("openInvitation");

openButton.addEventListener("click", function () {

    // Scroll ke bawah
    window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth"
    });

});
