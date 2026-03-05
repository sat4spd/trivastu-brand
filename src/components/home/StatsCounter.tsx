"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, Award, MapPin, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { label: "Projects Completed", value: 500, suffix: "+", icon: Building2 },
    { label: "Years of Trust", value: 10, suffix: "+", icon: Award },
    { label: "Cities Active", value: 4, suffix: "", icon: MapPin },
    { label: "Happy Families", value: 1000, suffix: "+", icon: Users },
];

export default function StatsCounter() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const countersRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            stats.forEach((stat, i) => {
                const el = countersRef.current[i];
                if (!el) return;

                gsap.fromTo(
                    el,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        delay: i * 0.15,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );

                // Animate number counting
                const numEl = el.querySelector(".counter-value");
                if (numEl) {
                    const obj = { val: 0 };
                    gsap.to(obj, {
                        val: stat.value,
                        duration: 2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                        onUpdate: () => {
                            numEl.textContent = Math.round(obj.val).toString() + stat.suffix;
                        },
                    });
                }
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section-padding bg-surface border-y border-border">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={stat.label}
                            ref={(el) => {
                                if (el) countersRef.current[index] = el;
                            }}
                            className="text-center opacity-0"
                        >
                            <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gold/10 flex items-center justify-center">
                                <stat.icon size={24} className="text-gold" />
                            </div>
                            <div className="counter-value text-4xl md:text-5xl font-bold text-foreground mb-2 font-[var(--font-outfit)]">
                                0
                            </div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
