"use client";
import { Star, Calendar, Clock, UserCheck, RefreshCcw } from "lucide-react";

export default function ReviewTableRow({ booking }: { booking: any }) {
    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={14}
                        className={`${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-700"}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <tr className="hover:bg-orange-50/30 dark:hover:bg-orange-900/5 transition-colors border-b border-gray-100 dark:border-gray-800">

            {/* 1. TUTOR DETAILS */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <img
                        src={booking.tutor?.user?.image || "/default-avatar.png"}
                        className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-zinc-800"
                        alt="Tutor"
                    />
                    <div className="flex flex-col text-left">
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                            {booking.tutor?.user?.name || "Tutor"}
                        </span>
                        <span className="text-[11px] text-gray-500 dark:text-zinc-500 font-medium">
                            {booking.tutor?.user?.email}
                        </span>
                    </div>
                </div>
            </td>

            {/* 2. STUDENT DETAILS */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <img
                        src={booking.student?.image || "/default-avatar.png"}
                        className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-zinc-800"
                        alt="Student"
                    />
                    <div className="flex flex-col text-left">
                        <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                            {booking.student?.name || "Student"}
                        </span>
                        <span className="text-[11px] text-gray-500 dark:text-zinc-500 font-medium">
                            {booking.student?.email}
                        </span>
                    </div>
                </div>
            </td>

            {/* 3. RATING & FEEDBACK */}
            <td className="px-6 py-4">
                <div className="space-y-1.5">
                    {booking.review ? (
                        <>
                            {renderStars(booking.review.rating)}
                            <p className="text-[12px] text-gray-600 dark:text-gray-400 italic max-w-[200px] line-clamp-2">
                                "{booking.review.comment}"
                            </p>
                        </>
                    ) : (
                        <span className="text-[11px] text-gray-400 italic italic">Pending review...</span>
                    )}
                </div>
            </td>

            {/* 4. SCHEDULE (Centered) */}
            <td className="px-6 py-4">
                <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-2 text-[12px] text-gray-700 dark:text-gray-300 font-semibold">
                        <Calendar size={12} className="text-orange-500" />
                        <span>{booking.day}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                        <Clock size={12} className="text-blue-500" />
                        <span>{booking.slot}</span>
                    </div>
                </div>
            </td>

            {/* 5. STATUS (Centered - Custom Design) */}
            <td className="px-6 py-4">
                <div className="flex justify-center">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full gap-1.5 border font-bold text-[10px] uppercase tracking-wider ${booking.status === "COMPLETED"
                        ? "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30"
                        : "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-800/30"
                        }`}>
                        {booking.status === "COMPLETED" ? (
                            <UserCheck size={12} />
                        ) : (
                            <RefreshCcw size={12} className="animate-spin" />
                        )}
                        <span>{booking.status}</span>
                    </div>
                </div>
            </td>
        </tr>
    );
}