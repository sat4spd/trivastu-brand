"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Lightbulb, Wrench, Building, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stages = [
    {
        id: "vision",
        title: "Vision",
        subtitle: "Where It All Begins",
        description:
            "Every masterpiece starts with an idea. We listen, understand, and design blueprints that bring your vision to life with meticulous planning.",
        icon: Lightbulb,
        image: "/images/plot-landscape.png",
    },
    {
        id: "engineering",
        title: "Engineering",
        subtitle: "Precision at Every Level",
        description:
            "Structural integrity meets innovative design. Our engineers craft the skeletal framework that will stand the test of time.",
        icon: Wrench,
        image: "/images/construction-site.png",
    },
    {
        id: "construction",
        title: "Construction",
        subtitle: "Building the Future",
        description:
            "With premium materials and skilled craftsmen, we raise structures from the ground - efficiently, transparently, and with uncompromising quality.",
        icon: Building,
        image: "/images/proj-township.png",
    },
    {
        id: "completion",
        title: "Completion",
        subtitle: "Your Dream, Realized",
        description:
            "The lights come on. The doors open. Your dream home is ready - a testament to trust, quality, and the Trivastu promise.",
        icon: Sparkles,
        image: "/images/proj-villa.png",
    },
];

export default function ScrollStorytelling() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, i) => {
                if (!card) return;

                // Card slide in from alternating sides
                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        x: i % 2 === 0 ? -100 : 100,
                        rotateY: i % 2 === 0 ? 5 : -5,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        rotateY: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            end: "top 40%",
                            toggleActions: "play none none none",
                        },
                    }
                );

                // Image parallax inside card
                const img = card.querySelector(".story-image");
                if (img) {
                    gsap.fromTo(
                        img,
                        { y: -30, scale: 1.15 },
                        {
                            y: 30,
                            scale: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: card,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        }
                    );
                }

                // Progress line animation
                const line = card.querySelector(".progress-line");
                if (line) {
                    gsap.fromTo(
                        line,
                        { scaleY: 0 },
                        {
                            scaleY: 1,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 75%",
                                toggleActions: "play none none none",
                            },
                        }
                    );
                }

                // Text reveal
                const textEls = card.querySelectorAll(".text-reveal");
                gsap.fromTo(
                    textEls,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 75%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section-padding relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <span className="text-xs text-gold uppercase tracking-[0.3em] mb-4 block">
                        Our Process
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[var(--font-outfit)] mb-6">
                        From <span className="gold-gradient-text">Blueprint</span> to Reality
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        A journey of precision, transparency, and excellence - every step of the way.
                    </p>
                </div>

                {/* Story Cards */}
                <div className="relative">
                    {/* Vertical Connector Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block" />

                    <div className="space-y-20 lg:space-y-32">
                        {stages.map((stage, index) => (
                            <div
                                key={stage.id}
                                ref={(el) => {
                                    if (el) cardsRef.current[index] = el;
                                }}
                                className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center opacity-0"
                                style={{ perspective: "800px" }}
                            >
                                {/* Content */}
                                <div
                                    className={`space-y-4 ${index % 2 === 1 ? "lg:order-2" : ""
                                        }`}
                                >
                                    <div className="text-reveal flex items-center gap-3">
                                        <span className="text-gold text-sm font-mono">
                                            0{index + 1}
                                        </span>
                                        <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent max-w-[100px]" />
                                    </div>
                                    <h3 className="text-reveal text-3xl md:text-4xl font-bold font-[var(--font-outfit)]">
                                        {stage.title}
                                    </h3>
                                    <p className="text-reveal text-gold text-sm">{stage.subtitle}</p>
                                    <p className="text-reveal text-muted-foreground leading-relaxed max-w-md">
                                        {stage.description}
                                    </p>
                                </div>

                                {/* Visual with real image */}
                                <div
                                    className={`relative ${index % 2 === 1 ? "lg:order-1" : ""
                                        }`}
                                >
                                    <div className="relative aspect-[4/3] rounded-2xl border border-border overflow-hidden gold-border-glow group">
                                        <Image
                                            src={stage.image}
                                            alt={stage.title}
                                            fill
                                            className="object-cover story-image transition-transform duration-700 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                        {/* Dark overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-background/20 to-transparent" />
                                        {/* Icon overlay */}
                                        <div className="absolute bottom-4 left-4">
                                            <div className="w-10 h-10 rounded-lg bg-gold/20 backdrop-blur-sm flex items-center justify-center border border-gold/20">
                                                <stage.icon size={18} className="text-gold" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
