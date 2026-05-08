"use client";

import {
  UserPen,
  ClipboardList,
  LayoutDashboard,
  Users,
  CalendarCheck,
  ChartBarStacked,
  BookOpen,
  TimerReset,
  Gift,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarConfig = {
  admin: {
    title: "Admin Panel",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
      { label: "Total Users", icon: Users, href: "/total-users" },
      { label: "Total Bookings", icon: CalendarCheck, href: "/total-booking" },
      { label: "Manage category", icon: ChartBarStacked, href: "/manage-category" },
    ],
  },
  tutor: {
    title: "Tutor Menu",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
      { label: "My Bookings", icon: ClipboardList, href: "/my-bookings" },
      { label: "Availability", icon: TimerReset, href: "/availability" },
      { label: "Students Reviews", icon: Gift, href: "/students-reviews" },
      { label: "Tutor Profile", icon: UserPen, href: "/profile" },
    ],
  },
  student: {
    title: "Student Menu",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
      { label: "My Bookings", icon: BookOpen, href: "/my-bookings" },
    ],
  },
};

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6H10V10H6V6Z" fill="#F97316" />
    <path d="M14 6H18V10H14V6Z" fill="#F97316" />
    <path d="M6 14H10V18H6V14Z" fill="#F97316" />
    <path d="M14 14H18V18H14V14Z" fill="#F97316" fillOpacity="0.5" />
  </svg>
);

export const Sidebar1 = ({ userRole, ...props }: { userRole?: string; } & React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname();

  const normalizedRole = userRole?.toLowerCase() || "student";

  const currentConfig =
    sidebarConfig[normalizedRole as keyof typeof sidebarConfig] ||
    sidebarConfig.student;

  return (
    <Sidebar {...props}>
      <SidebarHeader className="py-4 mt-1 flex items-center px-6 border-b">
        <Link href="/" className="flex items-center gap-2 group">
          <LogoIcon />
          <span className="text-xl font-bold text-foreground">
            Skill Bridge
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {currentConfig.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className="h-11 px-6"
                    >
                      <Link href={item.href} className="flex items-center gap-3">
                        <item.icon className={`size-5 ${isActive ? "text-orange-500" : "text-muted-foreground"}`} />
                        <span className={`text-sm ${isActive ? "text-orange-600" : "font-medium"}`}>
                          {item.label}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};