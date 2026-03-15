"use client";

import { useEffect, useState } from "react";
import { buildAssetUrl, type AssetFormat } from "@/lib/assetUrl";
import { buildEmbedCode } from "@/lib/embedCode";
import styles from "./embedOptionsModal.module.css";

export interface EmbedOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartTitle: string;
  contextSlug: string;
  embedSlug: string;
  snapshotDate: string;
  assetSlug: string;
}

type EmbedVersionSelection = "latest" | "snapshot";

export default function EmbedOptionsModal({
  isOpen,
  onClose,
  chartTitle,
  contextSlug,
  embedSlug,
  snapshotDate,
  assetSlug,
}: EmbedOptionsModalProps) {
  const [selectedVersion, setSelectedVersion] = useState<EmbedVersionSelection>("latest");
  const [embedCopyStatus, setEmbedCopyStatus] = useState("Copy iFrame");
  const [assetCopyStatus, setAssetCopyStatus] = useState<Record<AssetFormat, string>>({
    png: "Copy PNG URL",
    svg: "Copy SVG URL",
  });

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
  const pngAssetUrl = buildAssetUrl({
    contextSlug,
    assetSlug,
    version: resolvedVersion,
    format: "png",
  });
  const svgAssetUrl = buildAssetUrl({
    contextSlug,
    assetSlug,
    version: resolvedVersion,
    format: "svg",
  });

  async function handleEmbedCopy() {
    try {
      await navigator.clipboard.writeText(iframeCode);
      setEmbedCopyStatus("Copied");
      window.setTimeout(() => setEmbedCopyStatus("Copy iFrame"), 1500);
    } catch {
      setEmbedCopyStatus("Failed");
      window.setTimeout(() => setEmbedCopyStatus("Copy iFrame"), 1500);
    }
  }

  async function handleAssetCopy(format: AssetFormat, assetUrl: string) {
    try {
      await navigator.clipboard.writeText(assetUrl);
      setAssetCopyStatus((current) => ({
        ...current,
        [format]: "Copied",
      }));
      window.setTimeout(
        () =>
          setAssetCopyStatus((current) => ({
            ...current,
            [format]: format === "png" ? "Copy PNG URL" : "Copy SVG URL",
          })),
        1500,
      );
    } catch {
      setAssetCopyStatus((current) => ({
        ...current,
        [format]: "Failed",
      }));
      window.setTimeout(
        () =>
          setAssetCopyStatus((current) => ({
            ...current,
            [format]: format === "png" ? "Copy PNG URL" : "Copy SVG URL",
          })),
        1500,
      );
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
          Choose whether you want an always-updating share link or a fixed published
          snapshot.
        </p>

        <div className={styles.options}>
          <button
            type="button"
            className={`${styles.optionCard} ${
              selectedVersion === "latest" ? styles.optionCardSelected : ""
            }`}
            onClick={() => setSelectedVersion("latest")}
          >
            <span className={styles.optionTitle}>Latest version</span>
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
            <span className={styles.optionTitle}>Snapshot version</span>
            <span className={styles.optionText}>
              Fixed to version {snapshotDate} and will not change.
            </span>
          </button>
        </div>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Embed this chart</h3>
            <p className={styles.sectionText}>
              Use the selected version inside an iframe. Latest keeps updating; snapshot
              stays fixed.
            </p>
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
              onClick={handleEmbedCopy}
            >
              {embedCopyStatus}
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Download image</h3>
            <p className={styles.sectionText}>
              Use the same selected version as a downloadable PNG or SVG. Open it
              directly, copy the asset URL, or download it.
            </p>
          </div>

          <div className={styles.assetFormatBlock}>
            <div className={styles.assetFormatHeader}>
              <h4 className={styles.assetFormatTitle}>PNG</h4>
              <span className={styles.assetFormatHint}>Best for slides, docs, and quick sharing.</span>
            </div>
            <div>
              <p className={styles.label}>PNG URL</p>
              <code className={styles.singleLineCode}>{pngAssetUrl}</code>
            </div>
            <div className={styles.actionRow}>
              <button
                type="button"
                className={styles.copyButton}
                onClick={() => handleAssetCopy("png", pngAssetUrl)}
              >
                {assetCopyStatus.png}
              </button>
              <a
                className={styles.secondaryButton}
                href={pngAssetUrl}
                rel="noreferrer"
                target="_blank"
              >
                Open PNG
              </a>
              <a
                className={styles.secondaryButton}
                download
                href={pngAssetUrl}
                rel="noreferrer"
                target="_blank"
              >
                Download PNG
              </a>
            </div>
          </div>

          <div className={styles.assetFormatBlock}>
            <div className={styles.assetFormatHeader}>
              <h4 className={styles.assetFormatTitle}>SVG</h4>
              <span className={styles.assetFormatHint}>Best for vector reuse and crisp scaling.</span>
            </div>
            <div>
              <p className={styles.label}>SVG URL</p>
              <code className={styles.singleLineCode}>{svgAssetUrl}</code>
            </div>
            <div className={styles.actionRow}>
              <button
                type="button"
                className={styles.copyButton}
                onClick={() => handleAssetCopy("svg", svgAssetUrl)}
              >
                {assetCopyStatus.svg}
              </button>
              <a
                className={styles.secondaryButton}
                href={svgAssetUrl}
                rel="noreferrer"
                target="_blank"
              >
                Open SVG
              </a>
              <a
                className={styles.secondaryButton}
                download
                href={svgAssetUrl}
                rel="noreferrer"
                target="_blank"
              >
                Download SVG
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
