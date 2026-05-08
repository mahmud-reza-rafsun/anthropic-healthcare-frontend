// src/app/availability/page.tsx
"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { AvailabilityCard } from "./AvailabilityCard";
import { toast } from "sonner";
import { setTutorAvailabilityAction } from "./AvailabilityAction";

const selectedDays = ["Sat", "Sun", "Mon"];

export default function AvailabilityPage() {
    const [isPending, setIsPending] = useState(false);
    const [availability, setAvailability] = useState(
        selectedDays.reduce((acc, day) => {
            acc[day] = { startTime: "09:00", endTime: "17:00" };
            return acc;
        }, {} as Record<string, { startTime: string; endTime: string }>)
    );

    const handleTimeChange = (day: string, field: "startTime" | "endTime", value: string) => {
        setAvailability(prev => ({
            ...prev,
            [day]: { ...prev[day], [field]: value }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);

        const res = await setTutorAvailabilityAction(availability);

        if (res.data) {
            toast.success("Schedule updated successfully");
        } else {
            toast.error(res.error || "Failed to update");
        }
        setIsPending(false);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0a0a0a] py-12 px-4">
            <div className="max-w-md mx-auto">
                <h2 className="text-xl font-bold mb-6 dark:text-white">Weekly Availability</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card className="border-none shadow-none bg-transparent">
                        <CardContent className="p-0 space-y-3">
                            {selectedDays.map((day) => (
                                <AvailabilityCard
                                    key={day}
                                    day={day}
                                    startTime={availability[day].startTime}
                                    endTime={availability[day].endTime}
                                    onTimeChange={handleTimeChange}
                                />
                            ))}
                        </CardContent>
                    </Card>

                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full h-12 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all flex gap-3"
                    >
                        {isPending ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        {isPending ? "Saving..." : "Save Schedule"}
                    </Button>
                </form>
            </div>
        </div>
    );
}