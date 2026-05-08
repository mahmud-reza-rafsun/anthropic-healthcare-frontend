/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { X, Trash2, Loader2, CalendarSync, UserStar } from "lucide-react";
import { toast } from "sonner";
import { ApproveRejectBooking, DeleteBookingAction } from "../../@tutor/my-bookings/MyBookingAction";
import { CompleteSessionAction } from "./MyBookingAction";
import TutorReviewModal from "./TutorReviewModal";

export default function MyBookingTable({ booking }: { booking: any }) {
    const [isPending, startTransition] = useTransition();
    const [activeType, setActiveType] = useState<'CANCELLED' | 'DELETED' | 'COMPLETED' | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const triggerAction = (type: 'CANCELLED' | 'DELETED' | 'COMPLETED') => {
        setActiveType(type);
        setShowConfirm(true);
    };

    const executeAction = async () => {
        if (!activeType) return;
        setShowConfirm(false);

        startTransition(async () => {
            try {
                let res;
                if (activeType === 'DELETED') {
                    res = await DeleteBookingAction(booking.id);
                } else if (activeType === 'COMPLETED') {
                    res = await CompleteSessionAction(booking.id);
                } else {
                    res = await ApproveRejectBooking(booking.id, 'CANCELLED');
                }

                if (res?.success) {
                    toast.success(res.message);
                } else {
                    toast.error(res?.error || "Action failed. Please try again.");
                }
            } catch (err) {
                toast.error("An unexpected error occurred");
            } finally {
                setActiveType(null);
            }
        });
    };

    return (
        <>
            <tr className="hover:bg-orange-50/30 dark:hover:bg-orange-900/5 transition-colors border-b border-gray-100 dark:border-gray-800">

                {/* 1. TUTOR (Left Aligned) */}
                <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                            <img
                                src={booking.tutor?.user?.image || "/default-avatar.png"}
                                alt={booking.tutor?.user?.name || "Tutor"}
                                className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-zinc-800"
                            />
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                                {booking.tutor?.user?.name || "Unknown Tutor"}
                            </span>
                            <span className="text-[11px] text-gray-500 dark:text-zinc-400 font-medium">
                                {booking.tutor?.user?.email || "No email available"}
                            </span>
                        </div>
                    </div>
                </td>

                {/* 2. SUBJECT (Center Aligned) */}
                <td className="px-6 py-4 text-center">
                    <code className="text-[11px] bg-slate-200 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-700 dark:text-slate-300 font-medium">
                        {booking.tutor?.subject || "General"}
                    </code>
                </td>

                {/* 3. AMOUNT (Center Aligned) */}
                <td className="px-6 py-4 text-center text-sm font-bold text-gray-900 dark:text-white">
                    ${booking.totalAmount}
                </td>

                {/* 4. BOOKING DAY (Center Aligned) */}
                <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    {booking.day}
                </td>

                {/* 5. BOOKING TIME (Center Aligned) */}
                <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    {booking.slot}
                </td>

                {/* 6. STATUS (Center Aligned) */}
                <td className="px-6 py-4 text-center">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full gap-1.5 mx-auto
            ${booking.status === "CONFIRMED"
                            ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400'
                            : booking.status === "CANCELLED" || booking.status === "REJECTED"
                                ? 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400'
                                : booking.status === "COMPLETED"
                                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                                    : 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-500'
                        }`}>
                        <span className={`h-1.5 w-1.5 rounded-full 
                ${booking.status === "CONFIRMED" ? 'bg-green-500' :
                                booking.status === "CANCELLED" || booking.status === "REJECTED" ? 'bg-red-500' :
                                    booking.status === "COMPLETED" ? 'bg-blue-500' : 'bg-yellow-500'}`}>
                        </span>
                        <span className='text-[10px] font-bold uppercase tracking-wider'>
                            {booking.status}
                        </span>
                    </div>
                </td>

                {/* 7. ACTIONS (Center Aligned) */}
                <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                        {/* Complete Session */}
                        <button
                            onClick={() => triggerAction('COMPLETED')}
                            disabled={isPending || booking.status !== "CONFIRMED"}
                            className="p-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-lg cursor-pointer transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                        >
                            {isPending && activeType === 'COMPLETED' ?
                                <CalendarSync className="w-4 h-4 animate-spin" /> : <CalendarSync className="w-4 h-4" />
                            }
                        </button>

                        {/* Cancel */}
                        <button
                            onClick={() => triggerAction('CANCELLED')}
                            disabled={isPending || booking.status !== "PENDING"}
                            className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-lg cursor-pointer transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                        >
                            {isPending && activeType === 'CANCELLED' ?
                                <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />
                            }
                        </button>

                        {/* Delete */}
                        <button
                            onClick={() => triggerAction('DELETED')}
                            disabled={isPending}
                            className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg cursor-pointer transition-all disabled:opacity-30"
                        >
                            {isPending && activeType === 'DELETED' ?
                                <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />
                            }
                        </button>

                        {
                            booking.status === "COMPLETED" && (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    disabled={isPending}
                                    className="p-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg cursor-pointer transition-all disabled:opacity-30">
                                    < UserStar className="w-4 h-4" />
                                </button>
                            )
                        }
                    </div>
                </td>
            </tr>

            {/* Global Confirmation Modal */}
            <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {activeType === 'COMPLETED' && "This will mark the session as completed. You won't be able to make changes afterward."}
                            {activeType === 'CANCELLED' && "This will cancel your booking. You can create a new booking if you wish."}
                            {activeType === 'DELETED' && "This will permanently delete your booking record."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setActiveType(null)} className="cursor-pointer">
                            Go back
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={executeAction}
                            className={`text-white cursor-pointer ${activeType === 'DELETED' ? "bg-red-600 hover:bg-red-700" :
                                activeType === 'COMPLETED' ? "bg-blue-600 hover:bg-blue-700" :
                                    "bg-amber-600 hover:bg-amber-700"
                                }`}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <TutorReviewModal bookingId={booking.id} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}