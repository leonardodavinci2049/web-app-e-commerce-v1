/**
 * Dashboard Stats Component
 * Displays key metrics cards for the customer dashboard
 */

import { Box, Package, TrendingUp, Wallet } from "lucide-react";
import type { DashboardStat } from "@/types/account";

interface DashboardStatsProps {
  stats: DashboardStat[];
}

// Icon mapping
const iconMap = {
  package: Package,
  box: Box,
  "trending-up": TrendingUp,
  wallet: Wallet,
};

// Color mapping
const colorMap: Record<string, string> = {
  "text-blue-500": "text-blue-500 dark:text-blue-400",
  "text-green-500": "text-green-500 dark:text-green-400",
  "text-purple-500": "text-purple-500 dark:text-purple-400",
  "text-orange-500": "text-orange-500 dark:text-orange-400",
};

export default function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
        const colorClass = colorMap[stat.iconColor] || stat.iconColor;

        return (
          <div
            key={stat.id}
            className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <div className="flex items-center gap-1 mb-1">
                  {IconComponent && (
                    <IconComponent className={`h-4 w-4 ${colorClass}`} />
                  )}
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
