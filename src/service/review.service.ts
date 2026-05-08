/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

export const reviewService = {
    giveTutorFeedback: async function (
        bookingId: string,
        reviewData: { comment: string; rating: number }
    ) {
        try {
            const cookieStore = await cookies();
            const url = `${BACKEND_URL}/api/reviews/create-review/${bookingId}`;

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                body: JSON.stringify(reviewData),
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to create review");

            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, error: error.message || "Network Error" };
        }
    },
};