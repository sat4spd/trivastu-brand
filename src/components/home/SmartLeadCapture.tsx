"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2, MapPin, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const serviceOptions = [
    { id: "build", label: "Build a House", icon: Building2, subtitle: "Construction services" },
    { id: "plot", label: "Buy a Plot", icon: MapPin, subtitle: "Plot marketplace" },
    { id: "invest", label: "Invest", icon: TrendingUp, subtitle: "Real estate investment" },
];

const budgetRanges = [
    "Under ₹20 Lakh",
    "₹20-50 Lakh",
    "₹50 Lakh - 1 Cr",
    "₹1-2 Crore",
    "₹2 Crore+",
];

const locations = ["Ranchi", "Jamshedpur", "Bokaro", "Hazaribagh", "Other"];
const timelines = ["Immediately", "1-3 Months", "3-6 Months", "6-12 Months", "Planning Phase"];

export default function SmartLeadCapture() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        service: "",
        budget: "",
        location: "",
        timeline: "",
        name: "",
        phone: "",
        email: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                formRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power3.out",
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

    const handleSubmit = () => {
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <section ref={sectionRef} className="section-padding">
                <div className="max-w-2xl mx-auto px-6 text-center">
                    <div ref={formRef} className="glass rounded-2xl p-12 gold-glow">
                        <CheckCircle size={48} className="text-gold mx-auto mb-4" />
                        <h3 className="text-2xl font-bold font-[var(--font-outfit)] mb-2">
                            Thank You!
                        </h3>
                        <p className="text-muted-foreground">
                            Our team will get back to you within 24 hours.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={sectionRef} className="section-padding">
            <div className="max-w-2xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <span className="text-xs text-gold uppercase tracking-[0.3em] mb-4 block">
                        Get Started
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-[var(--font-outfit)] mb-4">
                        Let&apos;s <span className="gold-gradient-text">Talk</span>
                    </h2>
                    <p className="text-muted-foreground">
                        Tell us what you need and we&apos;ll connect you with the right team.
                    </p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {[0, 1, 2].map((s) => (
                        <div
                            key={s}
                            className={cn(
                                "h-1.5 rounded-full transition-all duration-500",
                                s === step ? "w-8 bg-gold" : s < step ? "w-4 bg-gold/50" : "w-4 bg-border"
                            )}
                        />
                    ))}
                </div>

                {/* Form */}
                <div ref={formRef} className="glass rounded-2xl p-8 gold-glow opacity-0">
                    {/* Step 0: Service */}
                    {step === 0 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold mb-4">
                                What are you looking for?
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {serviceOptions.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => {
                                            setFormData({ ...formData, service: opt.id });
                                            setStep(1);
                                        }}
                                        className={cn(
                                            "p-6 rounded-xl border transition-all duration-300 text-left hover:border-gold/40 hover:bg-gold/5",
                                            formData.service === opt.id
                                                ? "border-gold bg-gold/10"
                                                : "border-border"
                                        )}
                                    >
                                        <opt.icon size={24} className="text-gold mb-3" />
                                        <div className="font-semibold text-sm">{opt.label}</div>
                                        <div className="text-xs text-muted-foreground mt-1">
                                            {opt.subtitle}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 1: Details */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold mb-4">Tell us more</h3>

                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">
                                    Budget Range
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {budgetRanges.map((b) => (
                                        <button
                                            key={b}
                                            onClick={() => setFormData({ ...formData, budget: b })}
                                            className={cn(
                                                "px-4 py-2 text-sm rounded-full border transition-all",
                                                formData.budget === b
                                                    ? "bg-gold text-background border-gold"
                                                    : "border-border text-muted-foreground hover:border-gold/40"
                                            )}
                                        >
                                            {b}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">
                                    Preferred Location
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {locations.map((l) => (
                                        <button
                                            key={l}
                                            onClick={() => setFormData({ ...formData, location: l })}
                                            className={cn(
                                                "px-4 py-2 text-sm rounded-full border transition-all",
                                                formData.location === l
                                                    ? "bg-gold text-background border-gold"
                                                    : "border-border text-muted-foreground hover:border-gold/40"
                                            )}
                                        >
                                            {l}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-muted-foreground mb-2 block">
                                    Timeline
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {timelines.map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setFormData({ ...formData, timeline: t })}
                                            className={cn(
                                                "px-4 py-2 text-sm rounded-full border transition-all",
                                                formData.timeline === t
                                                    ? "bg-gold text-background border-gold"
                                                    : "border-border text-muted-foreground hover:border-gold/40"
                                            )}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setStep(0)}
                                    className="px-6 py-3 text-sm border border-border rounded-full text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => setStep(2)}
                                    className="flex-1 px-6 py-3 text-sm bg-gold text-background rounded-full hover:bg-gold-light transition-colors flex items-center justify-center gap-2"
                                >
                                    Continue <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Contact */}
                    {step === 2 && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold mb-4">Your Contact Info</h3>
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full px-4 py-3 bg-surface-light border border-border rounded-xl text-foreground placeholder:text-muted text-sm focus:border-gold/50 focus:outline-none transition-colors"
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                className="w-full px-4 py-3 bg-surface-light border border-border rounded-xl text-foreground placeholder:text-muted text-sm focus:border-gold/50 focus:outline-none transition-colors"
                            />
                            <input
                                type="email"
                                placeholder="Email (optional)"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="w-full px-4 py-3 bg-surface-light border border-border rounded-xl text-foreground placeholder:text-muted text-sm focus:border-gold/50 focus:outline-none transition-colors"
                            />
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-6 py-3 text-sm border border-border rounded-full text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 px-6 py-3 text-sm bg-gold text-background rounded-full hover:bg-gold-light transition-colors font-semibold"
                                >
                                    Submit Inquiry
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
