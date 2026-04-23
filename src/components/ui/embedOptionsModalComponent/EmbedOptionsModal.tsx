"use client";

import { useEffect, useState } from "react";
import { buildAssetUrl, type AssetFormat } from "@/lib/assetUrl";
import { buildSocialShareLinks } from "@/lib/articleVisualShare";
import { buildEmbedCode } from "@/lib/embedCode";
import styles from "./embedOptionsModal.module.css";

export interface EmbedOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartTitle: string;
  contextSlug?: string;
  embedSlug?: string;
  snapshotDate?: string;
  assetSlug?: string;
  articleUrl?: string;
  socialUrl?: string;
  shareText?: string;
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
  socialUrl,
  shareText,
}: EmbedOptionsModalProps) {
  const [selectedVersion, setSelectedVersion] = useState<EmbedVersionSelection>("snapshot");
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

  const canExport =
    typeof contextSlug === "string" &&
    typeof embedSlug === "string" &&
    typeof snapshotDate === "string" &&
    typeof assetSlug === "string";
  const resolvedVersion = canExport
    ? (selectedVersion === "latest" ? "latest" : snapshotDate)
    : undefined;
  const socialShareLinks = socialUrl
    ? buildSocialShareLinks({
        socialUrl,
        shareText: shareText ?? chartTitle,
      })
    : null;
  const embedCodeResult = canExport && resolvedVersion
    ? buildEmbedCode({
        contextSlug,
        embedSlug,
        version: resolvedVersion,
        title: chartTitle,
      })
    : null;
  const pngAssetUrl = canExport && resolvedVersion
    ? buildAssetUrl({
        contextSlug,
        assetSlug,
        version: resolvedVersion,
        format: "png",
      })
    : null;
  const svgAssetUrl = canExport && resolvedVersion
    ? buildAssetUrl({
        contextSlug,
        assetSlug,
        version: resolvedVersion,
        format: "svg",
      })
    : null;

  async function handleEmbedCopy() {
    try {
      if (!embedCodeResult) {
        return;
      }

      await navigator.clipboard.writeText(embedCodeResult.iframeCode);
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
            <p className={styles.eyebrow}>Share</p>
            <h2 className={styles.title}>Share this visual</h2>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            Close
          </button>
        </header>

        {socialShareLinks ? (
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Share this visual</h3>
              <p className={styles.sectionText}>
                Social sharing uses a visual-specific preview link when available, so the shared card can show the selected chart image.
              </p>
            </div>
            <div className={styles.actionRow}>
              <a
                className={styles.copyButton}
                href={socialShareLinks.x}
                rel="noreferrer"
                target="_blank"
              >
                Share on X
              </a>
              <a
                className={styles.secondaryButton}
                href={socialShareLinks.facebook}
                rel="noreferrer"
                target="_blank"
              >
                Share on Facebook
              </a>
              <a
                className={styles.secondaryButton}
                href={socialShareLinks.linkedin}
                rel="noreferrer"
                target="_blank"
              >
                Share on LinkedIn
              </a>
            </div>
          </section>
        ) : null}

        {canExport ? (
          <>
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
          </>
        ) : null}

        {embedCodeResult ? (
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
              <code className={styles.singleLineCode}>{embedCodeResult.embedUrl}</code>
            </div>

            <div>
              <p className={styles.label}>iFrame code</p>
              <pre className={styles.codeBlock}>
                <code>{embedCodeResult.iframeCode}</code>
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
        ) : null}

        {pngAssetUrl && svgAssetUrl ? (
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
        ) : null}
      </div>
    </div>
  );
}
