/* ==========================================
   Wedding Invitation
   Countdown Timer
========================================== */

(() => {

    /* ==========================================
       Target Date
    ========================================== */

    const targetDate = new Date(
        "2026-08-05T15:00:00+07:00"
    ).getTime();

    /* ==========================================
       Elements
    ========================================== */

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    if (
        !days ||
        !hours ||
        !minutes ||
        !seconds
    ) return;

    /* ==========================================
       Format Number
    ========================================== */

    function format(value) {

        return String(value).padStart(2, "0");

    }

    /* ==========================================
       Update Countdown
    ========================================== */

    function updateCountdown() {

        const now = Date.now();

        let distance = targetDate - now;

        if (distance <= 0) {

            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";

            clearInterval(timer);

            return;

        }

        const dayValue = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        distance %= (1000 * 60 * 60 * 24);

        const hourValue = Math.floor(
            distance / (1000 * 60 * 60)
        );

        distance %= (1000 * 60 * 60);

        const minuteValue = Math.floor(
            distance / (1000 * 60)
        );

        distance %= (1000 * 60);

        const secondValue = Math.floor(
            distance / 1000
        );

        days.textContent = format(dayValue);
        hours.textContent = format(hourValue);
        minutes.textContent = format(minuteValue);
        seconds.textContent = format(secondValue);

    }

    /* ==========================================
       Start Countdown
    ========================================== */

    updateCountdown();

    const timer = setInterval(
        updateCountdown,
        1000
    );

})();
