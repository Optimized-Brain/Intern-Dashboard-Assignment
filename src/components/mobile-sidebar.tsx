
"use client";

import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Sidebar } from "@/components/sidebar";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function MobileSidebar() {
    const [isMounted, setIsMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

  return (
    <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="pr-4 hover:opacity-75 transition" onClick={() => setIsOpen(true)}>
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64" showCloseButton={false}>
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <Sidebar isMinimized={false} onToggle={() => {}} closeSidebar={() => setIsOpen(false)} />
            </SheetContent>
        </Sheet>
    </div>
  );
}
