"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const filters = ["All", "Residential", "Plots", "Commercial", "Completed", "Ongoing"];

const portfolioItems = [
    { title: "Sunrise Villa", category: "Residential", status: "Completed", city: "Ranchi", image: "/images/project-villa.png" },
    { title: "Green Heights Plot", category: "Plots", status: "Completed", city: "Hazaribagh", image: "/images/plot-landscape.png" },
    { title: "City Center Mall", category: "Commercial", status: "Ongoing", city: "Bokaro", image: "/images/commercial-building.png" },
    { title: "Lakeview Duplex", category: "Residential", status: "Completed", city: "Ranchi", image: "/images/project-villa.png" },
    { title: "Valley Estates", category: "Plots", status: "Ongoing", city: "Jamshedpur", image: "/images/plot-landscape.png" },
    { title: "Horizon Apartments", category: "Residential", status: "Completed", city: "Ranchi", image: "/images/project-apartments.png" },
    { title: "Business Park", category: "Commercial", status: "Completed", city: "Jamshedpur", image: "/images/commercial-building.png" },
    { title: "Garden Plots", category: "Plots", status: "Ongoing", city: "Hazaribagh", image: "/images/plot-landscape.png" },
];

export default function PortfolioGallery() {
    const [activeFilter, setActiveFilter] = useState("All");
    const sectionRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const filtered =
        activeFilter === "All"
            ? portfolioItems
            : portfolioItems.filter(
                (item) =>
                    item.category === activeFilter || item.status === activeFilter
            );

    useEffect(() => {
        if (!gridRef.current) return;
        const children = gridRef.current.children;
        gsap.fromTo(
            children,
            { opacity: 0, scale: 0.85, y: 30, rotateX: 5 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: "back.out(1.2)",
            }
        );
    }, [activeFilter]);

    return (
        <section ref={sectionRef} className="section-padding bg-surface border-y border-border">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-xs text-gold uppercase tracking-[0.3em] mb-4 block">
                        Portfolio
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-outfit)] mb-4">
                        Our <span className="gold-gradient-text">Gallery</span>
                    </h2>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={cn(
                                "px-5 py-2 text-sm rounded-full border transition-all duration-500",
                                activeFilter === filter
                                    ? "bg-gold text-background border-gold shadow-[0_0_20px_rgba(200,164,94,0.3)]"
                                    : "border-border text-muted-foreground hover:border-gold/40 hover:text-gold hover:bg-gold/5"
                            )}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {filtered.map((item) => (
                        <div
                            key={item.title}
                            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:border-gold/30 transition-all duration-700 gold-border-glow border border-border"
                        >
                            {/* Real Image */}
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />

                            {/* Always-visible title */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                                <div className="p-4 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-xs text-gold mb-1">{item.category}</p>
                                    <h3 className="text-sm font-bold text-foreground">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">{item.city}</p>
                                </div>
                            </div>

                            {/* Status dot */}
                            <div className="absolute top-3 right-3">
                                <div
                                    className={cn(
                                        "w-2.5 h-2.5 rounded-full border border-background/50",
                                        item.status === "Completed"
                                            ? "bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]"
                                            : "bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                                    )}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
