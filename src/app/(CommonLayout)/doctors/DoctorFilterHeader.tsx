"use client";

import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TutorFilterHeaderProps {
    categories: string[];
}

export default function TutorFilterHeader({ categories }: TutorFilterHeaderProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("searchTerm", term);
        } else {
            params.delete("searchTerm");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 400);

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams);
        if (category && category !== "all") {
            params.set("category", category);
        } else {
            params.delete("category");
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            {/* Left Side: Title & Description */}
            <div className="space-y-0.5">
                <h1 className="text-xl md:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                    Available Tutors
                </h1>
                <p className="text-sm md:text-base text-zinc-500 font-medium">
                    Find the best mentors to upgrade your skills.
                </p>
            </div>

            {/* Right Side: Search and Filter */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                {/* Modern Search Bar */}
                <div className="relative w-full sm:w-64 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-orange-500 transition-colors" />
                    <Input
                        placeholder="Search by subject..."
                        defaultValue={searchParams.get("searchTerm")?.toString()}
                        onChange={(e) => handleSearch(e.target.value)}
                        className="pl-10 h-11 bg-white dark:bg-zinc-900 border-orange-500 dark:border-orange-500 rounded-xl outline-none focus-visible:ring-1 focus-visible:ring-orange-500 focus-visible:ring-offset-0 focus-visible:border-orange-500 transition-all shadow-none"
                    />
                </div>

                {/* Filter Box */}
                <div className="w-full sm:w-48">
                    <Select
                        onValueChange={handleCategoryChange}
                        defaultValue={searchParams.get("category")?.toString() || "all"}
                    >
                        <SelectTrigger className="h-15 py-5 bg-white dark:bg-zinc-900 border-orange-500 dark:border-orange-500 rounded-xl focus:ring-1 focus:ring-orange-500 shadow-sm">
                            <div className="flex items-center gap-2">
                                <Filter className="w-3.5 h-3.5 text-zinc-400" />
                                <SelectValue placeholder="Category" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-zinc-200 dark:border-orange-500">
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>
                                    {cat}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}