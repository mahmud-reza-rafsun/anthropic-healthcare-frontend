/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Trash2, Ban, ShieldCheck } from "lucide-react";
import { format } from "date-fns";
import { Roles } from "@/constants/role";

export default function TotalUsersRow({ user }: { user: any }) {
    const isAdmin = user.role === Roles.admin;
    const isDoctor = user.role === Roles.doctor;
    const isPatient = user.role === Roles.patient;

    return (
        <tr className="hover:bg-gray-50 dark:hover:bg-[#1c1c1d] transition-colors border-b border-gray-100 dark:border-gray-800">
            {/* User Info */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 font-bold">
                        {user.name?.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                </div>
            </td>

            {/* Role - Conditional Coloring */}
            {/* Role with Indicator Dot */}
            <td className="px-6 py-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 
        ${isAdmin
                        ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
                        : isDoctor
                            ? 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'text-blue-500 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}>
                    {/* Role Indicator Dot */}
                    <span className={`h-1.5 w-1.5 rounded-full 
            ${isAdmin ? 'bg-green-500' : isDoctor ? 'bg-yellow-500' : 'bg-blue-500'}`}>
                    </span>
                    <h2 className='text-xs font-semibold uppercase'>{user.role}</h2>
                </div>
            </td>

            {/* Created At */}
            <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                {format(new Date(user.createdAt), "dd MMM, yyyy")}
            </td>

            {/* Status with Dot */}
            <td className="px-6 py-4">
                <div className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 
                    ${user.status === user.status
                        ? 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400'
                        : 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                    <span className={`h-1.5 w-1.5 rounded-full 
                        ${user.status === user.status ? 'bg-green-500' : 'bg-gray-500'}`}>
                    </span>
                    <h2 className='text-xs font-semibold uppercase'>{user.status}</h2>
                </div>
            </td>

            {/* Actions */}
            <td className="px-6 py-4 text-right">
                <div className="flex justify-end items-center gap-2">
                    {/* Block Button */}
                    <button
                        disabled={isAdmin}
                        className={`p-2 rounded-lg transition-colors cursor-pointer 
                            ${isAdmin
                                ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                                : 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
                        title={isAdmin ? "Cannot block admin" : "Block User"}
                    >
                        <Ban size={18} />
                    </button>

                    {/* Delete Button */}
                    <button
                        disabled={isAdmin}
                        className={`p-2 rounded-lg transition-colors cursor-pointer 
                            ${isAdmin
                                ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                                : 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'}`}
                        title={isAdmin ? "Cannot delete admin" : "Delete User"}
                    >
                        <Trash2 size={18} />
                    </button>

                    {isAdmin && <ShieldCheck size={18} className="text-green-500 ml-1" />}
                </div>
            </td>
        </tr>
    );
}