/**
 * Quick Actions Component
 * Grid of quick action buttons for common tasks
 */

import {
  Headphones,
  RotateCcw,
  Search,
  ShoppingCart,
  Tag,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import type { QuickAction } from "@/types/account";

interface QuickActionsProps {
  actions: QuickAction[];
}

// Icon mapping
const iconMap = {
  "shopping-cart": ShoppingCart,
  search: Search,
  "rotate-ccw": RotateCcw,
  tag: Tag,
  wrench: Wrench,
  headphones: Headphones,
};

// Color mapping
const colorMap: Record<string, string> = {
  "text-blue-500": "text-blue-500 dark:text-blue-400",
  "text-green-500": "text-green-500 dark:text-green-400",
  "text-orange-500": "text-orange-500 dark:text-orange-400",
  "text-red-500": "text-red-500 dark:text-red-400",
  "text-purple-500": "text-purple-500 dark:text-purple-400",
  "text-indigo-500": "text-indigo-500 dark:text-indigo-400",
};

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h2 className="text-lg font-bold mb-1">Ações Rápidas</h2>
      <p className="text-sm text-muted-foreground mb-5">
        Acesso rápido às principais funcionalidades
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
        {actions.map((action) => {
          const IconComponent = iconMap[action.icon as keyof typeof iconMap];
          const colorClass = colorMap[action.iconColor] || action.iconColor;

          return (
            <Link
              key={action.id}
              href={action.href}
              className="flex flex-col items-center justify-center p-4 bg-muted hover:bg-accent rounded-lg transition-colors group"
            >
              {IconComponent && (
                <div className="mb-2">
                  <IconComponent className={`h-8 w-8 ${colorClass}`} />
                </div>
              )}
              <p className="text-sm font-semibold text-center mb-1">
                {action.title}
              </p>
              <p className="text-xs text-muted-foreground text-center">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
