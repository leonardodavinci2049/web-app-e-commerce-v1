/**
 * Account Mobile Menu Component
 * Mobile drawer navigation for account area
 */

"use client";

import { Home, Package, Settings, Tag, User, Wrench, X } from "lucide-react";
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

interface AccountMobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountMobileMenu({
  isOpen,
  onClose,
}: AccountMobileMenuProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/60 z-40 lg:hidden cursor-default"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onClose();
            }
          }}
          aria-label="Fechar menu"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 dark:bg-white border-r border-gray-700 dark:border-gray-300 shadow-2xl z-50 transform transition-transform duration-300 lg:hidden flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-700 dark:border-gray-300 flex items-center justify-between bg-gray-800 dark:bg-gray-100">
          <h2 className="font-bold text-lg text-white dark:text-gray-900">
            Minha Conta
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-700 dark:hover:bg-gray-200 rounded-lg transition-colors text-gray-300 dark:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1 bg-gray-900 dark:bg-white flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-white font-semibold"
                    : "text-gray-300 dark:text-gray-700 hover:bg-gray-800 dark:hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
