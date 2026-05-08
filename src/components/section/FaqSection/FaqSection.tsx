'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiActivity } from 'react-icons/fi';

const medicalFaqs = [
    {
        question: "How do I book an appointment with a specialist?",
        answer: "You can search for doctors by specialty, location, or name. Once you find the right specialist, select an available time slot and confirm your booking instantly."
    },
    {
        question: "Can I manage my appointments online?",
        answer: "Yes, through your patient dashboard, you can view upcoming visits, reschedule if needed, or cancel appointments up to 24 hours in advance."
    },
    {
        question: "What should I bring to my first consultation?",
        answer: "Please bring a valid ID, your insurance card, and any previous medical records or test results relevant to your current health concern."
    },
    {
        question: "Are tele-health (video) consultations available?",
        answer: "Many of our practitioners offer virtual visits. Look for the 'Video Consultation' icon when browsing doctor profiles."
    },
    {
        question: "How is my medical data protected?",
        answer: "We use enterprise-grade encryption and follow strict HIPAA guidelines to ensure your personal health information remains confidential and secure."
    }
];

function FaqSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="relative py-24 bg-background overflow-hidden">
            {/* Background Glow Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-300/15 dark:bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4">

                {/* Updated Header Section: Centered and Styled as per your example */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block text-xs font-semibold tracking-widest
                                   text-blue-600 dark:text-blue-400 uppercase mb-3
                                   bg-blue-100/60 dark:bg-blue-900/60 px-4 py-1.5 rounded-full
                                   border border-blue-200/50 dark:border-blue-700/50"
                    >
                        Patient Support
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-50 mb-3"
                    >
                        Commonly Asked <span className="text-blue-500">Questions</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-blue-500/70 dark:text-blue-400/60 text-base leading-relaxed"
                    >
                        Everything you need to know about our platform and how we help manage your health journey effectively.
                    </motion.p>
                </div>

                {/* Side-by-Side Content: Image and FAQ */}
                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Left Side: Medical Image */}
                    <div className="lg:col-span-5">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="relative rounded-3xl overflow-hidden border border-border bg-muted aspect-[4/5] lg:aspect-auto lg:h-[520px] shadow-2xl shadow-blue-500/5"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
                                alt="Healthcare assistance"
                                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
                        </motion.div>
                    </div>

                    {/* Right Side: FAQ Accordion */}
                    <div className="lg:col-span-7 space-y-4">
                        {medicalFaqs.map((faq, index) => {
                            const isOpen = activeIndex === index;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`group rounded-2xl border transition-all duration-300 ${isOpen
                                            ? 'bg-card border-blue-500/40 shadow-xl shadow-blue-500/5'
                                            : 'bg-card/40 border-border hover:border-blue-500/20'
                                        }`}
                                >
                                    <button
                                        onClick={() => setActiveIndex(isOpen ? null : index)}
                                        className="w-full flex items-center justify-between p-6 text-left"
                                    >
                                        <span className={`text-lg font-semibold transition-colors ${isOpen ? 'text-blue-600' : 'text-blue-900/80 dark:text-blue-50/80'}`}>
                                            {faq.question}
                                        </span>
                                        <div className={`p-1.5 rounded-lg transition-all duration-300 ${isOpen ? 'rotate-180 bg-blue-500 text-white' : 'bg-blue-50 dark:bg-blue-900/40 text-blue-600'}`}>
                                            <FiChevronDown size={20} />
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "circOut" }}
                                            >
                                                <div className="px-6 pb-6">
                                                    <div className="pt-4 border-t border-blue-100 dark:border-blue-900/50">
                                                        <p className="text-blue-500/80 dark:text-blue-300/60 leading-relaxed text-base">
                                                            {faq.answer}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default FaqSection;