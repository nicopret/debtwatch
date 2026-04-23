import type { ArticleData } from "./articleTypes";
import { STORE_METRIC_HELPER_TEXT } from "./storeMetricHelperText";

export const welfareBillOvertakesIncomeTaxArticle: ArticleData = {
  slug: "welfare-bill-overtakes-income-tax",
  header: "The UK's welfare bill has overtaken its main tax base",
  tagline: "Temporary placeholder: this article stub will be expanded into a full DebtWatch explainer.",
  date: "15 Apr 2026",
  author: "DebtWatch Research Desk",
  authorBioUrl: "https://debtwatch.uk/sources/",
  description:
    "The UK now spends more on benefits than it raises from income tax. This article explains how that shift happened, what it reveals about the structure of the public finances, and why it matters for borrowing, growth, and long-term fiscal sustainability.",
  keyTakeaway:
    "When a major area of spending grows faster than a major source of revenue, the gap has to be filled through borrowing, higher taxes, or structural change.",
  heroVisual: "welfare-income-tax-hero",
  previewGraphicKey: "welfare-income-tax-trend",
  metricStrip: [
    {
      kind: "store",
      metricKey: "annualBorrowing",
      label: "Annual borrowing",
      helperText: STORE_METRIC_HELPER_TEXT.annualBorrowing,
      tone: "teal",
    },
    {
      kind: "store",
      metricKey: "totalDebt",
      label: "Total debt",
      helperText: STORE_METRIC_HELPER_TEXT.totalDebt,
      tone: "navyblue",
    },
    {
      kind: "store",
      metricKey: "debtToGdp",
      label: "Debt / GDP",
      helperText: STORE_METRIC_HELPER_TEXT.debtToGdp,
      tone: "amber",
    },
  ],
  sections: [
    {
      id: "headline-fact",
      heading: "The headline fact",
      body: [
        "The UK now spends more on benefits than it raises from income tax. That is a simple comparison, but it highlights something important about the structure of the public finances.",
        "Benefits cover a wide range of payments, including the state pension, working-age support, and disability-related payments. Income tax, by contrast, is one of the government's largest and most stable sources of revenue, tied directly to wages and employment.",
        "When one of the biggest areas of spending overtakes one of the biggest sources of tax revenue, it is no longer a marginal shift. It reflects a change in the balance between what the state collects and what it pays out.",
      ],
      visualKey: "welfare-spending-breakdown",
      layout: "split",
    },
    {
      id: "welfare-bill-contents",
      heading: "What the welfare bill actually includes",
      body: [
        "It is easy to hear “benefits” and picture a single type of payment, often associated with unemployment or short-term support. In reality, the welfare bill is made up of several large and distinct categories, each designed to support different parts of the population. These range from long-term, age-related payments to income top-ups, housing support, and assistance linked to health and disability. Treating it as a single block of spending can obscure how varied—and how structurally embedded—these payments are within the wider system.",
        "The largest component by some distance is the state pension, which reflects the size and age of the UK population rather than the economic cycle. Alongside it are disability and health-related payments, which have grown in recent years as more people report long-term conditions or remain out of the workforce for health reasons. There is also working-age income support, which responds more directly to employment conditions and wage levels, as well as housing support and family-related benefits that are shaped by rents, household incomes, and demographic trends.",
        "Taken together, these categories form one of the largest and most complex areas of government spending. What matters is that the total is not driven by a single policy decision or short-term factor, but by a combination of demographic change, health trends, labour market conditions, and the design of the system itself. That makes the overall level of spending harder to adjust quickly, and more likely to reflect deeper pressures in the economy rather than temporary fluctuations."
      ]
    },
    {
      id: "how-we-got-here",
      heading: "How we got here",
      body: [
        "The crossover between benefits spending and income tax receipts has not happened suddenly. It reflects a combination of longer-term trends that have been building over time, particularly on the spending side. The most significant of these is the rising cost of the state pension, driven by an ageing population and policies that link payments to inflation or earnings. Alongside this, disability and health-related benefits have increased, as more people report long-term conditions or remain outside the workforce for health reasons. These are not short-term fluctuations, but structural pressures that tend to push spending higher over time.",
        "At the same time, income tax receipts have not grown as quickly as might be expected. While employment levels have been relatively strong, wage growth in real terms has been weaker, which limits how fast income tax revenues can rise. Productivity growth has also been subdued, constraining earnings across the economy. Policies such as frozen thresholds have increased the tax take at the margin, but they do not fully offset the broader effect of slower income growth. The result is that the tax base has expanded more slowly than some of the spending it is helping to fund.",
        "More recent events have reinforced these underlying trends. The pandemic and the cost of living shock led to higher levels of support across the system, some of which have not fully unwound. In many cases, temporary measures set a higher baseline for future spending, while economic disruption affected both incomes and labour market participation. Taken together, these factors have shifted the balance between what the state collects and what it spends, making the crossover between benefits and income tax less surprising when viewed in a longer-term context."
      ]
    },
    {
      id: "why-this-matters",
      heading: "Why this matters for the deficit",
      body: [
        "The fact that benefits spending is comparable to, or exceeds, income tax receipts does not mean that one directly funds the other. Government finances do not work like a household budget, with specific taxes assigned to specific types of spending. But comparisons like this still matter, because they reveal the underlying balance of the system.",
        "When a major category of spending grows faster than a major source of revenue, the gap has to be filled somewhere else. In practice, that usually means relying more heavily on other taxes or on borrowing. If this pattern persists over time, it contributes to structural deficits, where the government is consistently spending more than it raises even outside of crisis periods.",
        "This is where the connection to borrowing becomes clear. Persistent gaps between large areas of spending and revenue increase the need for the government to borrow year after year, adding to the overall debt stock and future interest costs. As explored in <a href=\"/articles/borrowing-over-time\">Borrowing over time</a>, this kind of sustained imbalance is what turns short-term pressures into long-term fiscal challenges."
      ]
    },
    {
      id: "common-misunderstanding",
      heading: "The common misunderstanding",
      body: [
        "A common reaction to comparisons like this is to point out that the government raises revenue from many different taxes, not just income tax. That is true. The UK collects money through National Insurance, VAT, corporation tax, and a range of smaller taxes, and these all contribute to funding overall spending. In that sense, it would be misleading to suggest that income tax alone is responsible for paying for benefits, or that the system can be understood as a direct one-to-one relationship between specific taxes and specific types of spending.",
        "But that does not mean the comparison is meaningless. Looking at benefits spending alongside income tax receipts is not about assigning one to fund the other, but about understanding the structure of the public finances. Income tax is one of the largest and most stable sources of revenue, closely tied to wages and employment. Benefits are one of the largest areas of spending, influenced by demographics, health, and economic conditions. When two core pillars of the system move out of balance with each other, it highlights where pressure is building.",
        "What matters here is relative scale and direction over time. If a major spending category is growing faster than a major revenue source, the gap has to be absorbed elsewhere in the system, either through other taxes or through borrowing. Even if the overall budget is supported by multiple revenue streams, persistent divergence between large components can still signal a structural issue. It suggests that the underlying drivers of spending and revenue are not aligned, which can make the system harder to stabilise without adjustment.",
        "This is similar to how other fiscal metrics are used. As with <a href=\"/articles/how-debt-to-gdp-works\">How debt-to-GDP works</a>, the value is not in treating a single ratio or comparison as definitive, but in what it reveals about trends and constraints. The comparison between benefits and income tax does not tell the whole story, but it does point to an important one: that some of the largest parts of the budget are evolving in ways that put increasing pressure on the overall balance."
      ]
    },
    {
      id: "growth-is-central",
      heading: "Why growth is central",
      body: [
        "At the centre of this story is economic growth. Over time, stronger growth tends to lift wages, increase employment, and expand the tax base, which feeds directly into higher income tax receipts. At the same time, it can reduce pressure on parts of the welfare system, as more people move into work or see their incomes rise. This combination—higher revenues and lower spending pressure—is what makes growth such a powerful force in improving the public finances.",
        "The opposite is also true. When growth is weak, wages tend to rise more slowly in real terms, limiting how quickly income tax receipts can increase. At the same time, weaker economic conditions can increase demand for certain types of support, particularly those linked to low income or labour market participation. Even where spending does not rise sharply, it can remain elevated, while the tax base struggles to keep pace.",
        "This dynamic matters even more in the current context, where the UK’s growth outlook has been repeatedly revised down. Forecasts from organisations such as the <b>IMF</b> have pointed to weaker expected growth than previously assumed, reflecting a combination of domestic constraints and global conditions. Slower growth makes it harder for revenues to catch up with spending, and increases the risk that existing imbalances persist rather than correcting over time.",
        "As explored in <a href=\"/articles/how-debt-to-gdp-works\">How debt-to-GDP works</a>, growth plays a central role in determining whether fiscal pressures ease or intensify. If the economy expands faster than the costs associated with borrowing and spending, the system becomes more manageable. If it does not, the pressure builds. In that sense, the relationship between benefits and income tax is not just about current levels, but about how the economy evolves over time."
      ]
    },
    {
      id: "the-adjustment-path",
      heading: "What are the adjustment paths",
      body: [
        "If the gap between large areas of spending and revenue persists, it does not resolve itself. Over time, it has to be addressed through some combination of higher taxes, slower growth in spending, faster economic growth, or continued borrowing. These are not ideological choices so much as accounting realities, reflecting the basic constraint that governments cannot indefinitely spend more than they raise without consequences.",
        "In practice, each of these paths comes with trade-offs. Raising taxes can increase revenues, but may weigh on economic activity or household incomes. Slowing the growth of spending can reduce pressure on the budget, but is often difficult where costs are driven by demographics or health needs. Stronger growth offers the most sustainable route, but is also the hardest to deliver quickly. That leaves borrowing as the most flexible option in the short term, particularly when immediate adjustments are politically or economically difficult.",
        "But relying on borrowing does not remove the pressure, it shifts it forward. Persistent borrowing adds to the overall debt stock and increases future interest costs, which in turn become another call on public spending. As explained in <a href=\"/articles/debt-interest-explained\">Debt interest explained</a>, higher debt and higher borrowing costs can create a feedback loop that makes the system more constrained over time. What begins as a short-term solution can therefore become a longer-term source of pressure."
      ]
    },
    {
      id: "conclusion",
      heading: "Conclusion",
      body: [
        "The fact that benefits spending is comparable to, or exceeds, income tax receipts is not just a striking comparison. It reflects a deeper shift in the structure of the public finances, where some of the largest and most persistent areas of spending are growing under pressures that are not easily reversed. Demographics, health trends, and economic conditions are all shaping the trajectory of the welfare bill, while the tax base depends heavily on wages and growth that have been slower to recover. Viewed in that context, the crossover is less an anomaly and more a signal of how the system is evolving.",
        "A system where major spending commitments outgrow major revenue streams can continue for a time, but only by leaning more heavily on borrowing or by forcing adjustments elsewhere. Over the longer term, that raises difficult choices about taxes, spending, and growth, none of which can be avoided indefinitely. The path the UK takes will depend on how these pressures are managed, but the underlying constraint remains the same: the balance between what the state collects and what it spends ultimately has to hold."
      ]
    }
  ],
  sources: [
    {
      label: "Office for National Statistics | Public sector finances",
      url: "https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance/datasets/publicsectorfinances/current",
      note: "Supports the hero comparison between income tax receipts and net social benefits, and the wider context on borrowing, debt, debt-to-GDP and debt-interest metrics used around the article.",
    },
    {
      label: "Office for Budget Responsibility | Economic and fiscal outlook",
      url: "https://obr.uk/efo/economic-and-fiscal-outlook-march-2026/",
      note: "Provides fiscal-outlook context for welfare pressures, borrowing and the broader budget framework referenced in the article.",
    },
    {
      label: "Department for Work and Pensions | Benefit expenditure and caseload statistics",
      url: "https://www.gov.uk/government/collections/benefit-expenditure-and-caseload-tables",
      note: "Used for welfare-composition context, including the role of pensions, disability-related support and other major benefit categories discussed in the text and section visual.",
    },
    {
      label: "HM Revenue & Customs | Income tax statistics",
      url: "https://www.gov.uk/government/collections/income-tax-statistics-and-distributions",
      note: "Supports the article's explanation of income tax as a core revenue base and gives background on how that tax base is structured.",
    },
    {
      label: "International Monetary Fund | World Economic Outlook",
      url: "https://www.imf.org/en/Publications/WEO",
      note: "Used for the weaker-growth and downgraded growth-outlook framing referenced in the section on why growth is central.",
    },
  ],
  relatedArticleSlugs: [
    "where-government-money-goes",
    "borrowing-over-time",
    "debt-interest-explained",
    "how-debt-to-gdp-works",
  ],
};
