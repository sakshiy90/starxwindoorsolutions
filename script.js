const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".card");

let scrollAmount = 0;
let isPaused = false;

track.addEventListener("mouseenter", () => isPaused = true);
track.addEventListener("mouseleave", () => isPaused = false);

function updateActiveCard() {
  let center = window.innerWidth / 2;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenter = rect.left + rect.width / 2;

    if (Math.abs(center - cardCenter) < 120) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });
}

function autoSlide() {
  if (!isPaused) {
    scrollAmount += 0.5;

    track.style.transform = `translateX(-${scrollAmount}px)`;

    if (scrollAmount >= track.scrollWidth / 2) {
      scrollAmount = 0;
    }

    updateActiveCard();
  }

  requestAnimationFrame(autoSlide);
}

autoSlide();

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;

    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});