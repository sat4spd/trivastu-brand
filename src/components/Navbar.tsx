"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    {
        label: "Services",
        href: "/services",
        children: [
            { label: "Construction", href: "https://realty.trivastu.com", external: true },
            { label: "Plot Marketplace", href: "https://plot.trivastu.com", external: true },
            { label: "Architecture", href: "/services#architecture" },
            { label: "Real Estate", href: "/services#realestate" },
        ],
    },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-700",
                scrolled
                    ? "glass-strong py-2 shadow-lg shadow-black/20"
                    : "bg-transparent py-4"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
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

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) =>
                        link.children ? (
                            <div
                                key={link.label}
                                className="relative"
                                onMouseEnter={() => setDropdownOpen(true)}
                                onMouseLeave={() => setDropdownOpen(false)}
                            >
                                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-gold transition-colors animated-underline py-1">
                                    {link.label}
                                    <ChevronDown
                                        size={14}
                                        className={cn(
                                            "transition-transform duration-300",
                                            dropdownOpen && "rotate-180"
                                        )}
                                    />
                                </button>
                                <div
                                    className={cn(
                                        "absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300",
                                        dropdownOpen
                                            ? "opacity-100 translate-y-0 pointer-events-auto"
                                            : "opacity-0 -translate-y-2 pointer-events-none"
                                    )}
                                >
                                    <div className="glass-strong rounded-xl p-2 min-w-[200px] gold-glow">
                                        {link.children.map((child) =>
                                            child.external ? (
                                                <a
                                                    key={child.label}
                                                    href={child.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-gold hover:bg-white/5 rounded-lg transition-all duration-300"
                                                >
                                                    {child.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    key={child.label}
                                                    href={child.href}
                                                    className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-gold hover:bg-white/5 rounded-lg transition-all duration-300"
                                                >
                                                    {child.label}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm text-muted-foreground hover:text-gold transition-colors animated-underline py-1"
                            >
                                {link.label}
                            </Link>
                        )
                    )}
                </nav>

                {/* CTA + Mobile Toggle */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/contact"
                        className="hidden lg:inline-flex items-center px-6 py-2.5 text-sm font-medium bg-gold text-background rounded-full hover:bg-gold-light transition-all duration-500 hover:shadow-[0_0_20px_rgba(200,164,94,0.3)]"
                    >
                        Get Started
                    </Link>
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden text-foreground p-2"
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "lg:hidden overflow-hidden transition-all duration-500 ease-in-out",
                    mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="glass-strong mx-4 mt-3 rounded-2xl p-6 space-y-1">
                    {navLinks.map((link) => (
                        <div key={link.label}>
                            <Link
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-4 py-3 text-foreground hover:text-gold transition-colors rounded-lg hover:bg-white/5"
                            >
                                {link.label}
                            </Link>
                            {link.children && (
                                <div className="pl-6 space-y-1">
                                    {link.children.map((child) => (
                                        <a
                                            key={child.label}
                                            href={child.href}
                                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-gold transition-colors"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {child.label}
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="pt-3">
                        <Link
                            href="/contact"
                            className="block text-center px-6 py-3 text-sm font-medium bg-gold text-background rounded-full hover:bg-gold-light transition-colors"
                            onClick={() => setMobileOpen(false)}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
