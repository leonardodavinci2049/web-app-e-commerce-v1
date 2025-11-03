/**
 * DepartmentsNav Component
 * Navigation grid for product departments/categories
 */

import {
  Drill,
  Droplet,
  Factory,
  Paintbrush,
  Shield,
  Wrench as ToolIcon,
  Wrench,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { categories } from "@/data/mock-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  drill: Drill,
  wrench: Wrench,
  shield: Shield,
  zap: Zap,
  droplet: Droplet,
  tool: ToolIcon,
  paintbrush: Paintbrush,
  factory: Factory,
};

export default function DepartmentsNav() {
  return (
    <section className="py-12 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Navegue por departamentos
          </h2>
          <p className="text-muted-foreground">
            Encontre exatamente o que você precisa
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 mb-6">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon] || ToolIcon;
            return (
              <Link
                key={category.id}
                href={category.href}
                className="bg-card border border-border rounded-lg p-6 hover:bg-muted transition-all hover:shadow-md group"
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <span className="font-medium text-sm text-foreground">
                    {category.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="#todos-departamentos"
            className="text-primary hover:underline font-medium"
          >
            Ver todos os departamentos →
          </Link>
        </div>
      </div>
    </section>
  );
}
