"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Send, Stethoscope, User, RotateCcw } from 'lucide-react';

type Message = { role: 'user' | 'assistant'; content: string };

export default function AIHelpPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [busy, setBusy] = useState(false);
    const [streamText, setStreamText] = useState('');
    const [showWelcome, setShowWelcome] = useState(true);

    const bottomRef = useRef<HTMLDivElement>(null);

    // Reset Function
    const handleReset = () => {
        setMessages([]);
        setInput('');
        setBusy(false);
        setStreamText('');
        setShowWelcome(true);
    };

    const scrollToBottom = () => {
        if (bottomRef.current) {
            window.requestAnimationFrame(() => {
                bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, streamText, busy, showWelcome]);

    const typewrite = (text: string, done: () => void) => {
        let i = 0;
        setStreamText('');
        const iv = setInterval(() => {
            if (i < text.length) {
                setStreamText(text.slice(0, ++i));
            } else {
                clearInterval(iv);
                setStreamText('');
                done();
            }
        }, 15);
    };

    const send = async (preset?: string) => {
        const txt = preset ?? input.trim();
        if (!txt || busy) return;

        setInput('');
        setShowWelcome(false);
        setBusy(true);

        const newHistory: Message[] = [...messages, { role: 'user', content: txt }];
        setMessages(newHistory);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newHistory }),
            });
            const data = await res.json();
            const reply = data.reply ?? 'Something went wrong.';

            setBusy(false);
            typewrite(reply, () => {
                setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
            });
        } catch {
            setBusy(false);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
        }
    };

    const chips = [
        'How do I book a doctor?',
        'When do I need to pay?',
        'How do I create an account?',
        'What is your privacy policy?',
    ];

    return (
        <div className='max-w-6xl mx-auto py-12'>
            <div className="flex flex-col h-[750px] bg-gray-100 rounded-2xl dark:bg-gray-700/30 font-sans overflow-hidden border border-zinc-200 dark:border-zinc-800 relative">

                {/* Header with Reset Button */}
                <div className="flex justify-between items-center px-6 py-3 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">AI Assistant</span>
                    </div>
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                        title="Reset Chat"
                    >
                        <RotateCcw size={14} />
                        New Chat
                    </button>
                </div>

                {/* Main Scrollable Area */}
                <div className="flex-1 overflow-y-auto flex flex-col">
                    {showWelcome && (
                        <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 py-10">
                            <h2 className="text-2xl font-medium text-zinc-800 dark:text-white text-center">
                                What can I help you with?
                            </h2>
                            <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                                {chips.map((c, i) => (
                                    <button key={i} onClick={() => send(c)}
                                        className="px-4 py-2 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm text-zinc-600 dark:text-zinc-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all bg-white dark:bg-zinc-900">
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {!showWelcome && (
                        <div className="flex flex-col w-full py-6">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex gap-4 px-6 py-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${m.role === 'user' ? 'bg-zinc-200 dark:bg-zinc-700' : 'bg-blue-600'}`}>
                                        {m.role === 'user'
                                            ? <User size={14} className="text-zinc-500 dark:text-zinc-300" />
                                            : <Stethoscope size={14} className="text-white" />}
                                    </div>
                                    <div className={`max-w-[75%] text-sm px-4 py-3 rounded-2xl leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-tl-none'}`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}

                            {busy && (
                                <div className="flex gap-4 px-6 py-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                                        <Stethoscope size={14} className="text-white" />
                                    </div>
                                    <div className="flex gap-1.5 items-center bg-white dark:bg-zinc-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                                        {[0, 1, 2].map(i => (
                                            <span key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"
                                                style={{ animationDelay: `${i * 0.2}s` }} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {streamText && (
                                <div className="flex gap-4 px-6 py-4">
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                                        <Stethoscope size={14} className="text-white" />
                                    </div>
                                    <div className="max-w-[75%] text-sm bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm leading-relaxed">
                                        {streamText}
                                        <span className="inline-block w-1.5 h-4 bg-blue-500 ml-1 align-middle animate-pulse" />
                                    </div>
                                </div>
                            )}

                            <div ref={bottomRef} className="h-4 w-full clear-both" />
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="px-6 py-5 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-gray-800/50">
                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center gap-3 border border-zinc-300 dark:border-zinc-700 rounded-xl px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all bg-white dark:bg-zinc-900">
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && send()}
                                placeholder="Ask about bookings, payments..."
                                className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400"
                            />
                            <button
                                onClick={() => send()}
                                disabled={busy || !!streamText || !input.trim()}
                                className="w-9 h-9 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 flex items-center justify-center transition-all flex-shrink-0"
                            >
                                <Send size={16} className={`${busy || !!streamText || !input.trim() ? 'text-zinc-400' : 'text-white'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}