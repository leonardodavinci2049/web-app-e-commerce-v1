"use client";

import { Heart, MessageCircle, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ProductActionsProps {
  productName: string;
  productPrice: number;
}

/**
 * Product Actions Component (Client-side)
 * Handles add to cart, whatsapp, favorites and quantity
 */
export function ProductActions({
  productName,
  productPrice,
}: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    toast.success(`${quantity}x ${productName} adicionado ao carrinho!`, {
      description: `Total: R$ ${(productPrice * quantity).toFixed(2).replace(".", ",")}`,
    });
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no produto: ${productName}\nPreço: R$ ${productPrice.toFixed(2).replace(".", ",")}\nQuantidade: ${quantity}`,
    );
    const whatsappUrl = `https://wa.me/5511999999999?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
    );
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="space-y-4 rounded-lg border bg-card p-6">
      {/* Guarantee and Benefits */}
      <div className="space-y-3 border-b pb-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
            ✓
          </div>
          <span>Frete grátis para pedidos acima de R$ 199</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            ✓
          </div>
          <span>Garantia de 30 dias</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
            ✓
          </div>
          <span>Recebimento em até 10 dias úteis</span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="space-y-2">
        <label htmlFor="quantity" className="text-sm font-medium">
          Quantidade:
        </label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={decrementQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="flex h-10 w-20 items-center justify-center rounded-md border bg-muted font-semibold">
            {quantity}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={incrementQuantity}
            disabled={quantity >= 99}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <Button
          size="lg"
          className="w-full text-base font-semibold"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Adicionar ao Carrinho
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-full border-green-600 text-base font-semibold text-green-600 hover:bg-green-50 hover:text-green-700"
          onClick={handleWhatsAppClick}
        >
          <MessageCircle className="mr-2 h-5 w-5" />
          Comprar pelo WhatsApp
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="w-full"
          onClick={handleToggleFavorite}
        >
          <Heart
            className={`mr-2 h-5 w-5 ${
              isFavorite ? "fill-red-500 text-red-500" : ""
            }`}
          />
          {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
        </Button>
      </div>
    </div>
  );
}
