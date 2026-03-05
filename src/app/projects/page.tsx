import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Projects - Trivastu Ventures",
    description: "Explore completed, ongoing, and upcoming projects by Trivastu Ventures across Ranchi, Jamshedpur, Bokaro, and Hazaribagh.",
};

const projects = [
    { title: "Modern Villa - Doranda", location: "Ranchi", type: "Residential", status: "Completed", area: "2400 sq.ft", description: "3BHK luxury villa with contemporary architecture and premium interiors.", image: "/images/project-villa.png" },
    { title: "Green Valley Plots", location: "Hazaribagh", type: "Plots", status: "Ongoing", area: "50+ Plots", description: "Premium residential plots with 360 degree green surroundings and modern infrastructure.", image: "/images/plot-landscape.png" },
    { title: "Skyline Apartments", location: "Jamshedpur", type: "Residential", status: "Completed", area: "8 Floors", description: "Multi-storey apartments combining modern design with city convenience.", image: "/images/project-apartments.png" },
    { title: "Urban Square Commercial", location: "Bokaro", type: "Commercial", status: "Upcoming", area: "15000 sq.ft", description: "State-of-the-art commercial complex for retail and office space.", image: "/images/commercial-building.png" },
    { title: "Lakeview Heritage Villas", location: "Ranchi", type: "Residential", status: "Completed", area: "3200 sq.ft", description: "Luxury duplex villas with lake-facing views and premium landscaping.", image: "/images/project-villa.png" },
    { title: "Sunrise Estate Plots", location: "Jamshedpur", type: "Plots", status: "Ongoing", area: "120 Plots", description: "Large-scale township plots with wide roads, parks, and amenities.", image: "/images/plot-landscape.png" },
];

export default function ProjectsPage() {
    return (
        <>
            {/* Hero */}
            <section className="pt-32 pb-20 px-6 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,164,94,0.08)_0%,transparent_60%)]" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="text-xs text-gold uppercase tracking-[0.3em] mb-4 block">Portfolio</span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[var(--font-outfit)] mb-6">
                        Our <span className="gold-gradient-text">Projects</span>
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        From villas to townships - explore the projects we have built and are building across Jharkhand.
                    </p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <ScrollReveal key={project.title} animation="fadeUp" delay={index * 0.1}>
                                <div className="group rounded-2xl border border-border bg-surface-light overflow-hidden hover:border-gold/30 transition-all duration-700 gold-border-glow h-full">
                                    {/* Image */}
                                    <div className="aspect-[16/10] relative overflow-hidden">
                                        <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-surface-light via-transparent to-transparent opacity-60" />
                                        {/* Status badge */}
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-3 py-1 text-xs rounded-full backdrop-blur-sm ${project.status === "Completed" ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                                    : project.status === "Ongoing" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                                }`}>
                                                {project.status}
                                            </span>
                                        </div>
                                    </div>
                                    {/* Content */}
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                            <MapPin size={12} className="text-gold" />
                                            {project.location}
                                            <span className="text-border">|</span>
                                            {project.type}
                                            <span className="text-border">|</span>
                                            {project.area}
                                        </div>
                                        <h3 className="text-lg font-bold font-[var(--font-outfit)] mb-2 group-hover:text-gold transition-colors duration-500">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <ScrollReveal animation="blurIn">
                <section className="section-padding px-6 bg-surface border-t border-border">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold font-[var(--font-outfit)] mb-4">Want to Start Your Project?</h2>
                        <p className="text-muted-foreground mb-8">Let us bring your vision to life with our expertise.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" className="px-8 py-3 bg-gold text-background rounded-full font-semibold text-sm hover:bg-gold-light transition-all duration-500 hover:shadow-[0_0_30px_rgba(200,164,94,0.3)] inline-flex items-center gap-2 justify-center group">
                                Start Your Project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/services" className="px-8 py-3 border border-gold/30 text-gold rounded-full font-semibold text-sm hover:bg-gold/10 transition-all duration-500 inline-flex items-center justify-center">
                                View Services
                            </Link>
                        </div>
                    </div>
                </section>
            </ScrollReveal>
        </>
    );
}
