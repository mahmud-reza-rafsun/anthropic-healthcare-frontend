"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import Link from "next/link";

// --- Icons ---
const LogInIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-500"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" x2="3" y1="12" y2="12" /></svg>
);
const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-zinc-400 dark:text-zinc-500"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
);
const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-zinc-400 dark:text-zinc-500"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
);
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg>
);

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const handleGoogleLogin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: window.location.origin,
            });
        } catch (err) {
            console.error(err);
            toast.error("Google login failed. Please try again.");
        }
    };

    const form = useForm({
        defaultValues: { email: "", password: "" },
        validators: { onSubmit: loginSchema },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Logging in...");
            try {
                const { error } = await authClient.signIn.email({
                    email: value.email,
                    password: value.password,
                    rememberMe: true,
                });
                if (error) {
                    toast.error(error.message || "Invalid credentials", { id: toastId });
                    return;
                }
                toast.success("Logged in successfully", { id: toastId });
                window.location.href = "/";
            } catch (err) {
                toast.error("An unexpected error occurred", { id: toastId });
            }
        },
    });

    const setCredentials = (email: string, password: string) => {
        form.setFieldValue("email", email);
        form.setFieldValue("password", password);
    };

    return (
        <div className="w-full flex items-center justify-center p-4 min-h-[80vh]">
            <div className="w-full max-w-md p-8 space-y-5 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex p-2.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl mb-1">
                        <LogInIcon />
                    </div>
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Welcome back</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Sign in to your account to continue</p>
                </div>

                {/* Google Button */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2.5 h-11 cursor-pointer rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all font-medium text-sm text-zinc-700 dark:text-zinc-300"
                >
                    <GoogleIcon /> Continue with Google
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center">
                    <span className="absolute w-full border-t border-zinc-200 dark:border-zinc-800" />
                    <span className="relative bg-white dark:bg-zinc-950 px-3 text-xs text-zinc-400 uppercase tracking-wider">Or continue with email</span>
                </div>

                {/* Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                    className="space-y-4"
                >
                    {/* Email */}
                    <form.Field name="email">
                        {(field) => (
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
                                <input
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full h-11 px-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-300 dark:hover:border-blue-500/50 transition-all"
                                />
                                {field.state.meta.errors.length > 0 && (
                                    <p className="text-xs text-red-500 font-medium">
                                        {String(field.state.meta.errors[0])}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* Password */}
                    <form.Field name="password">
                        {(field) => (
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
                                    <Link href="/forgot-password" className="text-xs text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <input
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        className="w-full h-11 px-3.5 pr-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-300 dark:hover:border-blue-500/50 transition-all"
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
                                    <p className="text-xs text-red-500 font-medium">
                                        {String(field.state.meta.errors[0])}
                                    </p>
                                )}
                            </div>
                        )}
                    </form.Field>

                    {/* Demo Login Buttons */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                        {[
                            { label: "Admin", email: "admin@anthropic.com" },
                            { label: "Doctor", email: "doctor@anthropic.com" },
                            { label: "Patient", email: "patient@anthropic.com" },
                        ].map(({ label, email }) => (
                            <button
                                key={label}
                                type="button"
                                onClick={() => setCredentials(email, "12345678")}
                                className="text-[10px] uppercase tracking-wider h-8 rounded-lg border cursor-pointer border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-300 dark:hover:border-blue-500/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all font-bold text-zinc-500 dark:text-zinc-400"
                            >
                                {label}
                            </button>
                        ))}
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
                                        Signing in...
                                    </>
                                ) : "Sign In"}
                            </button>
                        )}
                    </form.Subscribe>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
}