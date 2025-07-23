const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const messages = [];
const colors = ["#ff69b4", "#ff1493", "#ff85c1"];
const texts = ["TE AMO", "❤️", "💖", "Lusdary"];

const audio = document.getElementById("audio-control");

// Intentar reproducir la música
document.body.addEventListener("click", () => {
  if (audio.paused) audio.play();
});

class Message {
  constructor(x, y, text) {
    this.x = x;
    this.y = y;
    this.text = text;
    this.size = 20 + Math.random() * 40;
    this.speed = 1 + Math.random() * 2;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    ctx.font = `${this.size}px Courier New`;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }

  update() {
    this.y -= this.speed;
    this.draw();
  }
}

canvas.addEventListener("click", (e) => {
  for (let i = 0; i < 20; i++) {
    messages.push(new Message(e.clientX, e.clientY, texts[Math.floor(Math.random() * texts.length)]));
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  messages.forEach((msg, i) => {
    msg.update();
    if (msg.y < -50) messages.splice(i, 1);
  });
  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
