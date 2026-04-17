
document.getElementById("toggleMode").addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  alert("Message Sent Successfully!");
});




fetch("../components/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });

  document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});