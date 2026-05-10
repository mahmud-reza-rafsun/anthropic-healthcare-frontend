"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Briefcase, ChevronLeft, ChevronRight, NotebookTabs } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Doctor } from "@/types/doctor.booking";


const useIsMobile = (breakpoint: number = 768): boolean => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        const checkScreenSize = () => setIsMobile(window.innerWidth < breakpoint);
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, [breakpoint]);
    return isMobile;
};

export default function OutTutor() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        const fetchdoctors = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/doctor/get-all-doctor`);

                if (!response.ok) {
                    throw new Error("Failed to fetch doctors");
                }

                const result = await response.json();

                if (result.success && Array.isArray(result.data)) {
                    const limiteddoctors = result.data.slice(0, 6);
                    setDoctors(limiteddoctors);
                } else {
                    setDoctors([]);
                }
            } catch (err: any) {
                setError(err?.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchdoctors();
    }, []);

    const containerRadius = isMobile ? 140 : 260;
    const profileSize = isMobile ? 60 : 85;
    const containerSize = containerRadius * 2 + 160;

    const getRotation = useCallback(
        (index: number): number => {
            if (doctors.length === 0) return 0;
            return (index - activeIndex) * (360 / doctors.length);
        },
        [activeIndex, doctors.length]
    );

    const next = () => setActiveIndex((i) => (doctors.length > 0 ? (i + 1) % doctors.length : 0));
    const prev = () => setActiveIndex((i) => (doctors.length > 0 ? (i - 1 + doctors.length) % doctors.length : 0));

    // Skeleton Loading UI
    if (loading) {
        return (
            <section className="flex flex-col items-center py-32 relative min-h-[700px] bg-background">
                <div className="text-center mb-16 space-y-4">
                    <Skeleton className="h-10 w-48 mx-auto" />
                    <Skeleton className="h-4 w-72 mx-auto" />
                </div>
                <div className="relative flex items-center justify-center" style={{ width: containerSize, height: containerSize }}>
                    {/* Circle Border Skeleton */}
                    <div className="absolute rounded-full border border-muted opacity-20" style={{ width: containerRadius * 2, height: containerRadius * 2 }} />

                    {/* Center Card Skeleton */}
                    <div className="z-20 bg-card border border-border rounded-[2rem] p-6 w-64 md:w-72 text-center shadow-sm">
                        <Skeleton className="w-24 h-24 rounded-full mx-auto -mt-20 border-8 border-background" />
                        <div className="mt-4 space-y-3">
                            <Skeleton className="h-6 w-3/4 mx-auto" />
                            <Skeleton className="h-4 w-1/2 mx-auto" />
                            <Skeleton className="h-4 w-2/3 mx-auto" />
                        </div>
                        <div className="flex justify-center mt-6 space-x-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-10 w-32 rounded-full" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                    </div>

                    {/* Orbiting Skeletons */}
                    {[1, 2, 3, 4, 5, 6].map((_, i) => (
                        <div
                            key={i}
                            className="absolute"
                            style={{
                                width: profileSize,
                                height: profileSize,
                                transform: `rotate(${(i * 60)}deg) translateY(-${containerRadius}px)`,
                                top: `calc(50% - ${profileSize / 2}px)`,
                                left: `calc(50% - ${profileSize / 2}px)`,
                            }}
                        >
                            <Skeleton className="w-full h-full rounded-full" />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    if (error || doctors.length === 0) {
        return (
            <div className="h-[700px] flex items-center justify-center text-muted-foreground">
                <p>{error || "No doctors found."}</p>
            </div>
        );
    }

    return (
        <section className="flex flex-col items-center py-32 relative min-h-[700px] bg-background overflow-hidden">
            <div className="text-center mb-16 px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-blue-500">Doctors</span></h2>
                <p className="text-muted-foreground text-base max-w-lg mx-auto">
                    Treatment from industry experts and take your career to the next level with personalized guidance.
                </p>
            </div>

            <div
                className="relative flex items-center justify-center"
                style={{ width: containerSize, height: containerSize }}
            >
                <div
                    className="absolute rounded-full border border-blue-500/10 dark:border-blue-500 shadow-[0_0_50px_rgba(249,115,22,0.03)]"
                    style={{
                        width: containerRadius * 2,
                        height: containerRadius * 2,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={doctors[activeIndex]?.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="z-20 bg-card border border-blue-500/10 dark:border-blue-500 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(249,115,22,0.05)] rounded-[2rem] p-6 w-64 md:w-72 text-center"
                    >
                        <motion.img
                            src={doctors[activeIndex]?.user.image}
                            alt={doctors[activeIndex]?.user.name}
                            className="w-24 h-24 rounded-full mx-auto -mt-20 border-8 border-background object-cover bg-blue-100 p-1 shadow-lg"
                        />
                        <div className="mt-4">
                            <h3 className="text-xl font-bold text-foreground truncate">{doctors[activeIndex]?.user.name}</h3>
                            <div className="flex items-center justify-center text-sm text-blue-500 font-semibold mt-1">
                                <Briefcase size={14} className="mr-1.5" /> {doctors[activeIndex]?.role}
                            </div>
                            <div className="flex items-center justify-center text-xs text-muted-foreground mt-2">
                                <NotebookTabs size={12} className="mr-1.5" /> {doctors[activeIndex]?.subject}
                            </div>
                            <div className="flex items-center justify-center text-xs text-muted-foreground mt-2">
                                <Mail size={12} className="mr-1.5" /> {doctors[activeIndex]?.user.email}
                            </div>
                        </div>

                        <div className="flex justify-center items-center mt-6 space-x-3">
                            <button onClick={prev} className="p-2.5 cursor-pointer rounded-full bg-blue-500/5 hover:bg-blue-500/20 text-blue-500 transition-all active:scale-90">
                                <ChevronLeft size={18} />
                            </button>
                            <Link href={`/doctors/${doctors[activeIndex]?.id}`}>
                                <button className="px-6 py-2 cursor-pointer text-sm font-bold rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                                    View Profile
                                </button>
                            </Link>
                            <button onClick={next} className="p-2.5 cursor-pointer rounded-full bg-blue-500/5 hover:bg-blue-500/20 text-blue-500 transition-all active:scale-90">
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {doctors?.map((t, i) => {
                    const rotation = getRotation(i);
                    return (
                        <motion.div
                            key={t.id}
                            animate={{
                                transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
                            }}
                            transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
                            className="absolute"
                            style={{
                                width: profileSize,
                                height: profileSize,
                                top: `calc(50% - ${profileSize / 2}px)`,
                                left: `calc(50% - ${profileSize / 2}px)`,
                            }}
                        >
                            <motion.div
                                animate={{ rotate: -rotation }}
                                transition={{ duration: 1 }}
                                className="w-full h-full relative"
                                onClick={() => setActiveIndex(i)}
                            >
                                <img
                                    src={t?.user?.image}
                                    alt={t.name}
                                    className={`w-full h-full object-cover rounded-full cursor-pointer transition-all duration-500 border-2 ${i === activeIndex
                                        ? "border-blue-500 scale-125 shadow-xl shadow-blue-500/30 ring-4 ring-blue-500/10"
                                        : "border-blue-500/20 hover:border-blue-500 grayscale hover:grayscale-0 hover:scale-110"
                                        }`}
                                />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}