# DebtWatch New Article Context Overview

Use this document as the starting context for a fresh ChatGPT session that needs to draft a new DebtWatch article or prepare the content/config needed to add one to the site.

## 1. What This Project Is

DebtWatch is a Next.js site of source-led explainers about UK public finances. The project combines:

- hand-written long-form articles
- data-backed metrics and charts
- shareable article visuals and embeds
- update scripts that regenerate local JSON data from source datasets

The site is not a general news site. It publishes explanatory, argument-led articles about:

- government borrowing
- debt interest
- debt-to-GDP
- gilt yields
- government spending structure

The editorial stance is broadly:

- explain public-finance concepts in plain English
- connect headline debt numbers to growth, borrowing costs, and fiscal sustainability
- emphasise that persistent borrowing and weak growth create long-term pressure
- treat debt interest as a real budget trade-off
- favour growth, productive investment, and fiscal discipline over routine debt dependence

The tone is not academic or neutral-institutional. It is explanatory and evidence-based, but it often reaches a clear conclusion.

## 2. Existing Articles

Current live article set:

- `borrowing-over-time`
  - Header: `Borrowing over time`
  - Focus: what borrowing is, why governments borrow, how debt accumulates, debt sustainability, and the argument that growth should replace debt dependence.
- `debt-interest-explained`
  - Header: `Debt interest explained`
  - Focus: why servicing debt now costs much more, how yields feed into interest costs, and why interest is a budget constraint.
- `how-debt-to-gdp-works`
  - Header: `How debt-to-GDP works`
  - Focus: what the ratio means, why it helps, where it fails, and why growth vs borrowing cost matters more than the ratio alone.
- `where-government-money-goes`
  - Header: `Where government money goes`
  - Focus: receipts vs spending, major spending categories, structural pressures, and why the deficit is not a marginal problem.
- `why-gilt-yields-matter`
  - Header: `Why gilt yields matter`
  - Focus: what gilt yields are, what moves them, and why they matter for borrowing costs, confidence, mortgages, and the wider economy.

These articles cross-link heavily and should be treated as one connected editorial set.

## 3. How Articles Are Stored

Articles are not written in Markdown files. They are TypeScript objects in:

- `src/data/articles/*.ts`

Each article exports an `ArticleData` object and is registered in:

- `src/data/articles/index.ts`

The article schema is defined in:

- `src/data/articles/articleTypes.ts`

Core required fields:

- `slug`
- `header`
- `tagline`
- `date`
- `author`
- `authorBioUrl`
- `description`
- `keyTakeaway`
- `heroVisual`
- `metricStrip`
- `sections`
- `sources`
- `relatedArticleSlugs`

Optional but important fields:

- `publishedSnapshotVersion`
- `shareText`
- `previewGraphicKey`
- `previewGraphicPosition`
- `featuredGraphicKey`

## 4. Important Rendering Rules

The site renders article text from arrays of strings. Those strings can include limited inline HTML. Existing content uses:

- `<b>...</b>`
- `<a href="/articles/...">...</a>`

There is no separate rich-text CMS layer. Keep prose compatible with simple inline HTML only.

Sections can include:

- plain body text
- a side visual (`visualKey`)
- mixed text/graph blocks (`entities` or `blocks`)
- a callout box
- layout hints: `stacked`, `split`, `split-reverse`

The article page is assembled by:

- `src/containers/articleContainers/ArticlePageContainer.tsx`

Hero visuals, section visuals, featured graphics, metric strips, and related articles are all driven from the article config object.

## 5. Date Handling Matters

The article `date` is not cosmetic only.

Publication-date helpers in:

- `src/lib/articlePublicationDate.ts`
- `src/store/selectors/metricsSelectors.ts`

use the article date to cap data shown in metrics, timelines, preview graphics, and visuals to values on or before the article's publication month.

Implication:

- if the article date is `15 Apr 2026`, article-safe data should not rely on May 2026 or later values
- the date should match the intended editorial snapshot

If a piece needs a fixed historic visual snapshot, use `publishedSnapshotVersion` in `YYYYMMDD` form.

## 6. Metrics Already Available

The metric strip can use existing store-backed metrics with these keys:

- `annualInterestPayment`
- `monthlyInterestPayable`
- `tenYearGiltYield`
- `debtToGdp`
- `annualBorrowing`
- `totalDebt`

It can also use static metrics written directly into the article config.

Store-backed metrics are resolved in:

- `src/containers/articleContainers/ArticleMetricStripContainer.tsx`

## 7. Existing Visual/Graphic System

Hero visuals and section visuals are selected from `ArticleVisualKey` values and rendered via:

- `src/containers/articleContainers/articleVisualRegistry.tsx`

Featured graphics are selected from `ArticleFeaturedGraphicKey` values and rendered via:

- `src/containers/articleContainers/articleFeaturedGraphicRegistry.tsx`

Article preview cards on the article index use `previewGraphicKey` and:

- `src/containers/articleContainers/articlePreviewGraphicRegistry.tsx`

If a new article can reuse an existing visual family, that is simpler than creating new keys.

If a new article needs new visuals, the implementation usually requires updates to:

- `src/data/articles/articleTypes.ts`
- `src/containers/articleContainers/articleVisualRegistry.tsx`
- `src/containers/articleContainers/articleFeaturedGraphicRegistry.tsx`
- `src/containers/articleContainers/articlePreviewGraphicRegistry.tsx`
- `src/data/embeds/articleVisualEmbedRegistry.ts`

## 8. Source Conventions

Each article has a `sources` array with:

- `label`
- optional `url`
- optional `note`

Existing articles usually do not cite every source inline in the body. Instead they:

- make source-backed claims in the prose
- list the relevant source families at the end
- describe what each source was used for

The main source families already used across the site are:

- Office for National Statistics
- Office for Budget Responsibility
- Bank of England
- UK Debt Management Office
- OECD
- IMF
- HM Treasury
- NHS England / DHSC
- DWP
- HMRC

The site-wide sources page lives at:

- `src/app/(site)/sources/page.tsx`

## 9. Editorial Style To Match

When drafting a new article, match these patterns:

- Plain-English opening that defines the concept quickly.
- Strong but readable headline, tagline, description, and key takeaway.
- 6 to 10 sections is normal.
- Paragraph-led structure, usually 2 to 4 sentences per paragraph.
- Use bold selectively for key concepts.
- Tie arguments back to growth, borrowing cost, debt structure, investor confidence, fiscal room, or spending trade-offs.
- Use UK framing and UK spelling.
- Cross-link to related DebtWatch articles where natural.
- Avoid vague optimism. Existing articles usually end with a policy or strategic conclusion.

The house style is explanatory first, persuasive second. It should not read like party-political messaging, but it is not purely detached either.

## 10. Repeated Themes Across The Site

A new article should usually fit into this broader narrative:

- Debt is a stock; borrowing and interest are flows.
- Debt-to-GDP gives context but is not the whole story.
- Borrowing costs matter because debt rolls over over time.
- High interest costs crowd out other uses of public money.
- Growth is the sustainable way to improve fiscal resilience.
- Structural deficits are more serious than one-off crisis borrowing.
- Debt structure, maturity, inflation exposure, and investor demand matter.

If the new topic does not connect clearly to that framework, it may feel out of place with the existing editorial set.

## 11. What A New Article Should Deliver

A good new DebtWatch article should provide:

- a clear explainer for one public-finance concept
- a strong argument for why it matters now
- a small number of data-backed anchor points
- a visual/metric structure that fits the existing article system
- source notes that explain what evidence supports the article
- internal links to related existing articles

## 12. Practical Build Steps To Add A New Article

If the drafting task also includes implementation in the repo, the normal flow is:

1. Create a new file in `src/data/articles/` exporting an `ArticleData` object.
2. Register it in `src/data/articles/index.ts`.
3. Choose an existing `heroVisual`, `previewGraphicKey`, and optional `featuredGraphicKey`, or add new ones if needed.
4. Add any new visual/embed registry entries if the article uses shareable visuals.
5. Set sensible `relatedArticleSlugs` using current article slugs.
6. Make sure the `date` matches the intended data cutoff month.
7. Verify the article renders at `/articles/[slug]`.

## 13. Suggested Content Skeleton For A New Article

Use this shape unless there is a strong reason not to:

- Hero
  - Header
  - Tagline
  - Description
  - Key takeaway
  - 3 metric-strip items
- Section 1
  - Define the concept simply
- Section 2
  - Explain mechanics
- Section 3
  - Explain why it matters for the UK
- Section 4
  - Show a comparison, risk, or transmission channel
- Section 5
  - Explain the main misunderstanding or weakness in the common framing
- Section 6
  - Conclude with strategic implications, usually around growth, fiscal discipline, debt structure, or budget pressure
- Sources
  - List source families and what each one supports

## 14. Constraints For A Fresh ChatGPT Session

If you are using this as context for a new ChatGPT conversation, assume the model should:

- draft content in the shape of a new `ArticleData` object
- preserve DebtWatch's existing editorial voice
- avoid inventing unsupported statistics
- only include precise numbers if they are already provided or explicitly sourced
- keep inline formatting limited to simple HTML tags already used in the repo
- prefer reusing existing visuals unless asked to design a new one
- include source notes explaining the role of each source

## 15. Minimal Repo References

Most important files for creating a new article:

- `src/data/articles/articleTypes.ts`
- `src/data/articles/index.ts`
- `src/data/articles/borrowingExplainedArticle.ts`
- `src/data/articles/debtInterestExplainedArticle.ts`
- `src/data/articles/debtToGdpExplainedArticle.ts`
- `src/data/articles/governmentSpendingExplainedArticle.ts`
- `src/data/articles/giltYieldsExplainedArticle.ts`
- `src/containers/articleContainers/articleVisualRegistry.tsx`
- `src/containers/articleContainers/articleFeaturedGraphicRegistry.tsx`
- `src/containers/articleContainers/articlePreviewGraphicRegistry.tsx`
- `src/data/embeds/articleVisualEmbedRegistry.ts`
- `src/lib/articlePublicationDate.ts`
- `src/store/selectors/metricsSelectors.ts`

## 16. Short Prompt You Can Reuse

If needed, use this prompt in a fresh chat:

`You are drafting a new DebtWatch article for a Next.js project where articles are stored as ArticleData TypeScript objects. Match the existing editorial voice: plain-English, source-led, UK public-finance focused, and willing to draw clear conclusions about debt, borrowing costs, growth, and fiscal sustainability. Use simple inline HTML only where helpful (<b>, <a>). Structure the article like the existing DebtWatch pieces with headline, tagline, description, key takeaway, metric strip, 6-10 sections, sources, and relatedArticleSlugs. Reuse existing visuals if possible. Do not invent unsupported precise figures.`
