
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Trophy,
  ChevronLeft,
  Sun,
  Moon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/components/theme-provider";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Leaderboard",
    icon: Trophy,
    href: "/leaderboard",
  },
];

interface SidebarProps {
  isMinimized: boolean;
  onToggle: () => void;
  closeSidebar?: () => void;
  className?: string;
}

export function Sidebar({ isMinimized, onToggle, closeSidebar, className }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const onLogout = () => {
    router.push("/");
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLinkClick = () => {
    if (closeSidebar) {
      closeSidebar();
    }
  }

  return (
    <div
      className={cn(
        "h-screen flex flex-col justify-between transition-all duration-300 ease-in-out border-r bg-card/50 shadow-md relative",
        isMinimized ? "w-20" : "w-64",
        className
      )}
    >
      <div>
        <div className={cn(
          "flex items-center p-4",
          isMinimized ? "justify-center" : "justify-start"
          )}>
          <GraduationCap className="h-8 w-8 text-primary" />
          <h1
            className={cn(
              "text-2xl font-bold font-headline ml-3 text-foreground transition-opacity duration-300",
              isMinimized && "sr-only"
            )}
          >
            OurInterns
          </h1>
        </div>
        <div className="flex flex-col w-full p-4">
          <TooltipProvider delayDuration={0}>
            {routes.map((route) => (
              <Tooltip key={route.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={route.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "flex items-center w-full p-3 my-1 text-sm font-medium rounded-lg transition-colors group",
                      isMinimized ? "justify-center" : "justify-start",
                      pathname === route.href
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    )}
                  >
                    <route.icon className={cn("h-5 w-5 transition-transform group-hover:translate-x-1", !isMinimized && "mr-3")} />
                    <span className={cn("transition-opacity", isMinimized && "sr-only")}>
                      {route.label}
                    </span>
                  </Link>
                </TooltipTrigger>
                {isMinimized && (
                  <TooltipContent side="right">
                    <p>{route.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
      <div className="p-4 space-y-2">
           <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                 <Button
                    onClick={toggleTheme}
                    variant="ghost"
                    size={isMinimized ? "icon" : "default"}
                    className={cn(
                      "w-full flex group",
                      isMinimized ? "justify-center" : "justify-start"
                    )}
                  >
                  {theme === 'dark' ? <Sun className={cn("h-5 w-5 transition-transform group-hover:translate-x-1", !isMinimized && "mr-3")} /> : <Moon className={cn("h-5 w-5 transition-transform group-hover:translate-x-1", !isMinimized && "mr-3")}/>}
                  <span className={cn("transition-opacity", isMinimized && "sr-only")}>
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
                </Button>
              </TooltipTrigger>
              {isMinimized && (
                <TooltipContent side="right">
                  <p>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={onLogout}
                  size={isMinimized ? "icon" : "default"}
                  className={cn(
                    "w-full group",
                    isMinimized ? "justify-center" : "justify-start"
                  )}
                >
                  <LogOut className={cn("h-5 w-5 transition-transform group-hover:translate-x-1", !isMinimized && "mr-3")} />
                  <span className={cn("transition-opacity", isMinimized && "sr-only")}>Logout</span>
                </Button>
              </TooltipTrigger>
              {isMinimized && (
                <TooltipContent side="right">
                  <p>Logout</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
        <Button
          onClick={onToggle}
          size="icon"
          variant="outline"
          className="absolute hidden md:flex -right-5 top-1/2 h-10 w-10 rounded-full"
        >
          <ChevronLeft
            className={cn(
              "h-6 w-6 transition-transform duration-300",
              isMinimized && "rotate-180"
            )}
          />
        </Button>
      </div>
  );
}
