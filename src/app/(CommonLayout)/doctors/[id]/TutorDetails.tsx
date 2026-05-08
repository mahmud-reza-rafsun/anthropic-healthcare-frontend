"use client";

import Link from "next/link";
import { ChevronLeft, Star, MapPin, BookOpen, Calendar, Clock } from "lucide-react";
import { useState } from "react";
import BookingModal from "../bookingModal/BookingModal";
import Image from "next/image";

export default function TutorDetails({ tutor }: { tutor: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // API Response mapping based on your JSON
    const name = tutor?.user?.name || "Tutor Profile";
    const profileImage = tutor?.user?.image;
    const rate = tutor?.hourlyRate || "0";
    const bio = tutor?.bio || "No bio available at the moment.";

    // Subjects are coming as a string (e.g., "Nextjs, PostgreSQL"), converting to array
    const subjects = tutor?.subject ? tutor.subject.split(',').map((s: string) => s.trim()) : [];

    // Availability mapping from slots object
    const availabilitySlots = tutor?.availability?.slots || {};
    const availableDays = Object.keys(availabilitySlots);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 md:p-8">
            <div className="max-w-5xl mx-auto">

                {/* Go Back Option */}
                <div className="mb-8">
                    <Link href="/tutors" className="inline-flex items-center gap-2 text-zinc-500 hover:text-orange-600 transition-all font-medium group">
                        <div className="p-2 rounded-full bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800 group-hover:border-orange-200">
                            <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                        </div>
                        <span>Back to Tutors</span>
                    </Link>
                </div>

                {/* Main Profile Card */}
                <div className="relative bg-white dark:bg-zinc-900 rounded-[2.5rem] p-6 md:p-12 shadow-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden mb-10">
                    <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">

                        {/* Avatar Box with Image Support */}
                        <div className="w-32 h-32 md:w-44 md:h-44 rounded-[2rem] bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-6xl font-black shadow-xl transform rotate-3 overflow-hidden">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt={name}
                                    className="w-full h-full object-cover transform -rotate-3 scale-110"
                                />
                            ) : (
                                <span className="transform -rotate-3">{name.charAt(0)}</span>
                            )}
                        </div>

                        <div className="flex-1">
                            <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4">
                                {name}
                            </h1>
                            <p className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-3">
                                {tutor?.categoryName || "Expert Tutor"}
                            </p>
                            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-6 italic leading-relaxed">
                                "{bio}"
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-bold">
                                    <Star className="w-4 h-4 text-orange-500 fill-orange-500" /> 4.9 Rating
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl font-bold">
                                    <MapPin className="w-4 h-4 text-zinc-500" /> Online Class
                                </div>
                            </div>
                        </div>

                        {/* Price Box */}
                        <div className="w-full md:w-64 bg-zinc-900 p-8 rounded-[2rem] text-white text-center shadow-2xl">
                            <p className="opacity-50 text-[10px] font-bold uppercase tracking-widest mb-2">Hourly Rate</p>
                            <div className="flex items-center justify-center gap-1 mb-6">
                                <span className="text-5xl font-black">${rate}</span>
                                <span className="text-lg opacity-70">/hr</span>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="w-full bg-orange-500 hover:bg-orange-600 transition-all active:scale-95 cursor-pointer text-white font-bold py-4 px-8 rounded-2xl"
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-10">
                        {/* Expertise */}
                        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center gap-3 mb-6">
                                <BookOpen className="w-6 h-6 text-orange-600" />
                                <h3 className="text-2xl font-black text-zinc-900 dark:text-white">Expertise</h3>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {subjects.length > 0 ? subjects.map((sub: string) => (
                                    <span key={sub} className="px-5 py-2.5 bg-orange-50 dark:bg-zinc-800 text-orange-700 dark:text-orange-400 rounded-xl text-sm font-bold border border-orange-100 dark:border-zinc-700">
                                        {sub}
                                    </span>
                                )) : <span className="text-zinc-400 italic">No subjects listed</span>}
                            </div>
                        </section>
                    </div>

                    {/* Schedule */}
                    <div className="space-y-8">
                        <section className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-xl">
                            <div className="flex items-center gap-3 mb-8">
                                <Calendar className="w-6 h-6 text-orange-600" />
                                <h3 className="text-2xl font-black text-zinc-900 dark:text-white">Schedule</h3>
                            </div>
                            <div className="space-y-4">
                                {availableDays.length > 0 ? (
                                    availableDays.map((day) => (
                                        <div key={day} className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 transition-all hover:border-orange-200">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="font-black uppercase text-xs tracking-widest text-orange-600">{day}</span>
                                                <Clock className="w-4 h-4 text-zinc-400" />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold bg-white dark:bg-zinc-900 px-4 py-2 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-700">
                                                    {availabilitySlots[day].startTime} — {availabilitySlots[day].endTime}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-zinc-500 text-center py-4">No schedule set.</p>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <BookingModal
                tutor={tutor}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
}