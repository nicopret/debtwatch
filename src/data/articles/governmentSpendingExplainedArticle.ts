import type { ArticleData } from "./articleTypes";

export const governmentSpendingExplainedArticle: ArticleData = {
  slug: "where-government-money-goes",
  header: "Where government money goes",
  tagline: "The spending side of the budget in one view",
  date: "15 Feb 2026",
  author: "DebtWatch Research Desk",
  authorBioUrl: "https://debtwatch.uk/sources/",
  description:
    "Public spending is concentrated in a few very large areas: welfare, health, education and the wider day-to-day running of the state.",
  keyTakeaway:
    "Small percentage shifts in big budgets can move the headline deficit a long way.",
  heroVisual: "budget-breakdown-hero",
  previewGraphicKey: "budget-gap-trend",
  featuredGraphicKey: "governmentSpendingTopCategories",
  metricStrip: [
    {
      kind: "static",
      label: "Receipts",
      value: "£1.232T",
      helperText: "OBR 2025-26 forecast",
      tone: "teal",
    },
    {
      kind: "static",
      label: "Spending",
      value: "£1.370T",
      helperText: "OBR 2025-26 forecast",
      tone: "navyblue",
    },
    {
      kind: "static",
      label: "Deficit",
      value: "£138bn",
      helperText: "Gap financed by borrowing",
      tone: "amber",
    },
  ],
  sections: [
    {
      id: "reality-of-government-spending",
      heading: "The reality of government spending",
      body: [
        "Government spending is, at its core, a reflection of where taxpayer money actually goes - but the scale and concentration of that spending are often misunderstood. While public debate tends to focus on smaller, visible areas of expenditure, the reality is that the vast majority of government spending is concentrated in just a handful of categories. As the breakdown shows, a few large commitments - particularly welfare, pensions, and health - dominate the budget, shaping the overall financial position far more than most people realise."
      ],
      visualKey: "budget-deficit-gap",
      layout: "split",
      callout: {
        label: "The gap is covered by debt",
        text: "When government spending exceeds the tax it collects, the difference is known as the deficit. That gap is not covered by savings - it is covered by borrowing. Each year, the UK adds to its debt to fund this shortfall, meaning a portion of today's spending is effectively paid for in the future.",
      },
    }, {
      heading: "The biggest areas of spending",
      id: "biggest-areas-of-spending",
      body: [
        "Looking at the breakdown, government spending is not spread evenly - it is highly concentrated in a small number of major categories. Welfare, state pensions, and health alone account for a substantial share of total expenditure, followed by areas such as education, defence, and, increasingly, debt interest. Together, these top categories dominate the budget, while everything else—often the focus of public debate—makes up a relatively small portion grouped into 'Other'.",
        "What is striking is that, despite repeated attempts to control spending over the past decade, there has been <b>no meaningful reduction in the overall size of the state</b>. While cuts have been made in certain departments or programmes, they have largely been offset by increases elsewhere - particularly in welfare, pensions, and healthcare. The result is that total spending has continued to grow, not shrink. In effect, the structure of the state has remained intact, with the largest spending areas continuing to expand over time, driven by demographics, policy commitments, and rising costs.",
        "This concentration of spending also explains why meaningful reductions are so difficult. The biggest categories are also the most politically and economically sensitive, meaning that adjustments tend to be made at the margins rather than at the core. As the chart shows, focusing on smaller areas will not materially change the overall picture - the scale of government spending is determined by a few dominant commitments, not by the long tail of minor expenditures."
      ]
    }, {
      heading: "Welfare and pensions dominate",
      id: "welfare-and-pensions",
      body: [
        "The largest share of government spending is concentrated in welfare and pensions, making it the single biggest driver of overall expenditure. This includes the state pension, universal credit, disability benefits, and a range of other support payments. Unlike many other areas of spending, these commitments are not easily adjusted year to year - they are structural, demand-led, and tend to grow over time rather than shrink. As a result, social spending has become the dominant force shaping the size and trajectory of the state.",
        "A key factor behind this growth is the design of the state pension, particularly the <b>triple lock</b>. This guarantees that pensions rise each year by the highest of inflation, wage growth, or 2.5%. While it provides certainty for pensioners, it also means that spending continues to increase regardless of the broader economic environment. Over time, this creates a ratchet effect where pension costs rise faster than both inflation and economic growth, placing increasing pressure on public finances.",
        "The wider welfare system adds to this pressure. As eligibility expands and demographic trends shift - particularly with an ageing population - the number of people receiving support increases. Without structural reform, these costs are difficult to contain. The result is a system where the largest area of government spending is effectively on autopilot, growing year after year and limiting the government's ability to reduce overall expenditure or redirect resources elsewhere."
      ]
    }, {
      heading: "Health spending (NHS)",
      id: "health-spending",
      body: [
        "Health spending is the second major pillar of government expenditure, with the NHS accounting for a substantial share of the budget. Like welfare and pensions, it is under constant upward pressure. An ageing population increases demand for long-term and complex care, while advances in treatment, rising staffing costs, and higher expectations all contribute to a system where spending tends to grow year after year. Unlike other areas of government, healthcare demand is not easily controlled, making it one of the most persistent drivers of higher expenditure.",
        "That said, there are areas where costs could be better managed without reducing the quality of care. Administrative overheads and management layers have expanded over time, and streamlining these could deliver efficiencies. Procurement is another area of concern - large organisations often pay more than necessary due to fragmented purchasing systems, and centralised or more competitive procurement could reduce costs. There is also a strong case for improving how services are delivered, particularly by shifting focus toward preventative care and early intervention, which can reduce the need for more expensive treatments later on.",
        "Technology and productivity also play a key role. Better use of digital systems, improved data sharing, and more efficient workforce management could help reduce duplication and delays across the system. While the NHS will always require significant funding, the challenge is not just how much is spent, but how effectively it is used. Without reforms to improve efficiency, increased funding alone will continue to be absorbed by rising demand, leaving the underlying cost pressures unresolved."
      ],
      visualKey: "nhs-spending-breakdown",
      layout: "split-reverse",
    }, {
      heading: "Debt interest",
      id: "debt-interest",
      body: [
        "Debt interest deserves special attention because, unlike most other areas of spending, it does not directly provide a public service or build a productive asset. It is the cost of servicing past borrowed money that must be paid to investors simply because the government has accumulated debt over time. In that sense, it is one of the clearest examples of <b>non-productive spending</b> in the budget. It does not fund hospitals, schools, roads, or defence capability. It is the price of carrying decisions already made.",
        "That is what makes debt interest so significant. As the debt stock grows and borrowing costs rise, a larger share of government revenue is diverted into meeting these payments. This leaves less room for everything else: tax reductions, public investment, or even maintaining existing services. Unlike many other spending categories, debt interest is also highly sensitive to conditions outside direct government control. If gilt yields rise, or inflation pushes up the cost of index-linked debt, the interest bill can increase quickly without any change in policy or service provision.",
        "The red bar in the chart matters because it captures this trade-off in a single figure. Debt interest is not just another budget line - it is a sign of how much of the state's income is being consumed by the legacy of past borrowing. The more that goes on interest, the less flexibility the government has elsewhere. Over time, if left unchecked, it becomes a drag on the entire fiscal position, crowding out productive uses of money and making it harder to restore balance to the public finances."
      ]
    }, {
      heading: "The structural problem",
      id: "structural-problem",
      body: [
        "Government spending continues to rise not because of a single policy choice, but because of deeper structural forces that reinforce one another. Demographics play a central role: as the population ages, more people draw on the state pension and require greater healthcare support, pushing up costs in the largest areas of the budget. At the same time, the scope of the state has expanded over time, with broader welfare provision and higher expectations for public services. Even where cuts are made in specific areas, they are often offset by increases elsewhere, meaning the overall size of spending continues to grow.",
        "This is then compounded by debt. As borrowing increases, so too does the cost of servicing that debt. Higher interest payments add another layer of expenditure that must be met each year, regardless of policy priorities. The result is a reinforcing cycle: rising spending leads to borrowing, borrowing increases debt, and higher debt feeds back into even higher spending through interest costs. These pressures are not temporary - they are built into the system itself.",
        "What this creates is a persistent mismatch between what the government spends and what it raises in revenue. The deficit is no longer a short-term issue but a structural feature of the public finances, requiring continuous borrowing to sustain current levels of spending."
      ],
      visualKey: "structural-debt-flow",
      layout: "split",
      callout: {
        label: "The imbalance at the core",
        text: "The UK is not balancing its books - spending consistently exceeds revenue, and the gap is filled with debt. This structural deficit is what drives the long-term rise in borrowing, debt, and interest costs."
      }
    }, {
      heading: "What can realistically be cut?",
      id: "what-can-be-cut",
      body: [
        "When discussing government spending, it is easy to focus on smaller, highly visible areas such as foreign aid or administrative costs. While these areas can and should be reviewed, they represent only a small fraction of total expenditure. Cutting them may produce political headlines, but it does not materially change the overall fiscal position. The scale of government spending is driven by much larger commitments, and it is within these that any meaningful savings must be found.",
        "The reality is that the biggest areas of spending - pensions, welfare, and health - are also the most difficult to reform. They are deeply embedded in the structure of the state and affect millions of people directly. However, without addressing these core categories, it is not possible to significantly reduce overall spending. Focusing only on the margins creates the illusion of control, while the underlying drivers of expenditure continue to grow.",
        "This does not necessarily mean cutting services outright, but it does require structural reform. In pensions, this could mean revisiting mechanisms such as the triple lock to better align increases with economic conditions. In welfare, it may involve tightening eligibility, improving incentives to work, and ensuring that support is targeted effectively. In healthcare, the focus should be on efficiency - reducing administrative overhead, improving procurement, and increasing productivity within the system. These are complex changes, but they are where the real opportunities lie.",
        "Crucially, any strategy aimed at economic growth or tax reduction must be balanced with credible savings. Without this, lower taxes or increased spending simply translate into higher borrowing, adding further pressure to the debt and interest bill. Markets will not respond to policy intentions alone - they respond to outcomes. A plan that combines growth with discipline is far more likely to succeed than one that relies on growth to solve structural imbalances on its own.",
        "The key insight is straightforward: meaningful change requires engaging with the largest areas of spending. Smaller cuts may contribute at the margins, but they cannot deliver the scale of adjustment needed. If the goal is to stabilise the public finances and reduce reliance on debt, then reform must begin where the money is actually spent."
      ]
    }, {
      heading: "The role of economic growth",
      id: "role-of-economic-growth",
      body: [
        "Ultimately, economic growth is the only sustainable way to improve the public finances without continually raising taxes or cutting essential services. While spending control is necessary, it can only go so far. Growth increases the size of the economy itself, which expands the tax base. More people in work means more income tax and national insurance contributions, while higher wages increase overall receipts without changing tax rates. At the same time, stronger business activity boosts corporation tax and VAT revenues, creating a broader and more resilient fiscal position.",
        "This is particularly important in the context of the UK's current structure. With large, demand-driven spending commitments such as pensions, welfare, and healthcare, the pressure on public finances will continue to rise. Without growth, these costs must be met either through higher taxes or increased borrowing. Growth, however, changes that equation. It allows the same level of spending to become more affordable over time, reducing the relative burden of debt and easing pressure on the deficit.",
        "Energy policy plays a central role in this. Cheap and reliable energy lowers the cost base for both households and businesses, improving competitiveness and supporting investment. For industry, energy costs are often a decisive factor in where production takes place. If the UK can provide a more attractive energy environment - through increased domestic supply and reduced structural costs - it can draw investment, support manufacturing, and strengthen its economic base. This feeds directly into higher employment and stronger tax revenues.",
        "Alongside energy, a coherent industrial strategy is essential. This includes creating an environment where businesses can invest, expand, and operate efficiently. Reducing unnecessary regulation, improving access to capital, and making the UK an attractive place to locate headquarters and production all contribute to long-term growth. Importantly, this kind of growth is not driven by government spending, but by enabling private sector activity that generates sustainable income and tax receipts.",
        "The key point is that growth and fiscal discipline must work together. Growth on its own cannot solve a structural deficit if spending continues to outpace revenue, but without growth, the options become increasingly limited. A strategy that combines controlled spending with policies that lower costs, encourage investment, and expand the workforce offers the most credible path to improving the public finances over the long term."
      ]
    }, {
      heading: "The cost of doing nothing",
      id: "the-cost-of-nothing",
      body: [
        "If current trends continue, the direction of travel is clear. Spending will keep rising, driven by pensions, welfare, healthcare, and interest costs, while revenues struggle to keep pace. The result is higher borrowing year after year, adding to an already large debt stock. This is not a one-off problem — it compounds over time, with each year's deficit becoming part of the next year's burden.",
        "As debt increases, so does the cost of servicing it. Higher interest payments take up a growing share of government revenue, leaving less available for public services, investment, or tax relief. This creates a feedback loop: rising debt leads to higher interest, which increases spending further, requiring more borrowing. Over time, this reduces flexibility and makes it harder for governments to respond to economic shocks or changing priorities.",
        "Left unchecked, this path leads to a gradual loss of control over the public finances. The government becomes increasingly dependent on borrowing, and more of its income is consumed by past obligations rather than current needs. Without a shift in policy - both on spending and on growth - the system does not stabilise on its own. It becomes more constrained, more expensive, and more difficult to manage."
      ],
      callout: {
        label: "The path we are on",
        text: "If nothing changes, borrowing rises, debt grows, and interest costs take an ever larger share of the budget. What begins as a manageable gap becomes a structural burden that limits every future decision."
      }
    }
  ],
  sources: [
    {
      label: "OBR public finances databank",
      note: "Used for total receipts, total spending and the main spending-category values shown in the featured graphic, as well as deficit and borrowing context.",
    },
    {
      label: "OBR brief guide to the public finances",
      note: "Used to derive and cross-check the residual spending split that feeds the featured graphic's ranked categories and overall fiscal structure.",
    },
    {
      label: "ONS public sector finances",
      note: "Used for monthly borrowing, debt stock levels and interest-cost outturns referenced throughout the article, including deficit and structural pressure context.",
    },
    {
      label: "HM Treasury public spending statistics",
      note: "Used for functional breakdown of government expenditure and to support category-level comparisons across welfare, pensions, health and other major spending areas.",
    },
    {
      label: "NHS England annual report and accounts / DHSC budget documents",
      note: "Used for the NHS spending donut, grouped into staff, procurement, medicine, primary care, infrastructure, legal costs and other using the latest full-year mix available by February 2026.",
    },
    {
      label: "UK Debt Management Office financing remit",
      note: "Used for gilt issuance, refinancing volumes and debt rollover context in the structural debt flow diagram.",
    },
    {
      label: "OBR economic and fiscal outlook",
      note: "Used for forward-looking context on debt interest, spending pressures and the sensitivity of public finances to growth and interest rates.",
    },
    {
      label: "ONS national accounts (GDP and labour market data)",
      note: "Used for economic growth, employment and tax-base context supporting the discussion on how growth impacts public finances.",
    },
    {
      label: "OBR public finances databank / UK Debt Management Office financing remit / ONS debt-interest outturns",
      note: "Used for the structural debt flow diagram, which rounds February 2026 article-safe values for rollover, new borrowing, inflation-linked uplift and annual interest payments.",
    },
  ],
  relatedArticleSlugs: [
    "debt-interest-explained",
    "borrowing-over-time",
    "how-debt-to-gdp-works",
    "why-gilt-yields-matter",
  ],
};
