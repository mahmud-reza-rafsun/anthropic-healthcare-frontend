"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BookOpen, DollarSign, User, Briefcase, ChevronRight } from "lucide-react";
import { setTutorProfileAction } from "./ProfileAction";
import { getAllCategoriesAction } from "../../@admin/manage-category/categoryAction";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TutorFormProps {
    onSubmitAction: (data: any) => Promise<{ data: any; error: string | null }>;
}

export default function TutorForm({ onSubmitAction }: TutorFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<{ name: string; slug: string }[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const finalData = {
            categoryName: formData.get("categoryName") as string,
            bio: formData.get("bio") as string,
            hourlyRate: Number(formData.get("hourlyRate")),
            subject: (formData.get("subjects") as string)
                .split(",")
                .map(s => s.trim())
                .filter(s => s !== ""),
        };

        try {
            const res = await setTutorProfileAction(finalData);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success("Success! Your tutor profile is ready.");
                router.push("/dashboard");
                router.refresh();
            }
        } catch (error: any) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getAllCategoriesAction();
            if (res.success) {
                setCategories(res.data);
            } else {
                toast.error("Failed to load categories");
            }
            setLoading(false);
        };
        fetchCategories();
    }, []);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Name */}
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                    <Briefcase size={14} className="text-orange-500" /> Category Name
                </label>

                <Select name="categoryName" required defaultValue="">
                    <SelectTrigger className="h-12 w-full rounded-xl py-5 border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-4 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all outline-none">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent
                        position="popper"
                        sideOffset={4}
                        className="rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 max-h-50 w-(--radix-select-trigger-width)">
                        {categories.map((cat) => (
                            <SelectItem
                                key={cat.name}
                                value={cat.name}
                                className="cursor-pointer focus:bg-orange-50 dark:focus:bg-orange-500/10 focus:text-orange-600 dark:focus:text-orange-400"
                            >
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Bio */}
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                    <User size={14} className="text-orange-500" /> Professional Bio
                </label>
                <textarea
                    name="bio"
                    required
                    placeholder="Tell students about your experience..."
                    className="flex min-h-[120px] w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 p-4 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                        <DollarSign size={14} className="text-orange-500" /> Hourly Rate ($)
                    </label>
                    <input name="hourlyRate" type="number" required placeholder="30" className="flex h-12 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-4 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                        <BookOpen size={14} className="text-orange-500" /> Subjects
                    </label>
                    <input name="subjects" type="text" required placeholder="Next.js, Tailwind" className="flex h-12 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 px-4 text-sm outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all" />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="group cursor-pointer relative w-full mt-6 bg-zinc-900 dark:bg-orange-500 text-white dark:text-zinc-950 font-black py-4 rounded-[1.2rem] hover:bg-orange-500 dark:hover:bg-orange-400 transition-all disabled:opacity-50 uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-xl"
            >
                {loading ? "Processing..." : "Complete Setup"}
                {!loading && <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
        </form>
    );
}