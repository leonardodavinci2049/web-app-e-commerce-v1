/**
 * Loading Component for Products Page
 * Simple loading state
 */

import { Loader2Icon } from "lucide-react";

export default function ProductsLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2Icon className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">Carregando produtos...</p>
      </div>
    </div>
  );
}
