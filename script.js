document.addEventListener("DOMContentLoaded", () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GOONshop",
    "url": "https://goonshop.online",
    "logo": "https://goonshop.online/images/logo.png",
    "sameAs": [
      "https://www.tiktok.com/@goonshop",
      "https://www.instagram.com/goonshop"
    ]
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(structuredData);

  document.head.appendChild(script);
  console.log("✅ JSON-LD strukturovaná data byla přidána do HEAD.");
});

//


const grid = document.querySelector('.product-grid');
const products = Array.from(document.querySelectorAll('.product'));
const productWidth = 350 + 30; // šířka produktu + mezera
let index = 0;

// Automatický posun
function slideNext() {
  index++;
  grid.style.transition = 'transform 0.6s ease';
  grid.style.transform = `translateX(-${index * productWidth}px)`;

  setTimeout(() => {
    const first = grid.children[0];
    grid.appendChild(first);
    grid.style.transition = 'none';
    grid.style.transform = 'translateX(0)';
    index = 0;
  }, 600);
}

setInterval(slideNext, 6000);

// Manuální šipky
function slidePrev() {
  const last = grid.children[grid.children.length - 1];
  grid.insertBefore(last, grid.children[0]);
  grid.style.transition = 'none';
  grid.style.transform = `translateX(-${productWidth}px)`;

  // plynulý posun zpět
  requestAnimationFrame(() => {
    grid.style.transition = 'transform 0.6s ease';
    grid.style.transform = 'translateX(0)';
  });
}
function slideNextManual() {
  slideNext(); // použijeme stejnou funkci jako auto
}


// Recenze zákazníků
const reviews = [
  {
    text: "„Skvělý obchod, rychlé dodání a super komunikace!“",
    author: "- Admin"
  },
  {
    text: "„Kvalitní produkty, určitě objednám znovu.“",
    author: "- Admin"
  },
  {
    text: "„Originální designy, doporučuji všem goonerům!“",
    author: "- Admin"
  }
];

let currentReview = 0;
const reviewText = document.getElementById('reviewText');
let autoSlide; // proměnná pro automatické přepínání

function showReview(index, direction) {
  reviewText.classList.add(direction === 'left' ? 'hide-left' : 'hide-right');
  setTimeout(() => {
    reviewText.innerHTML = `<p>${reviews[index].text}</p><span class="review-author">${reviews[index].author}</span>`;
    reviewText.classList.remove('hide-left', 'hide-right');
  }, 400);
}

function prevReview() {
  const prev = (currentReview - 1 + reviews.length) % reviews.length;
  showReview(prev, 'left');
  currentReview = prev;
  resetAutoSlide();
}

function nextReview() {
  const next = (currentReview + 1) % reviews.length;
  showReview(next, 'right');
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
