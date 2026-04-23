import type { ArticleData } from "./articleTypes";

export const giltYieldsExplainedArticle: ArticleData = {
  slug: "why-gilt-yields-matter",
  header: "Why gilt yields matter",
  tagline: "The market price of government borrowing",
  date: "15 Dec 2025",
  publishedSnapshotVersion: "20251215",
  author: "DebtWatch Research Desk",
  authorBioUrl: "https://debtwatch.uk/sources/",
  description:
    "What are gilt yields and why do they matter? A clear guide to UK government bond yields, borrowing costs, mortgages, inflation and the wider economy.",
  keyTakeaway:
    "Gilt yields are the market price of government borrowing. When they rise, refinancing debt becomes more expensive and the effects can spread into mortgages, business borrowing and economic confidence.",
  heroVisual: "gilt-yield-hero",
  previewGraphicKey: "gilt-yield-peer-trend",
  featuredGraphicKey: "giltYieldPeers",
  metricStrip: [
    {
      kind: "store",
      metricKey: "tenYearGiltYield",
      label: "UK 10-year gilt",
      helperText: "Bank of England yield curve",
      tone: "neutral",
    },
    {
      kind: "store",
      metricKey: "annualInterestPayment",
      label: "Debt interest / year",
      helperText: "Fiscal cost on the budget",
      tone: "amber",
    },
    {
      kind: "store",
      metricKey: "debtToGdp",
      label: "Debt / GDP",
      helperText: "Stock relative to the economy",
      tone: "navyblue",
    },
  ],
  sections: [
    {
      id: "what-are-gilt-yields",
      heading: "What are gilt yields?",
      body: [
        "Gilt yields are the interest rates investors demand to lend to the UK government. Gilts are simply <b>UK government bonds</b>, and the yield is the return investors expect at the bond's current market price. That makes gilt yields one of the clearest ways to understand the <b>cost of government borrowing</b>.",
        "They matter because the UK does not borrow once and stop. Debt matures, new debt is issued, and existing debt is refinanced over time. When <b>UK gilt yields</b> rise, the government faces a higher price for borrowing in financial markets. That can affect debt-interest costs, fiscal choices and wider confidence in the public finances.",
        "Gilt yields are also useful because they pull together several big forces at once: inflation expectations, Bank of England interest rates, growth prospects and investor confidence. If you want a plain-English guide to <b>UK government bond yields</b>, the key point is simple: they are not just a market number. They influence how expensive it is for the state to keep borrowing.",
      ],
      visualKey: "gilt-yield-inflation-linked-debt",
      layout: "split",
    },
    {
      id: "prices-and-yields",
      heading: "Why do gilt prices and yields move in opposite directions?",
      body: [
        "Bond prices and bond yields move inversely. If the market price of a gilt falls, the fixed payments attached to that bond represent a higher return relative to the lower purchase price, so the yield rises. If the price rises, the yield falls.",
        "This is one of the most important ideas in the bond market. It explains why a sell-off in gilts usually means <b>rising yields</b>, and why people often ask why gilt yields rise when prices fall. The coupon on an existing bond does not change, but the price investors are willing to pay for it does.",
        "That relationship matters because markets reprice government bonds constantly. When investors become more worried about inflation, interest rates or fiscal policy, gilt prices can fall and yields can rise quickly.",
      ],
    },
    {
      id: "what-drives-gilt-yields",
      heading: "What drives UK gilt yields?",
      body: [
        "Several forces drive <b>UK gilt yields</b>. Inflation expectations matter because investors want compensation if rising prices are likely to erode the value of future payments. Bank of England interest rates matter because they affect returns across financial markets and help set the broader level of market interest rates.",
        "Growth expectations matter too. If the economy looks weak, tax revenues can disappoint and public borrowing can stay high. If inflation looks sticky, markets may expect interest rates to stay higher for longer. The amount of debt the government needs to issue can also affect yields, because investors may demand a higher return to absorb more supply.",
        "Confidence is the final piece. Gilt yields are partly a judgement on the credibility of the UK's fiscal and economic path. When markets become less comfortable with that path, borrowing costs can rise.",
      ],
    },
    {
      id: "yield-impact",
      heading: "How gilt yields affect government borrowing costs",
      body: [
        "The clearest reason <b>gilt yields matter</b> is that they affect what the government pays to borrow. Higher yields mean higher costs on newly issued debt and, over time, on debt that is rolled over as it matures.",
        "That does not mean the entire debt stock becomes more expensive overnight. The pressure usually builds gradually as older gilts mature and are refinanced at current market rates. Even so, the effect can be large because the UK refinances debt continually.",
        "This is why rising yields matter for the budget. If <b>government borrowing costs</b> stay high, debt-interest costs can take up more fiscal room. That leaves less flexibility for tax cuts, spending increases or other policy choices. Readers who want the direct fiscal angle should also see <a href=\"/articles/debt-interest-explained\">debt interest explained</a>.",
      ],
    },
    {
      id: "inflation-and-index-linking",
      heading: "Gilt yields, inflation and index-linked debt",
      body: [
        "Gilt yields also matter because inflation changes what investors demand from government bonds. If inflation expectations rise, investors may want a higher yield to compensate for the risk that future payments will buy less in real terms.",
        "The UK also has a significant stock of <b>index-linked gilts</b>. Unlike conventional gilts, these are tied to inflation, which means inflation matters not only for market pricing but also for the structure of part of the debt itself.",
        "That is one reason gilt yields and inflation are so closely linked in public debate. Higher inflation can affect the return investors demand on conventional gilts and can also add pressure through inflation-linked debt obligations.",
      ],
    },
    {
      id: "yields-and-the-economy",
      heading: "How gilt yields affect mortgages, households and businesses",
      body: [
        "Rising gilt yields do not stay confined to the bond market. They can feed through into <b>fixed-rate mortgage</b> pricing, business borrowing costs and broader financial conditions. That is why people searching for how gilt yields affect mortgages are asking a sensible question.",
        "Lenders do not price mortgages from gilt yields alone, but government bond yields influence market rates and funding conditions. If those rates rise, refinancing can become more expensive for households whose deals are ending, and new borrowing can become harder to afford.",
        "Businesses can feel the effect as well. Higher market borrowing costs can make investment, expansion and hiring less attractive. In that sense, <b>rising UK bond yields</b> can affect household finances and the wider economy even before they show up fully in the government's own debt-interest bill.",
      ],
    },
    {
      id: "confidence-and-the-economy",
      heading: "Why gilt yields matter for confidence in the UK economy",
      body: [
        "Gilt yields are also a signal about confidence. They reflect how investors judge inflation risks, interest-rate expectations and the credibility of economic policy. If yields rise sharply or move out of line with peer markets, that can suggest markets are becoming less comfortable with the outlook.",
        "That matters because confidence can shape outcomes. Higher borrowing costs can weaken demand, tighten financial conditions and make fiscal choices harder. In that sense, gilt yields are not just a result of economic conditions. They can also influence them.",
        "If you want to place yields in a wider public-finance context, <a href=\"/articles/borrowing-over-time\">borrowing over time</a>, <a href=\"/articles/how-debt-to-gdp-works\">how debt to GDP works</a> and <a href=\"/articles/where-government-money-goes\">where government money goes</a> show how borrowing costs fit into the broader picture.",
      ],
    },
    {
      id: "yields-become-a-problem",
      heading: "When do rising gilt yields become a problem?",
      body: [
        "Higher yields are not automatically a crisis. Sometimes they rise for understandable reasons, such as stronger inflation expectations, tighter monetary policy or a broad repricing of interest rates.",
        "The problem comes when yields rise quickly, unpredictably or because investor confidence is weakening. In that environment, the government can face higher financing costs, households can face tighter borrowing conditions and financial markets can become more sensitive to policy mistakes.",
        "That is why gilt yields are watched so closely. They are one of the clearest real-time indicators of how the bond market views the UK's borrowing position and economic credibility.",
      ],
    },
    {
      id: "policy-implications",
      heading: "What rising gilt yields mean for fiscal policy and confidence",
      body: [
        "Markets set the price of borrowing, not ministers. That means economic policy is judged not only by what governments want to do, but by whether investors believe the plan is credible and sustainable.",
        "If borrowing needs stay high and confidence weakens, markets may demand higher yields. If inflation looks more contained, the fiscal path looks steadier and the broader economic outlook improves, yields can stabilise. The Bank of England plays an important role through interest-rate policy and financial stability, but monetary policy cannot solve every fiscal problem on its own.",
        "The practical lesson is that <b>gilt yields matter</b> because they connect fiscal policy, inflation, interest rates and investor confidence. They are one of the clearest market tests of whether the UK can borrow at a manageable cost.",
      ],
    },
    {
      id: "gilt-yields-faq",
      heading: "Frequently asked questions about gilt yields",
      body: [
        "<b>What are gilt yields?</b> Gilt yields are the returns investors demand for lending to the UK government through gilts, which are UK government bonds.",
        "<b>Why are gilt yields important?</b> They matter because they affect government borrowing costs, debt refinancing, mortgage pricing and wider economic confidence.",
        "<b>Why do gilt yields rise when prices fall?</b> Because a bond's payments are fixed. When the price falls, those payments represent a higher return relative to the purchase price.",
        "<b>How do gilt yields affect mortgages?</b> Higher gilt yields can influence market interest rates and lenders' funding costs, which can feed through into fixed-rate mortgage pricing.",
        "<b>Do higher gilt yields mean higher debt-interest costs immediately?</b> Not across the whole debt stock. The effect is usually gradual, building as maturing debt is refinanced at higher rates.",
        "<b>What do rising UK bond yields mean?</b> They usually mean investors are demanding a higher return to lend, often because of inflation expectations, higher interest rates, larger borrowing needs or weaker confidence.",
      ],
    },
  ],
  sources: [
    {
      label: "ONS consumer price inflation",
      note: "Used for inflation context and the relationship between inflation expectations, index-linked debt and borrowing costs.",
    },
    {
      label: "UK Debt Management Office debt and reserves management report",
      note: "Used for the structure of the gilt market and context on conventional and index-linked debt.",
    },
    {
      label: "Bank of England yield curve and Bank Rate data",
      note: "Used for the 10-year gilt yield, Bank Rate context and the relationship between yields and broader interest-rate conditions.",
    },
    {
      label: "OECD long-term interest rates",
      note: "Used for UK versus peer-country yield comparisons.",
    },
    {
      label: "Office for Budget Responsibility fiscal outlook",
      note: "Used for context on debt interest, borrowing trends and sensitivity of public finances to changes in yields.",
    },
    {
      label: "ONS national accounts (GDP and economic output)",
      note: "Used for context on growth, the wider economy and the relationship between borrowing costs and economic conditions.",
    },
    {
      label: "HM Treasury public spending data",
      note: "Used for context on public spending and the trade-offs created by higher debt-interest costs.",
    },
    {
      label: "ONS public sector finances",
      note: "Used for debt levels, borrowing measures and wider public-finance context referenced throughout the article.",
    },
  ],
  relatedArticleSlugs: [
    "debt-interest-explained",
    "how-debt-to-gdp-works",
    "borrowing-over-time",
    "where-government-money-goes",
  ],
};
