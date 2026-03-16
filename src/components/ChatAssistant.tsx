"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const API = "https://api.trivastu.com/api/cms";
const WA_NUMBER = "918655202633";
const SESSION_ID = typeof window !== "undefined"
    ? (localStorage.getItem("tv_chat_session") || (() => {
        const id = Math.random().toString(36).slice(2);
        localStorage.setItem("tv_chat_session", id);
        return id;
    })())
    : "anon";

type Step = "greeting" | "ask_name" | "ask_phone" | "chat";

interface Message {
    from: "user" | "bot";
    text: string;
    isWA?: boolean;
}

const QUICK = ["Available plots?", "Construction cost?", "Book site visit"];

export default function ChatAssistant() {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState<Step>("greeting");
    const [visitorName, setVisitorName] = useState("");
    const [visitorPhone, setVisitorPhone] = useState("");
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { from: "bot", text: "Hi there! 👋 I'm ARIA, Trivastu's AI assistant.\n\nI can help you find properties, estimate costs, and answer your questions. Before we begin, may I know your name?" },
    ]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, typing, open]);

    const addBot = (text: string, extra?: Partial<Message>) => {
        setMessages(prev => [...prev, { from: "bot", text, ...extra }]);
    };

    const addUser = (text: string) => {
        setMessages(prev => [...prev, { from: "user", text }]);
    };

    const sendWithTyping = async (action: () => Promise<void>) => {
        setTyping(true);
        await action();
        setTyping(false);
    };

    const handleSend = async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        setInput("");
        addUser(trimmed);

        if (step === "ask_name") {
            if (trimmed.length < 2) {
                await sendWithTyping(async () => {
                    await delay(700);
                    addBot("Please tell me your full name so I can assist you better 😊");
                });
                return;
            }
            setVisitorName(trimmed);
            setStep("ask_phone");
            await sendWithTyping(async () => {
                await delay(800);
                addBot(`Nice to meet you, *${trimmed}*! 🤝\n\nCould you share your WhatsApp number? I'll save your enquiry so our team can follow up with personalised recommendations.`);
            });
            return;
        }

        if (step === "ask_phone") {
            const digits = trimmed.replace(/\D/g, "");
            if (digits.length < 10) {
                await sendWithTyping(async () => {
                    await delay(700);
                    addBot("Please enter a valid 10-digit mobile number.");
                });
                return;
            }
            setVisitorPhone(digits);
            setStep("chat");

            // Save lead in background
            fetch(`${API}/website-lead`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: visitorName, phone: digits, source: "website_chat" }),
            }).catch(() => {});

            const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi! I'm ${visitorName}. I'd like to enquire about properties.`)}`;
            await sendWithTyping(async () => {
                await delay(900);
                addBot(
                    `Perfect! I've noted your details ✅\n\nYou can continue chatting here, or tap below to connect with our team directly on WhatsApp for a more personalised experience 👇`,
                    { isWA: true }
                );
            });
            return;
        }

        // Main AI chat
        await sendWithTyping(async () => {
            try {
                const res = await fetch(`${API}/chat`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: trimmed, sessionId: SESSION_ID, name: visitorName }),
                });
                const data = await res.json();
                addBot(data.reply || "Let me connect you with our team! 😊");
            } catch {
                addBot("Sorry, I'm having some trouble right now. You can reach us at +91 8655202633 or on WhatsApp! 📞");
            }
        });
    };

    const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
        visitorName ? `Hi! I'm ${visitorName}. I'd like to enquire about properties.` : "Hi! I'd like to enquire about properties at Trivastu."
    )}`;

    // Start greeting flow
    useEffect(() => {
        if (open && step === "greeting") {
            setStep("ask_name");
        }
    }, [open]);

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(!open)}
                className={cn(
                    "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 hover:scale-110",
                    open ? "bg-surface-light border border-border" : "bg-gold text-background animate-glow-pulse"
                )}
                aria-label="Chat with us"
            >
                {open ? <X size={20} className="text-foreground" /> : <MessageCircle size={22} />}
            </button>

            {/* Chat Window */}
            <div className={cn(
                "fixed bottom-24 right-6 z-50 w-[370px] max-w-[calc(100vw-2rem)] transition-all duration-500 origin-bottom-right",
                open ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-90 translate-y-4 pointer-events-none"
            )}>
                <div className="glass-strong rounded-2xl overflow-hidden gold-glow flex flex-col h-[500px]">
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-border flex items-center gap-3 bg-surface-light/50">
                        <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center">
                            <Bot size={17} className="text-gold" />
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-semibold">ARIA — Trivastu Assistant</div>
                            <div className="text-[10px] text-green-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                Online • Replies instantly
                            </div>
                        </div>
                        <a href={waLink} target="_blank" rel="noopener noreferrer"
                            className="text-[10px] bg-green-500/10 text-green-400 border border-green-500/20 rounded-full px-2.5 py-1 hover:bg-green-500/20 transition-colors flex items-center gap-1">
                            <Phone size={10} /> WhatsApp
                        </a>
                    </div>

                    {/* Messages */}
                    <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
                        {messages.map((msg, i) => (
                            <div key={i} className={cn("flex animate-in flex-col", msg.from === "user" ? "items-end" : "items-start")}
                                style={{ animationDelay: `${i * 40}ms` }}>
                                <div className={cn(
                                    "max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                                    msg.from === "user"
                                        ? "bg-gold text-background rounded-br-md"
                                        : "bg-surface-light border border-border text-foreground rounded-bl-md"
                                )}>
                                    {msg.text}
                                </div>
                                {msg.isWA && (
                                    <a href={waLink} target="_blank" rel="noopener noreferrer"
                                        className="mt-2 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors shadow">
                                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                        Continue on WhatsApp
                                    </a>
                                )}
                            </div>
                        ))}

                        {typing && (
                            <div className="flex justify-start">
                                <div className="bg-surface-light border border-border rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions — only after onboarding */}
                    {step === "chat" && (
                        <div className="px-4 py-2 flex gap-1.5 flex-wrap border-t border-border/50">
                            {QUICK.map(action => (
                                <button key={action} onClick={() => handleSend(action)}
                                    className="px-3 py-1.5 text-[11px] border border-border rounded-full text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors">
                                    {action}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <form onSubmit={e => { e.preventDefault(); handleSend(input); }}
                        className="px-4 py-3 border-t border-border flex items-center gap-2">
                        <input
                            type={step === "ask_phone" ? "tel" : "text"}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder={
                                step === "ask_name" ? "Your full name..." :
                                step === "ask_phone" ? "Your WhatsApp number..." :
                                "Type a message..."
                            }
                            className="flex-1 bg-surface-light border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors"
                        />
                        <button type="submit" disabled={!input.trim() || typing}
                            className="w-9 h-9 rounded-full bg-gold text-background flex items-center justify-center hover:bg-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                            <Send size={14} />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }
