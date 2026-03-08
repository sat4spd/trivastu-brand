"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, MapPin, Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ClientStories() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.trivastu.com";
                const res = await fetch(`${apiUrl}/api/cms/testimonials`);
                if (res.ok) {
                    const data = await res.json();
                    setTestimonials(data.slice(0, 4)); // Show recent 4
                }
            } catch (err) {
                console.error("Failed to fetch testimonials:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    useEffect(() => {
        if (loading || testimonials.length === 0) return;

        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 50, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.7,
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
    }, [loading, testimonials]);

    return (
        <section ref={sectionRef} className="section-padding">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-xs text-gold uppercase tracking-[0.3em] mb-4 block">
                        Testimonials
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-outfit)] mb-4">
                        Client <span className="gold-gradient-text">Stories</span>
                    </h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        Real journeys from real homeowners. Every story is a testament to trust.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((t, index) => (
                        <div
                            key={t._id || index}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el;
                            }}
                            className="relative rounded-2xl border border-border bg-surface-light p-6 hover:border-gold/30 transition-all duration-500 gold-border-glow opacity-0 group"
                        >
                            {/* Quote Icon */}
                            <Quote
                                size={32}
                                className="absolute top-6 right-6 text-gold/10 group-hover:text-gold/20 transition-colors"
                            />

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className="text-gold fill-gold"
                                    />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-muted-foreground leading-relaxed mb-6 italic">
                                &ldquo;{t.content}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-6 border-t border-border">
                                {t.image ? (
                                    <img src={t.image} alt={t.authorName} className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-sm">
                                        {t.authorName?.charAt(0) || 'U'}
                                    </div>
                                )}
                                <div>
                                    <div className="text-sm font-semibold text-foreground">
                                        {t.authorName}
                                    </div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                        {t.authorRole}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
