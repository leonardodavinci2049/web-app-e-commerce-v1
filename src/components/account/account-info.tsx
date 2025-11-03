/**
 * Account Info Component
 * Displays customer account information and status
 */

import { CheckCircle, Mail, Phone, User } from "lucide-react";
import type { Customer } from "@/types/account";

interface AccountInfoProps {
  customer: Customer;
}

export default function AccountInfo({ customer }: AccountInfoProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center gap-2 mb-4">
        <User className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-bold">Minha Conta</h2>
      </div>

      {/* Customer Info */}
      <div className="space-y-4">
        {/* Avatar and Name */}
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg">{customer.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-muted-foreground">
                {customer.type === "PF" ? "Pessoa Física" : "Pessoa Jurídica"}
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm font-semibold text-green-700 dark:text-green-300">
                Status da Conta
              </p>
              <p className="text-xs text-green-600 dark:text-green-400">
                Conta aprovada em{" "}
                {new Date(customer.memberSince).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground break-all">
              {customer.email}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{customer.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
