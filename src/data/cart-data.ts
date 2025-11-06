/**
 * Mock Cart Data
 * Fictional data for shopping cart demonstration
 */

import type { CartItem } from "@/types/cart";

// Mock cart items
export const mockCartItems: CartItem[] = [
  {
    id: "cart-001",
    productId: "54661",
    name: "ADAPTADOR 3 EM 1 USB-C 3.1 TYPE-C PARA HDMI 4K USB 3.0 JC-TYC-HM31 F3",
    sku: "54661",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400",
    price: 50.0,
    quantity: 1,
    stock: 1,
    maxQuantity: 1,
  },
  {
    id: "cart-002",
    productId: "33457",
    name: "ADAPTADOR BLUETOOTH BTMR 6317 INOVA",
    sku: "33457",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400",
    price: 8.0,
    quantity: 1,
    stock: 2,
    maxQuantity: 2,
  },
];

// Calculate cart summary
export function calculateCartSummary(items: CartItem[]) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const hasItems = items.length > 0;

  // Free shipping for orders above R$ 299 (only when there are items)
  const shipping = !hasItems ? 0 : subtotal >= 299 ? 0 : 14.5;

  // Mock discount calculation
  const discount = 0;

  const total = hasItems ? subtotal + shipping - discount : 0;

  // Calculate installments (up to 12x without interest)
  const installments =
    total > 0
      ? {
          count: 12,
          value: total / 12,
        }
      : undefined;

  return {
    subtotal,
    shipping,
    discount,
    total,
    itemCount,
    installments,
  };
}

// Delivery information
export const deliveryInfo = {
  estimate: "normal até 3 dias úteis",
  guaranteed: true,
  messages: [
    "Entrega garantida em até 3 dias úteis",
    "Preços especiais para atacadistas",
    "Suporte especializado",
  ],
};

// Available coupons for demonstration
export const availableCoupons = [
  {
    code: "PRIMEIRA10",
    discount: 10,
    type: "percentage" as const,
    description: "10% de desconto na primeira compra",
  },
  {
    code: "FRETE20",
    discount: 20,
    type: "fixed" as const,
    description: "R$ 20 de desconto no frete",
  },
];
