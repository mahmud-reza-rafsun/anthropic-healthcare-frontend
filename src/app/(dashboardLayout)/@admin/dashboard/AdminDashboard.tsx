/* eslint-disable @typescript-eslint/no-explicit-any */
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

interface StatsData {
    stats: {
        totalUsers: number;
        totalStudents: number;
        totalTutors: number;
        totalBookings: number;
        totalReviews: number;
        totalRevenue: number;
    };
    revenueDetails: Array<{ date: string; amount: number }>;
    platformOverview: Array<{ label: string; value: number }>;
}

function StatCard({
    title,
    value,
    subtitle,
}: {
    title: string
    value: string | number
    subtitle: string
}) {
    return (
        <Card className="rounded-2xl border-zinc-200 shadow-sm dark:border-zinc-800">
            <CardHeader className="pb-2">
                <CardDescription className="font-medium">{title}</CardDescription>
                <CardTitle className="text-2xl font-bold">{value}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xs text-muted-foreground">{subtitle}</p>
            </CardContent>
        </Card>
    )
}

export default function AdminDashboard({ stats, revenueDetails, platformOverview }: StatsData) {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className="flex-1 space-y-6 p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
                <StatCard
                    title="Total Revenue"
                    value={`$${stats?.totalRevenue}`}
                    subtitle="Lifetime earnings"
                />
                <StatCard
                    title="Users"
                    value={stats?.totalUsers}
                    subtitle="Total Users"
                />
                <StatCard
                    title="Tutor"
                    value={stats?.totalTutors}
                    subtitle="Total Tutors"
                />
                <StatCard
                    title="Students"
                    value={stats?.totalStudents}
                    subtitle="Total Students"
                />
                <StatCard
                    title="Bookings"
                    value={stats?.totalBookings}
                    subtitle="Total lessons booked"
                />
                <StatCard
                    title="Reviews"
                    value={stats?.totalReviews}
                    subtitle="Platform feedback"
                />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="rounded-[2rem] border-zinc-200 shadow-sm dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Platform Overview</CardTitle>
                        <CardDescription>Distribution of users and activities</CardDescription>
                    </CardHeader>
                    <CardContent className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={platformOverview}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    className="stroke-orange-200 dark:stroke-orange-900/30"
                                />
                                <XAxis dataKey="label" axisLine={false} tickLine={false} fontSize={12} />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                                <Tooltip
                                    cursor={{ fill: '#FF6900', opacity: 0.1 }}
                                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar
                                    dataKey="value"
                                    fill="#FF6900"
                                    radius={[8, 8, 0, 0]}
                                    barSize={50}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="rounded-[2rem] border-zinc-200 shadow-sm dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold">Revenue Analytics</CardTitle>
                        <CardDescription>Visualizing total earnings impact</CardDescription>
                    </CardHeader>
                    <CardContent className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueDetails}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF6900" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#FF6900" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    className="stroke-orange-200 dark:stroke-orange-900/30"
                                />
                                <XAxis dataKey="date" axisLine={false} tickLine={false} fontSize={12} />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="amount"
                                    stroke="#FF6900"
                                    fillOpacity={1}
                                    fill="url(#colorRev)"
                                    strokeWidth={4}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}