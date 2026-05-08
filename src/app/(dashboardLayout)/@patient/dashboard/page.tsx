import { patientService } from "@/service/patient.service";
import PatientDashboard from "./PatientDashboard";

export default async function Page() {
    const response = await patientService.getPatientDashboard();
    const dashboardData = response?.data;

    if (!dashboardData) {
        return <div className="p-6">Loading or No data found...</div>;
    }

    return <PatientDashboard data={dashboardData} />;
}