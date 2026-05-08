"use client";

import { useState, useEffect } from "react";
import { Plus, Tag, Trash2, LayoutGrid, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createCategoryAction, getAllCategoriesAction } from "./categoryAction";

interface Category {
    id: string;
    name: string;
    slug: string;
}

export default function CategoryPage() {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await getAllCategoriesAction();
            if (res.success) {
                setCategories(res.data);
            } else {
                toast.error("Failed to load categories");
            }
            setIsLoading(false);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const generatedSlug = name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "_")
            .replace(/[^\w-]+/g, "");
        setSlug(generatedSlug);
    }, [name]);

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !slug) return toast.error("Please fill all fields");

        setIsSubmitting(true);
        const res = await createCategoryAction(name, slug);

        if (res.success) {
            setCategories([res.data, ...categories]);
            setName("");
            toast.success("Category added successfully!");
        } else {
            toast.error(res.error || "Failed to create category");
        }
        setIsSubmitting(false);
    };

    return (
        <div className="max-w-7xl mx-auto p-6 space-y-10 min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 dark:border-zinc-800 pb-5">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                    <LayoutGrid className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold dark:text-gray-100">Categories</h1>
                    <p className="text-sm text-zinc-500 font-light">Manage subjects for tutoring</p>
                </div>
            </div>

            {/* Input Form */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
                <form onSubmit={handleAddCategory} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 ml-1">Category Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Web Development"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full h-11 bg-zinc-50 dark:bg-zinc-950 border border-gray-200 dark:border-zinc-800 rounded-lg px-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 ml-1">Slug</label>
                        <input
                            type="text"
                            readOnly
                            placeholder="web_dev"
                            value={slug}
                            className="w-full h-11 bg-zinc-100 dark:bg-zinc-800/50 border outline-none dark:border-zinc-800 rounded-lg px-4 text-sm text-zinc-500 cursor-not-allowed"
                        />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-6 h-11 rounded-lg font-medium text-sm flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                            Add Category
                        </button>
                    </div>
                </form>
            </div>

            {/* List Display Section */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 ml-1">Existing Categories</h3>

                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {categories.length > 0 ? (
                            categories.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="group flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-orange-500/50 transition-all shadow-sm"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                            <Tag className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold dark:text-zinc-200">{cat.name}</h4>
                                            <p className="text-[11px] text-zinc-500 font-mono">slug: {cat.slug}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-10 text-center border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-2xl">
                                <p className="text-zinc-500 text-sm font-light">No categories added yet.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}