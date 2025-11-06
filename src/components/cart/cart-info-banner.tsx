"use client";

/**
 * Cart Info Banner Component
 * Informational banners for cart page
 */

import { AlertCircle, Package } from "lucide-react";

export default function CartInfoBanner() {
  return (
    <div className="space-y-3">
      {/* Stock Warning */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
              💡 <strong>Dica:</strong> Todos os preços exibidos são valores
              especiais para atacadistas.
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Package className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">
              📦 Produtos com estoque garantido para entregas em até 3 dias
              úteis.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
