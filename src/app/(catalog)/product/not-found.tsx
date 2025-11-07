import { Home, Search } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/home/footer";
import { Button } from "@/components/ui/button";

/**
 * Product Not Found Page
 * Displayed when a product doesn't exist
 */
export default function ProductNotFound() {
  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
          <div className="mb-8 text-9xl font-bold text-muted">404</div>

          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Produto não encontrado
          </h1>

          <p className="mb-8 max-w-md text-lg text-muted-foreground">
            Desculpe, o produto que você está procurando não existe ou foi
            removido do nosso catálogo.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Voltar para Home
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/products">
                <Search className="mr-2 h-5 w-5" />
                Ver Todos os Produtos
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
