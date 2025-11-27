/**
 * Footer Component
 * Complete footer with 4 columns, payment methods, and copyright
 */

import {
  CreditCard,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { envs } from "@/core/config/envs";

export default function Footer() {
  return (
    <footer className="bg-muted text-foreground border-t border-border">
      {/* Main Footer Content - 4 Columns */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Institutional */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/logo/logo-header.png"
                alt={`${envs.NEXT_PUBLIC_COMPANY_NAME} Logo`}
                width={64}
                height={32}
                className="h-8 w-16"
              />
              <h3 className="text-primary font-bold text-lg">
                {envs.NEXT_PUBLIC_COMPANY_NAME}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Sua parceira em ferramentas e equipamentos
            </p>
            <div className="flex gap-3">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Nossas Lojas
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Trabalhe Conosco
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: My Account */}
          <div className="space-y-4">
            <h3 className="font-bold">Minha Conta</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Login / Cadastro
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Meus Pedidos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Lista de Desejos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Rastreamento
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Central de Ajuda
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h3 className="font-bold">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-primary font-medium">(16) 99277-0660</span>
              </li>
              <li>
                <span className="text-muted-foreground">
                  vendas@caixafechada.com.br
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Rua das Ferramentas, 123
                  <br />
                  Centro - São Paulo/SP
                </span>
              </li>
              <li className="pt-2">
                <strong className="text-foreground">Horário:</strong>
                <br />
                <span className="text-muted-foreground">
                  Seg a Sex: 8h às 18h
                  <br />
                  Sáb: 8h às 12h
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="border-t border-border bg-card">
        <div className="container mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 space-y-2">
              <div className="flex justify-center">
                <CreditCard className="h-8 w-8 text-accent" />
              </div>
              <p className="text-sm font-medium">PIX</p>
              <p className="text-xs text-muted-foreground">
                5% desconto à vista
              </p>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-center">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <p className="text-sm font-medium">Cartões</p>
              <p className="text-xs text-muted-foreground">Parcele até 12x</p>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-center">
                <CreditCard className="h-8 w-8 text-secondary" />
              </div>
              <p className="text-sm font-medium">Frete Grátis</p>
              <p className="text-xs text-muted-foreground">Acima de R$299</p>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-center">
                <CreditCard className="h-8 w-8 text-foreground" />
              </div>
              <p className="text-sm font-medium">Segurança</p>
              <p className="text-xs text-muted-foreground">Site 100% seguro</p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border bg-muted">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} CAIXAFECHADA - Todos os direitos
            reservados | CNPJ: 09.061.131/0001-53
          </p>
        </div>
      </div>
    </footer>
  );
}
