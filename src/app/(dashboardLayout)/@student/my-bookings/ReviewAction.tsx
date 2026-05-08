// app/actions.ts
"use server"

import { reviewService } from "@/service/review.service";

export type ActionResponse = {
    success: boolean;
    message: string;
    data?: any;
};

export async function postReviewAction(
    reviewData: { comment: string; rating: number },
    bookingId: string
): Promise<ActionResponse> {
    if (!bookingId) {
        return { success: false, message: "Booking ID is required." };
    }
    try {
        const review = await reviewService.giveTutorFeedback(bookingId, reviewData);
        return {
            success: true,
            message: "You Review posted successfully!",
            data: review
        };

    } catch (error: any) {
        console.error("Review Action Error:", error);

        const errorMessage = error?.response?.data?.message || "An error occurred while posting the review.";

        return {
            success: false,
            message: errorMessage
        };
    }
}