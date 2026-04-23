"use client";

import { useState } from "react";
import EmbedIconButton from "@/components/ui/embedIconButtonComponent/EmbedIconButton";
import EmbedOptionsModal from "@/components/ui/embedOptionsModalComponent/EmbedOptionsModal";

export interface ChartEmbedActionProps {
  chartTitle: string;
  contextSlug?: string;
  embedSlug?: string;
  snapshotDate?: string;
  assetSlug?: string;
  articleUrl?: string;
  socialUrl?: string;
  shareText?: string;
}

export default function ChartEmbedAction({
  chartTitle,
  contextSlug,
  embedSlug,
  snapshotDate,
  assetSlug,
  articleUrl,
  socialUrl,
  shareText,
}: ChartEmbedActionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalKey, setModalKey] = useState(0);

  function handleOpen() {
    setModalKey((current) => current + 1);
    setIsOpen(true);
  }

  return (
    <>
      <EmbedIconButton onClick={handleOpen} />
      <EmbedOptionsModal
        key={modalKey}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        chartTitle={chartTitle}
        contextSlug={contextSlug}
        embedSlug={embedSlug}
        snapshotDate={snapshotDate}
        assetSlug={assetSlug ?? embedSlug}
        articleUrl={articleUrl}
        socialUrl={socialUrl}
        shareText={shareText}
      />
    </>
  );
}
