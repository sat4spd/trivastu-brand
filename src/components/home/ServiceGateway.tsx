"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, MapPin, Ruler, TrendingUp, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
    {
        title: "Construction",
        description: "Turnkey construction from blueprint to handover. Premium quality, transparent pricing.",
        icon: Building2,
        href: "https://realty.trivastu.com",
        external: true,
        accent: "from-amber-500/10 to-gold/5",
    },
    {
        title: "Plot Marketplace",
        description: "Discover verified plots across Jharkhand. RERA registered, legally transparent.",
        icon: MapPin,
        href: "https://plot.trivastu.com",
        external: true,
        accent: "from-emerald-500/10 to-gold/5",
    },
    {
        title: "Architecture",
        description: "Modern architectural design that blends aesthetics with structural excellence.",
        icon: Ruler,
        href: "/services#architecture",
        external: false,
        accent: "from-blue-500/10 to-gold/5",
    },
    {
        title: "Real Estate Development",
        description: "End-to-end real estate development - from land acquisition to township creation.",
        icon: TrendingUp,
        href: "/services#realestate",
        external: false,
        accent: "from-purple-500/10 to-gold/5",
    },
];

export default function ServiceGateway() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 60, rotateY: 10 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateY: 0,
                        duration: 0.8,
                        delay: i * 0.15,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 70%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section-padding bg-surface border-y border-border">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-xs text-gold uppercase tracking-[0.3em] mb-4 block">
                        Our Platforms
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-outfit)] mb-4">
                        Explore Our <span className="gold-gradient-text">Services</span>
                    </h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        A complete ecosystem for building, buying, and developing property in Jharkhand.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service, index) => {
                        const CardTag = service.external ? "a" : "a";
                        return (
                            <CardTag
                                key={service.title}
                                href={service.href}
                                target={service.external ? "_blank" : undefined}
                                rel={service.external ? "noopener noreferrer" : undefined}
                            >
                                <div
                                    ref={(el) => {
                                        if (el) cardsRef.current[index] = el;
                                    }}
                                    className={`group relative rounded-2xl border border-border bg-gradient-to-br ${service.accent} p-8 hover:border-gold/40 transition-all duration-500 gold-border-glow opacity-0 cursor-pointer`}
                                    style={{ perspective: "600px" }}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                                            <service.icon size={28} className="text-gold" />
                                        </div>
                                        <ArrowUpRight
                                            size={20}
                                            className="text-muted opacity-0 group-hover:opacity-100 group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold font-[var(--font-outfit)] mb-2 group-hover:text-gold transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {service.description}
                                    </p>
                                    {service.external && (
                                        <div className="mt-4 pt-4 border-t border-border">
                                            <span className="text-xs text-gold">
                                                Visit Platform →
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </CardTag>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
