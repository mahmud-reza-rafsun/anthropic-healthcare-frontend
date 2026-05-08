"use server";

import { tutorsService } from "@/service/tutor.service";
import { revalidatePath } from "next/cache";

export async function ApproveRejectBooking(bookingId: string, status: string) {
    try {
        const res = await tutorsService.updateBookingStatus(bookingId, status);

        if (res.data) {
            revalidatePath("/my-bookings");
            return {
                success: true,
                message: `Booking ${status.toLowerCase()} successfully!`,
                data: res.data
            };
        }

        return {
            success: false,
            error: res.error || "Failed to update booking status"
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "An unexpected error occurred"
        };
    }
}

export async function DeleteBookingAction(bookingId: string) {
    try {
        const res = await tutorsService.deleteBooking(bookingId);

        if (res.data) {
            revalidatePath("/my-bookings");
            return {
                success: true,
                message: "Booking deleted successfully!",
                data: res.data
            };
        }

        return {
            success: false,
            error: res.error || "Failed to delete booking"
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "An unexpected error occurred"
        };
    }
}