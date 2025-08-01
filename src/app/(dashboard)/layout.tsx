
"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { MobileSidebar } from "@/components/mobile-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar
          isMinimized={isSidebarMinimized}
          onToggle={toggleSidebar}
          className="hidden md:flex fixed"
        />
        <main
          className={cn(
            "flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out",
            isSidebarMinimized ? "md:ml-20" : "md:ml-64"
          )}
        >
          <MobileSidebar />
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
