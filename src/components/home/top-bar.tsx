/**
 * TopBar Component
 * Top navigation bar with customer service link and theme toggle
 */

import Link from "next/link";
import ModeToggle from "@/components/theme/mode-toggle";

export default function TopBar() {
  return (
    <div className="bg-muted text-muted-foreground py-2 px-4 border-b border-border">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        <Link
          href="#atendimento"
          className="text-sm hover:text-foreground transition-colors"
        >
          Atendimento ao Cliente
        </Link>

        <div className="text-sm font-medium">Televendas: (16) 99277-0660</div>

        <ModeToggle />
      </div>
    </div>
  );
}
