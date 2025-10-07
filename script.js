// Scroll na sekci "O nás"
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: 'smooth' });
}

// Akce pro tlačítko "Další sortiment"
document.querySelector('.more-btn').addEventListener('click', () => {
  alert('Brzy přidáme další produkty!');
});
