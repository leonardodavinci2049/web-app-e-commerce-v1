/**
 * Products Page Error Boundary
 * Handles errors during product fetching
 */

"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Products page error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-card border border-border rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-destructive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <title>Erro</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-2">
          Erro ao Carregar Produtos
        </h2>

        <p className="text-muted-foreground mb-6">
          Ocorreu um erro ao tentar carregar os produtos. Por favor, tente
          novamente.
        </p>

        {error.message && (
          <p className="text-sm text-muted-foreground mb-6 p-3 bg-muted rounded">
            {error.message}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            variant="default"
            className="w-full sm:w-auto"
          >
            Tentar Novamente
          </Button>

          <Button
            onClick={() => {
              window.location.href = "/";
            }}
            variant="outline"
            className="w-full sm:w-auto"
          >
            Voltar para Home
          </Button>
        </div>
      </div>
    </div>
  );
}
