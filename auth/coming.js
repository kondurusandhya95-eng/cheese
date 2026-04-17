
const targetDate = new Date("2026-01-01").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const diff = targetDate - now;

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById("days").innerText = d;
  document.getElementById("hours").innerText = h;
  document.getElementById("minutes").innerText = m;
  document.getElementById("seconds").innerText = s;

}, 1000);


