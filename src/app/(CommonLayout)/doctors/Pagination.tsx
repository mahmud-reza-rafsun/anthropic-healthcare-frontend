"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
    currentPage: number;
    totalPage: number;
}

export const Pagination = ({ currentPage, totalPage }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPage) return;
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

    if (totalPage <= 1) return null;

    return (
        <div className="flex items-center justify-center space-x-2 mt-12">
            {/* Previous Button */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-orange-500/20 hover:bg-orange-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
                <ChevronLeft size={20} />
            </button>

            {/* Page Numbers */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg border transition-all cursor-pointer font-medium ${currentPage === page
                        ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                        : "border-orange-500/20 hover:border-orange-500 text-muted-foreground hover:text-orange-500"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
                className="p-2 rounded-lg border border-orange-500/20 hover:bg-orange-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};