import type { Metadata } from "next";
import Footer from "@/components/company/footer";
import Header from "@/components/company/header";
import { envs } from "@/core/config/envs";

export const metadata: Metadata = {
  title: `Empresa - ${envs.NEXT_PUBLIC_COMPANY_NAME}`,
};

export default async function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Este é um Server Component por padrão
  return (
    <div>
      {/* Header - possível que precise de dados de sessão para controlar exibição de preços */}
      {/* Usamos componente client dentro do Server Component */}
      <Header />

      <main className="min-h-[60vh] py-12">{children}</main>

      <Footer />
    </div>
  );
}
