/**
 * PromoBanner Component
 * Promotional banner with primary background
 */

import { Button } from "@/components/ui/button";

export default function PromoBanner() {
  return (
    <section className="bg-primary text-primary-foreground py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          {/* Logo/Brand Mark */}
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
              <span className="text-4xl font-bold">M</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              NOVIDADES toda semana!
            </h2>
            <p className="text-lg opacity-90">
              Cadastre-se e receba ofertas exclusivas
            </p>
          </div>

          {/* CTA Button */}
          <Button size="lg" className="bg-card text-primary hover:bg-card/90">
            QUERO SABER
          </Button>
        </div>
      </div>
    </section>
  );
}
