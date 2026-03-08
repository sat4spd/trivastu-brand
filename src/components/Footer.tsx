"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Mail,
    Phone,
    ArrowUpRight,
} from "lucide-react";

const platforms = [
    { label: "Construction Services", href: "https://realty.trivastu.com" },
    { label: "Plot Marketplace", href: "https://plot.trivastu.com" },
    { label: "Architecture", href: "/services#architecture" },
    { label: "Real Estate Development", href: "/services#realestate" },
];

const company = [
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
];

const locations = ["Ranchi", "Jamshedpur", "Bokaro", "Hazaribagh"];

export default function Footer() {
    const [businessInfo, setBusinessInfo] = useState({
        phone: "+91 8655202633",
        email: "contact@trivastu.com",
        address: "Singhmore, Hatia, Ranchi - 834003"
    });

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const res = await fetch("https://api.trivastu.com/api/cms/business-info");
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.phone) setBusinessInfo(data);
                }
            } catch (err) {
                console.error("Failed to fetch business info:", err);
            }
        };
        fetchInfo();
    }, []);

    return (
        <footer className="border-t border-border bg-[#060606]">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <div className="relative w-10 h-10 rounded-lg overflow-hidden transition-transform group-hover:scale-110">
                                <Image
                                    src="/images/logo.png"
                                    alt="Trivastu"
                                    fill
                                    className="object-contain"
                                    sizes="40px"
                                />
                            </div>
                            <div>
                                <span className="text-xl font-bold tracking-tight font-[var(--font-outfit)] gold-gradient-text">
                                    Trivastu
                                </span>
                                <span className="block text-[10px] text-muted tracking-[0.2em] uppercase">
                                    Ventures
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs">
                            A modern prop-tech ecosystem building dreams across Jharkhand.
                            Construction, plots, and real estate development.
                        </p>
                        <div className="space-y-2">
                            <a
                                href={`tel:${businessInfo.phone?.replace(/\s+/g, '') || "+918655202633"}`}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                            >
                                <Phone size={14} className="text-gold" />
                                {businessInfo.phone || "+91 8655202633"}
                            </a>
                            <a
                                href={`mailto:${businessInfo.email || "contact@trivastu.com"}`}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                            >
                                <Mail size={14} className="text-gold" />
                                {businessInfo.email || "contact@trivastu.com"}
                            </a>
                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                <MapPin size={14} className="text-gold mt-0.5 flex-shrink-0" />
                                {businessInfo.address || "Singhmore, Hatia, Ranchi - 834003"}
                            </div>
                        </div>
                    </div>

                    {/* Platforms */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-6">
                            Platforms
                        </h3>
                        <ul className="space-y-3">
                            {platforms.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-gold transition-colors flex items-center gap-1 group"
                                    >
                                        {link.label}
                                        {link.href.startsWith("http") && (
                                            <ArrowUpRight
                                                size={12}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            />
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-6">
                            Company
                        </h3>
                        <ul className="space-y-3">
                            {company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-gold transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Locations */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold mb-6">
                            Locations
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {locations.map((city) => (
                                <span
                                    key={city}
                                    className="px-4 py-1.5 text-xs border border-border rounded-full text-muted-foreground hover:border-gold/30 hover:text-gold transition-all duration-300 cursor-default"
                                >
                                    {city}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted">
                        © {new Date().getFullYear()} Trivastu Ventures. All rights reserved.
                    </p>
                    <p className="text-xs text-muted">
                        Premium Homes • Ethical Vastu • Trusted Legacy
                    </p>
                </div>
            </div>
        </footer>
    );
}
