/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Check, X, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTransition, useState } from "react";
import { ApproveRejectBooking, DeleteBookingAction } from "./MyBookingAction";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MyBookingTableProps {
    booking: any;
    onAction?: (id: string, action: 'CONFIRMED' | 'CANCELLED' | 'DELETED') => void;
}

export default function MyBookingTable({ booking, onAction }: MyBookingTableProps) {
    const [isPending, startTransition] = useTransition();
    const [activeType, setActiveType] = useState<'CONFIRMED' | 'CANCELLED' | 'DELETED' | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const executeAction = async () => {
        if (!activeType) return;
        setShowConfirm(false);
        startTransition(async () => {
            let res;
            if (activeType === 'DELETED') {
                res = await DeleteBookingAction(booking.id);
            } else {
                res = await ApproveRejectBooking(booking.id, activeType);
            }

            if (res?.success) {
                toast.success(res.message);
                if (onAction) onAction(booking.id, activeType);
            } else {
                toast.error(res?.error || "Something went wrong");
            }
            setActiveType(null);
        });
    };

    const triggerConfirm = (type: 'CONFIRMED' | 'CANCELLED' | 'DELETED') => {
        setActiveType(type);
        setShowConfirm(true);
    };

    return (
        <>
            <tr className="hover:bg-orange-50/30 dark:hover:bg-orange-900/5 transition-colors border-b border-gray-100 dark:border-gray-800 text-center">
                <td className="px-6 py-4 text-left">
                    <div className="flex items-center justify-center gap-3">
                        {/* Tutor Image */}
                        <div className="flex-shrink-0">
                            <img
                                src={booking.student?.image || "/default-avatar.png"}
                                alt={booking.student?.name || "Student"}
                                className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-zinc-800"
                            />
                        </div>

                        {/* Name and Email */}
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                                {booking.student?.name || "Unknown Student"}
                            </span>
                            <span className="text-[11px] text-gray-500 dark:text-zinc-400 font-medium leading-none mt-0.5">
                                {booking.student?.email || "No email available"}
                            </span>
                        </div>
                    </div>
                </td>

                <td className="px-6 py-4 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{booking.subject}</span>
                    </div>
                </td>

                <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {booking.day}
                </td>

                <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {booking.slot}
                </td>

                <td className="px-6 py-4 text-sm  font-semibold text-gray-900 dark:text-white">
                    {booking.totalAmount}
                </td>

                <td className="px-6 py-4">
                    <div className={`inline-flex items-center px-2.5 py-1 rounded-full gap-1.5 
        ${booking.status === "CONFIRMED"
                            ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400'
                            : booking.status === "COMPLETED"
                                ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                                : booking.status === "CANCELLED"
                                    ? 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400'
                                    : 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-500'
                        }`}>

                        {/* Status Dot */}
                        <span className={`h-1.5 w-1.5 rounded-full 
            ${booking.status === "CONFIRMED"
                                ? 'bg-green-500'
                                : booking.status === "COMPLETED"
                                    ? 'bg-blue-500'
                                    : booking.status === "CANCELLED"
                                        ? 'bg-red-500'
                                        : 'bg-yellow-500'
                            }`}
                        />

                        <span className='text-xs font-semibold uppercase tracking-wider'>
                            {booking.status}
                        </span>
                    </div>
                </td>

                <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                        <button
                            onClick={() => triggerConfirm('CONFIRMED')}
                            disabled={isPending || booking.status !== "PENDING"}
                            className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-lg cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            {isPending && activeType === 'CONFIRMED' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        </button>

                        <button
                            onClick={() => triggerConfirm('CANCELLED')}
                            disabled={isPending || booking.status !== "PENDING"}
                            className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 rounded-lg cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            {isPending && activeType === 'CANCELLED' ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                        </button>

                        <button
                            onClick={() => triggerConfirm('DELETED')}
                            disabled={isPending}
                            className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg cursor-pointer transition-all disabled:opacity-30"
                        >
                            {isPending && activeType === 'DELETED' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                    </div>
                </td>
            </tr >

            <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will {activeType?.toLowerCase()} the booking for {booking.student?.name}.
                            {activeType === 'DELETED' && " This cannot be undone."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer" onClick={() => setActiveType(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={executeAction}
                            className={`text-white cursor-pointer transition-all ${activeType === 'DELETED'
                                ? "bg-red-600 hover:bg-red-700"
                                : activeType === 'CONFIRMED'
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-yellow-500 hover:bg-yellow-600"
                                }`}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}