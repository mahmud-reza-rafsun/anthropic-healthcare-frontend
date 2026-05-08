import { Sidebar1 } from "@/components/modules/sidebar/sidebar1";
export const dynamic = "force-dynamic";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { userService } from "@/service/user.service";
import { Roles } from "@/constants/role";
import { ModeToggle } from "@/utils/ModeToggle";
import { GlobalUser } from "@/utils/GlobalUser";

export default async function DashboardLayout({
    admin,
    student,
    tutor
}: {
    admin: React.ReactNode;
    student: React.ReactNode;
    tutor: React.ReactNode;
}) {

    const session = await userService.getSession();
    const user = session?.data?.user || null;
    const userRole = session?.data?.user ? session.data.user.role : null;


    return (
        <SidebarProvider>
            <Sidebar1 userRole={userRole} />
            <SidebarInset>
                {/* 2. Header */}
                <header className="sticky top-0 z-10 bg-background flex h-16 items-center gap-2 px-4 border-b">
                    {/* Left Side: Sidebar and Separator */}
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />

                    {/* Middle/Left: Breadcrumb */}
                    <div className="flex-1">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <span className="text-sm font-medium">Dashboard</span>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    {/* Right Side: Mode Toggle */}
                    <div className="mr-52 flex items-center gap-3">
                        <ModeToggle />
                        <GlobalUser user={user} />
                    </div>
                </header>

                {/* 3. Main Content */}
                <main className="p-4 relative pt-6 min-h-[calc(100vh-4rem)] gradientBg">
                    {userRole === Roles.student ? student : userRole === Roles.admin ? admin : tutor}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}