import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AssetPageContainer from "@/containers/assetContainers/AssetPageContainer";
import { assetRegistry, getAssetDefinition } from "@/data/assets/assetRegistry";
import { buildAssetUrl } from "@/lib/assetUrl";
import { getPublishedAssetVersions } from "@/lib/publishedVisualVersion";

interface AssetPreviewPageProps {
  params: Promise<{
    contextSlug: string;
    version: string;
    assetSlug: string;
  }>;
}

export const dynamicParams = false;

function isSupportedVersion(version: string): boolean {
  return getPublishedAssetVersions().includes(version);
}

export async function generateStaticParams() {
  const versions = getPublishedAssetVersions();

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
    openGraph: {
      title: asset.title,
      description: asset.sourceNote,
      url: `https://debtwatch.uk/asset-preview/${contextSlug}/${version}/${assetSlug}`,
      images: [
        {
          url: buildAssetUrl({
            contextSlug,
            assetSlug,
            version,
            format: "png",
          }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: asset.title,
      description: asset.sourceNote,
      images: [
        buildAssetUrl({
          contextSlug,
          assetSlug,
          version,
          format: "png",
        }),
      ],
    },
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
