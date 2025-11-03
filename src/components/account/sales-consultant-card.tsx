/**
 * Sales Consultant Component
 * Displays information about the assigned sales consultant with contact options
 */

"use client";

import { Mail, MessageCircle, Phone, User } from "lucide-react";
import type { SalesConsultant } from "@/types/account";

interface SalesConsultantProps {
  consultant: SalesConsultant;
}

export default function SalesConsultantCard({
  consultant,
}: SalesConsultantProps) {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${consultant.phone}`, "_blank");
  };

  const handleEmail = () => {
    window.location.href = `mailto:${consultant.email}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold">Consultor de Vendas</h2>
      </div>

      {/* Consultant Info */}
      <div className="space-y-4">
        {/* Avatar and Name */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center relative">
              <User className="h-8 w-8 text-primary" />
              {consultant.isAvailable && (
                <span className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-card"></span>
              )}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">{consultant.name}</h3>
            <p className="text-sm text-muted-foreground">{consultant.role}</p>
            {consultant.isAvailable && (
              <div className="flex items-center gap-1 mt-1">
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                <span className="text-xs text-green-600 dark:text-green-400">
                  Disponível
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{consultant.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground break-all">
              {consultant.email}
            </span>
          </div>
        </div>

        {/* Contact Actions */}
        <div className="space-y-2 pt-2">
          <p className="text-sm font-medium mb-2">Entre em contato:</p>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleEmail}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-muted hover:bg-accent text-foreground rounded-lg transition-colors font-medium border border-border"
          >
            <Mail className="h-4 w-4" />
            <span>Enviar E-mail</span>
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mt-4">
          <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
            Seu consultor está disponível para ajudar com pedidos, produtos e
            serviços especiais.
          </p>
        </div>
      </div>
    </div>
  );
}
