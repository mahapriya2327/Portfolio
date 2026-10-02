
// ===== 1. MOBILE NAVIGATION =====

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuBtn.textContent = isOpen ? "✕" : "☰";
    menuBtn.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuBtn.textContent = "☰";
        menuBtn.setAttribute("aria-expanded", "false");
    });
});


// ===== 2. TYPING ANIMATION =====

const typingElement = document.getElementById("typing");

const phrases = [
    "digital experiences",
    "creative websites",
    "modern designs",
    "smart solutions"
];

let phraseIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
    const phrase = phrases[phraseIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingElement.textContent = phrase.substring(
        0,
        characterIndex
    );

    let delay = deleting ? 45 : 85;

    if (!deleting && characterIndex === phrase.length) {
        deleting = true;
        delay = 1300;
    } else if (deleting && characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 350;
    }

    setTimeout(typeEffect, delay);
}

typeEffect();


// ===== 3. ACTIVE NAVIGATION =====

const pageSections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-links a");

function updateNavigation() {
    let activeSection = "home";

    pageSections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 150) {
            activeSection = section.id;
        }
    });

    navItems.forEach(link => {
        const active =
            link.getAttribute("href") === "#" + activeSection;

        link.classList.toggle("active", active);
    });
}

window.addEventListener("scroll", updateNavigation);
updateNavigation();


// ===== 4. SCROLL REVEAL ANIMATION =====

const revealElements = document.querySelectorAll(
    ".value-card, .skill-card, .project-card, .timeline-item"
);

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("visible");
    });
}


// ===== 5. CONTACT FORM =====

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = "Please complete all fields.";
        return;
    }

    // Replace with your actual email address.
    const recipient = "yourname@gmail.com";

    const subject = encodeURIComponent(
        "Portfolio enquiry from " + name
    );

    const body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
    );

    formStatus.textContent =
        "Opening your email application. Send the email to complete your message.";

    window.location.href =
        "mailto:" + recipient +
        "?subject=" + subject +
        "&body=" + body;
});


// ===== 6. FOOTER YEAR =====

// No extra setup needed; this is optional.
console.log("Gold Portfolio loaded successfully!");
