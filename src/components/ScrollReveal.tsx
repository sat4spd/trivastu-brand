"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    animation?: "fadeUp" | "fadeLeft" | "fadeRight" | "scaleUp" | "blurIn";
    delay?: number;
    duration?: number;
    stagger?: number;
    staggerChildren?: boolean;
}

const animations = {
    fadeUp: { from: { opacity: 0, y: 60 }, to: { opacity: 1, y: 0 } },
    fadeLeft: { from: { opacity: 0, x: -80 }, to: { opacity: 1, x: 0 } },
    fadeRight: { from: { opacity: 0, x: 80 }, to: { opacity: 1, x: 0 } },
    scaleUp: { from: { opacity: 0, scale: 0.85 }, to: { opacity: 1, scale: 1 } },
    blurIn: {
        from: { opacity: 0, y: 30, filter: "blur(10px)" },
        to: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
};

export default function ScrollReveal({
    children,
    className = "",
    animation = "fadeUp",
    delay = 0,
    duration = 0.8,
    stagger = 0.1,
    staggerChildren = false,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const anim = animations[animation];
        const target = staggerChildren ? el.children : el;

        const ctx = gsap.context(() => {
            gsap.fromTo(target, anim.from, {
                ...anim.to,
                duration,
                delay,
                stagger: staggerChildren ? stagger : 0,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 88%",
                    toggleActions: "play none none none",
                },
            });
        }, el);

        return () => ctx.revert();
    }, [animation, delay, duration, stagger, staggerChildren]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
