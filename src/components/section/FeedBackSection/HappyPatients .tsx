'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Patient {
    id: number;
    name: string;
    image: string;
    ring: 'outer' | 'inner';
}

interface Position { cx: number; cy: number; }
interface Connection { from: number | 'center'; to: number | 'center'; }
interface AvatarPositions { [key: string]: Position; }

// ── Real patient/people images ─────────────────────────────────
const PATIENT_IMAGES = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1546961342-ea5f62d5a27b?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1558898479-33c0457a5516?w=120&h=120&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=120&h=120&fit=crop&crop=face",
];

// Center doctor image
const CENTER_IMAGE =
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face";

export default function HappyPatients() {
    const [mounted, setMounted] = useState(false);
    const [containerSize, setContainerSize] = useState(800);
    const [activeConnections, setActiveConnections] = useState<Connection[]>([]);
    const [pulseId, setPulseId] = useState<number | null>(null);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            setContainerSize(Math.min(w - 48, 760));
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    const dim = useMemo(() => {
        const s = containerSize / 760;
        return {
            size: containerSize,
            outerR: Math.floor(300 * s),
            innerR: Math.floor(185 * s),
            centerSz: Math.floor(140 * s),
            outerAvSz: Math.floor(68 * s),
            innerAvSz: Math.floor(58 * s),
            cx: containerSize / 2,
            cy: containerSize / 2,
        };
    }, [containerSize]);

    const patients: Patient[] = useMemo(() =>
        Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            name: `Patient ${i + 1}`,
            image: PATIENT_IMAGES[i % PATIENT_IMAGES.length],
            ring: i < 14 ? 'outer' : 'inner',
        })),
        []);

    const outerGroup = patients.filter(p => p.ring === 'outer');
    const innerGroup = patients.filter(p => p.ring === 'inner');

    const positions: AvatarPositions = useMemo(() => {
        const pos: AvatarPositions = {};
        const place = (arr: Patient[], r: number, offset: number) =>
            arr.forEach((p, i) => {
                const a = offset + (i / arr.length) * 2 * Math.PI;
                pos[p.id] = { cx: dim.cx + r * Math.cos(a), cy: dim.cy + r * Math.sin(a) };
            });
        place(outerGroup, dim.outerR, -Math.PI / 2);
        place(innerGroup, dim.innerR, -Math.PI / 6);
        pos['center'] = { cx: dim.cx, cy: dim.cy };
        return pos;
    }, [dim, outerGroup, innerGroup]);

    // Animate random connection every 2.8s
    useEffect(() => {
        const all = [...patients.map(p => p.id as number | 'center'), 'center' as const];
        const tick = () => {
            const from = all[Math.floor(Math.random() * all.length)];
            let to = all[Math.floor(Math.random() * all.length)];
            if (to === from) to = 'center';
            setActiveConnections([{ from, to }]);
            setPulseId(typeof from === 'number' ? from : typeof to === 'number' ? to : null);
        };
        tick();
        const id = setInterval(tick, 2800);
        return () => clearInterval(id);
    }, [patients]);

    if (!mounted) return null;

    return (
        <section className="flex flex-col items-center justify-center py-24 px-4
                            overflow-hidden relative w-full">

            {/* bg blobs */}
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-200/25 dark:bg-blue-800/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-300/20 dark:bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />

            {/* Heading */}
            <div className="text-center mb-12 relative z-10 max-w-xl px-4">
                <span className="inline-block text-xs font-semibold tracking-widest
                                 text-blue-600 dark:text-blue-400 uppercase mb-3
                                 bg-blue-100/60 dark:bg-blue-900/60 px-4 py-1.5 rounded-full
                                 border border-blue-200/50 dark:border-blue-700/50">
                    Patient Community
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-50 mb-3">
                    Our Happy <span className="text-blue-500">Patients</span>
                </h2>
                <p className="text-blue-500/70 dark:text-blue-400/60 text-base leading-relaxed">
                    Thousands of patients trust our doctors for their health journey every day.
                </p>

                {/* stat pills */}
                <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
                    {[
                        { label: 'Happy Patients', value: '12,400+' },
                        { label: 'Success Rate', value: '98.6%' },
                        { label: 'Avg Rating', value: '4.9 ★' },
                    ].map(s => (
                        <div key={s.label}
                            className="px-4 py-2 rounded-2xl
                                        bg-blue-100/70 dark:bg-blue-900/50
                                        border border-blue-200/50 dark:border-blue-700/40">
                            <p className="text-blue-900 dark:text-blue-100 font-bold text-sm">{s.value}</p>
                            <p className="text-blue-400 dark:text-blue-500 text-[11px]">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Orbit diagram */}
            <div className="relative z-10" style={{ width: dim.size, height: dim.size }}>

                {/* Dashed orbit rings */}
                {[dim.outerR, dim.innerR].map((r, i) => (
                    <div key={i}
                        className="absolute rounded-full border border-dashed
                                    border-blue-300/30 dark:border-blue-700/30
                                    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                    pointer-events-none"
                        style={{ width: r * 2, height: r * 2 }} />
                ))}

                {/* SVG connections */}
                <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                    <defs>
                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
                            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
                        </linearGradient>
                    </defs>
                    <AnimatePresence>
                        {activeConnections.map((conn, idx) => {
                            const f = positions[conn.from as number];
                            const t = positions[conn.to as number];
                            if (!f || !t) return null;
                            const len = Math.hypot(t.cx - f.cx, t.cy - f.cy);
                            return (
                                <motion.line
                                    key={`${conn.from}-${conn.to}-${idx}`}
                                    x1={f.cx} y1={f.cy} x2={t.cx} y2={t.cy}
                                    stroke="url(#lineGrad)"
                                    strokeWidth={1.2}
                                    initial={{ strokeDasharray: len, strokeDashoffset: len, opacity: 0 }}
                                    animate={{ strokeDashoffset: 0, opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.4, ease: 'easeInOut' }}
                                />
                            );
                        })}
                    </AnimatePresence>
                </svg>

                {/* Center doctor */}
                <div className="absolute z-20"
                    style={{ left: dim.cx, top: dim.cy, transform: 'translate(-50%,-50%)' }}>
                    {/* Outer glow ring */}
                    <motion.div
                        animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.1, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-0 rounded-full bg-blue-400/30 dark:bg-blue-500/20"
                        style={{
                            width: dim.centerSz + 28, height: dim.centerSz + 28,
                            top: -14, left: -14
                        }}
                    />
                    <div className="relative"
                        style={{ width: dim.centerSz, height: dim.centerSz }}>
                        <img
                            src={CENTER_IMAGE}
                            alt="Doctor"
                            className="w-full h-full rounded-full object-cover
                                       border-[3px] border-blue-400 dark:border-blue-500
                                       shadow-2xl shadow-blue-500/30"
                        />
                        {/* Badge */}
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2
                                         text-[10px] font-bold bg-blue-500 text-white
                                         px-2.5 py-0.5 rounded-full whitespace-nowrap shadow">
                            Your Doctor
                        </span>
                    </div>
                </div>

                {/* Patient avatars */}
                {patients.map(p => {
                    const { cx, cy } = positions[p.id];
                    const isActive = activeConnections.some(
                        c => c.from === p.id || c.to === p.id
                    );
                    const isPulse = pulseId === p.id;
                    const sz = p.ring === 'outer' ? dim.outerAvSz : dim.innerAvSz;

                    return (
                        <div key={p.id}
                            className="absolute"
                            style={{
                                left: cx, top: cy,
                                transform: 'translate(-50%,-50%)',
                                zIndex: isActive ? 30 : 10,
                            }}>
                            <motion.div
                                animate={isPulse
                                    ? { scale: [1, 1.2, 1] }
                                    : { scale: 1 }}
                                transition={{ duration: 0.6, ease: 'easeInOut' }}
                                className="relative group"
                                style={{ width: sz, height: sz }}
                            >
                                {/* Active ring */}
                                {isActive && (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1.35, opacity: 0 }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="absolute inset-0 rounded-full bg-blue-400/40"
                                    />
                                )}

                                <div
                                    className={`w-full h-full rounded-full overflow-hidden
                                                border-2 shadow transition-all duration-500
                                                ${isActive
                                            ? 'border-blue-400 dark:border-blue-400 shadow-blue-400/30 shadow-md'
                                            : 'border-blue-200/60 dark:border-blue-800/60'
                                        }`}
                                    style={{ background: '#dbeafe' }}
                                >
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Tooltip */}
                                <div className="absolute -top-7 left-1/2 -translate-x-1/2
                                                px-2 py-0.5 rounded text-[10px] font-semibold
                                                opacity-0 group-hover:opacity-100 transition-opacity
                                                bg-blue-900 dark:bg-blue-100
                                                text-blue-50 dark:text-blue-900
                                                shadow whitespace-nowrap z-50 pointer-events-none">
                                    {p.name}
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}