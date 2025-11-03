/**
 * Cart Coupon Component (Client Component)
 * Coupon/discount code input
 */

"use client";

import { HelpCircle, Tag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CartCoupon() {
  const [couponCode, setCouponCode] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleApplyCoupon = () => {
    // TODO: Implement coupon application
    console.log("Apply coupon:", couponCode);
  };

  const handleAccessCoupons = () => {
    // TODO: Implement coupons list
    console.log("Access coupons");
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 w-full text-left"
      >
        <Tag className="h-5 w-5 text-primary" />
        <span className="font-medium">cupom de desconto</span>
        <HelpCircle className="h-4 w-4 text-muted-foreground ml-auto" />
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="INFORME O CÓDIGO"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              className="flex-1 uppercase"
            />
            <Button
              onClick={handleApplyCoupon}
              disabled={!couponCode}
              className="bg-primary hover:bg-primary/90"
            >
              aplicar
            </Button>
          </div>

          <button
            type="button"
            onClick={handleAccessCoupons}
            className="text-sm text-primary hover:underline"
          >
            acessar meus cupons
          </button>

          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded p-3">
            <div className="flex items-start gap-2">
              <span className="text-lg">💡</span>
              <p className="text-xs text-amber-900 dark:text-amber-200">
                <strong>Dica:</strong> Cupons são aplicados automaticamente no
                menor valor. Alguns cupons não podem ser combinados.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
