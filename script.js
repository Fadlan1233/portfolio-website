console.log("SCRIPT.JS BERHASIL DIJALANKAN!");

const menuToggle = document.querySelector("#menu-toggle");
const siteNav = document.querySelector("#site-nav");

// Buka dan tutup menu mobile
menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
    );
});

// Tutup menu setelah pengunjung memilih bagian halaman
siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu navigasi");
    });
});

// Tutup menu dengan tombol Escape
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        siteNav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu navigasi");
        menuToggle.focus();
    }
});

/* ===== ANIMASI SAAT SCROLL ===== */
const revealElements = document.querySelectorAll(
    ".section, .hero-card, .section .card"
);

console.log("Elemen animasi ditemukan:", revealElements.length);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("is-visible");
    });
}

/* ===== TOMBOL KEMBALI KE ATAS ===== */
const backToTopButton = document.querySelector("#back-to-top");

if (backToTopButton) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* ===== TYPING ANIMATION ===== */
const typingText = document.querySelector("#typing-text");

if (typingText) {
    const words = [
        "Aspiring Web Developer",
        "Aspiring Programmer",
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    // Kosongkan teks agar animasi dimulai dari awal.
    typingText.textContent = "";

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (!deleting) {
            charIndex++;
            typingText.textContent = currentWord.slice(0, charIndex);

            if (charIndex >= currentWord.length) {
                deleting = true;
                setTimeout(typeEffect, 1500);
                return;
            }

            setTimeout(typeEffect, 100);
        } else {
            charIndex--;
            typingText.textContent = currentWord.slice(0, charIndex);

            if (charIndex <= 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(typeEffect, 400);
                return;
            }

            setTimeout(typeEffect, 55);
        }
    }

    setTimeout(typeEffect, 500);
}

/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.querySelector(".navbar");

function updateNavbar() {
    if (!navbar) return;

    navbar.classList.toggle("scrolled", window.scrollY > 30);
}

window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();
