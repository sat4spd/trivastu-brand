"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectShowcase() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("https://api.trivastu.com/api/cms/projects");
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data.slice(0, 4)); // Only show top 4 on homepage
                }
            } catch (err) {
                console.error("Failed to fetch projects:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        if (loading || projects.length === 0) return;

        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, i) => {
                if (!card) return;

                // Card reveal animation
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 80, rotateX: 8, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                        scale: 1,
                        duration: 1,
                        delay: i * 0.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        },
                    }
                );

                // Image zoom on scroll
                const img = card.querySelector(".project-image");
                if (img) {
                    gsap.fromTo(
                        img,
                        { scale: 1.15 },
                        {
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
            });
        }, section);

        return () => ctx.revert();
    }, [loading, projects]);

    return (
        <section ref={sectionRef} className="section-padding">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                    <div>
                        <span className="text-xs text-gold uppercase tracking-[0.3em] mb-4 block">
                            Our Work
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-outfit)]">
                            Featured <span className="gold-gradient-text">Projects</span>
                        </h2>
                    </div>
                    <a
                        href="/projects"
                        className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors group"
                    >
                        View All Projects
                        <ArrowRight
                            size={14}
                            className="group-hover:translate-x-1 transition-transform"
                        />
                    </a>
                </div>

                {/* Project Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <div
                            key={project.title}
                            ref={(el) => {
                                if (el) cardsRef.current[index] = el;
                            }}
                            className="group relative rounded-2xl border border-border bg-surface-light overflow-hidden hover:border-gold/30 transition-all duration-700 gold-border-glow opacity-0 cursor-pointer"
                            style={{ perspective: "800px" }}
                        >
                            {/* Image */}
                            <div className="aspect-[16/10] relative overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover project-image transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-surface-light via-transparent to-transparent opacity-60" />

                                {/* Status badge */}
                                <div className="absolute top-4 right-4 z-10">
                                    <span
                                        className={`px-3 py-1 text-xs rounded-full backdrop-blur-sm ${project.status === "Completed"
                                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                            : project.status === "Ongoing"
                                                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                                : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                            }`}
                                    >
                                        {project.status}
                                    </span>
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                    <MapPin size={12} className="text-gold" />
                                    {project.location}
                                    <span className="text-border">•</span>
                                    {project.type}
                                </div>
                                <h3 className="text-xl font-bold font-[var(--font-outfit)] mb-2 group-hover:text-gold transition-colors duration-500">
                                    {project.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
