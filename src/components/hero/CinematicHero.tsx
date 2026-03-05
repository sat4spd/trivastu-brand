"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function CinematicHero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const particleCanvasRef = useRef<HTMLCanvasElement>(null);

    // Particle system
    useEffect(() => {
        const canvas = particleCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: {
            x: number; y: number; size: number; speedX: number; speedY: number;
            opacity: number; pulse: number; pulseSpeed: number;
        }[] = [];

        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.4,
                speedY: (Math.random() - 0.5) * 0.25 - 0.1,
                opacity: Math.random() * 0.4 + 0.1,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.01,
            });
        }

        let animationId: number;
        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connection lines between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(200, 164, 94, ${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            particles.forEach((p) => {
                p.pulse += p.pulseSpeed;
                const currentOpacity = p.opacity + Math.sin(p.pulse) * 0.15;

                // Glow effect
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
                gradient.addColorStop(0, `rgba(200, 164, 94, ${currentOpacity})`);
                gradient.addColorStop(1, `rgba(200, 164, 94, 0)`);
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // Core dot
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200, 164, 94, ${currentOpacity})`;
                ctx.fill();

                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
                if (p.y < -10) p.y = canvas.height + 10;
                if (p.y > canvas.height + 10) p.y = -10;
            });
            animationId = requestAnimationFrame(animate);
        }
        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // GSAP intro sequence with word-drop
    useEffect(() => {
        // Delay start to let IntroLoader finish (~7s)
        const INTRO_DELAY = 7;

        const tl = gsap.timeline({
            defaults: { ease: "power4.out" },
            delay: INTRO_DELAY,
        });

        // Initial overlay wipe
        tl.fromTo(
            overlayRef.current,
            { scaleX: 1 },
            { scaleX: 0, duration: 1.2, ease: "power3.inOut" }
        )
            // Badge slides in
            .fromTo(
                badgeRef.current,
                { opacity: 0, y: 30, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6 },
                "-=0.4"
            )
            // Construction "brick-laying" animation: words are built up from below
            .fromTo(
                ".hero-word",
                {
                    opacity: 0,
                    y: 60,
                    scaleY: 0.3,
                    scaleX: 1.1,
                    filter: "blur(4px)",
                    transformOrigin: "bottom center",
                },
                {
                    opacity: 1,
                    y: 0,
                    scaleY: 1,
                    scaleX: 1,
                    filter: "blur(0px)",
                    duration: 0.7,
                    stagger: 0.2,
                    ease: "elastic.out(1, 0.5)",
                },
                "-=0.2"
            )
            // Golden construction line sweeps across title
            .fromTo(
                ".hero-scan-line",
                { scaleX: 0, opacity: 1 },
                { scaleX: 1, opacity: 0, duration: 0.8, ease: "power2.inOut" },
                "-=0.4"
            )
            // Subtitle
            .fromTo(
                subtitleRef.current,
                { opacity: 0, y: 40, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
                "-=0.3"
            )
            // CTAs stagger
            .fromTo(
                ".hero-cta",
                { opacity: 0, y: 30, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12 },
                "-=0.3"
            );

        // Parallax on mouse move
        const hero = heroRef.current;
        if (!hero) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 20;
            const y = (clientY / window.innerHeight - 0.5) * 10;
            gsap.to(".parallax-layer", {
                x: x,
                y: y,
                duration: 1,
                ease: "power2.out",
            });
        };
        hero.addEventListener("mousemove", handleMouseMove);
        return () => hero.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/hero-bg.png"
                    alt="Trivastu premium construction"
                    fill
                    className="object-cover opacity-30 scale-110 parallax-layer"
                    priority
                    sizes="100vw"
                />
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,94,0.12)_0%,transparent_60%)]" />

            {/* Intro overlay wipe */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-background z-20 origin-right"
            />

            {/* Animated grid */}
            <div
                className="absolute inset-0 opacity-[0.03] parallax-layer"
                style={{
                    backgroundImage: `linear-gradient(rgba(200,164,94,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,164,94,0.3) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Particles with connections */}
            <canvas ref={particleCanvasRef} className="particle-canvas" />

            {/* Floating geometric shapes */}
            <div className="absolute top-20 right-20 w-32 h-32 border border-gold/10 rounded-full animate-[spin_20s_linear_infinite] hidden lg:block" />
            <div className="absolute bottom-32 left-16 w-20 h-20 border border-gold/5 rotate-45 animate-[spin_15s_linear_infinite_reverse] hidden lg:block" />
            <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-gold/30 rounded-full animate-pulse hidden lg:block" />

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                <div
                    ref={badgeRef}
                    className="mb-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/20 bg-gold/5 text-xs text-gold backdrop-blur-sm opacity-0"
                >
                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                    Prop-Tech Ecosystem - Jharkhand
                </div>

                <h1
                    ref={titleRef}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-8 font-[var(--font-outfit)] tracking-tight"
                    style={{ perspective: "800px" }}
                >
                    <span className="hero-word inline-block opacity-0">Building</span>{" "}
                    <span className="hero-word inline-block opacity-0 gold-gradient-text">Dreams</span>
                    <br />
                    <span className="hero-word inline-block opacity-0 text-foreground/90">Across</span>{" "}
                    <span className="hero-word inline-block opacity-0 text-foreground/90">Jharkhand</span>
                </h1>

                {/* Golden construction scan line */}
                <div className="hero-scan-line h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mb-6 origin-left" />

                <p
                    ref={subtitleRef}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-14 leading-relaxed"
                >
                    From blueprint to reality - construction services, premium plots, and
                    modern architecture. Your trusted partner in building the future.
                </p>

                <div
                    ref={ctaRef}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a
                        href="https://realty.trivastu.com"
                        className="hero-cta inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-background font-semibold rounded-full hover:bg-gold-light transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(200,164,94,0.3)] text-sm group"
                    >
                        Build Your Home
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="https://plot.trivastu.com"
                        className="hero-cta inline-flex items-center justify-center gap-2 px-8 py-4 border border-gold/30 text-gold rounded-full hover:bg-gold/10 transition-all duration-500 hover:border-gold hover:shadow-[0_0_30px_rgba(200,164,94,0.15)] text-sm group"
                    >
                        Find Your Plot
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <Link
                        href="/projects"
                        className="hero-cta inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-muted-foreground rounded-full hover:bg-white/5 hover:text-foreground hover:border-foreground/20 transition-all duration-500 text-sm"
                    >
                        Explore Projects
                    </Link>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <span className="text-[10px] text-muted uppercase tracking-widest">
                    Scroll
                </span>
                <div className="w-5 h-8 rounded-full border border-gold/30 flex justify-center pt-1.5">
                    <div className="w-1 h-2 bg-gold rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
}
