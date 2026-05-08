/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

export const bookingService = {
    createBookings: async function (
        tutorId: string,
        totalAmount: number,
        day: string,
        slot: string
    ) {
        try {
            const cookieStore = await cookies();
            const url = `${BACKEND_URL}/api/bookings/create-bookings/${tutorId}`;

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                body: JSON.stringify({
                    totalAmount,
                    day,
                    slot,
                }),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to create booking");

            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: error.message || "Network Error" };
        }
    },
};