import { tutorsService } from "@/service/tutor.service";
import TutorDetails from "./TutorDetails";
import NotFound from "@/app/not-found";

export default async function SingleTutorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [searchTerm, category] = ["", ""];
    const response = await tutorsService.getAllTutors(searchTerm, category);
    const allTutors = response?.data?.data || response?.data || [];
    const tutorData = allTutors.find((t: any) => String(t.id) === String(id));
    if (!tutorData) {
        return NotFound();
    }

    return <TutorDetails tutor={tutorData} />;
}