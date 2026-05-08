"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    LayoutDashboard,
    User as UserIcon,
    LogOut
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

interface GlobalUserMenuProps {
    user: {
        name?: string | null;
        email?: string | null;
        image?: string | null;
        role?: string | null;
    };
}

export function GlobalUser({ user }: GlobalUserMenuProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Logged out successfully");
                        window.location.href = "/";
                    },
                },
            });
        } catch (error) {
            toast.error("Failed to logout");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative cursor-pointer h-10 w-10 rounded-full border-2 border-orange-500/20 p-0 hover:bg-orange-500/10 transition-transform active:scale-95 focus-visible:ring-0"
                >
                    <Avatar>
                        <AvatarImage
                            className="object-cover"
                            src={user.image || ""}
                            alt={user.name || "User"}
                        />
                        <AvatarFallback className="bg-orange-500 text-white font-bold">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60 mt-2" align="end" sideOffset={8}>
                <DropdownMenuLabel className="p-3">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold text-foreground">{user.name}</p>
                        <p className="text-xs text-gray-700 dark:text-gray-400">{user.role}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className="cursor-pointer focus:bg-orange-50 focus:text-orange-600 dark:focus:bg-orange-950/20">
                    <Link href="/dashboard" className="flex items-center w-full px-2 py-1.5">
                        <LayoutDashboard className="mr-3 h-4 w-4" />
                        <span>Dashboard</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild className="cursor-pointer focus:bg-orange-50 focus:text-orange-600 dark:focus:bg-orange-950/20">
                    <Link href="/dashboard/profile" className="flex items-center w-full px-2 py-1.5">
                        <UserIcon className="mr-3 h-4 w-4" />
                        <span>Profile Settings</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="flex items-center w-full px-2 py-1.5 text-red-500 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/20 cursor-pointer"
                    disabled={isLoading}
                    onClick={handleLogout}
                >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>{isLoading ? "Logging out..." : "Logout"}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}