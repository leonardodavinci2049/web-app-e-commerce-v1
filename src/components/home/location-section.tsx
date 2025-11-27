/**
 * LocationSection Component
 * Section with store location and contact information
 */

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LocationSection() {
  return (
    <section className="py-12 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Visite Nossa Loja Física
          </h2>
          <p className="text-muted-foreground">
            Estamos prontos para atendê-lo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Map Placeholder */}
          <div className="bg-muted rounded-lg aspect-video md:aspect-square flex items-center justify-center border border-border">
            <div className="text-center p-8">
              <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">
                Mapa interativo da localização
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <h3 className="text-xl font-bold text-foreground">
              Informações de Contato
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-foreground">Endereço</p>
                  <p className="text-muted-foreground">
                    Rua das Ferramentas, 123
                    <br />
                    Centro - São Paulo/SP
                    <br />
                    CEP: 01000-000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-foreground">
                    Telefone e WhatsApp
                  </p>
                  <p className="text-primary font-medium">(16) 99277-0660</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-foreground">
                    Horário de Funcionamento
                  </p>
                  <p className="text-muted-foreground">
                    Segunda a Sexta: 8h às 18h
                    <br />
                    Sábado: 8h às 12h
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-foreground">E-mail</p>
                  <p className="text-muted-foreground">
                    vendas@caixafechada.com.br
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Como Chegar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
