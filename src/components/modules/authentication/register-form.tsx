"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { uploadToImgBB } from "@/utils/uploadToImgBB";

// --- Icons ---
const UserPlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" /></svg>
);
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-zinc-400 dark:text-zinc-500"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-zinc-400 dark:text-zinc-500"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
);

const inputClass = "w-full h-11 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-300 dark:hover:border-blue-500/50 transition-all";
const labelClass = "text-sm font-medium text-zinc-700 dark:text-zinc-300";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            image: "",
            phone: "",
            role: "STUDENT",
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating account...");
            try {
                let imageUrl = value.image;

                if (imageFile) {
                    imageUrl = await uploadToImgBB(imageFile);
                }

                const { error } = await authClient.signUp.email({
                    email: value.email,
                    password: value.password,
                    name: value.name,
                    image: imageUrl || "https://i.ibb.co/p6pfFmGm/default-avatar.jpg",
                    // @ts-ignore
                    phone: value.phone,
                    role: value.role,
                });

                if (error) {
                    toast.error(error.message || "Registration failed", { id: toastId });
                    return;
                }

                toast.success("Account created successfully!", { id: toastId });
                window.location.assign("/login");
            } catch (err) {
                toast.error("An unexpected error occurred", { id: toastId });
            }
        },
    });

    return (
        <div className="w-full flex items-center justify-center p-4 min-h-[80vh]">
            <div className="w-full max-w-xl p-8 space-y-5 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex p-2.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl mb-1">
                        <UserPlusIcon />
                    </div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Create an account</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Join Anthropic Healthcare today</p>
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    {/* Name + Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <form.Field name="name">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <label className={labelClass}>Full Name</label>
                                    <input
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="Ex Jhon Doe"
                                        className={inputClass}
                                    />
                                    {field.state.meta.errors.length > 0 && (
                                        <p className="text-xs font-medium text-red-500">{field.state.meta.errors[0]}</p>
                                    )}
                                </div>
                            )}
                        </form.Field>

                        <form.Field name="phone">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <label className={labelClass}>Phone Number</label>
                                    <input
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="0160000000"
                                        className={inputClass}
                                    />
                                    {field.state.meta.errors.length > 0 && (
                                        <p className="text-xs font-medium text-red-500">{field.state.meta.errors[0]}</p>
                                    )}
                                </div>
                            )}
                        </form.Field>
                    </div>

                    {/* Email */}
                    <form.Field name="email">
                        {(field) => (
                            <div className="space-y-1.5">
                                <label className={labelClass}>Email Address</label>
                                <input
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    type="email"
                                    placeholder="user@anthropic.com"
                                    className={inputClass}
                                />
                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-xs font-medium text-red-500">{field.state.meta.errors[0]}</p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* Profile Image */}
                    <form.Field name="image">
                        {(field) => (
                            <div className="space-y-1.5">
                                <label className={labelClass}>Profile Image</label>
                                <input
                                    id="imgbb"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        setUploading(true);
                                        const toastId = toast.loading("Uploading image...");
                                        try {
                                            const url = await uploadToImgBB(file);
                                            field.handleChange(url);
                                            toast.success("Uploaded!", { id: toastId });
                                        } catch (err) {
                                            toast.error("Upload failed", { id: toastId });
                                        } finally {
                                            setUploading(false);
                                        }
                                    }}
                                />
                                <label
                                    htmlFor="imgbb"
                                    className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between cursor-pointer hover:border-blue-300 dark:hover:border-blue-500/50 transition-all"
                                >
                                    <span className="text-sm text-zinc-400">
                                        {uploading
                                            ? "Uploading..."
                                            : field.state.value
                                                ? "Image uploaded ✓"
                                                : "Choose image"}
                                    </span>
                                    <span className="text-xs font-medium text-blue-500 hover:text-blue-600 transition-colors">Browse</span>
                                </label>
                                {field.state.value && (
                                    <img
                                        src={field.state.value}
                                        className="w-12 h-12 mt-1 rounded-full object-cover ring-2 ring-blue-500/30"
                                        alt="Profile preview"
                                    />
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* Role + Password */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <form.Field name="role">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <label className={labelClass}>Register as</label>
                                    <Select
                                        value={field.state.value}
                                        onValueChange={(value) => field.handleChange(value as any)}
                                    >
                                        <SelectTrigger className="w-full h-11 px-3.5 py-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm hover:border-blue-300 dark:hover:border-blue-500/50 focus:ring-2 focus:ring-blue-500 transition-all outline-none">
                                            <SelectValue placeholder="Select a role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="DOCTOR">Doctor</SelectItem>
                                            <SelectItem value="PATIENT">Patient</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </form.Field>

                        <form.Field name="password">
                            {(field) => (
                                <div className="space-y-1.5">
                                    <label className={labelClass}>Password</label>
                                    <div className="relative">
                                        <input
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            className={inputClass + " pr-10"}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 hover:text-blue-500 transition-colors"
                                        >
                                            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                        </button>
                                    </div>
                                    {field.state.meta.errors.length > 0 && (
                                        <p className="text-xs font-medium text-red-500">{field.state.meta.errors[0]}</p>
                                    )}
                                </div>
                            )}
                        </form.Field>
                    </div>

                    {/* Submit */}
                    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                        {([canSubmit, isSubmitting]) => (
                            <button
                                type="submit"
                                disabled={!canSubmit || isSubmitting}
                                className="w-full cursor-pointer h-11 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-xl font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 mt-1"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Creating Account...
                                    </>
                                ) : "Create Account"}
                            </button>
                        )}
                    </form.Subscribe>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}