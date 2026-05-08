"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-background px-4 relative overflow-hidden">

            {/* Background Decorative Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
            </div>

            <div className="text-center relative z-10">
                {/* 404 Text with Blue Gradient */}
                <h1 className="text-[10rem] md:text-[15rem] font-extrabold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-blue-200 dark:to-blue-900/20 selection:bg-blue-500/30">
                    404
                </h1>

                <div className="max-w-md mx-auto -mt-4 md:-mt-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground py-4 lg:py-8">
                        Oops! Page not found
                    </h2>
                    <p className="text-muted-foreground mt-4 mb-10">
                        The medical resource or page you are looking for might have been moved
                        or is temporarily unavailable. Let's get you back to care.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {/* Go Back to Previous Route */}
                        <Button
                            variant="outline"
                            onClick={() => router.back()}
                            className="w-full sm:w-auto rounded-full px-8 h-12 border-blue-500/20 hover:bg-blue-500/5 hover:text-blue-500 group cursor-pointer"
                        >
                            <span className="flex items-center gap-2">
                                <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                                Go Back
                            </span>
                        </Button>

                        {/* Back to Home */}
                        <Button
                            asChild
                            className="w-full sm:w-auto rounded-full px-8 h-12 bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                        >
                            <Link href="/" className="flex items-center gap-2">
                                <Home className="size-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Subtle Medical-style Icon */}
            <div className="mt-16 text-muted-foreground opacity-20">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
            </div>
        </div>
    );
}