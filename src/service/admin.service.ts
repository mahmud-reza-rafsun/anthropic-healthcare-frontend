/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const adminService = {
    getAllUsers: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${BACKEND_URL}/api/admin/get-all-users`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                next: { revalidate: 60 }
            });

            const result = await res.json();

            if (!res.ok) {
                return { data: [], error: result.message || "Unauthorized access!" };
            }

            return { data: result.data, error: null };
        } catch (error) {
            return { data: [], error: "Something Went Wrong" };
        }
    },
    getAllBookings: async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${BACKEND_URL}/api/admin/get-all-bookings`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                next: { revalidate: 60 }
            });
            const result = await res.json();
            if (!res.ok) {
                return { data: [], error: result.message || "Unauthorized access!" };
            }
            return { data: result.data, error: null };
        } catch (error) {
            return { data: [], error: "Something Went Wrong" };
        }
    },
    getAdminStat: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${BACKEND_URL}/api/admin/get-admin-stats`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                next: { revalidate: 60 }
            });

            const result = await res.json();

            if (!res.ok) {
                return { data: [], error: result.message || "Unauthorized access!" };
            }

            return { data: result.data, error: null };
        } catch (error) {
            return { data: [], error: "Something Went Wrong" };
        }
    },
};