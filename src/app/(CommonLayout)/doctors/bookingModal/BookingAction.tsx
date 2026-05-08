"use server";

import { bookingService } from "@/service/booking.service";
import { revalidatePath } from "next/cache";

export async function createBookingAction(
    tutorId: string,
    totalAmount: number,
    day: string,
    slot: string
) {
    const result = await bookingService.createBookings(
        tutorId,
        totalAmount,
        day,
        slot
    );

    if (result.success) {
        revalidatePath("/tutors");
    }

    return result;
}