// src/components/AvailabilityCard.tsx
"use client";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";

interface AvailabilityCardProps {
    day: string;
    startTime: string;
    endTime: string;
    onTimeChange: (day: string, field: "startTime" | "endTime", value: string) => void;
}

export function AvailabilityCard({ day, startTime, endTime, onTimeChange }: AvailabilityCardProps) {
    return (
        <div className="flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-zinc-900/50 p-4 rounded-xl border border-gray-100 dark:border-zinc-800">
            <span className="w-12 font-bold text-sm text-gray-600 dark:text-gray-400">{day}</span>

            <div className="flex flex-1 items-center gap-3">
                <div className="relative flex-1 group">
                    <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="time"
                        value={startTime}
                        onChange={(e) => onTimeChange(day, "startTime", e.target.value)}
                        className="pl-9 h-11 bg-white dark:bg-zinc-800 border-none focus-visible:ring-1 focus-visible:ring-orange-500 font-medium"
                    />
                </div>

                <div className="h-[1px] w-3 bg-gray-300 dark:bg-zinc-700" />

                <div className="relative flex-1 group">
                    <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                        type="time"
                        value={endTime}
                        onChange={(e) => onTimeChange(day, "endTime", e.target.value)}
                        className="pl-9 h-11 bg-white dark:bg-zinc-800 border-none focus-visible:ring-1 focus-visible:ring-orange-500 font-medium"
                    />
                </div>
            </div>
        </div>
    );
}