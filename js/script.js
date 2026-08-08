// ================================
// Mobile Menu
// ================================

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Close menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


// ================================
// Smooth Scrolling
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({

                behavior: "smooth"

            });

    });

});


// ================================
// Sticky Navbar Shadow
// ================================

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 8px 25px rgba(0,0,0,.15)";

    }

    else {

        header.style.boxShadow =
            "0 5px 20px rgba(0,0,0,.05)";

    }

});


// ================================
// Dark Mode
// ================================

const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const icon = darkBtn.querySelector("i");

    if (document.body.classList.contains("dark-mode")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    }

    else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});


// ================================
// Hero Button Animation
// ================================

const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");

buttons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-5px)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translateY(0px)";

    });

});
// ===============================
// Animated Counters
// ===============================

const counters = document.querySelectorAll(".counter");

const startCounters = () => {

    counters.forEach(counter => {

        const target = +counter.getAttribute("data-target");

        let count = 0;

        const speed = target / 100;

        const update = () => {

            if (count < target) {

                count += speed;

                counter.innerText = Math.ceil(count);

                requestAnimationFrame(update);

            } else {

                counter.innerText = target + (target === 98 ? "%" : "+");

            }

        };

        update();

    });

};

const statsSection = document.querySelector("#statistics");

let started = false;

window.addEventListener("scroll", () => {

    const sectionTop = statsSection.offsetTop - 400;

    if (!started && window.scrollY > sectionTop) {

        started = true;

        startCounters();

    }

});
// ===============================
// FAQ Accordion
// ===============================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach(faq => {

            if(faq !== item){

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});
// ===============================
// Contact Form
// ===============================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const data = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            subject: document.getElementById("subject").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        console.log("Sending Data:", data);

        try {

            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            console.log("Server Response:", result);

            if (response.ok) {
                alert("✅ Message Sent Successfully!");
                contactForm.reset();
            } else {
                alert(result.message || "Failed to send message.");
            }

        } catch (error) {

            console.error(error);
            alert("❌ Server Error");

        }

    });

}
// ===============================
// Back To Top
// ===============================

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// ===============================
// Scroll Reveal Animation
// ===============================

const revealElements=document.querySelectorAll("section");

const reveal=()=>{

    revealElements.forEach(section=>{

        const top=section.getBoundingClientRect().top;

        const visible=window.innerHeight-100;

        if(top<visible){

            section.style.opacity="1";

            section.style.transform="translateY(0)";

        }

    });

};

revealElements.forEach(section=>{

    section.style.opacity="0";

    section.style.transform="translateY(60px)";

    section.style.transition=".8s";

});

window.addEventListener("scroll",reveal);

reveal();

// ===============================
// Dynamic Services
// ===============================

const servicesContainer = document.getElementById("servicesContainer");

async function loadServices() {

    if (!servicesContainer) {
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/api/services");

        const result = await response.json();

        console.log("Services:", result);

        if (!result.success) {
            servicesContainer.innerHTML =
                "<p>Unable to load services.</p>";
            return;
        }

        if (result.data.length === 0) {
            servicesContainer.innerHTML =
                "<p>No services available.</p>";
            return;
        }

        servicesContainer.innerHTML = "";

        result.data.forEach(service => {

            const card = document.createElement("div");

            card.className = "service-card";

            card.innerHTML = `
                <i class="${service.icon}"></i>

                <h3>${service.title}</h3>

                <p>${service.description}</p>
            `;

            servicesContainer.appendChild(card);

        });

    } catch (error) {

        console.error("Services Error:", error);

        servicesContainer.innerHTML =
            "<p>Unable to connect to server.</p>";

    }
}

loadServices();
// ===============================
// Choose Pricing Plan
// ===============================

// ===============================
// Choose Pricing Plan
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const planButtons = document.querySelectorAll(".choose-plan");

    planButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedPlan = button.dataset.plan;

            const subjectInput = document.getElementById("subject");

            if (subjectInput) {
                subjectInput.value = `Interested in ${selectedPlan}`;
            }

            const contactSection = document.getElementById("contact");

            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: "smooth"
                });
            }

        });

    });

});