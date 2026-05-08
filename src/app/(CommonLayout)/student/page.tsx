import { Suspense } from "react";
import { studentService } from "@/service/student.service";
import { SuccessStudentCard, SuccessStudentSkeleton } from "./StudentCard";
import { SuccessPagination } from "./Pagination";

// --- Success Data Fetching Component ---
async function SuccessList({ page, limit }: { page: number; limit: number }) {
    const { data, meta } = await studentService.getSuccessStudent(page, limit);



    if (!data || data.length === 0) {
        return (
            <div className="col-span-full text-center py-20 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[3rem]">
                <p className="text-zinc-500 font-medium tracking-tight">
                    No success stories found at the moment.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.map((item: any) => (
                    <SuccessStudentCard key={item.id} data={item} />
                ))}
            </div>
            <div className="mt-12">
                <SuccessPagination
                    currentPage={page}
                    totalPage={meta?.totalPage || 1}
                />
            </div>
        </>
    );
}

// --- Main Page ---
export default async function SuccessStudentsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string }>;
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const limit = 8;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">
                        Our <span className="text-orange-500">Success</span> Students
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
                        Celebrating the journey of our top achievers.
                    </p>
                </div>

                {/* Suspense wrapper for data fetching */}
                <Suspense
                    key={page}
                    fallback={
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(limit)].map((_, i) => (
                                <SuccessStudentSkeleton key={i} />
                            ))}
                        </div>
                    }
                >
                    <SuccessList page={page} limit={limit} />
                </Suspense>
            </div>
        </div>
    );
}