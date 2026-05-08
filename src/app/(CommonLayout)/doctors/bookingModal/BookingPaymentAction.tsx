"use server";
import { paymentService } from "@/service/payment.service";
import { revalidatePath } from "next/cache";

export async function bookingPaymentAction(bookingId: string) {
    try {
        const res = await paymentService.createCheckoutSession(bookingId);

        if (res.url) {
            revalidatePath("/my-bookings");
            return { success: true, url: res.url };
        }

        return { success: false, error: res.error };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}