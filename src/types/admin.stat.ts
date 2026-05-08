export interface StatsData {
    totalUsers: number;
    totalStudents: number;
    totalTutors: number;
    totalBookings: number;
    totalReviews: number;
    totalRevenue: number;
}

export interface StatsProps {
    statsData: StatsData;
}