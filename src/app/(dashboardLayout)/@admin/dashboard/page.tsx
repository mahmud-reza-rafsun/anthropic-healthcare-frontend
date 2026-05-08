/* eslint-disable @typescript-eslint/no-explicit-any */
import { adminService } from "@/service/admin.service";
import AdminDashboard from "./AdminDashboard";

export default async function DashboardPage() {
    const response = await adminService.getAdminStat();
    const dynamicStats = response?.data;

    return (
        <div className="container mx-auto py-6">
            {dynamicStats && <AdminDashboard {...dynamicStats} />}
        </div>
    );
}