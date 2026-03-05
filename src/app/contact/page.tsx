"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Loader2 } from "lucide-react";

const contactInfo = [
    { icon: Phone, label: "Phone", value: "+91 8655202633", href: "tel:+918655202633" },
    { icon: Mail, label: "Email", value: "contact@trivastu.com", href: "mailto:contact@trivastu.com" },
    { icon: MapPin, label: "Office", value: "Singhmore, Hatia, Ranchi - 834003", href: null },
    { icon: Clock, label: "Hours", value: "Mon - Sat, 9AM - 7PM", href: null },
];

const serviceOptions = [
    "Build a House",
    "Buy a Plot",
    "Architecture Design",
    "Real Estate Development",
    "Investment Advisory",
    "Other",
];

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        budget: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    sourceApp: "BRAND",
                    leadType: "GENERAL",
                    details: {
                        service: formData.service,
                        budget: formData.budget,
                        message: formData.message
                    }
                })
            });

            if (!res.ok) throw new Error("Failed to submit");

            setSubmitted(true);
            setFormData({ name: "", phone: "", email: "", service: "", budget: "", message: "" });
            setTimeout(() => setSubmitted(false), 5000);
        } catch (err) {
            setError("Something went wrong. Please try again or call us.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-20 px-6 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,164,94,0.08)_0%,transparent_60%)]" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="text-xs text-gold uppercase tracking-[0.3em] mb-4 block">Get in Touch</span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[var(--font-outfit)] mb-6">
                        Let&apos;s Build <span className="gold-gradient-text">Together</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        Have a project in mind? We would love to hear from you. Get a free consultation with our experts.
                    </p>
                </div>
            </section>

            {/* Contact Grid */}
            <section className="pb-20 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Contact Info */}
                    <ScrollReveal animation="fadeLeft" className="lg:col-span-2">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold font-[var(--font-outfit)]">Contact Info</h2>
                            <div className="space-y-4">
                                {contactInfo.map((item) => (
                                    <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-surface-light hover:border-gold/30 transition-all duration-500 group">
                                        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                                            <item.icon size={18} className="text-gold" />
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                                            {item.href ? (
                                                <a href={item.href} className="text-sm font-medium hover:text-gold transition-colors">{item.value}</a>
                                            ) : (
                                                <span className="text-sm font-medium">{item.value}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Quick links */}
                            <div className="p-6 rounded-2xl glass gold-glow">
                                <h3 className="text-sm font-bold mb-3">Quick Links</h3>
                                <div className="space-y-2">
                                    <a href="https://realty.trivastu.com" className="block text-sm text-muted-foreground hover:text-gold transition-colors">
                                        Construction Services &rarr;
                                    </a>
                                    <a href="https://plot.trivastu.com" className="block text-sm text-muted-foreground hover:text-gold transition-colors">
                                        Plot Marketplace &rarr;
                                    </a>
                                    <Link href="/projects" className="block text-sm text-muted-foreground hover:text-gold transition-colors">
                                        View Projects &rarr;
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Contact Form */}
                    <ScrollReveal animation="fadeRight" className="lg:col-span-3">
                        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-surface-light">
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                                        <CheckCircle size={32} className="text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-bold font-[var(--font-outfit)] mb-2">Message Sent!</h3>
                                    <p className="text-muted-foreground text-sm">We will get back to you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <h2 className="text-2xl font-bold font-[var(--font-outfit)] mb-2">Send a Message</h2>

                                    {error && <div className="p-3 text-sm text-red-500 bg-red-500/10 rounded-xl border border-red-500/20">{error}</div>}

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-muted-foreground block mb-2">Full Name *</label>
                                            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors" placeholder="Your name" />
                                        </div>
                                        <div>
                                            <label className="text-xs text-muted-foreground block mb-2">Phone *</label>
                                            <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors" placeholder="+91 XXXXX XXXXX" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs text-muted-foreground block mb-2">Email</label>
                                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors" placeholder="you@email.com" />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs text-muted-foreground block mb-2">Service *</label>
                                            <select required value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-gold/40 transition-colors">
                                                <option value="">Select service</option>
                                                {serviceOptions.map((opt) => (
                                                    <option key={opt} value={opt}>{opt}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-xs text-muted-foreground block mb-2">Budget Range</label>
                                            <select value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-gold/40 transition-colors">
                                                <option value="">Select range</option>
                                                <option value="5-15L">5 - 15 Lakh</option>
                                                <option value="15-30L">15 - 30 Lakh</option>
                                                <option value="30-50L">30 - 50 Lakh</option>
                                                <option value="50L-1Cr">50 Lakh - 1 Crore</option>
                                                <option value="1Cr+">Above 1 Crore</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs text-muted-foreground block mb-2">Message</label>
                                        <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors resize-none" placeholder="Tell us about your project..." />
                                    </div>

                                    <button type="submit" disabled={loading} className="w-full py-3 bg-gold text-background rounded-xl font-semibold text-sm hover:bg-gold-light transition-all duration-500 hover:shadow-[0_0_30px_rgba(200,164,94,0.3)] flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed">
                                        {loading ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : <>Send Message <Send size={14} className="group-hover:translate-x-1 transition-transform" /></>}
                                    </button>
                                </form>
                            )}
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </>
    );
}
