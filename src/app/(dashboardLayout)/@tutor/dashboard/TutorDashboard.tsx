"use client"

import * as React from "react"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
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

function StatCard({ title, value, footer }: { title: string; value: string | number; footer: string }) {
    return (
        <Card className="rounded-2xl border-zinc-200 shadow-sm dark:border-zinc-800 bg-card">
            <CardHeader className="pb-2">
                <CardDescription className="text-xs font-medium uppercase tracking-wider">{title}</CardDescription>
                <CardTitle className="text-2xl font-bold">{value}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xs text-emerald-600 font-medium">{footer}</p>
            </CardContent>
        </Card>
    )
}

interface DashboardProps {
    data: {
        stats: {
            revenue: number;
            students: number;
            bookings: number;
            nextBookingCount: number;
            averageRating: string;
            totalReviews: number;
        };
        revenueChart: Array<{ totalAmount: number; createdAt: string }>;
    };
}

export default function TutorDashboard({ data }: DashboardProps) {
    const { stats, revenueChart } = data;

    const formattedChartData = React.useMemo(() => {
        if (!revenueChart || !Array.isArray(revenueChart)) return [];

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const chartMap = revenueChart.reduce((acc: Record<string, number>, curr) => {
            if (!curr?.createdAt) return acc;
            const date = new Date(curr.createdAt);
            const monthName = months[date.getMonth()];
            acc[monthName] = (acc[monthName] || 0) + (curr.totalAmount || 0);
            return acc;
        }, {});

        return Object.keys(chartMap).map(month => ({
            month,
            value: chartMap[month]
        }));
    }, [revenueChart]);

    return (
        <div className="flex-1 space-y-6 p-6 bg-background">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <StatCard title="Revenue" value={`$${stats?.revenue || 0}`} footer="+12.5% from last month" />
                <StatCard title="Students" value={stats?.students || 0} footer="+2 new this week" />
                <StatCard title="Bookings" value={stats?.bookings || 0} footer="Total lifetime sessions" />
                <StatCard title="Next Booking" value={stats?.nextBookingCount || 0} footer="Upcoming sessions" />
                <StatCard title="Rating" value={`${stats?.averageRating || 0}`} footer={`${stats?.totalReviews || 0} total reviews`} />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="rounded-[2rem] border-zinc-200 shadow-sm dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Revenue</CardTitle>
                        <CardDescription>Monthly revenue trends</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={formattedChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-zinc-200 dark:stroke-zinc-800" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(v) => `$${v}`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="rounded-[2rem] border-zinc-200 shadow-sm dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Orders</CardTitle>
                        <CardDescription>Monthly order volume</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={formattedChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-zinc-200 dark:stroke-zinc-800" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px' }} />
                                <Bar dataKey="value" fill="#f97316" radius={[8, 8, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}