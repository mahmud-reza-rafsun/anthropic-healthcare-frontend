import { tutorsService } from "@/service/tutor.service";
import TutorDashboard from "./TutorDashboard";

export default async function Page() {
    const response = await tutorsService.getTutorStats();
    const dashboardData = response?.data;

    if (!dashboardData) {
        return <div className="p-6">Loading or No data found...</div>;
    }

    return <TutorDashboard data={dashboardData} />;
}