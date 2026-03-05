"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
    {
        year: "2019",
        title: "Founded",
        description:
            "Trivastu Ventures was born with a mission to modernize real estate in Jharkhand.",
    },
    {
        year: "2021",
        title: "First Project",
        description:
            "Delivered our first residential project in Ranchi - on time, on budget.",
    },
    {
        year: "2023",
        title: "Expansion",
        description:
            "Expanded to Jamshedpur, Bokaro, and Hazaribagh with 100+ projects completed.",
    },
    {
        year: "2024",
        title: "Digital Platform",
        description:
            "Launched realty.trivastu.com - bringing construction services online.",
    },
    {
        year: "2025",
        title: "Plot Marketplace",
        description:
            "Launched plot.trivastu.com - Jharkhand's first premium plot marketplace.",
    },
];

export default function AnimatedTimeline() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // Animate the connecting line
            if (lineRef.current) {
                gsap.fromTo(
                    lineRef.current,
                    { scaleX: 0 },
                    {
                        scaleX: 1,
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 70%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            // Stagger animate each milestone
            itemsRef.current.forEach((item, i) => {
                if (!item) return;
                gsap.fromTo(
                    item,
                    { opacity: 0, y: 50, scale: 0.9 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        delay: i * 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 65%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section-padding bg-surface border-y border-border overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="text-xs text-gold uppercase tracking-[0.3em] mb-4 block">
                        Our Journey
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-outfit)] mb-4">
                        The Trivastu <span className="gold-gradient-text">Story</span>
                    </h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        Every milestone is a testament to trust, quality, and our commitment to Jharkhand.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Horizontal line (desktop) */}
                    <div
                        ref={lineRef}
                        className="hidden md:block absolute top-[40px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent origin-left"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {milestones.map((milestone, index) => (
                            <div
                                key={milestone.year}
                                ref={(el) => {
                                    if (el) itemsRef.current[index] = el;
                                }}
                                className="relative text-center opacity-0"
                            >
                                {/* Dot */}
                                <div className="relative mx-auto mb-6">
                                    <div className="w-5 h-5 rounded-full bg-gold mx-auto relative z-10" />
                                    <div className="absolute inset-0 w-5 h-5 rounded-full bg-gold/30 mx-auto animate-ping" />
                                </div>

                                {/* Year */}
                                <div className="text-2xl font-bold text-gold font-[var(--font-outfit)] mb-2">
                                    {milestone.year}
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    {milestone.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {milestone.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
