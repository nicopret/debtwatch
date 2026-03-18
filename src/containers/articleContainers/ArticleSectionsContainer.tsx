import ArticleSection from "@/components/ui/articleSectionComponent/ArticleSection";
import type { ArticleContentBlock, ArticleData } from "@/data/articles/articleTypes";
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
) {
  return blocks?.map((block, index) => {
    if (block.type === "text") {
      return renderTextBlock(heading, block.body, `${sectionId}-text-${index}`);
    }

    if (block.type === "graph") {
      return renderArticleGraphBlock(block.graphKey, block.caption, `${sectionId}-graph-${index}`);
    }

    return null;
  }).filter((block): block is NonNullable<typeof block> => block !== null);
}

export default function ArticleSectionsContainer({
  article,
}: ArticleSectionsContainerProps) {
  return (
    <>
      {article.sections.map((section) => (
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
            )
          }
          layout={section.layout}
          visual={section.visualKey ? renderArticleVisual(section.visualKey) : undefined}
          callout={section.callout ? renderArticleCallout(section.callout) : undefined}
        />
      ))}
    </>
  );
}
