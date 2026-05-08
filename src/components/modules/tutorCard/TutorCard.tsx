"use client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import BookingModal from "@/app/(CommonLayout)/doctors/bookingModal/BookingModal";

export function TutorCard({ tutor }: { tutor: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Card className="w-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all duration-300 overflow-hidden">
            <CardHeader className="space-y-1">
                <div className="flex justify-between items-start">
                    <Badge className="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 border-none">
                        {tutor.categoryName}
                    </Badge>
                    <div className="text-lg font-bold text-orange-500">
                        ${tutor.hourlyRate}<span className="text-xs text-muted-foreground">/hr</span>
                    </div>
                </div>
                {/* Subject name as title */}
                <h3 className="text-lg font-bold dark:text-zinc-100 line-clamp-1">{tutor.subject}</h3>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-zinc-100">
                        {tutor.user?.image ? (
                            <Image src={tutor.user.image} alt={tutor.user.name} fill className="object-cover" />
                        ) : (
                            <User className="w-full h-full p-2 text-zinc-400" />
                        )}
                    </div>
                    <div>
                        <p className="text-sm font-semibold">{tutor.user?.name}</p>
                        <p className="text-[10px] text-zinc-500">{tutor.user?.email}</p>
                    </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 min-h-[40px]">
                    {tutor.bio}
                </p>

                <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Clock className="w-3 h-3 text-orange-500" />
                    <span>Instant Booking Available</span>
                </div>
            </CardContent>

            <CardFooter className="flex gap-2">
                <Button onClick={() => setIsModalOpen(true)} className="flex-1 bg-orange-500 hover:bg-orange-600 text-white border-none cursor-pointer">
                    Book Now
                </Button>
                <Link href={`/tutors/${tutor.id}`} className="flex-1">
                    <Button variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500 cursor-pointer">
                        Details
                    </Button>
                </Link>
            </CardFooter>

            <BookingModal
                tutor={tutor}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </Card>
    );
}