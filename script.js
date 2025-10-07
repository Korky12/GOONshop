// Funkce pro scrollování na sekci
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Zatím jednoduchý JS (můžeš sem dát později třeba košík)
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Děkujeme za zprávu! Ozveme se vám co nejdříve.");
});
