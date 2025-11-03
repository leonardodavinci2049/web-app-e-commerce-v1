/**
 * Account Sidebar Component
 * Desktop sidebar navigation for account area
 */

"use client";

import { Home, Package, Settings, Tag, User, Wrench } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/account",
    icon: Home,
  },
  {
    id: "profile",
    label: "Meu Perfil",
    href: "/account/profile",
    icon: User,
  },
  {
    id: "orders",
    label: "Meus Pedidos",
    href: "/account/orders",
    icon: Package,
  },
  {
    id: "promotions",
    label: "Promoções",
    href: "/account/promotions",
    icon: Tag,
  },
  {
    id: "services",
    label: "Serviços",
    href: "/account/services",
    icon: Wrench,
  },
  {
    id: "settings",
    label: "Configurações",
    href: "/account/settings",
    icon: Settings,
  },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-64 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 shadow-sm sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <h2 className="font-bold text-lg text-gray-900 dark:text-white">
          Minha Conta
        </h2>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-white font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
