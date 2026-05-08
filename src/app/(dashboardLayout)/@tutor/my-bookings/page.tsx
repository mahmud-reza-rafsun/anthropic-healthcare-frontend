/* eslint-disable @typescript-eslint/no-explicit-any */
import MyBookingTable from "./MyBookingTable";
import { tutorsService } from "@/service/tutor.service";

export default async function TutorBookingsPage() {
    const response = await tutorsService.getMyStudentBookings();
    const bookings = Array.isArray(response?.data) ? response.data : [];
    const totalEarnings = bookings
        .filter((b: any) => b.status === "COMPLETED")
        .reduce((acc: number, curr: any) => acc + (curr.totalAmount || 0), 0);

    return (
        <div className="bg-white dark:bg-[#161617] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Student Bookings</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your incoming tuition requests and schedule.</p>
                </div>
                <div className="flex gap-x-5">
                    <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500">Total Earnings</p>
                        <p className="text-lg font-semibold text-green-500">${totalEarnings.toFixed(1)}</p>
                    </div>
                    <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500">Total Requests</p>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{bookings.length}</p>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-[#1c1c1d] text-[11px] uppercase text-gray-500 dark:text-gray-400 font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Student Info</th>
                            <th className="px-6 py-4">Subject</th>
                            <th className="px-6 py-4">Day</th>
                            <th className="px-6 py-4">Time</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {bookings.map((booking: any) => (
                            <MyBookingTable key={booking.id} booking={booking} />
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {bookings.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-50 dark:bg-orange-900/10 text-orange-500 mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">No student requests found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}