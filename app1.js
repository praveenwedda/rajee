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
  ,
  "./images/slideshow5.jpg",
];

function createSlideshow() {
  const slideshowContainer = document.getElementById("heroSlideshow");

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

// Call slideshow function when page loads
window.addEventListener("load", createSlideshow);
