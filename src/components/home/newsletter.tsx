/**
 * Newsletter Component
 * Newsletter subscription section with CTA
 */

"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("E-mail cadastrado com sucesso!");
      setEmail("");
    } else {
      toast.error("Por favor, insira um e-mail válido");
    }
  };

  return (
    <section className="bg-primary text-primary-foreground py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Fique por dentro das novidades!
          </h2>
          <p className="text-lg opacity-90">
            Cadastre-se e receba ofertas exclusivas
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-primary-foreground text-foreground border-border"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              CADASTRAR
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
