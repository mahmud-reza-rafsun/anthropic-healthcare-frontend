/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import { Mail, Calendar, ShieldCheck, User as UserIcon, CheckCircle2, BadgeCheck, Star, Fingerprint } from "lucide-react";
import { format } from "date-fns";

export default function UserProfile({ user }: { user: any }) {

    const joinDate = user?.createdAt
        ? format(new Date(user.createdAt), "MMMM dd, yyyy")
        : "N/A";

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
            {/* Top Profile Card */}
            <div className="relative bg-white dark:bg-[#111111] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">

                {/* Orange Theme Banner with Pattern */}
                <div className="h-48 bg-orange-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600"></div>
                    {/* Minimalist Pattern Overlay */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }}></div>
                </div>

                <div className="px-6 md:px-10 pb-10">
                    <div className="relative flex flex-col md:flex-row justify-between items-center md:items-end -mt-20 gap-6">

                        {/* Avatar & Info */}
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                            <div className="relative group">
                                <div className="w-40 h-40 rounded-[3rem] border-[8px] border-white dark:border-[#111111] bg-gray-100 dark:bg-gray-800 overflow-hidden shadow-2xl flex items-center justify-center transition-transform group-hover:scale-[1.02] duration-300">
                                    {user?.image ? (
                                        <Image src={user.image} alt={user.name} fill className="object-cover" />
                                    ) : (
                                        <div className="text-orange-200"><UserIcon size={70} /></div>
                                    )}
                                </div>
                                {/* Status Indicator */}
                                <div className={`absolute bottom-4 right-4 w-6 h-6 border-4 border-white dark:border-[#111111] rounded-full shadow-lg ${user?.status === "ACTIVE" ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                            </div>

                            <div className="pb-2 space-y-1">
                                <div className="flex items-center justify-center md:justify-start gap-2">
                                    <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                                        {user?.name}
                                    </h1>
                                    {user?.role === "ADMIN" && <BadgeCheck className="text-orange-500" size={28} />}
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium">
                                    <Mail size={16} className="text-orange-400" />
                                    <span>{user?.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* Status & Role Badges */}
                        <div className="flex flex-wrap justify-center gap-3 mb-2">
                            <div className={`inline-flex items-center px-5 py-2 rounded-2xl gap-x-2 border shadow-sm backdrop-blur-md
                                ${user?.role === "STUDENT"
                                    ? 'bg-orange-50 dark:bg-orange-950/20 text-orange-600 border-orange-100 dark:border-orange-900/50'
                                    : 'bg-blue-50 dark:bg-blue-950/20 text-blue-600 border-blue-100 dark:border-blue-900/50'}`}>
                                <span className={`h-2 w-2 rounded-full ${user?.role === "STUDENT" ? 'bg-orange-500' : 'bg-blue-500'}`}></span>
                                <span className='text-[12px] font-black uppercase tracking-widest'>{user?.role}</span>
                            </div>

                            <div className="inline-flex items-center px-5 py-2 rounded-2xl gap-x-2 border bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-gray-700 shadow-sm">
                                <CheckCircle2 size={16} className="text-emerald-500" />
                                <span className='text-[12px] font-black uppercase tracking-widest'>{user?.status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Stats / Overview */}
                <div className="bg-white dark:bg-[#111111] p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-[11px] font-black text-orange-500 uppercase tracking-[0.3em] mb-8">Account Score</h3>
                    <div className="space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/20 text-orange-600"><Star size={20} fill="currentColor" /></div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Reputation</p>
                                    <p className="text-xs text-gray-500">Based on activity</p>
                                </div>
                            </div>
                            <span className="text-xl font-black text-orange-600">4.9</span>
                        </div>

                        <div className="h-px bg-gray-100 dark:bg-gray-800"></div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-2xl bg-orange-50 dark:bg-orange-950/20 text-orange-600"><ShieldCheck size={20} /></div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Email Verified</p>
                                    <p className="text-xs text-gray-500">Identity check</p>
                                </div>
                            </div>
                            <span className={`text-sm font-black ${user?.emailVerified ? "text-emerald-500" : "text-gray-400"}`}>
                                {user?.emailVerified ? "VERIFIED" : "PENDING"}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Main Details Section */}
                <div className="lg:col-span-2 bg-white dark:bg-[#111111] p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-10">
                        <h3 className="text-[11px] font-black text-orange-500 uppercase tracking-[0.3em]">Detailed Identity</h3>
                        <button className="text-[10px] font-bold bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-gray-500 hover:bg-orange-500 hover:text-white transition-colors">EDIT PROFILE</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8">
                        <DetailItem icon={<Fingerprint size={18} />} label="User System ID" value={user?.id || "N/A"} isCode />
                        <DetailItem icon={<Calendar size={18} />} label="Member Since" value={joinDate} />
                        <DetailItem icon={<Mail size={18} />} label="Communication" value={user?.email} />
                        <DetailItem icon={<BadgeCheck size={18} />} label="Current Standing" value={user?.status === "ACTIVE" ? "In Good Standing" : "Account Restricted"} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function DetailItem({ icon, label, value, isCode }: { icon: any, label: string, value: string, isCode?: boolean }) {
    return (
        <div className="flex items-start gap-4 group">
            <div className="p-3 bg-gray-50 dark:bg-gray-800/50 text-orange-500 rounded-[1.2rem] border border-gray-100 dark:border-gray-700 group-hover:border-orange-200 dark:group-hover:border-orange-800 transition-all duration-300">
                {icon}
            </div>
            <div className="space-y-1">
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em]">{label}</p>
                <p className={`text-[15px] font-bold text-gray-800 dark:text-gray-200 break-all ${isCode ? 'font-mono text-sm opacity-80' : ''}`}>
                    {value}
                </p>
            </div>
        </div>
    );
}