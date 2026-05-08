/* eslint-disable @typescript-eslint/no-unused-vars */
import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const doctorService = {
    setDoctorProfile: async (finalData: any) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${process.env.BACKEND_URL}/api/doctor/doctor-profile`, {
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
    setDoctorAvailability: async (finalData: any) => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${process.env.BACKEND_URL}/api/doctor/create-availability`, {
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
    getAllDoctor: async (searchTerm: string = "", category: string = "", page: number = 1, limit: number = 6) => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(
                `${BACKEND_URL}/api/doctor/get-all-doctor?searchTerm=${searchTerm}&category=${category}&page=${page}&limit=${limit}`,
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
    getMyPatientBookings: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${BACKEND_URL}/api/doctor/get-patient-bookings`, {
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
    getDoctorStats: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${BACKEND_URL}/api/doctor/doctor-stats`, {
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

            const res = await fetch(`${process.env.BACKEND_URL}/api/doctor/status/${bookingId}`, {
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

            const res = await fetch(`${process.env.BACKEND_URL}/api/doctor/delete-booking/${bookingId}`, {
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
    getPatientReviews: async () => {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${BACKEND_URL}/api/reviews/get-doctor-reviews`, {
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