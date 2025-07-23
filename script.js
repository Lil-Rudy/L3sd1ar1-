const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
const texts = ["TE AMO"];
const colors = ["#ff69b4", "#ff1493", "#ff85c1"];

const audio = document.getElementById("audio-control");

document.body.addEventListener("click", () => {
  if (audio.paused) audio.play();
});

class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 14 + Math.random() * 20;
    this.speed = 1 + Math.random() * 2;
    this.opacity = 0.7 + Math.random() * 0.3;
    this.text = texts[0];
    this.color = colors[Math.floor(Math.random() * colors.length)];
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

function createHeart() {
  const x = Math.random() * canvas.width;
  const y = canvas.height + 50;
  hearts.push(new Heart(x, y));
}

canvas.addEventListener("click", (e) => {
  for (let i = 0; i < 20; i++) {
    hearts.push(new Heart(e.clientX, e.clientY));
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, index) => {
    heart.update();
    if (heart.y < -50) hearts.splice(index, 1);
  });
  requestAnimationFrame(animate);
}

setInterval(createHeart, 200);

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
