function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  navMenu.classList.toggle("active");
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your inquiry! We will contact you soon.");
  this.reset();
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Add scroll effect to header
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.style.background =
    window.scrollY > 50 ? "rgba(44, 62, 80, 0.9)" : "rgb(44, 62, 80)";
});

const slideshowImages = [
  "./images/slideshow1.jpg",
  "./images/slideshow2.jpg",
  "./images/slideshow3.jpg",
  "./images/slideshow4.jpg",
  "./images/slideshow5.jpg",
];

function createSlideshow() {
  const slideshowContainer = document.getElementById("heroSlideshow");

  // Ensure container is empty before adding slides
  slideshowContainer.innerHTML = "";

  // Create slide elements
  slideshowImages.forEach((imageUrl, index) => {
    const slide = document.createElement("div");
    slide.classList.add("hero-slide");
    slide.style.backgroundImage = `url('${imageUrl}')`;

    // First slide starts active
    if (index === 0) slide.classList.add("active");

    slideshowContainer.appendChild(slide);
  });

  // Slideshow logic
  let currentSlide = 0;
  setInterval(() => {
    const slides = document.querySelectorAll(".hero-slide");

    // Remove active class from current slide
    slides[currentSlide].classList.remove("active");

    // Move to next slide
    currentSlide = (currentSlide + 1) % slides.length;

    // Add active class to next slide
    slides[currentSlide].classList.add("active");
  }, 5000); // Change slide every 5 seconds
}

// Package details interaction for mobile and desktop
function setupPackageInteraction() {
  const packages = document.querySelectorAll(".package");

  packages.forEach((pkg) => {
    const packageDetails = pkg.querySelector(".package-details");

    // Desktop hover effect
    if (window.matchMedia("(hover: hover)").matches) {
      pkg.addEventListener("mouseenter", () => {
        packageDetails.style.display = "block";
        packageDetails.style.opacity = "1";
        packageDetails.style.transform = "translateY(0)";
      });

      pkg.addEventListener("mouseleave", () => {
        packageDetails.style.display = "none";
        packageDetails.style.opacity = "0";
        packageDetails.style.transform = "translateY(-100%)";
      });
    }
    // Mobile click interaction
    else {
      pkg.addEventListener("click", (e) => {
        // Toggle visibility of package details
        if (packageDetails.style.display === "block") {
          packageDetails.style.display = "none";
          packageDetails.style.opacity = "0";
          packageDetails.style.transform = "translateY(-100%)";
        } else {
          // Close any other open package details
          document.querySelectorAll(".package-details").forEach((details) => {
            details.style.display = "none";
            details.style.opacity = "0";
            details.style.transform = "translateY(-100%)";
          });

          // Open clicked package details
          packageDetails.style.display = "block";
          packageDetails.style.opacity = "1";
          packageDetails.style.transform = "translateY(0)";
        }
      });
    }
  });
}

// Initialize everything when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  createSlideshow();
  setupPackageInteraction();
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);

  // Convert to URL encoded string
  const data = new URLSearchParams(formData).toString();

  // Replace with your Google Apps Script web app URL
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyES8q8-RPFgeVQJIXNwlW3iAmBoHWGz7U0lp9nYAHtNJBVEKVcHlFf9MevhlD2dHI/exec";

  // Send data to Google Sheets
  fetch(scriptURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Form submitted successfully!");
      document.getElementById("myForm").reset();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error submitting form");
    });
});
