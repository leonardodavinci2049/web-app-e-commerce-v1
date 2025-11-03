/**
 * Continue Shopping Button (Client Component)
 * Button to return to shopping
 */

"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ContinueShoppingButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full"
      onClick={handleClick}
    >
      continuar comprando
    </Button>
  );
}
