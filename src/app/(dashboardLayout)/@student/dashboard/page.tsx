import StudentDashboard from "./StudentDashboard";
import { studentService } from "@/service/student.service";

export default async function Page() {
    const response = await studentService.getStudentDashboard();
    const dashboardData = response?.data;

    if (!dashboardData) {
        return <div className="p-6">Loading or No data found...</div>;
    }

    return <StudentDashboard data={dashboardData} />;
}