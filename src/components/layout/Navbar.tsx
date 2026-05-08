"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { GlobalUser } from "@/utils/GlobalUser";
import { DarkModeToggle } from "@/utils/DarkModeToggle";

interface NavbarProps {
  user?: any;
  menu?: { title: string; url: string }[];
  auth?: {
    login: { title: string; url: string };
    signup: { title: string; url: string };
  };
}

export const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 6H14V10H18V14H14V18H10V14H6V10H10V6Z"
      fill="#3B82F6"
    />
  </svg>
);


export const Navbar = ({
  user,
  menu = [
    { title: "Home", url: "/" },
    { title: "Doctors", url: "/doctors" },
    { title: "Dashboard", url: "/dashboard" },
    { title: "Profile", url: "/my-profile" },
    { title: "About", url: "/about" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Register", url: "/register" },
  },
}: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
            <LogoIcon />
            <span className="text-xl font-bold text-foreground group-hover:text-blue-500 transition-colors">
              Anthropic Healthcare
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1 bg-muted/50 p-1 rounded-full border border-blue-500/10">
            {menu.map((item) => {
              const isActive = pathname === item.url;
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={`inline-flex h-9 px-5 items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ease-in-out
                    ${isActive ? "text-blue-500 font-bold" : "text-muted-foreground hover:text-blue-500"}`}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {/* Direct click dark mode toggle */}
            <DarkModeToggle />

            {user ? (
              <GlobalUser user={user} />
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href={auth.login.url}
                  className="rounded-lg font-semibold px-6 py-2.5 text-sm bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 hover:bg-blue-500/20 dark:hover:bg-blue-500/30 border-none transition-colors"
                >
                  {auth.login.title}
                </Link>
                <Link
                  href={auth.signup.url}
                  className="rounded-lg font-semibold text-sm px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white border-none shadow-md shadow-blue-500/20 transition-all transform hover:scale-105 active:scale-95"
                >
                  {auth.signup.title}
                </Link>
              </div>
            )}
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <DarkModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-blue-500"
            >
              {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-background border-b p-4 space-y-2 shadow-xl animate-in slide-in-from-top-5 duration-200">
          {menu.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className={`block px-4 py-2 text-base font-medium rounded-md transition-colors 
                ${pathname === item.url ? "text-blue-500 font-bold bg-blue-50/50 dark:bg-blue-950/10" : "hover:text-blue-500 hover:bg-accent"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}
          <div className="pt-4 mt-2 border-t space-y-2">
            {user ? (
              <>
                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-base font-medium hover:bg-accent rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Button
                  onClick={handleLogout}
                  disabled={isLoading}
                  variant="destructive"
                  className="w-full justify-center rounded-lg"
                >
                  {isLoading ? "Logging out..." : "Logout"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="secondary"
                  className="w-full justify-center rounded-lg px-6 py-2.5 bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 border-none hover:bg-blue-500/20 dark:hover:bg-blue-500/30"
                >
                  <Link href={auth.login.url} onClick={() => setIsMenuOpen(false)}>
                    {auth.login.title}
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full justify-center rounded-lg px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white border-none shadow-md shadow-blue-500/20"
                >
                  <Link href={auth.signup.url} onClick={() => setIsMenuOpen(false)}>
                    {auth.signup.title}
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};