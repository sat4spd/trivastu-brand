"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Building2, TreePine, X } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const cities = [
    {
        name: "Ranchi",
        cx: 285,
        cy: 340,
        projects: 45,
        plots: 120,
        houses: 38,
        highlight: "Capital city - our headquarters",
    },
    {
        name: "Jamshedpur",
        cx: 420,
        cy: 420,
        projects: 18,
        plots: 60,
        houses: 15,
        highlight: "Steel city expansion",
    },
    {
        name: "Bokaro",
        cx: 330,
        cy: 215,
        projects: 12,
        plots: 40,
        houses: 10,
        highlight: "Industrial corridor growth",
    },
    {
        name: "Hazaribagh",
        cx: 230,
        cy: 195,
        projects: 8,
        plots: 35,
        houses: 7,
        highlight: "Green belt development",
    },
    {
        name: "Dhanbad",
        cx: 385,
        cy: 185,
        projects: 6,
        plots: 25,
        houses: 5,
        highlight: "Coal capital - emerging market",
    },
];

export default function InteractiveMap() {
    const [activeCity, setActiveCity] = useState<string | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<SVGSVGElement>(null);

    const selected = cities.find((c) => c.name === activeCity);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // Animate the map path
            const path = section.querySelector(".map-outline");
            if (path) {
                gsap.fromTo(
                    path,
                    { strokeDashoffset: 2000, opacity: 0 },
                    {
                        strokeDashoffset: 0,
                        opacity: 1,
                        duration: 2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 70%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            // Animate city dots
            const dots = section.querySelectorAll(".city-dot");
            gsap.fromTo(
                dots,
                { scale: 0, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: "back.out(2)",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 65%",
                        toggleActions: "play none none none",
                    },
                }
            );

            // Animate the fill
            const fill = section.querySelector(".map-fill");
            if (fill) {
                gsap.fromTo(
                    fill,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 1.5,
                        delay: 0.5,
                        scrollTrigger: {
                            trigger: section,
                            start: "top 70%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="section-padding">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-xs text-gold uppercase tracking-[0.3em] mb-4 block">
                        Where We Build
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-outfit)] mb-4">
                        Across <span className="gold-gradient-text">Jharkhand</span>
                    </h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        Click on a city to explore our projects, plots, and developments.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    {/* SVG Map */}
                    <div className="lg:col-span-3 relative">
                        <div className="relative rounded-2xl bg-surface-light border border-border overflow-hidden p-4">
                            <svg
                                ref={mapRef}
                                viewBox="0 0 560 500"
                                className="w-full h-auto"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {/* Background grid */}
                                <defs>
                                    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(200,164,94,0.06)" strokeWidth="0.5" />
                                    </pattern>
                                    <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="rgba(200,164,94,0.08)" />
                                        <stop offset="100%" stopColor="transparent" />
                                    </radialGradient>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="3" result="blur" />
                                        <feMerge>
                                            <feMergeNode in="blur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                <rect width="560" height="500" fill="url(#grid)" />
                                <rect width="560" height="500" fill="url(#mapGlow)" />

                                {/* Jharkhand state outline (simplified) */}
                                <path
                                    className="map-fill"
                                    d="M 120 100 L 180 60 L 260 50 L 340 55 L 420 80 L 480 120 L 500 180 L 490 260 L 470 340 L 450 400 L 420 440 L 360 460 L 280 470 L 200 450 L 140 400 L 100 320 L 80 240 L 90 170 Z"
                                    fill="rgba(200,164,94,0.04)"
                                    opacity="0"
                                />
                                <path
                                    className="map-outline"
                                    d="M 120 100 L 180 60 L 260 50 L 340 55 L 420 80 L 480 120 L 500 180 L 490 260 L 470 340 L 450 400 L 420 440 L 360 460 L 280 470 L 200 450 L 140 400 L 100 320 L 80 240 L 90 170 Z"
                                    fill="none"
                                    stroke="rgba(200,164,94,0.3)"
                                    strokeWidth="1.5"
                                    strokeDasharray="2000"
                                    strokeDashoffset="2000"
                                    opacity="0"
                                />

                                {/* Internal district borders */}
                                <path
                                    className="map-outline"
                                    d="M 180 60 L 200 200 L 280 300 L 360 460"
                                    fill="none"
                                    stroke="rgba(200,164,94,0.1)"
                                    strokeWidth="0.5"
                                    strokeDasharray="2000"
                                    strokeDashoffset="2000"
                                    opacity="0"
                                />
                                <path
                                    className="map-outline"
                                    d="M 420 80 L 350 250 L 200 450"
                                    fill="none"
                                    stroke="rgba(200,164,94,0.1)"
                                    strokeWidth="0.5"
                                    strokeDasharray="2000"
                                    strokeDashoffset="2000"
                                    opacity="0"
                                />

                                {/* Connection lines between cities */}
                                {cities.map((city, i) =>
                                    cities.slice(i + 1).map((city2) => (
                                        <line
                                            key={`${city.name}-${city2.name}`}
                                            x1={city.cx}
                                            y1={city.cy}
                                            x2={city2.cx}
                                            y2={city2.cy}
                                            stroke="rgba(200,164,94,0.08)"
                                            strokeWidth="0.5"
                                            strokeDasharray="4 4"
                                        />
                                    ))
                                )}

                                {/* City markers */}
                                {cities.map((city) => (
                                    <g
                                        key={city.name}
                                        className="city-dot cursor-pointer"
                                        onClick={() =>
                                            setActiveCity(activeCity === city.name ? null : city.name)
                                        }
                                        style={{ transformOrigin: `${city.cx}px ${city.cy}px` }}
                                    >
                                        {/* Outer pulse ring */}
                                        <circle
                                            cx={city.cx}
                                            cy={city.cy}
                                            r={activeCity === city.name ? 24 : 16}
                                            fill="none"
                                            stroke="rgba(200,164,94,0.2)"
                                            strokeWidth="1"
                                            className={activeCity === city.name ? "animate-ping" : ""}
                                            style={{ transformOrigin: `${city.cx}px ${city.cy}px` }}
                                        />
                                        {/* Glow circle */}
                                        <circle
                                            cx={city.cx}
                                            cy={city.cy}
                                            r="12"
                                            fill={
                                                activeCity === city.name
                                                    ? "rgba(200,164,94,0.2)"
                                                    : "rgba(200,164,94,0.08)"
                                            }
                                            filter="url(#glow)"
                                        />
                                        {/* Core dot */}
                                        <circle
                                            cx={city.cx}
                                            cy={city.cy}
                                            r={activeCity === city.name ? 7 : 5}
                                            fill={
                                                activeCity === city.name ? "#c8a45e" : "rgba(200,164,94,0.7)"
                                            }
                                            className="transition-all duration-300"
                                        />
                                        {/* Inner dot */}
                                        <circle
                                            cx={city.cx}
                                            cy={city.cy}
                                            r="2"
                                            fill="#0a0a0a"
                                        />

                                        {/* City label */}
                                        <text
                                            x={city.cx + 14}
                                            y={city.cy + 4}
                                            fill={
                                                activeCity === city.name
                                                    ? "#c8a45e"
                                                    : "rgba(170,170,170,0.8)"
                                            }
                                            fontSize="11"
                                            fontFamily="var(--font-outfit)"
                                            fontWeight={activeCity === city.name ? "600" : "400"}
                                            className="transition-all duration-300 select-none"
                                        >
                                            {city.name}
                                        </text>
                                    </g>
                                ))}
                            </svg>

                            {/* Map attribution */}
                            <div className="absolute bottom-2 left-4 text-[9px] text-muted/40">
                                Jharkhand, India
                            </div>
                        </div>
                    </div>

                    {/* Info Panel */}
                    <div className="lg:col-span-2">
                        {selected ? (
                            <div className="glass rounded-2xl p-6 gold-glow animate-in h-full">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                                            <MapPin size={16} className="text-gold" />
                                        </div>
                                        <h3 className="text-xl font-bold font-[var(--font-outfit)]">
                                            {selected.name}
                                        </h3>
                                    </div>
                                    <button
                                        onClick={() => setActiveCity(null)}
                                        className="w-8 h-8 rounded-full bg-surface-light flex items-center justify-center text-muted hover:text-foreground hover:bg-surface-lighter transition-all"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                                <p className="text-sm text-gold mb-6">{selected.highlight}</p>

                                <div className="grid grid-cols-3 gap-3">
                                    <div className="text-center p-4 rounded-xl bg-surface-light border border-border hover:border-gold/20 transition-colors">
                                        <Building2 size={18} className="text-gold mx-auto mb-2" />
                                        <div className="text-2xl font-bold font-[var(--font-outfit)]">
                                            {selected.projects}
                                        </div>
                                        <div className="text-[10px] text-muted-foreground mt-1">
                                            Projects
                                        </div>
                                    </div>
                                    <div className="text-center p-4 rounded-xl bg-surface-light border border-border hover:border-gold/20 transition-colors">
                                        <TreePine size={18} className="text-gold mx-auto mb-2" />
                                        <div className="text-2xl font-bold font-[var(--font-outfit)]">
                                            {selected.plots}
                                        </div>
                                        <div className="text-[10px] text-muted-foreground mt-1">
                                            Plots
                                        </div>
                                    </div>
                                    <div className="text-center p-4 rounded-xl bg-surface-light border border-border hover:border-gold/20 transition-colors">
                                        <MapPin size={18} className="text-gold mx-auto mb-2" />
                                        <div className="text-2xl font-bold font-[var(--font-outfit)]">
                                            {selected.houses}
                                        </div>
                                        <div className="text-[10px] text-muted-foreground mt-1">
                                            Houses
                                        </div>
                                    </div>
                                </div>

                                {/* Quick action */}
                                <div className="mt-6 pt-4 border-t border-border">
                                    <a
                                        href="/projects"
                                        className="text-sm text-gold hover:text-gold-light transition-colors flex items-center gap-1"
                                    >
                                        View {selected.name} projects →
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="glass rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 rounded-full bg-gold/5 flex items-center justify-center mb-4">
                                    <MapPin size={24} className="text-gold/40" />
                                </div>
                                <p className="text-muted-foreground text-sm mb-2">
                                    Click on a city marker
                                </p>
                                <p className="text-muted text-xs">
                                    Explore our projects across Jharkhand
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
