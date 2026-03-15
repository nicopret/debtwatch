import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AssetPageContainer from "@/containers/assetContainers/AssetPageContainer";
import { assetRegistry, getAssetDefinition } from "@/data/assets/assetRegistry";
import { getSupportedEmbedVersions } from "@/lib/versioning";

interface AssetPreviewPageProps {
  params: Promise<{
    contextSlug: string;
    version: string;
    assetSlug: string;
  }>;
}

export const dynamicParams = false;

function isSupportedVersion(version: string): boolean {
  return getSupportedEmbedVersions().includes(version);
}

export async function generateStaticParams() {
  const versions = getSupportedEmbedVersions();

  return assetRegistry.flatMap((asset) =>
    versions.map((version) => ({
      contextSlug: asset.contextSlug,
      version,
      assetSlug: asset.assetSlug,
    })),
  );
}

export async function generateMetadata({
  params,
}: AssetPreviewPageProps): Promise<Metadata> {
  const { contextSlug, assetSlug, version } = await params;
  const asset = getAssetDefinition(contextSlug, assetSlug);

  if (!asset || !isSupportedVersion(version)) {
    return {
      title: "Asset preview not found | DebtWatch",
    };
  }

  return {
    title: `${asset.title} | DebtWatch asset preview`,
    description: asset.sourceNote,
  };
}

export default async function AssetPreviewPage({ params }: AssetPreviewPageProps) {
  const { contextSlug, version, assetSlug } = await params;
  const asset = getAssetDefinition(contextSlug, assetSlug);

  if (!asset || !isSupportedVersion(version)) {
    notFound();
  }

  return <AssetPageContainer asset={asset} version={version} />;
}
