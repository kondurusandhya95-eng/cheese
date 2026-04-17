
const btn = document.getElementById("themeToggle");

btn.onclick = () => {
  document.body.classList.toggle("light-mode");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("light-mode") ? "light" : "dark"
  );
};

window.onload = () => {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
  }

  startCounter();
};

function startCounter() {
  document.querySelectorAll(".count").forEach(counter => {
    let target = +counter.getAttribute("data-target");
    let count = 0;
    let speed = target / 100;

    let update = () => {
      count += speed;
      if (count < target) {
        counter.innerText = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
}

/* CHART */
const ctx = document.getElementById("chart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan","Feb","Mar","Apr","May","Jun"],
    datasets: [{
      label: "Sales",
      data: [12,19,10,25,22,30],
      borderColor: "#c9a55a",
      backgroundColor: "rgba(201,165,90,0.2)",
      tension: 0.4,
      fill: true
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  }
});