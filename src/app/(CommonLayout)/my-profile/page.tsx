/* eslint-disable @typescript-eslint/no-explicit-any */
import { userService } from "@/service/user.service";
import UserProfile from "@/utils/profile/Profile";

export default async function ProfilePage() {
    const sessionResponse = await userService.getSession();
    const user = sessionResponse?.data?.user || undefined;

    if (!user) return <div className="p-10 text-center text-gray-500">User not found.</div>;

    return (
        <div className="p-4 md:p-8">
            <UserProfile user={user} />
        </div>
    );
}