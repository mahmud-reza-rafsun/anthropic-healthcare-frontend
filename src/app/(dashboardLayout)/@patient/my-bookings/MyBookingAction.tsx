"use server";

import { patientService } from "@/service/patient.service";
import { revalidatePath } from "next/cache";

export async function CompleteSessionAction(bookingId: string) {
    try {
        const res = await patientService.updateBookingStatus(bookingId, "COMPLETED");

        if (res.data) {
            revalidatePath("/my-bookings");
            return { success: true, message: "Session marked as completed!" };
        }
        return { success: false, error: res.error };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}