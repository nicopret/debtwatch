import type { ReactNode } from "react";

export default function EmbedLayout({ children }: { children: ReactNode }) {
  return <main className="embed-route-main">{children}</main>;
}

