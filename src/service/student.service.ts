import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const studentService = {
    getMyTutorBookings: async function () {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${BACKEND_URL}/api/bookings/get-tutor-bookings`, {
                method: "GET",
                headers: {
                    "Cookie": cookieStore.toString(),
                },
                cache: "no-store",
            });

            const result = await res.json();
            if (!res.ok) {
                return { data: [], error: result.message || "Failed to get my tutor bookings" };
            }
            return { data: result.data || [], error: null };
        } catch (error) {
            console.error("Connection Error:", error);
            return { data: [], error: "Connection Error" };
        }
    },
    updateBookingStatus: async (bookingId: string, status: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${process.env.BACKEND_URL}/api/bookings/complete-session/${bookingId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                body: JSON.stringify({ status }),
                cache: "no-store"
            });

            const result = await res.json();

            if (!res.ok) {
                return { data: null, error: result.message || "Failed to update status!" };
            }

            return { data: result.data, error: null };
        } catch (error) {
            return { data: null, error: "Something Went Wrong" };
        }
    },
    getStudentDashboard: async function () {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${BACKEND_URL}/api/bookings/dashboard-stats`, {
                method: "GET",
                headers: {
                    "Cookie": cookieStore.toString(),
                },
                cache: "no-store",
            });

            const result = await res.json();
            if (!res.ok) {
                return { data: [], error: result.message || "Failed to get my tutor bookings" };
            }
            return { data: result.data || [], error: null };
        } catch (error) {
            console.error("Connection Error:", error);
            return { data: [], error: "Connection Error" };
        }
    },
    getSuccessStudent: async function (page: number, limit: number) {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${BACKEND_URL}/api/student/success-students?page=${page}&limit=${limit}`, {
                method: "GET",
                headers: {
                    "Cookie": cookieStore.toString(),
                },
                cache: "no-store",
            });

            const result = await res.json();
            if (!res.ok) {
                return { data: [], meta: null, error: result.message || "Failed to get success student" };
            }
            return {
                data: result.data || [],
                meta: result.meta || { totalPage: 1 },
                error: null
            };
        } catch (error) {
            console.error("Connection Error:", error);
            return { data: [], meta: null, error: "Connection Error" };
        }
    },
};
