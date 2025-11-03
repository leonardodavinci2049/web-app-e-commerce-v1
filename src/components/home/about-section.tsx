/**
 * AboutSection Component
 * Section about the company with certifications
 */

import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  const highlights = [
    "Mais de 15 anos no mercado",
    "Atendimento personalizado",
    "Entrega em todo o Brasil",
    "Garantia em todos os produtos",
  ];

  return (
    <section className="py-12 px-4 bg-card">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                15 anos de tradição
              </h2>
              <p className="text-muted-foreground mb-4">
                A CAIXAFECHADA é referência no mercado de ferramentas e
                equipamentos para construção. Nosso compromisso é oferecer
                produtos de qualidade com os melhores preços do mercado.
              </p>
              <p className="text-muted-foreground">
                Trabalhamos com as principais marcas do mercado e oferecemos
                atendimento especializado para pessoas físicas e empresas de
                todos os portes.
              </p>
            </div>

            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Conheça nossa história
            </Button>
          </div>

          {/* Image & Badge */}
          <div className="relative">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600"
                alt="Sobre a CAIXAFECHADA"
                fill
                className="object-cover"
              />
            </div>
            <Badge className="absolute bottom-4 right-4 bg-accent text-accent-foreground px-4 py-2 text-sm">
              Empresa confiável
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
