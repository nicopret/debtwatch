import type { ReactNode } from "react";

export default function AssetPreviewLayout({ children }: { children: ReactNode }) {
  return (
    <main className="asset-preview-route-main">
      {children}
      <span className="asset-preview-watermark">debtwatch.uk</span>
    </main>
  );
}
