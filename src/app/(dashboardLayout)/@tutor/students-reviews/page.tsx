import { tutorsService } from "@/service/tutor.service";
import ReviewTableRow from "./ReviewTableRow";

export default async function TutorReviewPage() {
    const response = await tutorsService.getStudentReviews();
    const bookings = Array.isArray(response?.data) ? response.data : [];
    console.log(bookings)
    return (
        <div className="bg-white dark:bg-[#161617] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Review History</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage and view feedback from all completed sessions.</p>
                </div>

                <div className="flex gap-3">
                    <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-blue-600">Total Reviewed</p>
                        <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                            {bookings.filter((b: any) => b.review).length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-[#1c1c1d] text-[11px] uppercase text-gray-500 dark:text-gray-400 font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Tutor Details</th>
                            <th className="px-6 py-4">Student Details</th>
                            <th className="px-6 py-4">Rating & Feedback</th>
                            <th className="px-6 py-4 text-center">Schedule</th>
                            <th className="px-6 py-4 text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {bookings.length > 0 ? (
                            bookings.map((booking: any) => (
                                <ReviewTableRow key={booking.id} booking={booking} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-20">
                                    <p className="text-gray-500 dark:text-gray-400 italic">No bookings or reviews found.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}