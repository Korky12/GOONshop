// Automatický a manuální posun produktů v gridu
const grid = document.querySelector(".product-grid");
const products = Array.from(document.querySelectorAll(".product"));
const productWidth = 350 + 30; // šířka produktu + mezera
let index = 0;
let autoSlideTimer; // interval
let isSliding = false; // zámek animace

// Funkce pro automatický posun
function slideNext() {
  if (isSliding) return; // pokud už probíhá animace, ignoruj klik
  isSliding = true;

  index++;
  grid.style.transition = "transform 0.6s ease";
  grid.style.transform = `translateX(-${index * productWidth}px)`;

  setTimeout(() => {
    const first = grid.children[0];
    grid.appendChild(first);
    grid.style.transition = "none";
    grid.style.transform = "translateX(0)";
    index = 0;
    isSliding = false; // odemkni po dokončení
  }, 600);
}

// Funkce pro resetování časovače
function resetTimer() {
  clearInterval(autoSlideTimer);
  autoSlideTimer = setInterval(slideNext, 6000);
}

// Spuštění časovače
resetTimer();

// Manuální šipky
function slidePrev() {
  if (isSliding) return; // zablokuj rychlé kliky
  isSliding = true;

  const last = grid.children[grid.children.length - 1];
  grid.insertBefore(last, grid.children[0]);
  grid.style.transition = "none";
  grid.style.transform = `translateX(-${productWidth}px)`;

  // plynulý posun zpět
  requestAnimationFrame(() => {
    grid.style.transition = "transform 0.6s ease";
    grid.style.transform = "translateX(0)";
  });

  setTimeout(() => {
    isSliding = false; // odemkni po dokončení
  }, 600);

  resetTimer();
}

function slideNextManual() {
  slideNext();
  resetTimer();
}

// Recenze zákazníků
const reviews = [
  {
    text: "„Super firma, příjemný personál, kvalitní produkty“",
    author: "- Radim V.",
  },
  {
    text: "„Kvalitní produkty, určitě objednám znovu.“",
    author: "- Pavla S.",
  },
  {
    text: "„To je dobré jak zmrd“",
    author: "- Tomáš Ilčík",
  },
];

let currentReview = 0;
const reviewText = document.getElementById("reviewText");
let autoSlide; // proměnná pro automatické přepínání

function showReview(index, direction) {
  reviewText.classList.add(direction === "left" ? "hide-left" : "hide-right");
  setTimeout(() => {
    reviewText.innerHTML = `<p>${reviews[index].text}</p><span class="review-author">${reviews[index].author}</span>`;
    reviewText.classList.remove("hide-left", "hide-right");
  }, 400);
}

function prevReview() {
  const prev = (currentReview - 1 + reviews.length) % reviews.length;
  showReview(prev, "left");
  currentReview = prev;
  resetAutoSlide();
}

function nextReview() {
  const next = (currentReview + 1) % reviews.length;
  showReview(next, "right");
  currentReview = next;
  resetAutoSlide();
}

// Automatické posouvání každé 3 sekundy
function startAutoSlide() {
  autoSlide = setInterval(() => {
    nextReview();
  }, 5000);
}

// Když klikneš na šipku, restartuje se časovač (aby se to neposunulo hned po kliknutí)
function resetAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

// Spustí se automatické přepínání po načtení stránky
startAutoSlide();

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// Otevření / zavření menu po kliknutí na hamburger
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Zavření menu po kliknutí na odkaz
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Zavření menu při kliknutí mimo
document.addEventListener("click", (e) => {
  const isClickInsideMenu = navLinks.contains(e.target);
  const isClickOnHamburger = hamburger.contains(e.target);

  if (!isClickInsideMenu && !isClickOnHamburger) {
    navLinks.classList.remove("active");
  }
});

const orderBtn = document.getElementById("orderEmailBtn");
const popup = document.getElementById("emailPopup");
const confirmEmail = document.getElementById("confirmEmail");

orderBtn.addEventListener("click", () => {
  popup.style.display = "flex";
});

// kliknutí mimo popup zavře okno
window.addEventListener("click", (e) => {
  if (e.target === popup) popup.style.display = "none";
});
