import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import { Building2, MapPin, Ruler, TrendingUp, Palette, HardHat, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Services - Trivastu Ventures",
    description: "Explore Trivastu's services - construction, plot marketplace, architecture design, and real estate development across Jharkhand.",
};

const services = [
    {
        id: "construction",
        icon: Building2,
        title: "Construction Services",
        subtitle: "Build your dream home",
        description: "End-to-end house construction from foundation to finishing. Choose from Standard, Premium, and Luxury packages with transparent pricing and quality materials.",
        features: ["Custom Floor Plans", "ISI-Certified Materials", "Progress Tracking", "5-Year Warranty"],
        link: "https://realty.trivastu.com",
        image: "/images/construction-site.png",
        external: true,
    },
    {
        id: "plots",
        icon: MapPin,
        title: "Plot Marketplace",
        subtitle: "Find your perfect plot",
        description: "Verified, RERA-registered plots across Jharkhand with clear titles, road access, and modern infrastructure. Browse, compare, and book online.",
        features: ["RERA Registered", "Clear Title Verification", "Site Visit Booking", "EMI Options"],
        link: "https://plot.trivastu.com",
        image: "/images/plot-landscape.png",
        external: true,
    },
    {
        id: "architecture",
        icon: Palette,
        title: "Architecture Design",
        subtitle: "Design that inspires",
        description: "Modern architectural design services combining Vastu principles with contemporary aesthetics. 3D renders, floor plans, and complete design documentation.",
        features: ["Vastu-Compliant", "3D Visualization", "Interior Design", "Structural Drawing"],
        link: "/contact",
        image: "/images/project-villa.png",
        external: false,
    },
    {
        id: "realestate",
        icon: TrendingUp,
        title: "Real Estate Development",
        subtitle: "Invest in the future",
        description: "From land acquisition to township creation - complete real estate development solutions for residential colonies, commercial complexes, and mixed-use projects.",
        features: ["Land Acquisition", "Township Planning", "Commercial Projects", "Investment Advisory"],
        link: "/contact",
        image: "/images/commercial-building.png",
        external: false,
    },
];

export default function ServicesPage() {
    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-20 px-6 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,164,94,0.08)_0%,transparent_60%)]" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="text-xs text-gold uppercase tracking-[0.3em] mb-4 block">Our Services</span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[var(--font-outfit)] mb-6">
                        What We <span className="gold-gradient-text">Build</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        A complete ecosystem of construction, real estate, and design services - powered by technology, driven by trust.
                    </p>
                </div>
            </section>

            {/* Service Cards */}
            <section className="pb-20 px-6">
                <div className="max-w-6xl mx-auto space-y-20">
                    {services.map((service, index) => (
                        <ScrollReveal key={service.id} animation={index % 2 === 0 ? "fadeLeft" : "fadeRight"}>
                            <div id={service.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center scroll-mt-24">
                                {/* Image */}
                                <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden border border-border gold-border-glow ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                                    <Image src={service.image} alt={service.title} fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4">
                                        <div className="w-10 h-10 rounded-lg bg-gold/20 backdrop-blur-sm flex items-center justify-center border border-gold/20">
                                            <service.icon size={18} className="text-gold" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-gold text-sm font-mono">0{index + 1}</span>
                                        <div className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent max-w-[100px]" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold font-[var(--font-outfit)]">
                                        {service.title}
                                    </h2>
                                    <p className="text-gold text-sm">{service.subtitle}</p>
                                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>

                                    {/* Features */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {service.features.map((feature) => (
                                            <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    {service.external ? (
                                        <a
                                            href={service.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-background rounded-full font-semibold text-sm hover:bg-gold-light transition-all duration-500 hover:shadow-[0_0_30px_rgba(200,164,94,0.3)] group"
                                        >
                                            Explore {service.title.split(" ")[0]}
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    ) : (
                                        <Link
                                            href={service.link}
                                            className="inline-flex items-center gap-2 px-6 py-3 border border-gold/30 text-gold rounded-full font-semibold text-sm hover:bg-gold/10 transition-all duration-500 group"
                                        >
                                            Get in Touch
                                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <ScrollReveal animation="blurIn">
                <section className="section-padding px-6 bg-surface border-t border-border">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold font-[var(--font-outfit)] mb-4">Not Sure Where to Start?</h2>
                        <p className="text-muted-foreground mb-8">Book a free consultation and let our experts guide you.</p>
                        <Link href="/contact" className="px-8 py-3 bg-gold text-background rounded-full font-semibold text-sm hover:bg-gold-light transition-all duration-500 hover:shadow-[0_0_30px_rgba(200,164,94,0.3)]">
                            Book Free Consultation
                        </Link>
                    </div>
                </section>
            </ScrollReveal>
        </>
    );
}
