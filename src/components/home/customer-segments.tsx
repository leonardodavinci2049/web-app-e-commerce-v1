/**
 * CustomerSegments Component
 * Section displaying different customer types
 */

import { Briefcase, Building, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { customerSegments } from "@/data/mock-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  user: User,
  briefcase: Briefcase,
  building: Building,
};

export default function CustomerSegments() {
  return (
    <section className="py-12 px-4 bg-muted">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Departamentos dos Clientes
          </h2>
          <p className="text-muted-foreground">
            Soluções personalizadas para cada tipo de cliente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customerSegments.map((segment) => {
            const Icon = iconMap[segment.icon] || User;
            return (
              <div
                key={segment.id}
                className="bg-card border border-border rounded-lg p-6 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {segment.title}
                  </h3>
                </div>
                <p className="text-muted-foreground">{segment.description}</p>
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Link href={segment.ctaLink}>{segment.ctaText}</Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
