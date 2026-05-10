import { doctorService } from "@/service/doctor.service";
import TutorDetails from "./DoctorDetails";
import NotFound from "@/app/not-found";

export default async function SingleTutorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [searchTerm, category] = ["", ""];
    const response = await doctorService.getAllDoctor(searchTerm, category);
    const allDoctor = response?.data?.data || response?.data || [];
    const doctorData = allDoctor.find((t: any) => String(t.id) === String(id));
    if (!doctorData) {
        return NotFound();
    }

    return <TutorDetails doctor={doctorData} />;
}