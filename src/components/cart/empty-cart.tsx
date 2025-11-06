"use client";

/**
 * Empty Cart Component
 * Display when cart is empty
 */

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyCart() {
  return (
    <div className="bg-card border border-border rounded-lg p-8 md:p-12 text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-muted rounded-full p-6">
          <ShoppingCart className="h-16 w-16 text-muted-foreground" />
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-3">Seu carrinho está vazio</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Navegue pelo nosso catálogo e adicione produtos ao seu carrinho para
        começar suas compras.
      </p>

      <Button size="lg" asChild className="min-w-[200px]">
        <Link href="/">Começar a Comprar</Link>
      </Button>
    </div>
  );
}
