/**
 * Recent Orders Component
 * Displays a list of recent customer orders
 */

import { Calendar, Eye, Package } from "lucide-react";
import Link from "next/link";
import type { Order } from "@/types/account";

interface RecentOrdersProps {
  orders: Order[];
}

// Badge variant styles
const badgeStyles = {
  default: "bg-muted text-muted-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  success:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  destructive: "bg-destructive text-destructive-foreground",
};

export default function RecentOrders({ orders }: RecentOrdersProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold">Pedidos Recentes</h2>
          </div>
          <Link
            href="/account/orders"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            Ver Todos
            <span>→</span>
          </Link>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Seus últimos 5 pedidos
        </p>
      </div>

      {/* Orders List */}
      <div className="divide-y divide-border">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 hover:bg-accent/50 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Order Info */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-foreground">
                    Pedido #{order.orderNumber}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      badgeStyles[order.statusBadgeVariant]
                    }`}
                  >
                    {order.statusLabel}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(order.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    <span>{order.itemCount} item(s)</span>
                  </div>
                  <div className="font-semibold text-foreground">
                    {formatCurrency(order.total)}
                  </div>
                </div>

                {order.deliveryDate && (
                  <p className="text-xs text-muted-foreground">
                    Entrega prevista: {formatDate(order.deliveryDate)}
                  </p>
                )}
              </div>

              {/* Action Button */}
              <Link
                href={`/account/orders/${order.id}`}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium whitespace-nowrap justify-center"
              >
                <Eye className="h-4 w-4" />
                <span>Ver</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
