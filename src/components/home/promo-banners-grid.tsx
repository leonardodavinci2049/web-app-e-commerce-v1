/**
 * PromoBannersGrid Component
 * Grid of promotional banners with different themes
 */

import { CreditCard, Store, Truck, Zap } from "lucide-react";
import Link from "next/link";
import { promoBanners } from "@/data/mock-data";

export default function PromoBannersGrid() {
  const icons = [Zap, Truck, CreditCard, Store];

  return (
    <section className="py-12 px-4 bg-muted">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {promoBanners.map((banner, index) => {
            const Icon = icons[index];
            const bgColorClass = {
              primary: "bg-primary text-primary-foreground",
              secondary: "bg-secondary text-secondary-foreground",
              accent: "bg-accent text-accent-foreground",
              muted: "bg-card text-foreground border border-border",
            }[banner.type];

            return (
              <Link
                key={banner.id}
                href={banner.ctaLink}
                className={`${bgColorClass} rounded-lg p-6 hover:shadow-lg transition-all group`}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <Icon className="h-10 w-10 opacity-80 group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">{banner.title}</h3>
                    <p className="text-sm opacity-90">{banner.subtitle}</p>
                  </div>
                  <span className="text-xs font-medium underline">
                    {banner.ctaText}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
