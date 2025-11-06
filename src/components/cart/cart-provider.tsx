"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { calculateCartSummary } from "@/data/cart-data";
import type { CartItem, CartSummary } from "@/types/cart";

const CART_STORAGE_KEY = "web-app-e-commerce-v1:cart";

type CartAddStatus = "added" | "updated" | "maxQuantityReached";
type CartUpdateStatus = CartAddStatus | "removed" | "notFound";

type AddCartItemInput = {
  id?: string;
  productId: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  stock: number;
  maxQuantity?: number;
  quantity?: number;
};

type AddCartItemResult = {
  status: CartAddStatus;
  item: CartItem;
};

type UpdateCartItemResult =
  | {
      status: CartUpdateStatus;
      item?: CartItem;
    }
  | {
      status: "removed";
      item?: undefined;
    };

interface CartContextValue {
  items: CartItem[];
  summary: CartSummary;
  itemCount: number;
  isHydrated: boolean;
  addItem: (input: AddCartItemInput) => AddCartItemResult;
  updateQuantity: (productId: string, quantity: number) => UpdateCartItemResult;
  removeItem: (productId: string) => boolean;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!storedValue) {
      return [];
    }

    const parsed = JSON.parse(storedValue) as CartItem[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item): item is CartItem => Boolean(item?.productId))
      .map((item) => {
        const safeQuantity = Math.max(1, Math.floor(item.quantity || 1));
        const safeStock = Math.max(
          1,
          Math.floor(item.stock ?? item.maxQuantity ?? safeQuantity),
        );
        const safeMaxQuantity = Math.max(
          1,
          Math.floor(item.maxQuantity ?? safeStock),
        );

        return {
          ...item,
          quantity: safeQuantity,
          stock: safeStock,
          maxQuantity: safeMaxQuantity,
        } satisfies CartItem;
      });
  } catch (error) {
    console.warn("Não foi possível carregar o carrinho do storage:", error);
    return [];
  }
}

function writeStorage(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.warn("Não foi possível salvar o carrinho no storage:", error);
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const pendingWriteRef = useRef(false);

  useEffect(() => {
    const storedItems = readStorage();
    setItems(storedItems);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (pendingWriteRef.current) {
      return;
    }

    pendingWriteRef.current = true;
    const id = window.requestAnimationFrame(() => {
      writeStorage(items);
      pendingWriteRef.current = false;
    });

    return () => {
      window.cancelAnimationFrame(id);
      pendingWriteRef.current = false;
    };
  }, [items, isHydrated]);

  const addItem = useCallback((input: AddCartItemInput): AddCartItemResult => {
    let actionResult: AddCartItemResult | null = null;

    setItems((previousItems) => {
      const maxAllowed = Math.max(
        1,
        Math.floor(input.maxQuantity ?? input.stock ?? input.quantity ?? 1),
      );
      const quantityToAdd = Math.max(1, Math.floor(input.quantity ?? 1));
      const existing = previousItems.find(
        (item) => item.productId === input.productId,
      );

      if (existing) {
        const newQuantity = Math.min(
          existing.quantity + quantityToAdd,
          maxAllowed,
        );
        const status: CartAddStatus =
          newQuantity === existing.quantity ? "maxQuantityReached" : "updated";
        const updatedItem: CartItem = {
          ...existing,
          quantity: newQuantity,
          stock: input.stock,
          maxQuantity: input.maxQuantity ?? input.stock ?? existing.maxQuantity,
        };

        actionResult = {
          status,
          item: updatedItem,
        };

        return previousItems.map((item) =>
          item.productId === input.productId ? updatedItem : item,
        );
      }

      const initialQuantity = Math.min(quantityToAdd, maxAllowed);
      const newItem: CartItem = {
        id: input.id ?? input.productId,
        productId: input.productId,
        name: input.name,
        sku: input.sku,
        image: input.image,
        price: input.price,
        quantity: initialQuantity,
        stock: input.stock,
        maxQuantity: input.maxQuantity ?? input.stock,
      };

      actionResult = {
        status: "added",
        item: newItem,
      };

      return [...previousItems, newItem];
    });

    if (!actionResult) {
      throw new Error("Falha ao adicionar item ao carrinho");
    }

    return actionResult;
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number): UpdateCartItemResult => {
      let actionResult: UpdateCartItemResult = { status: "notFound" };

      setItems((previousItems) => {
        const existing = previousItems.find(
          (item) => item.productId === productId,
        );
        if (!existing) {
          return previousItems;
        }

        if (quantity <= 0) {
          actionResult = { status: "removed" };
          return previousItems.filter((item) => item.productId !== productId);
        }

        const maxAllowed = Math.max(
          1,
          Math.floor(existing.maxQuantity ?? existing.stock ?? quantity),
        );
        const nextQuantity = Math.min(Math.floor(quantity), maxAllowed);
        const status: CartUpdateStatus =
          nextQuantity === existing.quantity && quantity > maxAllowed
            ? "maxQuantityReached"
            : "updated";
        const updatedItem: CartItem = {
          ...existing,
          quantity: nextQuantity,
        };

        actionResult = {
          status,
          item: updatedItem,
        };

        return previousItems.map((item) =>
          item.productId === productId ? updatedItem : item,
        );
      });

      return actionResult;
    },
    [],
  );

  const removeItem = useCallback((productId: string) => {
    let removed = false;

    setItems((previousItems) => {
      const filtered = previousItems.filter(
        (item) => item.productId !== productId,
      );
      removed = filtered.length !== previousItems.length;
      return filtered;
    });

    return removed;
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const summary = useMemo(() => calculateCartSummary(items), [items]);
  const itemCount = summary.itemCount;

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      summary,
      itemCount,
      isHydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      summary,
      itemCount,
      isHydrated,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser utilizado dentro de um CartProvider");
  }

  return context;
}

export type { AddCartItemInput, AddCartItemResult, UpdateCartItemResult };
