"use server";

import { categoryService } from "@/service/category.service";
import { revalidatePath } from "next/cache";

export async function createCategoryAction(name: string, slug: string) {
    if (!name || !slug) {
        return { success: false, error: "Name and Slug are required!" };
    }

    try {
        const res = await categoryService.createCategory(name, slug);

        if (res.success) {
            revalidatePath("/admin/categories");
            revalidatePath("/tutors");

            return {
                success: true,
                message: "Category created successfully!",
                data: res.data
            };
        }

        return {
            success: false,
            error: res.error || "Failed to create category"
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "An unexpected error occurred"
        };
    }
}

export async function getAllCategoriesAction() {
    try {
        const res = await categoryService.getAllCategory();
        if (res.data) {
            return { success: true, data: res.data };
        }
        return { success: false, error: res.error };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}