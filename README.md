<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title>Lluvia Gigante de Amor</title>
  <style>
    body {
      margin: 0;
      background: black;
      overflow: hidden;
      cursor: none;
      touch-action: manipulation;
    }

    canvas {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }

    .center-message {
      font-family: "Courier New", monospace;
      color: rgb(255, 105, 180);
      font-size: 6rem;
      text-align: center;
      opacity: 0.8;
      text-shadow: rgba(255, 105, 180, 0.7) 0 0 10px;
    }

    @media (max-width: 768px) {
      .center-message {
        font-size: 3rem;
      }
    }

    .heart-cursor {
      position: absolute;
      width: 32px;
      height: 32px;
      z-index: 9999;
      pointer-events: none;
      transition: transform 0.1s;
      filter: drop-shadow(rgb(255, 105, 180) 0 0 4px);
      display: none;
    }

    #audio-control {
      position: absolute;
      opacity: 0;
      z-index: -1;
    }
  </style>
</head>
<body>

  <canvas id="canvas"></canvas>

  <div class="overlay">
    <div class="center-message">Lusdary💖</div>
  </div>

  <img id="cursor" class="heart-cursor" 
    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZmY2OWI0IiBkPSJNNDcuNiAyNUMyNS4xIDI1IDcgNDMuMSA3IDY1LjZDNyA4OC4xIDI0LjMgMTI3IDkzLjUgMTU3LjVjNjkuMiAzMC41IDE0Ni4zIDY0LjEgMTYxLjUgODQuMSAxNS4yLTIwIDEwMC4xLTUzLjYgMTY5LjMtODQuMSA2OS4yLTMwLjUgODYuNS02OS40IDg2LjUtOTEuOSAwLTIyLjUtMTguMS00MC42LTQwLjYtNDAuNnMtNDAuNiAxOC4xLTQwLjYgNDAuNmMwIDguMSAxLjYgMTUuNSA0LjMgMjIuMi0zLjEgMi4yLTYuNyAzLjUtMTAuNyAzLjUtMTMuOCAwLTI1LTExLjItMjUtMjVzMTEuMi0yNSAyNS0yNWM4LjEgMCAxNS41IDMuOSAyMC4yIDEwLjIgMTEuNy0xNS4yIDE4LjgtMzQuMiAxOC44LTU1LjIgMC00NS45LTM3LjItODMuMS04My4xLTgzLjFzLTgzLjEgMzcuMi04My4xIDgzLjFjMCAxNi4zIDQuNyAzMS41IDEyLjggNDQuMy0xLjIgMS4xLTIuNiAyLjEtNC4xIDIuOS0xNC4zIDcuOC0yNiggMTQuOS0zNi4yIDIwLjJDMTA5LjMgMTIxLjUgNDcuNiA4OC4xIDQ3LjYgNjUuNnMxOC4xLTQwLjYgNDAuNi00MC42QzEwOS4zIDI1IDc3IDQzLjEgNzcgNjUuNnMzMi4zIDQwLjYgMzIuMyA0MC42UzE3MC4xIDI1IDQ3LjYgMjV6Ii8+PC9zdmc+" 
    alt="heart" />

  <audio id="audio-control" loop>
    <source src="lil_peep_nuts_feat._rainy_bear_official_audio_mp3_4572.mp3" type="audio/mpeg" />
    Tu navegador no soporta el elemento de audio.
  </audio>

  <script>
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Ajustar canvas al tamaño completo de ventana
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Función para números aleatorios
    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    // Clase para cada corazón animado
    class Heart {
      constructor() {
        this.x = random(0, canvas.width);
        this.y = random(-canvas.height, 0);
        this.size = random(10, 25);
        this.speed = random(1, 3);
        this.angle = random(0, Math.PI * 2);
        this.angleSpeed = random(0.01, 0.03);
      }

      update() {
        this.y += this.speed;
        this.angle += this.angleSpeed;
        if (this.y > canvas.height + this.size) {
          this.y = -this.size;
          this.x = random(0, canvas.width);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = 'rgba(255, 105, 180, 0.8)';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size/2, -this.size/2, this.size, this.size/3, 0, this.size);
        ctx.bezierCurveTo(-this.size, this.size/3, -this.size/2, -this.size/2, 0, 0);
        ctx.fill();
        ctx.restore();
      }
    }

    // Crear arreglo de corazones
    const hearts = [];
    for(let i = 0; i < 40; i++) {
      hearts.push(new Heart());
    }

    // Animar corazones
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach(h => {
        h.update();
        h.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();

    // Mostrar cursor corazón y seguir al puntero
    const cursor = document.getElementById('cursor');
    cursor.style.display = 'block';
    window.addEventListener('mousemove', e => {
      cursor.style.left = e.pageX - 16 + 'px';
      cursor.style.top = e.pageY - 16 + 'px';
    });

    // Control de audio
    const audio = document.getElementById('audio-control');
    // Descomenta para autoplay (puede ser bloqueado por navegador)
    // audio.play().catch(() => console.log("Autoplay bloqueado, toca para reproducir"));

  </script>

</body>
</html>
