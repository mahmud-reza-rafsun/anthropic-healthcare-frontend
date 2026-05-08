"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const SuccessPagination = ({
    currentPage,
    totalPage
}: {
    currentPage: number;
    totalPage: number;
}) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
    };

    if (totalPage <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-12 pb-10">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-2 rounded-xl border border-slate-200 hover:bg-orange-50 disabled:opacity-30 transition-all"
            >
                <ChevronLeft size={20} className="text-slate-600" />
            </button>

            {[...Array(totalPage)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${currentPage === i + 1
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                        : "text-slate-500 hover:bg-orange-50"
                        }`}
                >
                    {i + 1}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPage}
                className="p-2 rounded-xl border border-slate-200 hover:bg-orange-50 disabled:opacity-30 transition-all"
            >
                <ChevronRight size={20} className="text-slate-600" />
            </button>
        </div>
    );
};