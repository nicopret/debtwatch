import ArticleVisualPanel from "@/components/ui/articleVisualPanelComponent/ArticleVisualPanel";
import type {
  ArticleCallout,
  ArticleData,
  ArticleGraphKey,
  ArticleVisualKey,
} from "@/data/articles/articleTypes";
import BorrowingYieldRatesVisual from "./BorrowingYieldRatesVisual";
import DebtOwnershipBreakdownVisual from "./DebtOwnershipBreakdownVisual";
import DebtSustainabilityChartBlock from "./DebtSustainabilityChartBlock";
import DebtToGdpHeroVisual from "./DebtToGdpHeroVisual";
import DebtInterestVsPublicServicePayVisual from "./DebtInterestVsPublicServicePayVisual";
import G7YieldRateChartBlock from "./G7YieldRateChartBlock";
import G7YieldComparisonVisual from "./G7YieldComparisonVisual";
import GiltYieldRatesHeroVisual from "./GiltYieldRatesHeroVisual";
import InflationLinkedDebtExposureVisual from "./InflationLinkedDebtExposureVisual";
import WelfareIncomeTaxHeroVisual from "./WelfareIncomeTaxHeroVisual";
import WelfareSpendingBreakdownVisual from "./WelfareSpendingBreakdownVisual";
import NhsSpendingBreakdownContainer from "@/containers/budgetContainers/NhsSpendingBreakdownContainer";
import StructuralDebtFlowDiagramContainer from "@/containers/budgetContainers/StructuralDebtFlowDiagramContainer";
import BudgetIncomeSpendingTotalsContainer from "@/containers/budgetContainers/BudgetIncomeSpendingTotalsContainer";
import BudgetReceiptsSpendingHeroContainer from "@/containers/budgetContainers/BudgetReceiptsSpendingHeroContainer";
import GiltYieldPeerFeaturedGraphicContainer from "./GiltYieldPeerFeaturedGraphicContainer";

export function renderArticleVisual(
  visualKey: ArticleVisualKey,
  article?: ArticleData,
) {
  switch (visualKey) {
    case "welfare-income-tax-hero":
      return <WelfareIncomeTaxHeroVisual publicationDate={article?.date} />;
    case "debt-interest-hero":
      return (
        <ArticleVisualPanel
          eyebrow="Debt interest"
          title="Higher rates feed through slowly"
          value="Budget pressure"
          helperText="Market rates move first. Debt-interest costs follow as old debt matures and new debt is issued."
          items={[
            { label: "Inflation-linked bonds", value: "Reprice faster" },
            { label: "Long-dated debt", value: "Rolls over later" },
            { label: "Budget effect", value: "Persistent", tone: "accent" },
          ]}
          accentColor="#c75b5b"
        />
      );
    case "debt-interest-history":
      return (
        <ArticleVisualPanel
          eyebrow="What changed"
          title="The interest bill is no longer a background number"
          value="From low-rate era to rate shock"
          helperText="The combination of higher inflation and higher gilt yields pushed debt interest back into the centre of the fiscal debate."
          items={[
            { label: "Low-rate years", value: "Cheap refinancing" },
            { label: "Inflation shock", value: "Index-linked uplift" },
            { label: "Higher yields", value: "New debt costs more", tone: "accent" },
          ]}
          accentColor="#b85a5a"
        />
      );
    case "debt-interest-budget-share":
      return (
        <ArticleVisualPanel
          eyebrow="Budget trade-off"
          title="More money goes to bondholders before services"
          value="Less room elsewhere"
          helperText="Debt interest competes with public services and tax choices because it has to be paid before discretionary promises can be funded."
          items={[
            { label: "Debt interest", value: "Hard to avoid", tone: "accent" },
            { label: "Services", value: "Pressure point" },
            { label: "Tax cuts", value: "Harder to fund" },
          ]}
          accentColor="#cf6b6b"
        />
      );
    case "debt-interest-vs-public-service-pay":
      return <DebtInterestVsPublicServicePayVisual publicationDate={article?.date} />;
    case "debt-interest-g7-yields":
      return <G7YieldComparisonVisual publicationDate={article?.date} />;
    case "gilt-yield-inflation-linked-debt":
      return <InflationLinkedDebtExposureVisual publicationDate={article?.date} />;
    case "debt-to-gdp-hero":
      return <DebtToGdpHeroVisual publicationDate={article?.date} />;
    case "debt-to-gdp-g7":
      return (
        <ArticleVisualPanel
          eyebrow="Peer context"
          title="The UK sits inside a richer-country comparison"
          value="G7 lens"
          helperText="The site compares the UK with the G7 because similar economies give a fairer read-across than a broad global ranking."
          items={[
            { label: "Highest debt ratio", value: "Japan" },
            { label: "UK read-across", value: "Peer-based" },
            { label: "Why it matters", value: "Credibility", tone: "accent" },
          ]}
          accentColor="#1d4f91"
        />
      );
    case "budget-breakdown-hero":
      return <BudgetReceiptsSpendingHeroContainer publicationDate={article?.date} />;
    case "budget-deficit-gap":
      return <BudgetIncomeSpendingTotalsContainer />;
    case "nhs-spending-breakdown":
      return <NhsSpendingBreakdownContainer publicationDate={article?.date} />;
    case "structural-debt-flow":
      return <StructuralDebtFlowDiagramContainer publicationDate={article?.date} />;
    case "borrowing-hero":
      return (
        <ArticleVisualPanel
          eyebrow="Debt overview"
          value="Comparing debt"
          helperText="Two debt stories shape the UK economy: what households owe, and what the state owes. Side by side, the comparison shows how private borrowing and public debt place very different burdens on each taxpayer."
          items={[
            { kind: "spacer", label: "debt-overview-gap" },
            { kind: "heading", label: "Debt per taxpayer:" },
            {
              label: "Mortgages",
              value: "~£50,000",
              preserveCase: true,
              labelTone: "navy",
              valueTone: "navy",
            },
            {
              label: "Personal loans",
              value: "~£6,000",
              preserveCase: true,
              labelTone: "navy",
              valueTone: "navy",
            },
            {
              label: "Car finance",
              value: "~£2,500",
              preserveCase: true,
              labelTone: "navy",
              valueTone: "navy",
            },
            {
              label: "Credit cards",
              value: "~£2,000",
              preserveCase: true,
              labelTone: "navy",
              valueTone: "navy",
            },
            {
              label: "Government debt",
              value: "~£73,335",
              preserveCase: true,
              labelTone: "amber",
              valueTone: "amber",
            },
          ]}
          accentColor="#b45309"
          valueColor="#17315f"
        />
      );
    case "borrowing-shocks":
      return (
        <ArticleVisualPanel
          eyebrow="Timeline read"
          title="Big borrowing years usually reflect shocks, not one line item"
          value="Crisis years stand out"
          helperText="Financial crises, pandemics and energy-price shocks can move the borrowing line far more than small policy tweaks."
          items={[
            { label: "2009", value: "Financial crisis" },
            { label: "2020", value: "Pandemic peak", tone: "accent" },
            { label: "Afterwards", value: "Partial unwind" },
          ]}
          accentColor="#b45309"
        />
      );
    case "borrowing-yield-rates":
      return <BorrowingYieldRatesVisual publicationDate={article?.date} />;
    case "debt-ownership-breakdown":
      return <DebtOwnershipBreakdownVisual publicationDate={article?.date} />;
    case "welfare-spending-breakdown":
      return <WelfareSpendingBreakdownVisual />;
    case "gilt-yield-hero":
      return <GiltYieldRatesHeroVisual publicationDate={article?.date} />;
    case "gilt-yield-peers":
      return <GiltYieldPeerFeaturedGraphicContainer publicationDate={article?.date} />;
    case "gilt-yield-costs":
      return (
        <ArticleVisualPanel
          eyebrow="Transmission"
          title="Yields influence future interest costs as debt rolls over"
          value="Not instant"
          helperText="The debt stock matures over time. That is why yields can jump today but the budget cost arrives more gradually."
          items={[
            { label: "Today", value: "Yield moves" },
            { label: "Next", value: "New issuance reprices" },
            { label: "Later", value: "Debt-interest bill shifts", tone: "accent" },
          ]}
          accentColor="#c75b5b"
        />
      );
    default:
      return null;
  }
}

export function renderArticleCallout(callout: ArticleCallout) {
  return (
    <div>
      <p style={{ color: "#6b7280", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {callout.label}
      </p>
      <p
        style={{ color: "#17315f", marginTop: "0.35rem", lineHeight: 1.6, fontWeight: 600 }}
        // Callout copy comes from trusted local article config, so inline markup like
        // <b> and <a> can be rendered without a separate rich-text layer.
        dangerouslySetInnerHTML={{ __html: callout.text }}
      />
    </div>
  );
}

export function renderArticleGraphBlock(
  graphKey: ArticleGraphKey,
  caption?: string,
  key?: string,
  article?: ArticleData,
) {
  switch (graphKey) {
    case "uk-debt-growth-borrowing-costs":
      return (
        <DebtSustainabilityChartBlock
          key={key}
          caption={caption}
          publicationDate={article?.date}
        />
      );
    case "uk-gilt-g7-bank-rate":
      return (
        <G7YieldRateChartBlock
          key={key}
          caption={caption}
          publicationDate={article?.date}
        />
      );
    default:
      return null;
  }
}
