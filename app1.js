// scripts.js
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuIcon = document.getElementById("mobile-menu-icon");
  const mobileNavLinks = document.getElementById("mobile-nav-links");

  mobileMenuIcon.addEventListener("click", function () {
    if (mobileNavLinks.style.display === "block") {
      mobileNavLinks.style.display = "none";
    } else {
      mobileNavLinks.style.display = "block";
    }
  });
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    fetch(
      "https://script.google.com/macros/s/AKfycbxwDSI9BJFHMCjdvsRzbysifB4EIlJR8vCjx0Sjh4EYOrZ1hSgiiA1Gy6uamLPe-Wq_/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email, message: message }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          alert("Your message has been sent successfully!");
        } else {
          alert("There was an error sending your message. Please try again.");
        }
      })
      .catch((error) => {
        alert("There was an error sending your message. Please try again.");
        console.error("Error:", error);
      });
  });
