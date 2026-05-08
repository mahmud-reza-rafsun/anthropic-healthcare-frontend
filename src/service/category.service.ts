import { env } from "@/env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL

export const categoryService = {
    createCategory: async function (name: string, slug: string) {
        try {
            const cookieStore = await cookies();
            const url = `${BACKEND_URL}/api/category/create-category`;

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Cookie": cookieStore.toString(),
                },
                body: JSON.stringify({
                    name: name,
                    slug: slug,
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to create category");
            }

            return { success: true, data: result.data };
        } catch (error: any) {
            console.error("❌ Category Service Error:", error.message);
            return { success: false, error: error.message || "Network Error" };
        }
    },
    getAllCategory: async function () {
        try {
            const cookieStore = await cookies();

            const res = await fetch(`${BACKEND_URL}/api/category/get-all-category`, {
                method: "GET",
                headers: {
                    "Cookie": cookieStore.toString(),
                },
                cache: "no-store",
            });

            const result = await res.json();
            if (!res.ok) {
                return { data: [], error: result.message || "Failed to fetch" };
            }

            return { data: result.data || [], error: null };
        } catch (error) {
            console.error("Connection Error:", error);
            return { data: [], error: "Connection Error" };
        }
    },
};