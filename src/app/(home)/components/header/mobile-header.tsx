/**
 * MobileHeader Component
 * Mobile header with navigation shortcuts, theme toggle and search
 */

"use client";

import { ChevronDown, Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type ChangeEvent, type FormEvent, useCallback, useState } from "react";
import ModeToggle from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { envs } from "@/core/config/envs";
import { navigationItems } from "@/data/mock-data";
import { useTableSearch } from "../table/table-search-context";

export default function MobileHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { inputValue, setInputValue, submitSearch, clearSearch } =
    useTableSearch();

  const handleSearchSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      submitSearch();
    },
    [submitSearch],
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (value === "") {
        clearSearch();
        return;
      }

      setInputValue(value);
    },
    [clearSearch, setInputValue],
  );

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border py-3 px-4 md:hidden">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Hamburger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 border-border shadow-sm hover:bg-accent h-10 w-10"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px]">
              <SheetHeader>
                <SheetTitle className="text-primary text-left">
                  Menu de Navegação
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6">
                <ul className="space-y-1">
                  {navigationItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className="flex items-center justify-between px-4 py-3 hover:bg-muted rounded-lg transition-colors font-medium"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>{item.label}</span>
                        {item.hasDropdown && (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Link>
                      {/* Dropdown items for mobile */}
                      {item.hasDropdown && item.dropdownItems && (
                        <ul className="ml-4 mt-2 space-y-1 border-l-2 border-muted pl-4">
                          {item.dropdownItems.map((subItem) => (
                            <li key={subItem.id}>
                              <Link
                                href={subItem.href}
                                className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo and Company Name */}
          <div className="flex items-center gap-2 flex-1 justify-center">
            <Link href="/" className="shrink-0">
              <Image
                src="/images/logo/logo-header.png"
                alt="Logo"
                width={64}
                height={32}
                className="h-8 w-16"
              />
            </Link>
            <h1 className="text-lg font-bold text-primary">
              {envs.NEXT_PUBLIC_COMPANY_NAME}
            </h1>
          </div>

          {/* Theme Toggle */}
          <ModeToggle />
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <Input
            type="search"
            placeholder="O que você procura?"
            value={inputValue}
            onChange={handleInputChange}
            className="h-11 w-full rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            type="submit"
            className="h-11 px-4 rounded-l-none bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>
        </form>
      </div>
    </header>
  );
}
