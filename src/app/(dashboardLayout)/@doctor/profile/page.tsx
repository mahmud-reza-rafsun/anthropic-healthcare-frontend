// app/become-tutor/page.tsx
import { tutorsService } from "@/service/tutor.service";
import TutorForm from "./TutorForm";

export default async function BecomeTutorPage() {
    async function handleTutorSubmit(finalData: any) {
        "use server";
        return await tutorsService.setTutorProfile(finalData);
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-950 rounded-xl border-zinc-200 border dark:border-zinc-800 mt-10">
            <div className="mb-5">
                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white leading-none">
                    Tutor <span className="text-orange-500">Profile</span>
                </h2>
                <p className="text-zinc-500 text-sm mt-2">Set up your profile to start teaching.</p>
            </div>

            <TutorForm onSubmitAction={handleTutorSubmit} />
        </div>
    );
}