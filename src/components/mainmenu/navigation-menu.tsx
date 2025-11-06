/**
 * NavigationMenu Component
 * Horizontal navigation menu with dropdown for departments
 */

"use client";

import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navigationItems } from "@/data/mock-data";

export default function NavigationMenu({
  hideOnMobile = false,
}: {
  hideOnMobile?: boolean;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={`bg-primary text-primary-foreground sticky top-0 z-50 ${hideOnMobile ? "hidden md:block" : ""}`}
    >
      <div className="container mx-auto max-w-7xl px-4">
        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center justify-center gap-1 py-3">
          {navigationItems.map((item) => (
            <li
              key={item.id}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.id)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 font-bold text-sm hover:bg-primary/90 rounded transition-colors"
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
              </Link>

              {/* Dropdown Mega Menu */}
              {item.hasDropdown &&
                openDropdown === item.id &&
                item.dropdownItems && (
                  <div className="absolute top-full left-0 mt-1 w-[600px] bg-popover text-popover-foreground border border-border rounded-lg shadow-lg p-4 z-50">
                    <div className="grid grid-cols-3 gap-4">
                      {item.dropdownItems.map((category) => (
                        <Link
                          key={category.id}
                          href={category.href}
                          className="flex flex-col gap-1 p-2 hover:bg-muted rounded transition-colors"
                        >
                          <span className="font-medium text-sm">
                            {category.name}
                          </span>
                          {category.description && (
                            <span className="text-xs text-muted-foreground">
                              {category.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                    <Link
                      href="#todos-departamentos"
                      className="block mt-4 pt-4 border-t border-border text-center text-sm text-primary hover:underline"
                    >
                      Ver todos os departamentos
                    </Link>
                  </div>
                )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center justify-between py-3">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-primary">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-4">
                <ul className="space-y-2">
                  {navigationItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className="block px-4 py-2 hover:bg-muted rounded transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
          <span className="font-bold text-sm">MENU</span>
        </div>
      </div>
    </nav>
  );
}
