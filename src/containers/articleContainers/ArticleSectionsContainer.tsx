import ArticleVisualShareFrame from "@/components/ui/articleVisualShareFrameComponent/ArticleVisualShareFrame";
import ArticleSection from "@/components/ui/articleSectionComponent/ArticleSection";
import { getArticleVisualEmbedDefinition } from "@/data/embeds/articleVisualEmbedRegistry";
import type { ArticleContentBlock, ArticleData } from "@/data/articles/articleTypes";
import { buildArticleVisualShareConfig } from "@/lib/articleVisualShare";
import { resolveVisualSnapshotVersion } from "@/lib/publishedVisualVersion";
import {
  renderArticleCallout,
  renderArticleGraphBlock,
  renderArticleVisual,
} from "./articleVisualRegistry";

export interface ArticleSectionsContainerProps {
  article: ArticleData;
}

function renderTextBlock(
  heading: string,
  body: string[],
  keyPrefix: string,
) {
  return (
    <div className="article-section-text-block" key={keyPrefix}>
      <div>
        {body.map((paragraph, index) => (
          <p
            key={`${keyPrefix}-${index}`}
            // Article prose comes from trusted local content files, so simple inline HTML
            // like <b> and <a> can be rendered without introducing a separate rich-text layer.
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}
      </div>
    </div>
  );
}

function renderSectionBlocks(
  heading: string,
  blocks: ArticleContentBlock[] | undefined,
  sectionId: string,
  article: ArticleData,
) {
  return blocks?.map((block, index) => {
    if (block.type === "text") {
      return renderTextBlock(heading, block.body, `${sectionId}-text-${index}`);
    }

    if (block.type === "graph") {
      return renderArticleGraphBlock(
        block.graphKey,
        block.caption,
        `${sectionId}-graph-${index}`,
        article,
      );
    }

    return null;
  }).filter((block): block is NonNullable<typeof block> => block !== null);
}

export default function ArticleSectionsContainer({
  article,
}: ArticleSectionsContainerProps) {
  return (
    <>
      {article.sections.map((section) => {
        const shareConfig = buildArticleVisualShareConfig(article, section);
        const exportDefinition = section.visualKey
          ? getArticleVisualEmbedDefinition(article.slug, section.visualKey)
          : undefined;
        const renderedVisual = section.visualKey
          ? renderArticleVisual(section.visualKey, article)
          : undefined;
        const resolvedSnapshotDate =
          section.shareSnapshotDate ??
          article.publishedSnapshotVersion ??
          (exportDefinition?.articleSlug && exportDefinition.embedSlug
            ? resolveVisualSnapshotVersion({
                contextSlug: exportDefinition.articleSlug,
                assetSlug: exportDefinition.embedSlug,
                embedSlug: exportDefinition.embedSlug,
              })
            : undefined);

        return (
          <ArticleSection
            key={section.id}
            heading={section.heading}
            blocks={
              renderSectionBlocks(
                section.heading,
                section.entities ?? [
                  { type: "text", body: section.body },
                  ...(section.blocks ?? []),
                ],
                section.id,
                article,
              )
            }
            layout={section.layout}
            visual={
              renderedVisual ? (
                <ArticleVisualShareFrame
                  shareAction={
                    shareConfig
                      ? {
                          chartTitle: exportDefinition?.title ?? shareConfig.shareTitle,
                          articleUrl: shareConfig.articleUrl,
                          socialUrl: shareConfig.socialUrl,
                          shareText: exportDefinition?.shareText ?? shareConfig.shareText,
                          contextSlug: exportDefinition?.articleSlug ?? shareConfig.contextSlug,
                          embedSlug: exportDefinition?.embedSlug ?? shareConfig.embedSlug,
                          assetSlug: exportDefinition?.embedSlug ?? shareConfig.assetSlug,
                          snapshotDate: resolvedSnapshotDate,
                        }
                      : null
                  }
                >
                  {renderedVisual}
                </ArticleVisualShareFrame>
              ) : undefined
            }
            callout={section.callout ? renderArticleCallout(section.callout) : undefined}
          />
        );
      })}
    </>
  );
}
