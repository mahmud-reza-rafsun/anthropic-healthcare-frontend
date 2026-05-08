// @/service/payment.service.ts

import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

export const paymentService = {
    createCheckoutSession: async function (bookingId: string) {
        try {
            const cookieStore = await cookies();

            const url = `${BACKEND_URL}/api/payment/checkout`;

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                body: JSON.stringify({
                    bookingId,
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to create payment session");
            }

            return {
                success: true,
                url: result.data,
            };

        } catch (error: any) {
            return {
                success: false,
                error: error.message || "Network Error",
            };
        }
    },
};
