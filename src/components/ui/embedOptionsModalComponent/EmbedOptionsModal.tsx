"use client";

import { useEffect, useState } from "react";
import { buildEmbedCode } from "@/lib/embedCode";
import styles from "./embedOptionsModal.module.css";

export interface EmbedOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartTitle: string;
  contextSlug: string;
  embedSlug: string;
  snapshotDate: string;
}

type EmbedVersionSelection = "latest" | "snapshot";

export default function EmbedOptionsModal({
  isOpen,
  onClose,
  chartTitle,
  contextSlug,
  embedSlug,
  snapshotDate,
}: EmbedOptionsModalProps) {
  const [selectedVersion, setSelectedVersion] = useState<EmbedVersionSelection>("latest");
  const [copyStatus, setCopyStatus] = useState("Copy");

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const resolvedVersion = selectedVersion === "latest" ? "latest" : snapshotDate;
  const { embedUrl, iframeCode } = buildEmbedCode({
    contextSlug,
    embedSlug,
    version: resolvedVersion,
    title: chartTitle,
  });

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(iframeCode);
      setCopyStatus("Copied");
      window.setTimeout(() => setCopyStatus("Copy"), 1500);
    } catch {
      setCopyStatus("Failed");
      window.setTimeout(() => setCopyStatus("Copy"), 1500);
    }
  }

  return (
    <div
      aria-modal="true"
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
    >
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Embed</p>
            <h2 className={styles.title}>Embed this chart</h2>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            Close
          </button>
        </header>

        <p className={styles.description}>
          Choose whether you want an always-updating embed or a fixed published snapshot.
        </p>

        <div className={styles.options}>
          <button
            type="button"
            className={`${styles.optionCard} ${
              selectedVersion === "latest" ? styles.optionCardSelected : ""
            }`}
            onClick={() => setSelectedVersion("latest")}
          >
            <span className={styles.optionTitle}>Latest embed</span>
            <span className={styles.optionText}>
              Updates automatically when DebtWatch data changes.
            </span>
          </button>
          <button
            type="button"
            className={`${styles.optionCard} ${
              selectedVersion === "snapshot" ? styles.optionCardSelected : ""
            }`}
            onClick={() => setSelectedVersion("snapshot")}
          >
            <span className={styles.optionTitle}>Snapshot embed</span>
            <span className={styles.optionText}>
              Fixed to version {snapshotDate} and will not change.
            </span>
          </button>
        </div>

        <div className={styles.codeSection}>
          <div>
            <p className={styles.label}>Embed URL</p>
            <code className={styles.singleLineCode}>{embedUrl}</code>
          </div>

          <div>
            <p className={styles.label}>iFrame code</p>
            <pre className={styles.codeBlock}>
              <code>{iframeCode}</code>
            </pre>
          </div>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.copyButton}
            onClick={handleCopy}
          >
            {copyStatus}
          </button>
        </div>
      </div>
    </div>
  );
}
