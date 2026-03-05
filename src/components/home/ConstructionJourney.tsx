"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import {
    Shovel,
    Landmark,
    Building,
    BrickWall,
    Paintbrush,
    Home,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stages = [
    {
        id: 1,
        title: "Site Preparation",
        icon: Shovel,
        description:
            "Soil testing, site clearing, and ground leveling. The foundation of every great structure begins with meticulous site preparation.",
        materials: ["Excavation machinery", "Soil testing kits", "Leveling equipment"],
        duration: "2-3 weeks",
    },
    {
        id: 2,
        title: "Foundation",
        icon: Landmark,
        description:
            "Deep footings and reinforced concrete foundation. Designed to withstand Jharkhand's terrain and weather conditions.",
        materials: ["Reinforced steel", "Concrete M25+", "Waterproofing membrane"],
        duration: "3-4 weeks",
    },
    {
        id: 3,
        title: "Structure",
        icon: Building,
        description:
            "Column and beam framework rises. The skeletal structure that defines your building's strength and form.",
        materials: ["TMT steel bars", "Concrete blocks", "Formwork"],
        duration: "6-8 weeks",
    },
    {
        id: 4,
        title: "Walls",
        icon: BrickWall,
        description:
            "Brick laying and partition walls. Each wall is precisely aligned and built for thermal insulation.",
        materials: ["AAC blocks / Red bricks", "Cement mortar", "Wall ties"],
        duration: "4-5 weeks",
    },
    {
        id: 5,
        title: "Interior",
        icon: Paintbrush,
        description:
            "Electrical wiring, plumbing, flooring, and wall finishing. The details that make a house feel like home.",
        materials: ["Copper wiring", "CPVC pipes", "Vitrified tiles", "Putty & paint"],
        duration: "6-8 weeks",
    },
    {
        id: 6,
        title: "Finished Home",
        icon: Home,
        description:
            "Final inspection, quality check, and handover. Your dream home is ready - move in and start living.",
        materials: ["Final fixtures", "Landscaping", "Quality certificate"],
        duration: "1-2 weeks",
    },
];

export default function ConstructionJourney() {
    const [activeStage, setActiveStage] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                section.querySelectorAll(".journey-item"),
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, section);

        return () => ctx.revert();
    }, []);

    const currentStage = stages[activeStage];

    return (
        <section ref={sectionRef} className="section-padding bg-surface border-y border-border">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-xs text-gold uppercase tracking-[0.3em] mb-4 block">
                        Construction Process
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-outfit)] mb-4">
                        Your Building <span className="gold-gradient-text">Journey</span>
                    </h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        Understand every stage of construction - materials, timelines, and engineering.
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="relative mb-12">
                    <div className="flex items-center justify-between relative z-10">
                        {stages.map((stage, index) => (
                            <button
                                key={stage.id}
                                onClick={() => setActiveStage(index)}
                                className={cn(
                                    "journey-item flex flex-col items-center gap-2 group opacity-0 flex-1",
                                )}
                            >
                                <div
                                    className={cn(
                                        "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                                        index <= activeStage
                                            ? "bg-gold border-gold text-background"
                                            : "bg-surface-light border-border text-muted group-hover:border-gold/40"
                                    )}
                                >
                                    <stage.icon size={18} />
                                </div>
                                <span
                                    className={cn(
                                        "text-[10px] md:text-xs text-center transition-colors hidden sm:block",
                                        index <= activeStage
                                            ? "text-gold"
                                            : "text-muted-foreground group-hover:text-gold"
                                    )}
                                >
                                    {stage.title}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Progress line */}
                    <div className="absolute top-5 md:top-6 left-0 right-0 h-0.5 bg-border">
                        <div
                            className="h-full bg-gold transition-all duration-700 ease-out"
                            style={{
                                width: `${(activeStage / (stages.length - 1)) * 100}%`,
                            }}
                        />
                    </div>
                </div>

                {/* Active Stage Detail */}
                <div className="glass rounded-2xl p-8 gold-glow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                                    <currentStage.icon size={20} className="text-gold" />
                                </div>
                                <div>
                                    <span className="text-xs text-gold">
                                        Stage {currentStage.id} of {stages.length}
                                    </span>
                                    <h3 className="text-xl font-bold font-[var(--font-outfit)]">
                                        {currentStage.title}
                                    </h3>
                                </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                {currentStage.description}
                            </p>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-gold">Duration:</span>
                                <span className="text-muted-foreground">
                                    {currentStage.duration}
                                </span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gold mb-4">
                                Key Materials & Equipment
                            </h4>
                            <div className="space-y-2">
                                {currentStage.materials.map((material) => (
                                    <div
                                        key={material}
                                        className="flex items-center gap-2 text-sm text-muted-foreground"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                                        {material}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
