'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiActivity, FiHeart, FiShield, FiPlusCircle } from 'react-icons/fi';

const stats = [
    { label: 'Happy Patients', value: '50K+', icon: <FiHeart className="text-blue-600" /> },
    { label: 'Expert Doctors', value: '80+', icon: <FiPlusCircle className="text-blue-600" /> },
    { label: 'Success Rate', value: '99%', icon: <FiActivity className="text-blue-600" /> },
];

export default function AboutSection() {
    return (
        <section className="py-24 bg-background overflow-hidden relative">

            {/* Background Blue Glow Effect (Text Side) */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left Side: Large Professional Medical Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 relative w-full"
                    >
                        <div className="relative z-10 rounded-[3rem] overflow-hidden border border-blue-500/10 bg-card/50 backdrop-blur-sm p-3 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
                                alt="Advanced Medical Technology"
                                className="rounded-[2.6rem] w-full h-[650px] object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                        {/* Decorative Accents */}
                        <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-400/20 blur-[90px] rounded-full animate-pulse" />
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/10 blur-[110px] rounded-full" />
                    </motion.div>

                    {/* Right Side: Content with Shadow Effect */}
                    <div className="flex-1 space-y-8 relative">
                        {/* Subtle Blue "Dim" Shadow behind text */}
                        <div className="absolute inset-0 bg-blue-500/[0.02] blur-3xl rounded-full -z-10" />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-4 flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-blue-600"></span>
                                Excellence in Healthcare
                            </h2>
                            <h3 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-slate-900 dark:text-white">
                                Precision Medicine <br />
                                <span className="text-blue-600">Driven by Care</span>
                            </h3>
                            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                                Anthropic Healthcare stands at the intersection of innovation and compassion.
                                We provide a seamless medical journey, utilizing top-tier clinical expertise
                                and high-definition diagnostic tools to ensure your health is always in safe hands.
                            </p>
                        </motion.div>

                        {/* Features List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                            {[
                                "24/7 Intensive Care",
                                "Specialized Surgical Units",
                                "AI-Driven Diagnostics",
                                "Expert Patient Advocacy",
                                "Secure Medical Vault",
                                "Holistic Wellness Plans"
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-3 group"
                                >
                                    <div className="p-1 rounded-full bg-blue-500/10 group-hover:bg-blue-500 transition-colors">
                                        <FiCheckCircle className="text-blue-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="font-semibold text-foreground/70">{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Philosophy Box with Soft Blue Shadow */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-br from-blue-500/[0.07] to-transparent p-8 rounded-3xl border border-blue-500/10 shadow-inner"
                        >
                            <h4 className="font-bold text-blue-900 dark:text-blue-200 mb-3 flex items-center gap-2">
                                <FiShield className="text-blue-600" /> Patient Security Protocol
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Our facility integrates international medical safety standards. Every
                                procedure is monitored through real-time data analytics to maintain
                                zero-error clinical precision.
                            </p>
                        </motion.div>

                        {/* Stats Section */}
                        <div className="pt-8 border-t border-blue-500/10 flex flex-wrap gap-8 md:gap-14">
                            {stats.map((stat, index) => (
                                <div key={index} className="group cursor-default">
                                    <div className="flex items-center gap-3">
                                        <div className="text-blue-600 text-xl group-hover:scale-125 transition-transform duration-300">
                                            {stat.icon}
                                        </div>
                                        <span className="text-3xl font-black text-slate-800 dark:text-slate-100">
                                            {stat.value}
                                        </span>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mt-1 pl-1">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}