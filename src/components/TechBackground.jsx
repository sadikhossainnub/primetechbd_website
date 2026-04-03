import React, { useRef, useEffect } from 'react';

const TechBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationId;
        let particles = [];
        let mouse = { x: null, y: null };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.6;
                this.vy = (Math.random() - 0.5) * 0.6;
                this.radius = Math.random() * 2 + 0.5;
                this.opacity = Math.random() * 0.5 + 0.1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(34, 211, 238, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Initialize particles
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 120);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }

        // Floating data streams
        let streams = [];
        for (let i = 0; i < 8; i++) {
            streams.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 150 + 80,
                speed: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.12 + 0.03,
                angle: Math.random() * Math.PI * 2
            });
        }

        // Grid pulse
        let gridPhase = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Subtle grid
            gridPhase += 0.003;
            const gridOpacity = 0.02 + Math.sin(gridPhase) * 0.01;
            ctx.strokeStyle = `rgba(34, 211, 238, ${gridOpacity})`;
            ctx.lineWidth = 0.5;
            const gridSize = 60;
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Data streams
            streams.forEach(s => {
                s.x += Math.cos(s.angle) * s.speed;
                s.y += Math.sin(s.angle) * s.speed;
                if (s.x < -200 || s.x > canvas.width + 200 || s.y < -200 || s.y > canvas.height + 200) {
                    s.x = Math.random() * canvas.width;
                    s.y = Math.random() * canvas.height;
                    s.angle = Math.random() * Math.PI * 2;
                }

                const gradient = ctx.createLinearGradient(
                    s.x, s.y,
                    s.x + Math.cos(s.angle) * s.length,
                    s.y + Math.sin(s.angle) * s.length
                );
                gradient.addColorStop(0, `rgba(34, 211, 238, 0)`);
                gradient.addColorStop(0.5, `rgba(34, 211, 238, ${s.opacity})`);
                gradient.addColorStop(1, `rgba(34, 211, 238, 0)`);

                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(
                    s.x + Math.cos(s.angle) * s.length,
                    s.y + Math.sin(s.angle) * s.length
                );
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1.5;
                ctx.stroke();
            });

            // Update and draw particles
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(34, 211, 238, ${0.08 * (1 - dist / 150)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Radial glow center
            const grd = ctx.createRadialGradient(
                canvas.width * 0.3, canvas.height * 0.5, 0,
                canvas.width * 0.3, canvas.height * 0.5, canvas.width * 0.5
            );
            grd.addColorStop(0, 'rgba(34, 211, 238, 0.04)');
            grd.addColorStop(1, 'rgba(34, 211, 238, 0)');
            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        />
    );
};

export default TechBackground;
