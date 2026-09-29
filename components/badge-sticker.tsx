import { Badge } from "@/components/ui/badge";
import type { Badge as BadgeKind } from "@/data/menu";

export function BadgeSticker({ badge }: { badge: BadgeKind }) {
  return (
    <Badge variant={badge === "mais-pedido" ? "mustard" : "pool"} className="wiggle absolute left-3 top-3 z-10 shadow-md">
      {badge === "mais-pedido" ? "Mais pedido" : "Novo"}
    </Badge>
  );
}
