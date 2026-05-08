"use client";

import { BookingModalProps } from "@/types/tutor.booking";
import { X, Clock, Loader2, CheckCircle2, CreditCard, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createBookingAction } from "./BookingAction";
import { bookingPaymentAction } from "./BookingPaymentAction";

export default function BookingModal({ tutor, isOpen, onClose }: BookingModalProps) {
    const [step, setStep] = useState<'slot' | 'payment'>('slot');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

    if (!isOpen) return null;

    const availabilitySlots = tutor.availability?.slots || {};
    const slotsArray = Object.entries(availabilitySlots);

    const handleInitialSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedDay) {
            toast.error("Please select a day to schedule!");
            return;
        }

        setIsSubmitting(true);

        try {
            const slotDetails = availabilitySlots[selectedDay];
            const timeRangeSlot = `${slotDetails.startTime} - ${slotDetails.endTime}`;

            // STEP 1: create booking
            const res = await createBookingAction(
                tutor.id,
                Number(tutor.hourlyRate),
                selectedDay,
                timeRangeSlot
            );

            console.log("BOOKING RESPONSE:", res); // debug

            if (!res?.success || !res?.data?.id) {
                toast.error(res?.error || "Failed to create booking");
                return;
            }

            const bookingId = res.data.id; // ✅ FIX
            console.log("bookingId", bookingId);
            console.log("tutorId", tutor.id);
            // STEP 2: create payment session
            const paymentRes = await bookingPaymentAction(bookingId); // ✅ FIX

            console.log("PAYMENT RESPONSE:", paymentRes); // debug

            if (paymentRes?.success && paymentRes?.url) {
                setPaymentUrl(paymentRes.url);
                setStep('payment');
                toast.success("Booking initiated! Please pay to confirm.");
            } else {
                toast.error(paymentRes?.error || "Failed to create payment session");
            }

        } catch (err: any) {
            console.error("BOOKING FLOW ERROR:", err);
            toast.error(err.message || "Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-zinc-950 w-full max-w-md rounded-[2.5rem] p-8 relative shadow-2xl border border-zinc-200 dark:border-zinc-800">

                <div className="flex items-center justify-between mb-6">
                    {step === 'payment' && (
                        <button onClick={() => setStep('slot')} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors">
                            <ChevronLeft className="w-5 h-5 text-zinc-500" />
                        </button>
                    )}
                    <h2 className="text-2xl font-black text-zinc-800 dark:text-zinc-100 tracking-tight">
                        {step === 'slot' ? "Select your slot" : "Complete Payment"}
                    </h2>
                    <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 rounded-full">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {step === 'slot' ? (
                    <form onSubmit={handleInitialSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {slotsArray.map(([day, details]: any) => (
                                <div
                                    key={day}
                                    onClick={() => setSelectedDay(day)}
                                    className={cn(
                                        "relative flex flex-col items-start p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200",
                                        selectedDay === day
                                            ? "border-orange-500 bg-orange-50/50 dark:bg-orange-500/10"
                                            : "border-zinc-100 dark:border-zinc-800 hover:border-orange-200"
                                    )}
                                >
                                    <div className="flex items-center justify-between w-full mb-1">
                                        <span className="font-bold text-zinc-900 dark:text-zinc-100">{day}</span>
                                        {selectedDay === day && <CheckCircle2 className="text-orange-600 w-4 h-4" />}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-bold uppercase">
                                        <Clock size={12} className="text-orange-500" />
                                        {details.startTime} - {details.endTime}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-2xl border border-orange-100 dark:border-orange-900/30 flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-orange-600 font-black uppercase">Amount Due</span>
                                <span className="text-xl font-black text-orange-700 dark:text-orange-300">${tutor?.hourlyRate}</span>
                            </div>
                            <Button
                                type="submit"
                                disabled={isSubmitting || !selectedDay}
                                className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold px-8 h-12"
                            >
                                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Slot"}
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                        <div className="text-center p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
                            <CreditCard className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                            <h3 className="font-bold text-zinc-800 dark:text-zinc-200">Secure Checkout</h3>
                            <p className="text-sm text-zinc-500 mt-1">
                                Complete payment via Stripe to confirm your session.
                            </p>
                        </div>

                        <Button
                            onClick={() => {
                                if (paymentUrl) window.location.href = paymentUrl;
                            }}
                            className="w-full bg-zinc-900 dark:bg-white dark:text-zinc-950 text-white h-14 rounded-2xl font-black text-lg"
                        >
                            Pay with Stripe
                        </Button>

                        <p className="text-[10px] text-center text-zinc-400 uppercase font-bold tracking-widest">
                            Powered by Stripe • Secure Encryption
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
