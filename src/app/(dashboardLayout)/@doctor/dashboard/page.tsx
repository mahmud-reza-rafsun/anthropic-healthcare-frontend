import { doctorService } from "@/service/doctor.service";
import DoctorDashboard from "./DoctorDashboard";

export default async function Page() {
    const response = await doctorService.getDoctorStats()
    const dashboardData = response?.data;

    if (!dashboardData) {
        return <div className="p-6">Loading or No data found...</div>;
    }

    return <DoctorDashboard data={dashboardData} />;
}