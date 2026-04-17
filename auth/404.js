
const container = document.querySelector(".particles");

for (let i = 0; i < 25; i++) {
  let span = document.createElement("span");
  span.style.left = Math.random() * 100 + "vw";
  span.style.animationDuration = (5 + Math.random() * 5) + "s";
  span.style.opacity = Math.random();
  container.appendChild(span);
}
let count = 5;
const counter = document.getElementById("count");

const timer = setInterval(() => {
  count--;
  counter.innerText = count;

  if (count === 0) {
    clearInterval(timer);
    window.location.href = "index.html";
  }
}, 1000);