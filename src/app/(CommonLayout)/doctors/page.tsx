import { Suspense } from "react";
import { TutorCard } from "@/components/modules/tutorCard/TutorCard";
import { tutorsService } from "@/service/tutor.service";
import TutorFilterHeader from "./DoctorFilterHeader";
import { categoryService } from "@/service/category.service";
import { Pagination } from "./Pagination";
import { Skeleton } from "@/components/ui/skeleton";

// --- Skeleton Loader Component ---
const TutorSkeleton = () => (
    <div className="flex flex-col space-y-4 bg-white dark:bg-zinc-900 p-5 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800">
        <Skeleton className="h-48 w-full rounded-[2rem]" />
        <div className="space-y-3 px-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex justify-between items-center pt-4 px-2">
            <Skeleton className="h-9 w-24 rounded-lg" />
            <Skeleton className="h-9 w-24 rounded-lg" />
        </div>
    </div>
);

// --- Tutors Data Fetching Component ---
async function TutorList({ searchTerm, category, page, limit }: any) {
    const { data: tutors, meta, error } = await tutorsService.getAllTutors(
        searchTerm,
        category,
        page,
        limit
    );

    if (!tutors || tutors.length === 0) {
        return (
            <div className="col-span-full text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2.5rem]">
                <p className="text-zinc-500 font-medium">
                    No tutors found {searchTerm || category ? "matching your criteria" : "at the moment"}.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tutors.map((tutor: any) => (
                    <TutorCard key={tutor.id} tutor={tutor} />
                ))}
            </div>
            <div className="mt-12">
                <Pagination
                    currentPage={page}
                    totalPage={meta?.totalPage || 1}
                />
            </div>
        </>
    );
}

// --- Main Page Component ---
export default async function TutorPage({
    searchParams,
}: {
    searchParams: Promise<{ searchTerm?: string; category?: string; page?: string }>;
}) {
    const params = await searchParams;
    const searchTerm = params.searchTerm || "";
    const category = params.category || "";
    const page = Number(params.page) || 1;
    const limit = 8;

    const { data: categoryData } = await categoryService.getAllCategory();
    const categories: string[] = categoryData?.map((item: any) => item.name) || [];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <TutorFilterHeader categories={categories} />

                <Suspense
                    key={searchTerm + category + page}
                    fallback={
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(limit)].map((_, i) => (
                                <TutorSkeleton key={i} />
                            ))}
                        </div>
                    }
                >
                    <TutorList
                        searchTerm={searchTerm}
                        category={category}
                        page={page}
                        limit={limit}
                    />
                </Suspense>
            </div>
        </div >
    );
}