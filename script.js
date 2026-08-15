/* =========================================================
   YOURPERSONALASSISTANT
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* MOBILE MENU */
    const menuBtn = document.getElementById("menuBtn");
    const mainNav = document.getElementById("mainNav");

    if (menuBtn && mainNav) {
        menuBtn.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("active");
            menuBtn.setAttribute("aria-expanded", String(isOpen));
            menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
            menuBtn.textContent = isOpen ? "×" : "☰";
        });

        mainNav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute("aria-label", "Open menu");
                menuBtn.textContent = "☰";
            });
        });
    }

    /* IMAGE MODAL */
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalClose = document.getElementById("modalClose");
    const modalEmail = document.getElementById("modalEmail");
    const modalBackground = document.querySelector(".modal-background");
    const clickableImages = document.querySelectorAll(".clickable-image");

    function openModal(card) {
        if (!modal) return;

        const image = card.querySelector("img");
        const title = card.dataset.title || "YourPersonalAssistant";
        const description = card.dataset.description || "Professional remote assistance and digital support services.";

        if (image && modalImage) {
            modalImage.src = image.currentSrc || image.src;
            modalImage.alt = image.alt || title;
        }

        if (modalTitle) modalTitle.textContent = title;
        if (modalDescription) modalDescription.textContent = description;

        if (modalEmail) {
            modalEmail.href = "mailto:smallbing7@gmail.com?subject=" + encodeURIComponent(title + " Service Enquiry");
        }

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        if (modalClose) modalClose.focus();
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    clickableImages.forEach(card => {
        card.addEventListener("click", event => {
            if (event.target.closest("a, button")) return;
            openModal(card);
        });
    });

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalBackground) modalBackground.addEventListener("click", closeModal);

    /* ESCAPE KEY */
    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;

        if (modal && modal.classList.contains("active")) closeModal();

        if (mainNav && mainNav.classList.contains("active")) {
            mainNav.classList.remove("active");
            if (menuBtn) {
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute("aria-label", "Open menu");
                menuBtn.textContent = "☰";
            }
        }
    });

    /* SMOOTH INTERNAL NAVIGATION */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            const header = document.querySelector(".header");
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 15;

            window.scrollTo({ top: targetPosition, behavior: "smooth" });
            history.replaceState(null, "", targetId);
        });
    });

    /* CURRENT YEAR */
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    /* IMAGE ERROR HANDLING */
    document.querySelectorAll("img").forEach(image => {
        image.addEventListener("error", () => {
            image.classList.add("image-error");
            image.style.objectFit = "cover";
            image.style.background = "#dedbd4";
        });
    });

    /* EXTERNAL LINKS */
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute("rel", "noopener noreferrer");
    });

    /* SCROLL REVEAL */
    const revealElements = document.querySelectorAll(
        ".service-card, .price-card, .process-grid > div, .work-item"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12 });

        revealElements.forEach(element => {
            element.style.opacity = "0";
            element.style.transform = "translateY(20px)";
            element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            observer.observe(element);
        });
    }

    /* FAQ */
    const faqItems = document.querySelectorAll(".faq details");
    faqItems.forEach(item => {
        item.addEventListener("toggle", () => {
            if (!item.open) return;
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.open) otherItem.removeAttribute("open");
            });
        });
    });

    /* WHATSAPP - REAL BUSINESS NUMBER */
    const whatsappNumber = "919982179231";
    const whatsappMessage = "Hello, I would like to request your service.";
    const whatsappUrl = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(whatsappMessage);

    document.querySelectorAll('a[href*="wa.me/"]').forEach(link => {
        link.href = whatsappUrl;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    });

    /* HEADER SHADOW */
    const header = document.querySelector(".header");

    function updateHeader() {
        if (!header) return;
        header.style.boxShadow = window.scrollY > 20
            ? "0 8px 30px rgba(0,0,0,0.06)"
            : "none";
    }

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();

    /* PREVENT MODAL IMAGE DRAG */
    if (modalImage) {
        modalImage.addEventListener("dragstart", event => event.preventDefault());
    }

    document.body.classList.add("page-loaded");
});
