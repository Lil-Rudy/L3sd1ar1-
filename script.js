const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const items = [];
const colors = ["#ff69b4", "#ff1493", "#ff85c1"];
const texts = ["TE AMO", "❤️", "💖"];

const audio = document.getElementById("audio-control");

// Reproduce música al primer clic
document.body.addEventListener("click", () => {
  if (audio.paused) audio.play();
});

class FallingItem {
  constructor(x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.size = 20 + Math.random() * 40;
    this.speed = 1 + Math.random() * 2;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.opacity = 0.7 + Math.random() * 0.3;
  }

  draw() {
    ctx.font = `${this.size}px Courier New`;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fillText(this.text, this.x, this.y);
    ctx.globalAlpha = 1;
  }

  update() {
    this.y -= this.speed;
    this.draw();
  }
}

// Generar lluvia de corazones y TE AMO
function rainItems() {
  const x = Math.random() * canvas.width;
  const y = canvas.height + 50;
  const randomText = texts[Math.floor(Math.random() * texts.length)];
  items.push(new FallingItem(x, y, randomText));
}

// Explosión de corazones al tocar
canvas.addEventListener("click", (e) => {
  for (let i = 0; i < 20; i++) {
    const randomText = texts[Math.floor(Math.random() * texts.length)];
    items.push(new FallingItem(e.clientX, e.clientY, randomText));
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  items.forEach((item, i) => {
    item.update();
    if (item.y < -50) items.splice(i, 1);
  });
  requestAnimationFrame(animate);
}

setInterval(rainItems, 300);

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
