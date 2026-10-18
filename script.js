
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Mobile navigation
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');

  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

// Close the mobile menu after selecting a section
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

// Automatically update the copyright year
document.getElementById('year').textContent =
  new Date().getFullYear();


const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const submitButton = document.getElementById("submit-btn");
  const formStatus = document.getElementById("form-status");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const originalButtonText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        formStatus.textContent =
          "Thank you! Your message has been sent.";
        formStatus.dataset.state = "success";
        contactForm.reset();
      } else {
        formStatus.textContent =
          "Unable to send your message. Please check your form setup and try again.";
        formStatus.dataset.state = "error";
      }
    } catch (error) {
      formStatus.textContent =
        "A network error occurred. Please try again.";
      formStatus.dataset.state = "error";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}
