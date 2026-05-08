/* eslint-disable @typescript-eslint/no-explicit-any */
import { studentService } from "@/service/student.service";
import MyBookingTable from "./MyBookingTable";

export default async function BookingHistoryPage() {
    const response = await studentService.getMyTutorBookings();
    const bookings = Array.isArray(response?.data) ? response.data : [];
    const totalSpent = bookings
        .filter((b: any) => b.status === "COMPLETED")
        .reduce((acc: number, curr: any) => acc + (curr.totalAmount || 0), 0);

    return (
        <div className="bg-white dark:bg-[#161617] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Booking History</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">View and manage your tutor bookings and sessions.</p>
                </div>

                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-100 dark:border-orange-800">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-orange-600">Total Spent</p>
                        <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">${totalSpent}</p>
                    </div>
                    <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-800">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-gray-500">Total Bookings</p>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{bookings.length}</p>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-[#1c1c1d] text-[11px] uppercase text-gray-500 dark:text-gray-400 font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Tutor</th>
                            <th className="px-6 py-4">Subject</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Booking Day</th>
                            <th className="px-6 py-4">Booking Time</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">No bookings found in your history.</p>
                    </div>
                )}
            </div>
        </div>
    );
}