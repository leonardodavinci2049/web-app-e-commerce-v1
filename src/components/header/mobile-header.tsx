/**
 * MobileHeader Component
 * Simplified mobile header with logo and theme toggle only
 */

"use client";

import Image from "next/image";
import Link from "next/link";
import ModeToggle from "@/components/theme/mode-toggle";
import { envs } from "@/core/config/envs";

export default function MobileHeader() {
  return (
    <header className="bg-card border-b border-border py-3 px-4 md:hidden">
      <div className="flex items-center justify-between">
        {/* Logo only */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo/logo-header.png"
            alt={`${envs.NEXT_PUBLIC_COMPANY_NAME} Logo`}
            width={64}
            height={32}
            className="h-8 w-16"
          />
        </Link>

        {/* Theme Toggle */}
        <ModeToggle />
      </div>
    </header>
  );
}
