"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Stethoscope, HeartPulse } from "lucide-react";

export const HeroSection = () => {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-background px-4">

            {/* Background Glows */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-blue-500/20 dark:bg-blue-500/12 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-blue-500/15 dark:bg-blue-500/12 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto relative z-10">
                <div className="max-w-3xl mx-auto text-center">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-blue-500/10 mb-6 transition-all hover:border-blue-500/30">
                        <ShieldCheck className="size-3.5 text-blue-500" />
                        <span className="text-[12px] font-semibold tracking-wide uppercase text-muted-foreground">
                            Trusted Healthcare Platform
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.2] mb-6">
                        Your health, in the hands of <br />
                        <span className="text-blue-500">trusted doctors</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl mx-auto">
                        Connect with certified doctors and healthcare specialists from anywhere.
                        A seamless experience designed to make quality care accessible to everyone.
                    </p>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center gap-6 mb-10 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Stethoscope className="size-4 text-blue-500" />
                            <span>500+ Doctors</span>
                        </div>
                        <div className="w-px h-4 bg-border" />
                        <div className="flex items-center gap-1.5">
                            <HeartPulse className="size-4 text-blue-500" />
                            <span>24/7 Support</span>
                        </div>
                        <div className="w-px h-4 bg-border" />
                        <div className="flex items-center gap-1.5">
                            <ShieldCheck className="size-4 text-blue-500" />
                            <span>Verified & Secure</span>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/doctors"
                            className="inline-flex items-center gap-2 h-11 px-8 rounded-full text-sm font-semibold bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 group"
                        >
                            Find a Doctor
                            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 h-11 px-8 rounded-full text-sm font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 dark:hover:bg-blue-500/20 border border-transparent hover:border-blue-500/20 transition-all"
                        >
                            Learn More
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};