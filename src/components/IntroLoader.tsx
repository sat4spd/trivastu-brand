"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function IntroLoader() {
    const [done, setDone] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(container, {
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.inOut",
                    onComplete: () => setDone(true),
                });
            },
        });

        // STAGE 1: Plot drops in (land appears)
        tl.fromTo(
            ".intro-plot",
            { opacity: 0, scale: 0.3, y: -100 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "bounce.out" }
        )

            // Plot boundary lines draw
            .fromTo(
                ".plot-boundary",
                { strokeDashoffset: 400 },
                { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" },
                "-=0.3"
            )

            // STAGE 2: Building rises from the plot
            .fromTo(
                ".intro-building",
                { opacity: 0, scaleY: 0, transformOrigin: "bottom center" },
                { opacity: 1, scaleY: 1, duration: 1, ease: "power3.out" },
                "-=0.1"
            )

            // Windows light up
            .fromTo(
                ".intro-window",
                { opacity: 0 },
                { opacity: 1, duration: 0.3, stagger: 0.05, ease: "power1.out" },
                "-=0.4"
            )

            // Roof
            .fromTo(
                ".intro-roof",
                { opacity: 0, y: -15 },
                { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
                "-=0.2"
            )

            // STAGE 3: Surroundings grow
            .fromTo(
                ".intro-tree",
                { opacity: 0, scaleY: 0, transformOrigin: "bottom center" },
                { opacity: 1, scaleY: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
                "-=0.2"
            )

            // Road appears
            .fromTo(
                ".intro-road",
                { opacity: 0, scaleX: 0 },
                { opacity: 1, scaleX: 1, duration: 0.5, ease: "power2.out" },
                "-=0.3"
            )

            // Sun/sky brightens
            .fromTo(
                ".intro-sky",
                { opacity: 0 },
                { opacity: 1, duration: 0.6, ease: "power1.out" },
                "-=0.4"
            )

            // Small pause to admire
            .to({}, { duration: 0.3 })

            // STAGE 4: Everything scales down, logo + quote appear
            .to(".intro-scene", {
                scale: 0.5,
                y: -30,
                opacity: 0.3,
                filter: "blur(4px)",
                duration: 0.8,
                ease: "power2.inOut",
            })

            // Logo fades in
            .fromTo(
                ".intro-logo",
                { opacity: 0, scale: 0.6, filter: "blur(10px)" },
                { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
                "-=0.5"
            )

            // Company name
            .fromTo(
                ".intro-name",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.3"
            )

            // Quote
            .fromTo(
                ".intro-quote",
                { opacity: 0, y: 15, filter: "blur(5px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power2.out" },
                "-=0.2"
            )

            // Hold for a beat
            .to({}, { duration: 0.8 });
    }, []);

    if (done) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
            {/* Background subtle gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,164,94,0.06)_0%,transparent_70%)]" />

            {/* Scene Container */}
            <div className="relative flex flex-col items-center justify-center">
                {/* Construction Scene */}
                <div className="intro-scene relative w-[320px] h-[280px] sm:w-[400px] sm:h-[320px]">
                    <svg
                        viewBox="0 0 400 320"
                        className="w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Sky glow */}
                        <circle
                            className="intro-sky"
                            cx="320"
                            cy="60"
                            r="40"
                            fill="rgba(200,164,94,0.15)"
                            opacity="0"
                        />
                        <circle
                            className="intro-sky"
                            cx="320"
                            cy="60"
                            r="20"
                            fill="rgba(200,164,94,0.3)"
                            opacity="0"
                        />

                        {/* Ground / Plot */}
                        <g className="intro-plot">
                            {/* Ground plane */}
                            <rect
                                x="50"
                                y="250"
                                width="300"
                                height="60"
                                rx="4"
                                fill="rgba(200,164,94,0.08)"
                            />
                            {/* Grass texture */}
                            <rect
                                x="50"
                                y="248"
                                width="300"
                                height="4"
                                fill="rgba(34,139,34,0.3)"
                                rx="2"
                            />
                        </g>

                        {/* Plot boundary */}
                        <rect
                            className="plot-boundary"
                            x="60"
                            y="245"
                            width="280"
                            height="55"
                            rx="3"
                            fill="none"
                            stroke="rgba(200,164,94,0.4)"
                            strokeWidth="1.5"
                            strokeDasharray="400"
                            strokeDashoffset="400"
                        />

                        {/* Building */}
                        <g className="intro-building" style={{ transformOrigin: "200px 250px" }}>
                            {/* Main structure */}
                            <rect
                                x="140"
                                y="120"
                                width="120"
                                height="130"
                                fill="rgba(26,26,26,0.9)"
                                stroke="rgba(200,164,94,0.3)"
                                strokeWidth="1"
                                rx="2"
                            />
                            {/* Side wing left */}
                            <rect
                                x="110"
                                y="170"
                                width="35"
                                height="80"
                                fill="rgba(20,20,20,0.9)"
                                stroke="rgba(200,164,94,0.2)"
                                strokeWidth="0.5"
                                rx="1"
                            />
                            {/* Side wing right */}
                            <rect
                                x="255"
                                y="170"
                                width="35"
                                height="80"
                                fill="rgba(20,20,20,0.9)"
                                stroke="rgba(200,164,94,0.2)"
                                strokeWidth="0.5"
                                rx="1"
                            />
                            {/* Door */}
                            <rect
                                x="185"
                                y="215"
                                width="30"
                                height="35"
                                fill="rgba(200,164,94,0.15)"
                                rx="2"
                            />
                            <rect
                                x="185"
                                y="215"
                                width="30"
                                height="35"
                                fill="none"
                                stroke="rgba(200,164,94,0.4)"
                                strokeWidth="1"
                                rx="2"
                            />
                        </g>

                        {/* Windows - Row 1 */}
                        <rect className="intro-window" x="155" y="135" width="18" height="18" rx="2" fill="rgba(200,164,94,0.25)" opacity="0" />
                        <rect className="intro-window" x="180" y="135" width="18" height="18" rx="2" fill="rgba(200,164,94,0.35)" opacity="0" />
                        <rect className="intro-window" x="205" y="135" width="18" height="18" rx="2" fill="rgba(200,164,94,0.2)" opacity="0" />
                        <rect className="intro-window" x="230" y="135" width="18" height="18" rx="2" fill="rgba(200,164,94,0.3)" opacity="0" />

                        {/* Windows - Row 2 */}
                        <rect className="intro-window" x="155" y="165" width="18" height="18" rx="2" fill="rgba(200,164,94,0.3)" opacity="0" />
                        <rect className="intro-window" x="180" y="165" width="18" height="18" rx="2" fill="rgba(200,164,94,0.2)" opacity="0" />
                        <rect className="intro-window" x="205" y="165" width="18" height="18" rx="2" fill="rgba(200,164,94,0.35)" opacity="0" />
                        <rect className="intro-window" x="230" y="165" width="18" height="18" rx="2" fill="rgba(200,164,94,0.25)" opacity="0" />

                        {/* Windows - Row 3 */}
                        <rect className="intro-window" x="155" y="195" width="18" height="18" rx="2" fill="rgba(200,164,94,0.2)" opacity="0" />
                        <rect className="intro-window" x="230" y="195" width="18" height="18" rx="2" fill="rgba(200,164,94,0.3)" opacity="0" />

                        {/* Side windows */}
                        <rect className="intro-window" x="118" y="185" width="15" height="15" rx="1.5" fill="rgba(200,164,94,0.2)" opacity="0" />
                        <rect className="intro-window" x="118" y="210" width="15" height="15" rx="1.5" fill="rgba(200,164,94,0.25)" opacity="0" />
                        <rect className="intro-window" x="263" y="185" width="15" height="15" rx="1.5" fill="rgba(200,164,94,0.2)" opacity="0" />
                        <rect className="intro-window" x="263" y="210" width="15" height="15" rx="1.5" fill="rgba(200,164,94,0.25)" opacity="0" />

                        {/* Roof */}
                        <polygon
                            className="intro-roof"
                            points="130,120 200,80 270,120"
                            fill="rgba(200,164,94,0.2)"
                            stroke="rgba(200,164,94,0.5)"
                            strokeWidth="1.5"
                            opacity="0"
                        />

                        {/* Trees */}
                        {/* Left trees */}
                        <g className="intro-tree" style={{ transformOrigin: "80px 250px" }}>
                            <rect x="78" y="220" width="4" height="30" fill="rgba(101,67,33,0.6)" rx="1" />
                            <circle cx="80" cy="215" r="14" fill="rgba(34,139,34,0.4)" />
                            <circle cx="80" cy="208" r="10" fill="rgba(34,139,34,0.3)" />
                        </g>

                        <g className="intro-tree" style={{ transformOrigin: "95px 250px" }}>
                            <rect x="93" y="225" width="3" height="25" fill="rgba(101,67,33,0.6)" rx="1" />
                            <circle cx="95" cy="220" r="10" fill="rgba(34,139,34,0.35)" />
                        </g>

                        {/* Right trees */}
                        <g className="intro-tree" style={{ transformOrigin: "310px 250px" }}>
                            <rect x="308" y="220" width="4" height="30" fill="rgba(101,67,33,0.6)" rx="1" />
                            <circle cx="310" cy="215" r="14" fill="rgba(34,139,34,0.4)" />
                            <circle cx="310" cy="208" r="10" fill="rgba(34,139,34,0.3)" />
                        </g>

                        <g className="intro-tree" style={{ transformOrigin: "330px 250px" }}>
                            <rect x="328" y="228" width="3" height="22" fill="rgba(101,67,33,0.6)" rx="1" />
                            <circle cx="330" cy="224" r="9" fill="rgba(34,139,34,0.35)" />
                        </g>

                        {/* Road */}
                        <rect
                            className="intro-road"
                            x="50"
                            y="300"
                            width="300"
                            height="8"
                            rx="4"
                            fill="rgba(200,164,94,0.15)"
                            style={{ transformOrigin: "200px 304px" }}
                        />
                        {/* Road dashes */}
                        <g className="intro-road" style={{ transformOrigin: "200px 304px" }}>
                            <rect x="70" y="303" width="20" height="2" rx="1" fill="rgba(200,164,94,0.3)" />
                            <rect x="110" y="303" width="20" height="2" rx="1" fill="rgba(200,164,94,0.3)" />
                            <rect x="150" y="303" width="20" height="2" rx="1" fill="rgba(200,164,94,0.3)" />
                            <rect x="190" y="303" width="20" height="2" rx="1" fill="rgba(200,164,94,0.3)" />
                            <rect x="230" y="303" width="20" height="2" rx="1" fill="rgba(200,164,94,0.3)" />
                            <rect x="270" y="303" width="20" height="2" rx="1" fill="rgba(200,164,94,0.3)" />
                            <rect x="310" y="303" width="20" height="2" rx="1" fill="rgba(200,164,94,0.3)" />
                        </g>
                    </svg>
                </div>

                {/* Logo + Text Overlay (appears in Stage 4) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="intro-logo opacity-0 relative w-20 h-20 mb-4">
                        <Image
                            src="/images/logo.png"
                            alt="Trivastu"
                            fill
                            className="object-contain"
                            sizes="80px"
                            priority
                        />
                    </div>

                    <h2 className="intro-name opacity-0 text-2xl sm:text-3xl font-bold font-[var(--font-outfit)] gold-gradient-text tracking-tight">
                        Trivastu Ventures
                    </h2>

                    <p className="intro-quote opacity-0 mt-3 text-sm text-muted-foreground text-center max-w-xs leading-relaxed italic">
                        &ldquo;Where every brick tells a story of trust,
                        <br />
                        and every home is a dream realized.&rdquo;
                    </p>
                </div>
            </div>
        </div>
    );
}
