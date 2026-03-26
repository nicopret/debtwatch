import type { ArticleData } from "./articleTypes";

export const borrowingExplainedArticle: ArticleData = {
  slug: "borrowing-over-time",
  header: "Borrowing over time",
  tagline: "Prosperity comes from growth, not borrowing — and the balance has shifted too far.",
  date: "15 Jan 2026",
  author: "DebtWatch Research Desk",
  authorBioUrl: "https://debtwatch.uk/methodology/",
  description:
    "Borrowing is the yearly gap between what the government spends and what it raises. It rises in recessions, crises and when policy choices widen the budget gap. Over time, these shortfalls accumulate into a growing national debt — one that shapes the economy, influences policy decisions, and raises questions about long-term sustainability",
  keyTakeaway:
    "Debt has become the UK's default economic model — but it doesn't have to be.",
  heroVisual: "borrowing-hero",
  previewGraphicKey: "borrowing-debt-overview",
  featuredGraphicKey: "borrowingTimeline",
  metricStrip: [
    {
      kind: "store",
      metricKey: "annualBorrowing",
      label: "Annual borrowing",
      helperText: "Latest annual net borrowing",
      tone: "navyblue",
    },
    {
      kind: "store",
      label: "Debt to GDP",
      metricKey: "debtToGdp",
      helperText: "Current ratio",
      tone: "amber",
    },
    {
      kind: "store",
      label: "Total debt",
      metricKey: "totalDebt",
      helperText: "Current stock of debt",
      tone: "teal",
    },
  ],
  sections: [
    {
      id: "simple-explation",
      heading: "A simple explanation",
      body: [
        "A government bond is essentially a loan made by investors to a government. When a government needs to borrow money, it issues bonds that investors can buy. In return, the government promises to pay the investor regular interest payments and to repay the original amount borrowed at a set future date, known as the maturity.",
        "For example, if an investor buys a GBP 1,000 government bond paying 3% interest, they receive GBP 30 each year until the bond matures, at which point they get their GBP 1,000 back. Governments use bonds to finance spending without immediately raising taxes, while investors buy them because they are generally considered safe, predictable investments.",
      ],
      visualKey: "borrowing-yield-rates",
      layout: "split",
    },
    {
      id: "why-governments-borrow",
      heading: "Why Governments Borrow Money",
      body: [
        "Governments borrow money for a fairly simple reason: they spend more than they collect in taxes. This difference is known as a <b>budget deficit</b>. Governments have many ongoing responsibilities that require large amounts of funding, including healthcare systems, welfare and pension payments, national defence, and the construction and maintenance of infrastructure such as roads, railways, and public buildings. When tax revenues are not enough to cover these costs in a given year, borrowing allows governments to continue funding these services without immediately raising taxes or cutting spending.",
        "Borrowing is also used as a tool to help <b>stabilise the economy</b>, particularly during economic downturns. When a recession hits, businesses may reduce investment and consumers may spend less, which slows economic activity. Governments can respond by increasing spending or reducing taxes to support demand and keep money flowing through the economy. Because tax revenues often fall during recessions, governments frequently need to borrow to fund these measures. This use of borrowing is part of what economists call fiscal policy, where government spending and taxation are used to influence economic conditions.",
        "Finally, governments borrow to <b>finance long-term investments and respond to major crises</b>. Large projects such as transportation networks, energy systems, education programs, and scientific research can require substantial upfront funding but provide benefits over many years. Borrowing allows the cost of these investments to be spread over time, rather than paid for all at once. Similarly, unexpected events such as financial crises, wars, pandemics, or natural disasters often require rapid and significant spending. In these situations, borrowing gives governments the flexibility to respond quickly when large amounts of money are needed.",
      ],
    },
    {
      id: "how-governments-borrow",
      heading: "How Governments Borrow Money",
      body: [
        "Governments usually borrow money by issuing <b>government bonds</b>, which are essentially loans from investors to the state. When a government needs to raise funds, it sells bonds to investors who are willing to lend money in exchange for a promise of repayment later. Each bond has two key features: the <b>interest rate</b>, which determines how much the government pays investors each year, and the <b>maturity date</b>, which is when the government repays the original amount borrowed. Governments issue bonds with different time horizons, ranging from short-term <b>Treasury bills</b> that last a few months, to <b>Treasury notes</b> that run for several years, and long-term <b>government bonds</b> that may last decades.",
        "A wide range of investors buy these bonds. Some are <b>domestic investors</b>, such as pension funds, insurance companies, banks, and investment funds that want stable and predictable returns. Individual savers may also buy government bonds directly or through investment products. Governments also borrow from <b>international investors</b>, including foreign financial institutions and sometimes other governments. In many countries, the <b>central bank</b> can also hold government bonds, either as part of its normal financial operations or through policies designed to support the economy.",
      ],
      layout: "split-reverse",
      visualKey: "debt-ownership-breakdown",
    },
    {
      id: "the-central-bank",
      heading: "The Role of Central Banks",
      body: [
        "Central banks play an important role in shaping the environment in which governments borrow money, even though they are usually <b>separate institutions from the government itself</b>. One of their main tools is <b>monetary policy</b>, which includes setting short-term interest rates. These interest rates influence borrowing costs throughout the economy, including the interest governments must pay when issuing new bonds. When central banks raise interest rates to control inflation, borrowing generally becomes more expensive. When they lower rates to support economic growth, governments can typically borrow more cheaply.",
        "Central banks also interact with government borrowing through their influence on <b>financial markets</b>. Government bonds are widely used throughout the financial system as safe assets and as collateral in many financial transactions. Because of this, central banks often hold government bonds as part of their normal operations and may buy or sell them in the market to influence interest rates and liquidity in the banking system. These actions can affect the overall level of borrowing and lending in the economy.",
        "In some situations, central banks take a more direct role by purchasing large quantities of government bonds through a policy known as <b>quantitative easing (QE)</b>. When this happens, the central bank typically buys bonds from investors in financial markets. To pay for these bonds, the central bank creates new money electronically by crediting the reserve accounts that commercial banks hold with the central bank. This increases the amount of money circulating in the financial system and tends to push bond prices up while lowering their yields, which can reduce borrowing costs across the economy.",
        "This process is sometimes described as <b>printing money</b>, although in modern economies the money is usually created digitally rather than physically printed. Importantly, central banks usually buy bonds in the secondary market rather than directly financing government spending, which helps maintain a separation between government fiscal policy and central bank monetary policy. While expanding the money supply can help support the economy during downturns, it must be managed carefully, because creating too much money too quickly can contribute to higher inflation over time.",
      ],
    },
    {
      id: "political-debate",
      heading: "The Political Debate About Debt",
      body: [],
      entities: [
        {
          type: "text",
          body: [
            "Government borrowing is not only an economic issue but also a <b>political one</b>, and different schools of thought disagree about how much debt is acceptable and when borrowing should be used. These debates influence fiscal policy decisions, shaping whether governments prioritise reducing deficits or using borrowing to stimulate economic activity. While there are many variations in opinion, three broad perspectives often dominate discussions about public debt.",
            "One perspective is commonly associated with <b>fiscal conservatives</b>, who emphasise the risks of excessive government borrowing. From this viewpoint, high levels of debt can create long-term problems by increasing interest payments, limiting the government's ability to respond to future crises, and potentially shifting financial burdens onto future taxpayers. Fiscal conservatives therefore tend to favour <b>balanced budgets or small deficits</b> over the economic cycle, arguing that governments should keep borrowing limited except during exceptional circumstances such as wars or major recessions. Concerns about maintaining investor confidence and protecting financial stability are central to this approach.",
            "A second perspective comes from <b>Keynesian economics</b>, based on the ideas of John Maynard Keynes. Keynesian economists argue that government borrowing can play a useful role in <b>stabilising the economy</b>, particularly during periods of weak demand or economic downturn. When private sector spending falls, government spending financed through borrowing can help support employment and economic activity. In this view, deficits during recessions are not necessarily a problem if they help prevent deeper economic contractions and if stronger growth later helps stabilise public finances.",
            "A more recent and more controversial perspective is <b>Modern Monetary Theory (MMT)</b>. Supporters of MMT argue that governments that issue their own currency, such as the United Kingdom or the United States, face different constraints than households or businesses when it comes to borrowing. Because these governments control their own currency, they cannot technically run out of money in the same way private borrowers can. From this perspective, the main constraint on government spending is not debt levels themselves but <b>inflation</b>, which can occur if spending grows faster than the economy's productive capacity. While MMT remains controversial among economists, it has broadened the debate about the relationship between government borrowing, central banks, and economic policy.",
            "In practice, most governments adopt a <b>mixture of these approaches</b> rather than following any single theory completely. Policymakers often try to balance the need for economic stability and public investment with concerns about long-term fiscal sustainability. As a result, debates about government borrowing continue to revolve around the central question of how to use debt as a policy tool while maintaining confidence in a country's economic and financial stability.",
          ],
        },
        {
          type: "graph",
          graphKey: "uk-debt-growth-borrowing-costs",
          caption: "Debt sustainability lens",
        },
      ],
    }, {
      id: "debt-sustainability",
      heading: "Debt Sustainability",
      body: [
        "The sustainability of government debt ultimately depends on the relationship between <b>economic growth and borrowing costs</b>. In simple terms, debt becomes easier to manage when the economy is growing faster than the interest rate on that debt. At first glance, the UK may appear to meet this condition, as nominal GDP growth has often remained above borrowing costs. However, this headline comparison masks a more fragile reality beneath the surface.",
        "Much of the recent strength in nominal growth has been driven not by genuine expansion in economic output, but by <b>inflation</b>. When prices rise, nominal GDP increases even if the underlying economy is barely growing. In contrast, <b>real economic growth has been weak</b>, reflecting low productivity, limited investment, and sluggish output. This means the apparent 'headroom' in debt sustainability may be overstated, as it relies on price increases rather than meaningful improvements in economic capacity.",
        "At the same time, pressures are emerging on the revenue side of the equation. <b>Rising unemployment and an increase in business closures</b> can reduce tax receipts, particularly from income taxes, corporate profits, and consumption. If government revenues weaken while spending commitments remain high, deficits are likely to persist or widen. This in turn leads to <b>continued borrowing and further debt accumulation</b>, reinforcing the cycle of rolling over existing debt rather than reducing it.",
        "Taken together, these trends point to a more challenging outlook for debt sustainability. If real growth remains subdued and borrowing continues to outpace the economy's underlying expansion, the UK risks moving toward a position where <b>debt approaches or exceeds the size of the economy</b> itself. While this does not automatically trigger a crisis, it reduces fiscal flexibility and increases reliance on favourable market conditions, leaving the economy more exposed to shifts in interest rates, inflation, and investor confidence."
      ]
    }, {
      id: "growth-over-borrowing",
      heading: "Growth Over Borrowing",
      body: [
        "Lower levels of government debt can offer clear advantages, particularly when it comes to how public money is used. One of the most immediate benefits is a reduction in <b>interest payments</b>. When debt is high, a growing share of government spending is diverted toward servicing that debt rather than funding public services or investment. With lower debt, those resources can be redirected into areas such as infrastructure, healthcare, education, or tax relief—potentially delivering more direct benefits to the economy.",
        "A lower debt burden can also contribute to a <b>stronger and more resilient economy</b>. Governments with less debt typically have greater flexibility to respond to economic shocks, such as recessions or financial crises, because they are not already constrained by high borrowing costs. This can improve investor confidence, help maintain lower interest rates, and create a more stable environment for businesses and households. In this sense, reducing debt is often seen as a way to <b>increase long-term economic stability</b>.",
        "From a policy perspective, this approach aligns closely with <b>fiscally conservative principles</b>, which emphasise living within means and limiting reliance on borrowing. The idea is that governments should focus on <b>growing the economy to generate revenue</b>, rather than funding spending through increasing debt. By encouraging investment, productivity, and business growth, the economy can expand in a way that supports public finances without requiring sustained borrowing.",
        "However, it is important to recognise that the benefits of lower debt depend on how it is achieved. Reducing debt through stronger economic growth can be far less disruptive than doing so through sharp spending cuts or tax increases. In practice, many policymakers aim to strike a balance—supporting growth while gradually improving public finances—so that debt becomes more manageable without undermining the broader economy."
      ]
    }, {
      heading: "Reducing Reliance on Debt: Paths to a Stronger Economy",
      id: "reducing-debt-reliance",
      body: [
        "Reducing the need to roll over debt ultimately comes down to <b>closing the gap between government income and expenditure</b>, and the most sustainable way to do that is through stronger economic growth. Simply lowering tax rates on its own is unlikely to be sufficient. While tax cuts can stimulate activity in some cases, they do not guarantee growth, particularly if underlying conditions—such as energy costs, regulation, and investment incentives—remain unfavourable.",
        "A more effective approach may be to focus on making the UK a more attractive place to do business and invest. One avenue is to incentivise large international companies to establish headquarters in the UK through targeted tax incentives and a competitive business environment. The goal would not just be corporate presence, but <b>high-quality employment</b>, with well-paid jobs that generate income tax revenue and broader economic activity. Alongside this, improving the competitiveness of the London Stock Exchange—for example by revisiting listing rules—could help attract more companies to raise capital in the UK, strengthening the domestic financial ecosystem.",
        "Beyond taxation, structural factors such as energy and regulation are likely to play a critical role. Access to <b>cheap, abundant energy</b> can significantly lower operating costs for businesses and improve industrial competitiveness. Similarly, reducing unnecessary regulatory burdens—an opportunity often associated with the UK's departure from the European Union—could make it easier for businesses to expand and invest. In practice, these supply-side improvements may have a more durable impact on growth than tax policy alone.",
        "On the expenditure side, governments may also seek to reduce the size of the <b>benefits bill</b>. This could involve tightening eligibility rules or adjusting incentives so that employment is clearly more financially attractive than remaining on benefits. For example, increasing the tax-free portion of income could widen the gap between net earnings and benefit levels, strengthening the incentive to work. Some have also pointed to systems such as those in Switzerland, where benefits are more closely linked to prior contributions, although such models typically rely on <b>low unemployment and strong labour markets</b> to function effectively.",
        "Taken together, these measures aim to <b>reduce deficits over time</b>, which in turn lowers the need to refinance existing debt. As the amount of debt being rolled over declines, interest payments fall, freeing up fiscal space. This can create a reinforcing cycle: lower debt reduces interest costs, which improves public finances, allowing for more targeted tax reductions or investment—further supporting economic growth and gradually strengthening the overall fiscal position."
      ]
    }, {
      heading: "A Path Back to Sustainable Finances",
      id: "sustainable-finances",
      body: [
        "Not all debt is inherently bad. Used responsibly, it can provide stability and allow governments to invest in infrastructure and respond to economic shocks. The issue arises when borrowing becomes routine and debt is continuously rolled over without a clear plan for repayment. Over time, rising interest costs begin to crowd out productive spending, turning debt from a useful tool into a long-term burden. A more sustainable approach is to use debt selectively—for specific, productive investments—and ensure there is a clear path to paying it down, rather than relying on indefinite refinancing.",
        "The most effective way to reduce debt is through strong economic growth, not simply higher taxes or short-term cuts. A larger, more productive economy generates higher revenues naturally, making debt easier to manage and reduce over time. This requires a clear focus on making the UK more business-friendly, with competitive taxes, sensible regulation, and access to affordable energy. By encouraging investment, supporting enterprise, and maintaining discipline on public spending, it is possible to reduce reliance on borrowing and move toward a more sustainable and resilient economic future."
      ]
    }
  ],
  sources: [
    {
      label: "Office for National Statistics public sector finances",
      note: "Used for annual borrowing, total debt, debt-to-GDP, and the UK debt series shown in the debt-sustainability chart.",
    },
    {
      label: "Bank of England yield curve data",
      note: "Used for the 5-year, 10-year, and 20-year gilt-yield visuals, and for the borrowing-cost series in the debt-sustainability chart.",
    },
    {
      label: "Bank of England consumer credit and household lending statistics",
      note: "Used as the reference family for the household debt comparison shown in the hero visual.",
    },
    {
      label: "UK Debt Management Office quarterly review",
      note: "Used for gilt ownership data, including the sector holdings referenced in the debt-ownership breakdown visual.",
    },
    {
      label: "International Monetary Fund World Economic Outlook",
      note: "Used for nominal GDP growth and real GDP growth in the debt-sustainability chart.",
    },
  ],
  relatedArticleSlugs: [
    "where-government-money-goes",
    "debt-interest-explained",
    "how-debt-to-gdp-works",
    "why-gilt-yields-matter",
  ],
};
