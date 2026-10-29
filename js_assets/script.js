//PART 3-POE

// FAQ ACCORDION FUNCTIONALITY

// Select all FAQ questions on the page
//For the enquiries page
const faqQuestions = document.querySelectorAll(".faq-question");

// user is able to click on a FAQ questonA
faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        // Finds the answer to this question
        const answer = question.nextElementSibling;

        // Check whether the answer is currently open
        const isOpen = question.getAttribute("aria-expanded") === "true";

        // Close all FAQ answers first
        faqQuestions.forEach(function (otherQuestion) {

            otherQuestion.setAttribute("aria-expanded", "false");

            otherQuestion.nextElementSibling.hidden = true;

        });

        // Open the selected answer if it was previously closed
        if (!isOpen) {

            question.setAttribute("aria-expanded", "true");

            answer.hidden = false;

        }

    });

});

//for the services tab
//allolws the user to search our services
const serviceSearch = document.querySelector("#service-search");

if (serviceSearch) {
    const serviceCards = document.querySelectorAll(".service-card");
    const searchMessage = document.querySelector("#search-message");

    serviceSearch.addEventListener("input", function () {
        const searchTerm = serviceSearch.value.toLowerCase();
        let visibleCount = 0;

        serviceCards.forEach(function (card) {
            const serviceText = card.textContent.toLowerCase();
            const matches = serviceText.includes(searchTerm);

            card.hidden = !matches;

            if (matches) {
                visibleCount++;
            }
        });

        if (searchMessage) {
            searchMessage.textContent =
                visibleCount + " service(s) found.";
        }
    });
}
// Service image lightbox
//allows for pictures to be clickable
const galleryImages = document.querySelectorAll(
    ".service-image"
);
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxClose = document.querySelector("#lightbox-close");

if (lightbox && lightboxImage && lightboxClose) {

    galleryImages.forEach(function (image) {
        image.tabIndex = 0;
        image.setAttribute("role", "button");
        image.setAttribute("aria-label", "Enlarge " + image.alt);

        function openImage() {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.hidden = false;
            lightboxClose.focus();
        }

        image.addEventListener("click", openImage);

        image.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openImage();
            }
        });
    });

    function closeLightbox() {
        lightbox.hidden = true;
        lightboxImage.src = "";
    }

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !lightbox.hidden) {
            closeLightbox();
        }
    });
}
// CONTACT FORM VALIDATION AND EMAIL PREPARATION

const contactForm = document.querySelector("#contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const name = document.querySelector("#contact-name").value.trim();
        const email = document.querySelector("#contact-email").value.trim();
        const type = document.querySelector("#message-type").value;
        const message = document.querySelector("#contact-message").value.trim();
        const result = document.querySelector("#contact-result");

        const subject = encodeURIComponent(
            "House Of Dimpho - " + type
        );

        const body = encodeURIComponent(
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Message type: " + type + "\n\n" +
            "Message:\n" + message
        );

        // Replace this placeholder with the real business email.
        const businessEmail = "YOUR-BUSINESS-EMAIL@example.com";

        result.textContent =
            "Your message has been validated. Your email application " +
            "will open so you can review and send the message.";

        window.location.href =
            "mailto:" + businessEmail +
            "?subject=" + subject +
            "&body=" + body;
    });

}