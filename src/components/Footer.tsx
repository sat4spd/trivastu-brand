"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Mail,
    Phone,
    ArrowUpRight,
    Facebook,
    Instagram,
    Youtube,
    Linkedin,
    Twitter
} from "lucide-react";
import { BusinessInfo } from "@/lib/businessInfo";

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

interface FooterProps {
    businessInfo?: BusinessInfo;
}

export default function Footer({ businessInfo = {} }: FooterProps) {
    const phone = businessInfo?.phone || "+91 8655202633";
    const email = businessInfo?.email || "contact@trivastu.com";
    const address = businessInfo?.address || "Singhmore, Hatia, Ranchi - 834003";

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
                        <div className="space-y-2 mb-6">
                            <a
                                href={`tel:${phone.replace(/\s+/g, '')}`}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                            >
                                <Phone size={14} className="text-gold" />
                                {phone}
                            </a>
                            <a
                                href={`mailto:${email}`}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                            >
                                <Mail size={14} className="text-gold" />
                                {email}
                            </a>
                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                <MapPin size={14} className="text-gold mt-0.5 flex-shrink-0" />
                                {address}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {businessInfo?.facebook && (
                                <a href={businessInfo.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold transition-colors">
                                    <Facebook size={18} />
                                </a>
                            )}
                            {businessInfo?.instagram && (
                                <a href={businessInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold transition-colors">
                                    <Instagram size={18} />
                                </a>
                            )}
                            {businessInfo?.youtube && (
                                <a href={businessInfo.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold transition-colors">
                                    <Youtube size={18} />
                                </a>
                            )}
                            {businessInfo?.linkedin && (
                                <a href={businessInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold transition-colors">
                                    <Linkedin size={18} />
                                </a>
                            )}
                            {businessInfo?.twitter && (
                                <a href={businessInfo.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-gold transition-colors">
                                    <Twitter size={18} />
                                </a>
                            )}
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
