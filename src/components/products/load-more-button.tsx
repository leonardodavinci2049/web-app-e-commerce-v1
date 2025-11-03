/**
 * LoadMoreButton Component
 * Button for infinite scroll functionality
 */

"use client";

import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
  hasMore: boolean;
  loadedCount: number;
  totalCount: number;
}

export default function LoadMoreButton({
  onClick,
  loading,
  hasMore,
  loadedCount,
  totalCount,
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-sm p-8">
        <div className="text-center">
          <p className="text-muted-foreground font-medium">
            Todos os produtos foram carregados ({totalCount} produtos)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm p-8">
      <div className="text-center">
        <Button
          onClick={onClick}
          disabled={loading}
          className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-shadow"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
              Carregando...
            </>
          ) : (
            `Carregar Mais Produtos (${loadedCount}/${totalCount})`
          )}
        </Button>
      </div>
    </div>
  );
}
