"use server";

import { doctorService } from "@/service/doctor.service";
import { revalidatePath } from "next/cache";

export async function setDoctorProfileAction(finalData: any) {

    try {
        const res = await doctorService.setDoctorProfile(finalData);

        if (res.data) {
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