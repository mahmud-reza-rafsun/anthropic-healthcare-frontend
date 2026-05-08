"use client"

import * as React from "react"
import {
    Area,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { BookOpen, CheckCircle, Clock, Wallet } from "lucide-react"

function StatCard({ title, value, footer, icon: Icon }: { title: string; value: string | number; footer: string; icon: any }) {
    return (
        <Card className="rounded-2xl border-zinc-200 shadow-sm dark:border-zinc-800 bg-card">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardDescription className="text-xs font-medium uppercase tracking-wider">{title}</CardDescription>
                    <Icon className="w-4 h-4 text-zinc-400" />
                </div>
                <CardTitle className="text-2xl font-bold">{value}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xs text-zinc-500 font-medium">{footer}</p>
            </CardContent>
        </Card>
    )
}

interface DashboardProps {
    data: {
        stats: {
            totalBookings: number;
            pendingBookings: number;
            activeBookings: number;
            completedBookings: number;
        };
        totalSpent: number;
        recentBookings: any[];
    };
}

export default function StudentDashboard({ data }: DashboardProps) {
    const { stats, totalSpent, recentBookings } = data;
    const formattedChartData = React.useMemo(() => {
        if (!recentBookings || recentBookings.length === 0) {
            return [
                { month: "Jan", sessions: 0 },
                { month: "Feb", sessions: 0 },
                { month: "Mar", sessions: 0 },
            ];
        }

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const chartMap = recentBookings.reduce((acc: any, curr: any) => {
            const date = new Date(curr.createdAt);
            const monthName = months[date.getMonth()];
            acc[monthName] = (acc[monthName] || 0) + 1;
            return acc;
        }, {});

        return Object.keys(chartMap).map(month => ({
            month,
            sessions: chartMap[month]
        }));
    }, [recentBookings]);

    return (
        <div className="flex-1 space-y-8 p-6 bg-background min-h-screen">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Spent"
                    value={`$${totalSpent || 0}`}
                    footer="Lifetime investment"
                    icon={Wallet}
                />
                <StatCard
                    title="Total Bookings"
                    value={stats?.totalBookings || 0}
                    footer="Total sessions joined"
                    icon={BookOpen}
                />
                <StatCard
                    title="Active"
                    value={stats?.activeBookings || 0}
                    footer="Ongoing learning"
                    icon={Clock}
                />
                <StatCard
                    title="Completed"
                    value={stats?.completedBookings || 0}
                    footer="Successfully finished"
                    icon={CheckCircle}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-7">
                {/* Learning Activity Chart */}
                <Card className="col-span-4 rounded-[2rem] border-zinc-200 shadow-sm dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Learning Activity</CardTitle>
                        <CardDescription>Number of sessions per month</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={formattedChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-zinc-200 dark:stroke-zinc-800" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="sessions" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorSessions)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Recent Bookings List */}
                <Card className="col-span-3 rounded-[2rem] border-zinc-200 shadow-sm dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Recent Bookings</CardTitle>
                        <CardDescription>Your latest tutor sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentBookings && recentBookings.length > 0 ? (
                                recentBookings.map((booking: any) => {
                                    return (
                                        <div key={booking.id} className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                                            <div className="flex items-center gap-3">
                                                {/* Avatar */}
                                                {booking.tutorImage ? (
                                                    <img
                                                        src={booking.tutorImage}
                                                        alt={booking.tutorName}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                                                        {booking.tutorName?.charAt(0) || "T"}
                                                    </div>
                                                )}

                                                <div>
                                                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{booking.tutorName}</p>
                                                    <p className="text-xs text-zinc-500">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                                                </div>
                                            </div>

                                            {/* Status Badge with Dot */}
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
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-zinc-500 text-sm italic">No recent bookings found.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}