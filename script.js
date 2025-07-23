const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
const colors = ["#ff69b4", "#ff85c1", "#ffb6c1", "#ff1493"];

class Heart {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(this.size / 2, -this.size / 2, this.size, this.size / 3, 0, this.size);
    ctx.bezierCurveTo(-this.size, this.size / 3, -this.size / 2, -this.size / 2, 0, 0);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height + this.size) {
      this.y = -this.size;
      this.x = Math.random() * canvas.width;
      this.size = 10 + Math.random() * 20;
      this.speed = 1 + Math.random() * 3;
    }
    this.draw();
  }
}

function initHearts() {
  for (let i = 0; i < 50; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = 10 + Math.random() * 20;
    const speed = 1 + Math.random() * 3;
    hearts.push(new Heart(x, y, size, speed));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart) => heart.update());
  requestAnimationFrame(animate);
}

initHearts();
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
