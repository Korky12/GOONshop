// JS
const grid = document.querySelector('.product-grid');
const products = Array.from(document.querySelectorAll('.product'));
const productWidth = 350 + 30; // šířka + gap
let index = 0;

// Nekonečný loop: přesuň první prvek na konec při každém posunu
function slideNext() {
  index++;
  grid.style.transition = 'transform 0.6s ease';
  grid.style.transform = `translateX(-${index * productWidth}px)`;

  // Po dokončení animace přesuň první produkt na konec a resetuj transform
  setTimeout(() => {
    const first = grid.children[0];
    grid.appendChild(first);
    grid.style.transition = 'none';
    grid.style.transform = 'translateX(0)';
    index = 0;
  }, 600);
}

setInterval(slideNext, 6000);


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
