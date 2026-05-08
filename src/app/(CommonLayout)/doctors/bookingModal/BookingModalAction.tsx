"use server";

import { bookingService } from "@/service/booking.service";
import { revalidatePath } from "next/cache";

export async function createBookingAction(
    tutorId: string,
    totalAmount: number,
    day: string,
    slot: string
) {
    try {
        const res = await bookingService.createBookings(tutorId, totalAmount, day, slot);

        if (res.success) {
            revalidatePath("/my-bookings");
            revalidatePath("/tutors");
            return { success: true };
        }

        return { success: false, error: res.error };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}