/* eslint-disable no-unused-vars */
/* src/utils/confetti.js
   Lightweight canvas confetti + emoji burst.
   No external libs required.
*/
const Confetti = (() => {
    let canvas, ctx, running = false, particles = [];

    const ensure = () => {
        if (canvas) return;
        canvas = document.createElement("canvas");
        canvas.style.position = "fixed";
        canvas.style.left = 0;
        canvas.style.top = 0;
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = 9999;
        document.body.appendChild(canvas);
        ctx = canvas.getContext("2d");
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);
    };

    const rand = (a, b) => Math.random() * (b - a) + a;

    function spawn(x, y, count = 40) {
        for (let i = 0; i < count; i++) {
            particles.push({
                x,
                y,
                vx: rand(-6, 6),
                vy: rand(-12, -4),
                size: rand(6, 14),
                life: rand(50, 120),
                age: 0,
                color: `hsl(${Math.floor(rand(0, 360))}deg 80% 60%)`,
                emoji: null,
            });
        }
        start();
    }

    function spawnEmoji(x, y, emoji = "❤️", count = 18) {
        for (let i = 0; i < count; i++) {
            particles.push({
                x,
                y,
                vx: rand(-4, 4),
                vy: rand(-10, -3),
                size: rand(18, 28),
                life: rand(40, 80),
                age: 0,
                color: null,
                emoji,
            });
        }
        start();
    }

    function start() {
        ensure();
        if (running) return;
        running = true;
        requestAnimationFrame(loop);
        setTimeout(() => {
            // stop after a while if no particles
            if (particles.length === 0) stop();
        }, 4000);
    }

    function stop() {
        running = false;
        // cleanup later by loop
    }

    function loop() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const now = Date.now();

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.5; // gravity
            p.vx *= 0.99;
            p.vy *= 0.999;
            p.age++;
            p.life--;

            if (p.color) {
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.ellipse(p.x, p.y, p.size, p.size * 0.7, 0, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.emoji) {
                ctx.font = `${p.size}px serif`;
                ctx.textAlign = "center";
                ctx.fillText(p.emoji, p.x, p.y);
            }

            if (p.life <= 0 || p.y > canvas.height + 100) {
                particles.splice(i, 1);
            }
        }

        if (particles.length > 0) requestAnimationFrame(loop);
        else {
            // clear canvas and remove element after done
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            running = false;
            // optional removal: keep canvas for reuse
        }
    }

    return {
        fullscreen: ({ particleCount = 120 } = {}) => {
            ensure();
            // spawn many particles from top center region
            const x = window.innerWidth * 0.5;
            const y = window.innerHeight * 0.2;
            spawn(x, y, particleCount);
        },
        emojiBurst: ({ emoji = "❤️", count = 20, anchor = null } = {}) => {
            ensure();
            // if anchor element is provided compute its center
            let x = window.innerWidth * 0.5;
            let y = window.innerHeight * 0.35;
            if (anchor && anchor.getBoundingClientRect) {
                const r = anchor.getBoundingClientRect();
                x = r.left + r.width / 2;
                y = r.top + r.height / 2;
            }
            spawnEmoji(x, y, emoji, count);
        },
    };
})();

export default Confetti;
