/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const tutorsService = {
    setTutorProfile: async (finalData: any) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${process.env.BACKEND_URL}/api/tutors/tutor-profile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                body: JSON.stringify(finalData),
            });

            const result = await res.json();

            if (!res.ok) {
                return { data: null, error: result.message || "Unauthorized access!" };
            }

            return { data: result.data, error: null };
        } catch (error) {
            return { data: null, error: "Something Went Wrong" };
        }
    },
    setTutorAvailability: async (finalData: any) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${process.env.BACKEND_URL}/api/tutors/create-availability`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                body: JSON.stringify(finalData),
            });

            const result = await res.json();

            if (!res.ok) {
                return { data: null, error: result.message || "Unauthorized access!" };
            }

            return { data: result.data, error: null };
        } catch (error) {
            return { data: null, error: "Something Went Wrong" };
        }
    },
    getAllTutors: async (searchTerm: string = "", category: string = "", page: number = 1, limit: number = 6) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(
                `${BACKEND_URL}/api/tutors/get-all-tutors?searchTerm=${searchTerm}&category=${category}&page=${page}&limit=${limit}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Cookie": cookieStore.toString(),
                    },
                    next: { revalidate: 60 }
                }
            );

            const result = await res.json();

            if (!res.ok) {
                return { data: [], meta: null, error: result.message || "Unauthorized access!" };
            }

            return {
                data: result.data,
                meta: result.meta,
                error: null
            };
        } catch (error) {
            return { data: [], meta: null, error: "Something Went Wrong" };
        }
    },
    getMyStudentBookings: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${BACKEND_URL}/api/tutors/get-student-bookings`, {
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
    getTutorStats: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${BACKEND_URL}/api/tutors/tutor-stats`, {
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
    updateBookingStatus: async (bookingId: string, status: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${process.env.BACKEND_URL}/api/tutors/status/${bookingId}`, {
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
    deleteBooking: async (bookingId: string) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${process.env.BACKEND_URL}/api/tutors/delete-booking/${bookingId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                cache: "no-store"
            });
            const result = await res.json();

            if (!res.ok) {
                return { data: null, error: result.message || "Failed to delete booking!" };
            }

            return { data: result.data, error: null };
        } catch (error) {
            return { data: null, error: "Something Went Wrong" };
        }
    },
    getStudentReviews: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${BACKEND_URL}/api/reviews/get-tutor-reviews`, {
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
}