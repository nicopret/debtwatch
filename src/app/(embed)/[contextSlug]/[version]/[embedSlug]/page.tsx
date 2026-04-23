import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EmbedPageContainer from "@/containers/embedContainers/EmbedPageContainer";
import { embedRegistry, getEmbedDefinition } from "@/data/embeds/embedRegistry";
import { getPublishedEmbedVersions } from "@/lib/publishedVisualVersion";

interface EmbedPageProps {
  params: Promise<{
    contextSlug: string;
    version: string;
    embedSlug: string;
  }>;
}

export const dynamicParams = false;

function isSupportedVersion(version: string): boolean {
  return getPublishedEmbedVersions().includes(version);
}

export async function generateStaticParams() {
  const versions = getPublishedEmbedVersions();

  return embedRegistry.flatMap((embed) =>
    versions.map((version) => ({
      contextSlug: embed.contextSlug,
      version,
      embedSlug: embed.embedSlug,
    })),
  );
}

export async function generateMetadata({
  params,
}: EmbedPageProps): Promise<Metadata> {
  const { contextSlug, embedSlug, version } = await params;
  const embed = getEmbedDefinition(contextSlug, embedSlug);

  if (!embed || !isSupportedVersion(version)) {
    return {
      title: "Embed not found | DebtWatch",
    };
  }

  return {
    title: `${embed.title} | DebtWatch embed`,
    description: embed.sourceNote,
  };
}

export default async function EmbedPage({ params }: EmbedPageProps) {
  const { contextSlug, version, embedSlug } = await params;
  const embed = getEmbedDefinition(contextSlug, embedSlug);

  if (!embed || !isSupportedVersion(version)) {
    notFound();
  }

  return <EmbedPageContainer embed={embed} version={version} />;
}
