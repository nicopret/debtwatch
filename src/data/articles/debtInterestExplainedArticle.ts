import type { ArticleData } from "./articleTypes";

export const debtInterestExplainedArticle: ArticleData = {
  slug: "debt-interest-explained",
  header: "Debt interest explained",
  tagline: "Why servicing the national debt suddenly costs much more",
  date: "15 Mar 2026",
  author: "DebtWatch Research Desk",
  authorBioUrl: "https://debtwatch.uk/methodology/",
  description:
    "Gilt yields show the interest rate investors demand to lend to the UK government - and they have risen sharply in recent years. As yields move, they signal how markets view inflation, growth, and the credibility of the UK's finances. They are not set by government, but by investors deciding what it is worth to lend.",
  keyTakeaway:
    "Yields do not tell you today's debt-interest bill directly, but they determine the cost of tomorrow's borrowing. As debt is rolled over, higher yields feed through into higher interest payments, shaping the long-term cost of the UK's debt.",
  heroVisual: "borrowing-yield-rates",
  previewGraphicKey: "debt-interest-yield-trend",
  featuredGraphicKey: "debtInterestTimeline",
  metricStrip: [
    {
      kind: "store",
      metricKey: "annualInterestPayment",
      label: "Debt interest / year",
      helperText: "Latest annual cost",
      tone: "navyblue",
    },
    {
      kind: "store",
      metricKey: "monthlyInterestPayable",
      label: "Your monthly debt payment",
      helperText: "Based on 39m taxpayers in 2025-2026",
      tone: "amber",
    },
    {
      kind: "store",
      metricKey: "tenYearGiltYield",
      label: "10-year gilt yield",
      helperText: "Market borrowing rate",
      tone: "neutral",
    },
  ],
  sections: [
    {
      id: "what-it-is",
      heading: "What debt interest actually means",
      body: [
        "The government borrows by issuing debt. Debt interest is the cost of paying investors who hold that debt. It is not a one-off repayment, but a continuous annual expense - the price of past borrowing that must be paid regardless of current policy choices.",
        "Some of that cost is fixed in advance, based on the interest rates agreed when bonds were issued. But a growing share changes over time, particularly as older debt matures and is refinanced at new rates, or where payments are linked to inflation. This means the total interest bill can rise quickly when interest rates increase or inflation remains elevated.",
        "This is what makes debt interest so important. It is not just a financial statistic - it is a measure of opportunity cost. Every pound spent on interest is a pound that cannot be used for tax reductions, investment, or frontline services. Over time, as debt accumulates and interest costs rise, this trade-off becomes more pronounced, tightening the constraints on what governments can afford to do.",
      ],
      visualKey: "debt-interest-vs-public-service-pay",
      layout: "split",
      callout: {
        label: "Why it matters",
        text: "Debt interest is one of the most significant and least visible pressures on public finances. As it grows, it quietly absorbs resources that could otherwise be used elsewhere. Today, the UK spends tens of billions each year servicing its debt - an amount that is increasingly comparable to what it spends paying the people who deliver public services.",
      },
    },
    {
      heading: "What Is Debt Interest?",
      id: "what-is-debt-interest",
      body: [
        "Debt interest is simply the <b>cost of borrowing money</b>. When a government borrows, it agrees to pay investors a regular return - this is the interest. In practical terms, if GBP1,000 is borrowed at a rate of 5%, the borrower pays GBP50 each year. When scaled up to a national level, where governments borrow in the trillions, these payments become <b>tens of billions annually</b>, forming a significant and ongoing part of public spending.",
        "Governments borrow by issuing bonds, and the interest paid on these bonds is known as the <b>coupon</b>. Some of these payments are fixed, meaning the interest rate is locked in when the bond is issued, while others can vary, particularly if they are linked to inflation or if new debt is issued at higher interest rates as older bonds mature. Over time, as debt is refinanced, the overall interest bill can rise or fall depending on economic conditions and market rates.",
        "The money used to pay this interest ultimately comes from <b>tax revenue or additional borrowing</b>. If the government collects enough in taxes, it can cover the cost directly. However, if spending - including interest payments - exceeds revenue, it must borrow more, adding to the total debt. This creates a cycle where existing debt generates interest, and if that interest is not fully funded through taxation, it can contribute to <b>further borrowing and higher future costs</b>.",
      ],
    },
    {
      id: "scale-of-payments",
      heading: "The Scale of Interest Payments",
      body: [
        "The cost of servicing government debt has become one of the most significant pressures on the UK's public finances. Annual interest payments now run into <b>tens of billions of pounds</b>, placing them alongside some of the largest areas of public spending. In practical terms, the UK is now spending amounts on interest that are comparable to major public service budgets, meaning a growing share of government revenue is being used not to deliver services, but simply to <b>service past borrowing</b>.",
        "This creates a clear opportunity cost. Every pound spent on interest is a pound that cannot be used for healthcare, education, defence, or tax relief. As borrowing has increased and interest rates have risen, this trade-off has become more pronounced. If the UK were able to borrow at lower rates - closer to countries such as Germany, where yields have been around 2.6% - the annual interest bill would be significantly lower. Given the size of UK debt, even a difference of one to two percentage points translates into <b>tens of billions in additional costs</b> each year, highlighting how sensitive public finances are to borrowing costs.",
        "Several factors drive these interest payments. Interest rates themselves are set in financial markets and influenced by institutions such as the Bank of England, while inflation can increase costs, particularly for index-linked debt. The overall level of debt also matters - more borrowing leads directly to higher interest payments. Finally, <b>market confidence</b> plays a crucial role: if investors perceive greater risk, they demand higher yields. Taken together, these forces mean that as debt grows and borrowing costs rise, the burden of interest payments can escalate quickly, placing increasing strain on the government's ability to manage its finances.",
      ],
      visualKey: "debt-interest-g7-yields",
      layout: "split",
    },
    {
      heading: "Why Interest Matters More Than Debt",
      id: "why-interest-matters",
      body: [
        "When people think about government debt, they often focus on the total amount owed. But in reality, it's the interest on that debt that matters most. Debt is a stock - it sits there over time - but interest is a continuous flow of payments that must be made every year. As that interest accumulates, it creates a compounding effect, where past borrowing continues to generate new costs long into the future.",
        "The real risk emerges when <b>interest costs begin to outpace economic growth</b>. If the government is paying more in interest than the economy is growing, the debt burden becomes harder to manage. This is often described as a 'snowball effect', where debt grows not just because of new borrowing, but because existing debt becomes more expensive to service. Over time, this places increasing pressure on public finances, as more of the budget is diverted toward interest payments rather than productive spending.",
        "This is where debt can become a serious problem. Rising interest rates make it more expensive to refinance maturing debt, increasing costs across the board. In more extreme cases, governments may end up <b>borrowing simply to pay interest</b>, reinforcing the cycle and pushing debt higher. History shows that when this dynamic takes hold, it can lead to loss of market confidence and, in some cases, full-scale debt crises. While the UK is not in that position, the underlying mechanics are the same - if interest continues to rise faster than growth, the system becomes increasingly difficult to sustain.",
      ],
    },
    {
      heading: "Who Receives the Interest - and Why It Matters Today",
      id: "who-receives-interest",
      body: [
        "When the government pays interest on its debt, that money does not disappear - it flows to the investors who hold government bonds. A large share goes to <b>domestic institutions</b>, such as pension funds, insurance companies, banks, and savers. In this sense, some of the interest remains within the UK financial system. However, a significant portion is also paid to <b>overseas investors</b>, meaning money leaves the country as a return on capital. There is also the role of the Bank of England, which holds government bonds as part of its monetary policy operations. While interest paid to the central bank is somewhat different - since it ultimately feeds back into the public sector - it still reflects the broader cost of maintaining the debt.",
        "What makes this increasingly important today is the <b>rapid rise in interest payments</b>. As inflation has increased and interest rates have moved higher, the cost of servicing government debt has grown sharply. This has turned interest from a relatively manageable expense into a <b>major and growing pressure on public finances</b>. Even if debt levels stabilise, higher rates mean the annual cost of carrying that debt remains elevated.",
        "The result is a tightening squeeze on the government's budget. More money is being directed toward interest payments, leaving less available for public services, investment, or tax reductions. While some of these payments stay within the domestic economy, a portion flows abroad, and all of it represents a cost tied to past borrowing. As interest rates and debt levels remain high, this burden is likely to remain a central challenge for the UK's economic and fiscal outlook.",
      ],
    },
    {
      id: "yield-over-time",
      heading: "Yield over Time",
      entities: [
        {
          type: "text",
          body: [
            "For much of the past few decades, UK government bond yields have tended to move broadly in line with those of other advanced economies. The UK's 10-year gilt rate has historically tracked the average across the G7, reflecting similar economic conditions, inflation trends, and global interest rate cycles. When global rates fell, UK yields followed; when they rose, the UK moved in step. This alignment suggested that investors viewed the UK as broadly comparable to its peers in terms of economic stability and creditworthiness.",
            "More recently, however, that relationship has begun to shift. UK yields have moved <b>noticeably above the G7 average</b>, creating a widening gap that points to growing divergence. This reflects a combination of factors, including weaker post-pandemic economic performance, persistent inflation pressures, and concerns about long-term growth. Since COVID, the UK has struggled to generate strong, sustained economic expansion, and this lack of growth has made its debt burden appear more difficult to manage. As a result, investors are demanding higher returns to hold UK debt, pushing yields higher and increasing the cost of borrowing relative to other major economies."
          ],
        },
        {
          type: "graph",
          graphKey: "uk-gilt-g7-bank-rate",
          caption: "UK gilt yields, G7 average and Bank Rate",
        },
      ],
      body: [],
    },
    {
      id: "extra-interest",
      heading: "This Year We Will Add £10 billion of Interest",
      body: [
        "Each year, the UK doesn't just add new debt ”it also resets the cost of existing debt as it is rolled over. With roughly <b>£200 - £250 billion of gilts maturing annually</b>, a large portion of the debt stock is constantly being refinanced at current market rates. When interest rates were closer to 2 - 3%, this process was relatively manageable. But with yields now closer to 5%, the cost of refinancing has risen sharply, adding tens of billions of pounds in additional interest over time.",
        "To put this into perspective, refinancing £250 billion of debt at 5% implies an annual interest cost of around £12 - £13 billion on that portion alone. If those same bonds had been refinanced at a lower rate, say 2.6%, similar to countries like Germany, the cost would be closer to £6 - £7 billion. That gap, of roughly £5 - £6 billion per year, is the additional burden created by higher borrowing costs on just one year's rollover. As this process repeats year after year, more of the total debt stock is exposed to these higher rates, steadily pushing up the overall interest bill.",
        "On top of refinancing, the government is also adding new borrowing through the deficit”currently around <b>£130 billion per year</b> ” which itself carries interest costs from the outset. Combined with an existing annual interest bill already approaching £100 billion, this creates a compounding effect: higher rates increase the cost of both old and new debt, while continued borrowing expands the base those rates apply to. The result is a growing structural pressure on public finances, where rising interest costs are driven not just by how much the government borrows, but by the price it pays to borrow it."
      ]
    },
    {
      id: "rethinking-debt",
      heading: "Rethinking Debt, Growth and the Role of the State",
      body: [
        "The UK's debt position is not just a question of numbers ” it reflects deeper structural issues in how the economy is organised. A service-led model, while important, has not delivered the level of <b>productivity, resilience, or growth needed</b> to sustain rising levels of borrowing. To change course, the UK must place greater emphasis on <b>reindustrialisation</b>, energy security, and productive investment. This includes creating the conditions for long-term growth through competitive policy, while also recognising that energy costs and industrial capacity play a central role in economic strength.",
        "At the same time, the government must take a more disciplined approach to public finances. That means looking carefully at how <b>money is spent</b>, including the structure of the public sector and the long-term cost of commitments such as pensions. Reforming how pensions are administered ” potentially shifting gradually toward more privately funded elements ” could reduce long-term fiscal pressure, although such changes must be managed carefully over time. Alongside this, reducing reliance on borrowing and beginning to <b>pay down debt rather than continuously rolling it over</b> would mark a fundamental shift toward more sustainable finances.",
        "Ultimately, this requires a change in mindset. The idea that debt can simply be maintained indefinitely, without consequence, underestimates the growing burden of interest and the risks of rising borrowing costs. A more sustainable approach would <b>prioritise growth, fiscal discipline, and transparency</b>, ensuring that borrowing is used strategically and repaid over time. Without this shift, the pressure from debt and interest will continue to build, limiting the government's ability to act and increasing long-term economic vulnerability."
      ],
      callout: {
        label: "Transparency and Accountability",
        text: "At a minimum, there must be far greater transparency around public debt. Budget statements should clearly set out <b>how much debt is being repaid, how much is being rolled over, and how much is being added each year</b>. Without this clarity, it becomes difficult for the public to fully understand the scale of borrowing or to hold governments accountable for how it is managed."
      },
    },
  ],
  sources: [
    {
      label: "ONS public sector finances",
      note: "Used for debt, deficit and debt-interest time series and annual metric updates.",
    },
    {
      label: "ONS ESA Table 11 general government expenditure",
      note: "Used for function-level compensation of employees in the public-service-pay comparison.",
    },
    {
      label: "Office for Budget Responsibility fiscal outlook",
      note: "Used for debt interest forecasts, borrowing projections and fiscal context.",
    },
    {
      label: "Debt Management Office remit and gilt data",
      note: "Used for gilt issuance, maturity profile and refinancing (rollover) analysis.",
    },
    {
      label: "OECD long-term interest rates",
      note: "Used for the G7 10-year government bond yield comparison and long-run yield timeline.",
    },
    {
      label: "Bank of England yield curve and Bank Rate data",
      note: "Used for UK 10-year gilt yields, market borrowing rates and monetary policy context.",
    },
    {
      label: "ONS national accounts (GDP)",
      note: "Used for nominal and real GDP comparisons and debt sustainability context.",
    },
    {
      label: "HM Treasury public spending data",
      note: "Used for overall government spending context and comparisons with interest costs.",
    },
    {
      label: "Department for Work and Pensions state pension data",
      note: "Used for pension expenditure context and long-term fiscal pressures.",
    },
    {
      label: "HMRC National Insurance data",
      note: "Used for understanding pension funding flows and contribution-based systems.",
    },
  ],
  relatedArticleSlugs: [
    "why-gilt-yields-matter",
    "how-debt-to-gdp-works",
    "where-government-money-goes",
    "borrowing-over-time",
  ],
};
