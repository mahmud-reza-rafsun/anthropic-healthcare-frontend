/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Eye, Trash2, Calendar, Clock } from "lucide-react";

export default function BookingRow({ order }: { order: any }) {
    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-[#1c1c1d] transition-colors border-b border-gray-100 dark:border-gray-800">
            {/* 1. Student Info */}
            <td className="px-6 py-4">
                <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {order.student?.name || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">{order.student?.email}</p>
                </div>
            </td>

            {/* 2. Tutor Info */}
            <td className="px-6 py-4">
                <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {order.tutor?.user?.name || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">{order.tutor?.user?.email}</p>
                </div>
            </td>

            {/* 3. Schedule (Day & Slot) */}
            <td className="px-6 py-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <Calendar size={14} className="text-orange-500" />
                        <span>{order.day}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Clock size={14} className="text-blue-500" />
                        <span>{order.slot}</span>
                    </div>
                </div>
            </td>

            {/* 4. Price */}
            <td className="px-6 py-4 text-sm font-bold text-orange-600 dark:text-orange-500">
                ${order.totalAmount}
            </td>

            {/* 5. Status */}
            <td className="px-6 py-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 
        ${order.status === "PENDING"
                        ? 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400'
                        : order.status === "CONFIRMED"
                            ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
                            : 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>

                    {/* Status Dot */}
                    <span className={`h-1.5 w-1.5 rounded-full 
            ${order.status === "PENDING"
                            ? 'bg-orange-500'
                            : order.status === "CONFIRMED"
                                ? 'bg-green-500'
                                : 'bg-blue-500'
                        }`}>
                    </span>

                    <h2 className='text-xs font-bold uppercase tracking-wider'>{order.status}</h2>
                </div>
            </td>
        </tr>
    );
}