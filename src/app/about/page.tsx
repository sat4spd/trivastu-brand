import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import { Target, Users, Award, Heart, Building2, TreePine, MapPin } from "lucide-react";

export const metadata: Metadata = {
    title: "About Us - Trivastu Ventures",
    description: "Learn about Trivastu Ventures - Jharkhand's leading prop-tech company building premium homes, plots, and real estate since 2019.",
};

const values = [
    { icon: Target, title: "Vision", description: "To be Jharkhand's most trusted name in real estate and construction." },
    { icon: Award, title: "Quality", description: "Premium materials and ISI-certified construction at every stage." },
    { icon: Heart, title: "Trust", description: "Transparent pricing, RERA compliance, and honest relationships." },
    { icon: Users, title: "Community", description: "Building neighborhoods, not just houses." },
];

const team = [
    { name: "Kishan Kumar", role: "Founder & CEO", image: "/images/team-founder.png" },
    { name: "Engineering Team", role: "Civil & Structural", image: "/images/team-engineering.png" },
    { name: "Design Team", role: "Architecture & Interiors", image: "/images/team-design.png" },
    { name: "Operations Team", role: "Project Management", image: "/images/team-operations.png" },
];

export default function AboutPage() {
    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-20 px-6 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,164,94,0.08)_0%,transparent_60%)]" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="text-xs text-gold uppercase tracking-[0.3em] mb-4 block">About Us</span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[var(--font-outfit)] mb-6">
                        Building Trust Since <span className="gold-gradient-text">2019</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        Trivastu Ventures is a modern prop-tech ecosystem that combines construction expertise with technology to deliver premium homes, verified plots, and real estate solutions across Jharkhand.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <ScrollReveal animation="fadeUp">
                <section className="section-padding px-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border gold-border-glow">
                            <Image src="/images/construction-site.png" alt="Trivastu construction" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                        </div>
                        <div className="space-y-6">
                            <span className="text-xs text-gold uppercase tracking-[0.3em]">Our Story</span>
                            <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-outfit)]">
                                From a <span className="gold-gradient-text">Single Plot</span> to an Ecosystem
                            </h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Founded in 2019 in Ranchi, Trivastu started with a simple mission - to bring transparency and quality to real estate in Jharkhand. What began with a single residential project has grown into a full-service prop-tech ecosystem.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Today, we operate across Ranchi, Jamshedpur, Bokaro, and Hazaribagh - offering construction services through realty.trivastu.com and premium plots through plot.trivastu.com.
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                                {[
                                    { num: "500+", label: "Projects" },
                                    { num: "4", label: "Cities" },
                                    { num: "10+", label: "Years" },
                                    { num: "1000+", label: "Families" },
                                ].map((stat) => (
                                    <div key={stat.label} className="text-center p-3 rounded-xl bg-surface-light border border-border">
                                        <div className="text-2xl font-bold font-[var(--font-outfit)] gold-gradient-text">{stat.num}</div>
                                        <div className="text-[10px] text-muted-foreground mt-1">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Values */}
            <ScrollReveal animation="scaleUp">
                <section className="section-padding px-6 bg-surface border-y border-border">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="text-xs text-gold uppercase tracking-[0.3em] mb-4 block">What Drives Us</span>
                            <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-outfit)]">
                                Our <span className="gold-gradient-text">Values</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((v) => (
                                <div key={v.title} className="p-6 rounded-2xl border border-border bg-surface-light hover:border-gold/30 transition-all duration-500 gold-border-glow text-center group">
                                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                                        <v.icon size={22} className="text-gold" />
                                    </div>
                                    <h3 className="text-lg font-bold font-[var(--font-outfit)] mb-2">{v.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Team */}
            <ScrollReveal animation="fadeUp">
                <section className="section-padding px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <span className="text-xs text-gold uppercase tracking-[0.3em] mb-4 block">Our People</span>
                            <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-outfit)]">
                                The <span className="gold-gradient-text">Team</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {team.map((t) => (
                                <div key={t.name} className="p-6 rounded-2xl border border-border bg-surface-light hover:border-gold/30 transition-all duration-500 text-center group">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gold/30 mx-auto mb-4 group-hover:border-gold transition-colors">
                                        <Image src={t.image} alt={t.name} width={80} height={80} className="object-cover w-full h-full" />
                                    </div>
                                    <h3 className="font-semibold font-[var(--font-outfit)] group-hover:text-gold transition-colors">{t.name}</h3>
                                    <p className="text-xs text-muted-foreground mt-1">{t.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal animation="blurIn">
                <section className="section-padding px-6">
                    <div className="max-w-3xl mx-auto text-center p-10 rounded-2xl glass gold-glow">
                        <h2 className="text-3xl font-bold font-[var(--font-outfit)] mb-4">Ready to Build Your Dream?</h2>
                        <p className="text-muted-foreground mb-8">Let&apos;s start a conversation about your next project.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" className="px-8 py-3 bg-gold text-background rounded-full font-semibold text-sm hover:bg-gold-light transition-all duration-500 hover:shadow-[0_0_30px_rgba(200,164,94,0.3)]">
                                Contact Us
                            </Link>
                            <a href="https://realty.trivastu.com" className="px-8 py-3 border border-gold/30 text-gold rounded-full font-semibold text-sm hover:bg-gold/10 transition-all duration-500">
                                Explore Services
                            </a>
                        </div>
                    </div>
                </section>
            </ScrollReveal>
        </>
    );
}
