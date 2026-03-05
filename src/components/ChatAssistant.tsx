"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

const quickActions = [
    "Construction cost?",
    "Available plots?",
    "Book consultation",
];

const responses: Record<string, string> = {
    "construction cost?":
        "Our construction packages start from ₹1,200/sq.ft for basic, ₹1,800/sq.ft for premium, and ₹2,500/sq.ft for luxury. Visit realty.trivastu.com/estimator for a detailed estimate!",
    "available plots?":
        "We have plots starting from ₹5 Lakh across Ranchi, Jamshedpur, Bokaro, and Hazaribagh. Visit plot.trivastu.com to browse all available plots!",
    "book consultation":
        "You can book a free consultation with our engineers at realty.trivastu.com/contact or call us at +91 8655202633. We'd love to help!",
};

interface Message {
    from: "user" | "bot";
    text: string;
}

export default function ChatAssistant() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            from: "bot",
            text: "Hi! 👋 I'm Trivastu's assistant. How can I help you today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll ONLY within chat container, and only when chat is open
    useEffect(() => {
        if (!open) return;
        const container = messagesContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages, isTyping, open]);

    const sendMessage = (text: string) => {
        const userMsg: Message = { from: "user", text };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        const responseText =
            responses[text.toLowerCase()] ||
            "Thank you for your question! Our team will get back to you shortly. You can also call us at +91 8655202633.";

        setTimeout(() => {
            setIsTyping(false);
            const botMsg: Message = { from: "bot", text: responseText };
            setMessages((prev) => [...prev, botMsg]);
        }, 1200);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(input.trim());
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(!open)}
                className={cn(
                    "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 hover:scale-110",
                    open
                        ? "bg-surface-light border border-border rotate-0"
                        : "bg-gold text-background animate-glow-pulse"
                )}
            >
                {open ? (
                    <X size={20} className="text-foreground" />
                ) : (
                    <MessageCircle size={22} />
                )}
            </button>

            {/* Chat Window */}
            <div
                className={cn(
                    "fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] transition-all duration-500 origin-bottom-right",
                    open
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-90 translate-y-4 pointer-events-none"
                )}
            >
                <div className="glass-strong rounded-2xl overflow-hidden gold-glow flex flex-col h-[480px]">
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-border flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                            <Bot size={16} className="text-gold" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold">Trivastu Assistant</div>
                            <div className="text-[10px] text-green-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                Online
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={cn(
                                    "flex animate-in",
                                    msg.from === "user" ? "justify-end" : "justify-start"
                                )}
                                style={{ animationDelay: `${i * 50}ms` }}
                            >
                                <div
                                    className={cn(
                                        "max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                                        msg.from === "user"
                                            ? "bg-gold text-background rounded-br-md"
                                            : "bg-surface-light border border-border text-foreground rounded-bl-md"
                                    )}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-surface-light border border-border rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="w-2 h-2 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        )}


                    </div>

                    {/* Quick Actions */}
                    <div className="px-4 py-2 flex gap-1.5 flex-wrap border-t border-border/50">
                        {quickActions.map((action) => (
                            <button
                                key={action}
                                onClick={() => sendMessage(action)}
                                className="px-3 py-1.5 text-[11px] border border-border rounded-full text-muted-foreground hover:text-gold hover:border-gold/40 transition-colors"
                            >
                                {action}
                            </button>
                        ))}
                    </div>

                    {/* Input */}
                    <form
                        onSubmit={handleSubmit}
                        className="px-4 py-3 border-t border-border flex items-center gap-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 bg-surface-light border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="w-9 h-9 rounded-full bg-gold text-background flex items-center justify-center hover:bg-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <Send size={14} />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
