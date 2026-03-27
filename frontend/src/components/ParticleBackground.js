import { useEffect } from "react";

function ParticleBackground() {
  useEffect(() => {
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = { x: null, y: null };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    let particles = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2,
        dx: (Math.random() - 0.5) * 0.6,
        dy: (Math.random() - 0.5) * 0.6
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;

        // bounce
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        // 🧠 mouse interaction
        if (mouse.x && mouse.y) {
          let dx = p.x - mouse.x;
          let dy = p.y - mouse.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            p.x += dx / 20;
            p.y += dy / 20;
          }
        }

        // draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#38bdf8";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#38bdf8";
        ctx.fill();
      });

      // connect lines
      particles.forEach((a) => {
        particles.forEach((b) => {
          let dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 100) {
            ctx.strokeStyle = "rgba(56,189,248,0.07)";
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas id="particles"></canvas>;
}

export default ParticleBackground;