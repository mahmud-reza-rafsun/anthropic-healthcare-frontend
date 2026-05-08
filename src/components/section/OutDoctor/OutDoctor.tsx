"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Mail, Briefcase, ChevronLeft, ChevronRight,
    NotebookTabs, Star, Clock, MapPin
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface Tutor {
    id: number;
    name: string;
    role: string;
    email: string;
    profile: string;
    subject: string;
    user: { name: string; email: string; image: string };
}

// ─── Dot Indicator ────────────────────────────────────────────
const DotIndicator = ({
    count, active, onSelect,
}: { count: number; active: number; onSelect: (i: number) => void }) => (
    <div className="flex items-center gap-2 mt-8 justify-center">
        {Array.from({ length: count }).map((_, i) => (
            <button
                key={i}
                onClick={() => onSelect(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${i === active
                    ? "w-8 h-2.5 bg-blue-400"
                    : "w-2.5 h-2.5 bg-blue-200/60 dark:bg-blue-800/60 hover:bg-blue-300 dark:hover:bg-blue-700"
                    }`}
            />
        ))}
    </div>
);

// ─── Side Card ────────────────────────────────────────────────
const SideCard = ({ tutor, onClick }: { tutor: Tutor; onClick: () => void }) => (
    <div
        onClick={onClick}
        className="hidden md:flex flex-col items-center gap-3 flex-shrink-0
                   bg-blue-100/40 dark:bg-blue-950/40
                   border border-blue-200/40 dark:border-blue-800/40
                   rounded-3xl p-5 cursor-pointer
                   opacity-50 scale-95 hover:opacity-70 transition-opacity
                   duration-200 select-none"
        style={{ width: 220 }}
    >
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-blue-200/50 dark:bg-blue-900/50">
            <img src={tutor.user.image} alt={tutor.user.name} className="w-full h-full object-cover" />
        </div>
        <div className="text-center">
            <p className="font-semibold text-blue-900 dark:text-blue-100 text-sm truncate max-w-[160px]">
                Dr. {tutor.user.name}
            </p>
            <p className="text-blue-500 dark:text-blue-400 text-xs font-medium mt-1 flex items-center justify-center gap-1">
                <Briefcase size={11} /> {tutor.role}
            </p>
        </div>
        <p className="text-xs text-blue-400 dark:text-blue-500 font-medium">View profile →</p>
    </div>
);

// ─── Center Card variants ─────────────────────────────────────
const variants = {
    enter: (dir: number) => ({
        x: dir > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.9,
    }),
    visible: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            x: { type: "spring", stiffness: 240, damping: 30 },
            opacity: { duration: 0.2, ease: "easeOut" },
            scale: { type: "spring", stiffness: 260, damping: 32 },
        },
    },
    exit: (dir: number) => ({
        x: dir > 0 ? -300 : 300,
        opacity: 0,
        scale: 0.9,
        transition: {
            x: { type: "spring", stiffness: 240, damping: 30 },
            opacity: { duration: 0.15, ease: "easeIn" },
            scale: { duration: 0.2 },
        },
    }),
};

// ─── Center Card ──────────────────────────────────────────────
const CenterCard = ({ tutor, dir }: { tutor: Tutor; dir: number }) => (
    <motion.div
        key={tutor.id}
        custom={dir}
        variants={variants}
        initial="enter"
        animate="visible"
        exit="exit"
        style={{ willChange: "transform, opacity", width: 310 }}
        className="flex-shrink-0
                   bg-blue-50/80 dark:bg-blue-950/70
                   border border-blue-300/50 dark:border-blue-700/50
                   rounded-3xl shadow-2xl shadow-blue-500/10
                   z-10 select-none"
    >
        <div className="p-7">
            {/* Avatar */}
            <div className="relative mb-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden
                                bg-blue-200/60 dark:bg-blue-900/60
                                mx-auto ring-4 ring-blue-200/60 dark:ring-blue-800/60">
                    <img
                        src={tutor.user.image}
                        alt={tutor.user.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[11px]
                                 font-semibold bg-green-500 text-white px-3 py-0.5
                                 rounded-full whitespace-nowrap shadow-sm">
                    ● Available
                </span>
            </div>

            {/* Name & role */}
            <div className="text-center mt-4">
                <h3 className="text-lg font-bold text-blue-900 dark:text-blue-50 truncate">
                    Dr. {tutor.user.name}
                </h3>
                <div className="flex items-center justify-center gap-1.5 text-blue-500 dark:text-blue-400 text-xs font-semibold mt-1.5">
                    <Briefcase size={12} /> <span>{tutor.role}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-blue-400/80 dark:text-blue-500/80 text-xs mt-1.5">
                    <NotebookTabs size={12} /> <span>{tutor.subject}</span>
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center gap-4 mt-5 py-4
                            border-t border-blue-200/40 dark:border-blue-800/40">
                <div className="flex flex-col items-center gap-0.5">
                    <div className="flex items-center gap-0.5 text-amber-400">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={11} fill="currentColor" />)}
                    </div>
                    <span className="text-[11px] text-blue-400 dark:text-blue-500">4.9 Rating</span>
                </div>
                <div className="w-px h-8 bg-blue-200/40 dark:bg-blue-800/40" />
                <div className="flex flex-col items-center gap-0.5">
                    <div className="flex items-center gap-1 text-blue-500 dark:text-blue-400">
                        <Clock size={11} />
                        <span className="text-xs font-semibold">10+ yrs</span>
                    </div>
                    <span className="text-[11px] text-blue-400 dark:text-blue-500">Experience</span>
                </div>
                <div className="w-px h-8 bg-blue-200/40 dark:bg-blue-800/40" />
                <div className="flex flex-col items-center gap-0.5">
                    <div className="flex items-center gap-1 text-blue-500 dark:text-blue-400">
                        <MapPin size={11} />
                        <span className="text-xs font-semibold">Online</span>
                    </div>
                    <span className="text-[11px] text-blue-400 dark:text-blue-500">Consult</span>
                </div>
            </div>

            {/* Email */}
            <div className="flex items-center justify-center gap-1.5 text-blue-400/70 dark:text-blue-500/70 text-xs mt-1 mb-5">
                <Mail size={11} />
                <span className="truncate max-w-[200px]">{tutor.user.email}</span>
            </div>

            {/* CTA */}
            <Link href={`/doctors/${tutor.id}`} className="block">
                <button className="w-full py-2.5 rounded-2xl bg-blue-500 text-white text-sm
                                   font-semibold active:scale-95 transition-transform
                                   shadow-md shadow-blue-500/25 cursor-pointer
                                   hover:bg-blue-600">
                    View Details
                </button>
            </Link>
        </div>
    </motion.div>
);

// ─── Main ─────────────────────────────────────────────────────
export default function OutDoctor() {
    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [activeIndex, setActive] = useState(0);
    const [direction, setDirection] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const autoRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tutors/get-all-tutors`
                );
                if (!res.ok) throw new Error("Failed to fetch doctors");
                const result = await res.json();
                setTutors(
                    result.success && Array.isArray(result.data)
                        ? result.data.slice(0, 6)
                        : []
                );
            } catch (err: any) {
                setError(err?.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (!tutors.length) return;
        autoRef.current = setTimeout(() => {
            setDirection(1);
            setActive(i => (i + 1) % tutors.length);
        }, 4500);
        return () => { if (autoRef.current) clearTimeout(autoRef.current); };
    }, [activeIndex, tutors.length]);

    const navigate = (dir: 1 | -1) => {
        if (autoRef.current) clearTimeout(autoRef.current);
        setDirection(dir);
        setActive(i => (i + dir + tutors.length) % tutors.length);
    };

    const goTo = (i: number) => {
        if (autoRef.current) clearTimeout(autoRef.current);
        setDirection(i > activeIndex ? 1 : -1);
        setActive(i);
    };

    const prevIdx = (activeIndex - 1 + tutors.length) % tutors.length;
    const nextIdx = (activeIndex + 1) % tutors.length;

    // ── Loading ──
    if (loading) {
        return (
            <section className="flex flex-col items-center py-24
                                bg-blue-50/60 dark:bg-blue-950/60
                                min-h-[600px]">
                <div className="text-center mb-14 space-y-3">
                    <Skeleton className="h-10 w-64 mx-auto rounded-xl" />
                    <Skeleton className="h-4 w-80 mx-auto" />
                </div>
                <div className="flex gap-5 items-center justify-center">
                    {[0, 1, 2].map(i => (
                        <div key={i}
                            className={`bg-blue-100/50 dark:bg-blue-900/50 rounded-3xl border
                            border-blue-200/40 dark:border-blue-800/40 p-6 ${i === 1
                                    ? "w-72 shadow-xl shadow-blue-500/10 scale-105 z-10"
                                    : "w-56 opacity-50 hidden md:block"}`}>
                            <Skeleton className="w-20 h-20 rounded-2xl mx-auto mb-4" />
                            <Skeleton className="h-5 w-3/4 mx-auto mb-2" />
                            <Skeleton className="h-4 w-1/2 mx-auto mb-4" />
                            <Skeleton className="h-9 w-full rounded-xl" />
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    // ── Error / Empty ──
    if (error || !tutors.length) {
        return (
            <div className="h-[500px] flex flex-col items-center justify-center gap-3
                            bg-blue-50/40 dark:bg-blue-950/40">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Briefcase className="text-blue-400" size={28} />
                </div>
                <p className="text-sm text-blue-400 dark:text-blue-500">{error || "No doctors found."}</p>
            </div>
        );
    }

    // ── Main ──
    return (
        <section className="flex flex-col items-center py-24 relative overflow-hidden">

            {/* Decorative blobs */}
            <div className="absolute top-10 left-1/4 w-80 h-80 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-blue-300/20 dark:bg-blue-700/15 rounded-full blur-3xl pointer-events-none" />

            {/* Heading */}
            <div className="text-center mb-14 px-4 relative z-10">
                <span className="inline-block text-xs font-semibold tracking-widest
                                 text-blue-600 dark:text-blue-400 uppercase mb-3
                                 bg-blue-100/60 dark:bg-blue-900/60 px-4 py-1.5
                                 rounded-full border border-blue-200/50 dark:border-blue-700/50">
                    Medical Experts
                </span>
                <h2 className="text-3xl md:text-4xl font-bold
                               text-blue-900 dark:text-blue-50 mb-3">
                    Meet Our <span className="text-blue-500">Top Doctors</span>
                </h2>
                <p className="text-blue-500/70 dark:text-blue-400/70 text-base max-w-md mx-auto leading-relaxed">
                    Board-certified specialists ready to provide expert care and personalized treatment plans.
                </p>
            </div>

            {/* Carousel */}
            <div className="relative flex items-center justify-center gap-4 md:gap-6 px-4 z-10 w-full">

                {/* Prev */}
                <button
                    onClick={() => navigate(-1)}
                    aria-label="Previous doctor"
                    className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-2xl
                               bg-blue-100/60 dark:bg-blue-900/60
                               border border-blue-200/50 dark:border-blue-700/50
                               flex items-center justify-center
                               text-blue-500 dark:text-blue-400
                               hover:bg-blue-500 hover:text-white hover:border-blue-500
                               dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-white
                               transition-all duration-200 active:scale-90 cursor-pointer z-20"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Left side card — static */}
                {tutors.length > 1 && (
                    <SideCard tutor={tutors[prevIdx]} onClick={() => navigate(-1)} />
                )}

                {/* Center — only animated part */}
                <div className="relative flex items-center justify-center" style={{ width: 310 }}>
                    <AnimatePresence mode="wait" custom={direction} initial={false}>
                        <CenterCard
                            key={tutors[activeIndex].id}
                            tutor={tutors[activeIndex]}
                            dir={direction}
                        />
                    </AnimatePresence>
                </div>

                {/* Right side card — static */}
                {tutors.length > 1 && (
                    <SideCard tutor={tutors[nextIdx]} onClick={() => navigate(1)} />
                )}

                {/* Next */}
                <button
                    onClick={() => navigate(1)}
                    aria-label="Next doctor"
                    className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-2xl
                               bg-blue-100/60 dark:bg-blue-900/60
                               border border-blue-200/50 dark:border-blue-700/50
                               flex items-center justify-center
                               text-blue-500 dark:text-blue-400
                               hover:bg-blue-500 hover:text-white hover:border-blue-500
                               dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-white
                               transition-all duration-200 active:scale-90 cursor-pointer z-20"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            <DotIndicator count={tutors.length} active={activeIndex} onSelect={goTo} />

            <p className="mt-3 text-xs text-blue-400/60 dark:text-blue-500/60">
                {activeIndex + 1} / {tutors.length} doctors
            </p>
        </section>
    );
}