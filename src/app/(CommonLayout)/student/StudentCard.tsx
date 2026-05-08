import { Calendar, Clock, CheckCircle2, Phone, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// --- Skeleton Loader ---
export const SuccessStudentSkeleton = () => (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 animate-pulse">
        <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
                <Skeleton className="w-14 h-14 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-16 rounded-full" />
                </div>
            </div>
            <Skeleton className="h-6 w-12" />
        </div>
        <div className="grid grid-cols-2 gap-3 py-4 border-y border-zinc-100 dark:border-zinc-800 my-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
        </div>
        <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
        </div>
    </div>
);

// --- Main Success Student Card ---
export const SuccessStudentCard = ({ data }: { data: any }) => {
    console.log(data)
    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <img
                            src={data.student.image}
                            alt={data.student.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-orange-500 p-0.5"
                        />
                        {/* Status Indicator */}
                        <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white dark:border-zinc-900 w-4 h-4 rounded-full shadow-sm"></div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-100 group-hover:text-orange-600 transition-colors line-clamp-1">
                            {data.student.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 uppercase tracking-wider">
                            <CheckCircle2 size={12} /> {data.status}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-black text-orange-600">${data.totalAmount}</p>
                    <p className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">Paid</p>
                </div>
            </div>

            {/* Session Info Only */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-4">
                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                    <Calendar size={14} className="text-orange-500" />
                    <span>{data.day}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                    <Clock size={14} className="text-orange-500" />
                    <span>{data.slot}</span>
                </div>
            </div>
        </div>
    );
};