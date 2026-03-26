import type { ArticleData } from "./articleTypes";

export const debtToGdpExplainedArticle: ArticleData = {
  slug: "how-debt-to-gdp-works",
  header: "How debt-to-GDP works",
  tagline: "The ratio that tries to put debt in context",
  date: "25 Mar 2026",
  author: "DebtWatch Research Desk",
  authorBioUrl: "https://debtwatch.uk/methodology/",
  description:
    "Debt-to-GDP compares the size of public debt with the size of the economy. It is widely used because it shows the burden of debt relative to national income.",
  keyTakeaway:
    "A country can carry more debt if its economy is larger, richer and trusted by investors. The ratio matters more than the debt number on its own.",
  heroVisual: "debt-to-gdp-hero",
  previewGraphicKey: "debt-to-gdp-ratio",
  featuredGraphicKey: "debtToGdpSection",
  metricStrip: [
    {
      kind: "store",
      metricKey: "debtToGdp",
      label: "UK debt / GDP",
      helperText: "Canonical site metric",
      tone: "navyblue",
    },
    {
      kind: "store",
      metricKey: "annualBorrowing",
      label: "Annual borrowing",
      helperText: "Latest annual net borrowing",
      tone: "teal",
    },
    {
      kind: "store",
      metricKey: "tenYearGiltYield",
      label: "Investor lens",
      helperText: "Yield still matters as well",
      tone: "neutral",
    },
  ],
  sections: [
    {
      id: "ratio-not-cash",
      heading: "A ratio, not a cash bill",
      body: [
        "Debt-to-GDP is one of the most widely cited numbers in economics, often used to judge whether a country's finances are sustainable or at risk. It is frequently treated as a kind of threshold - below a certain level is considered safe, above it is seen as dangerous. But this framing can be misleading. Debt-to-GDP does not behave like household debt, and it does not represent a bill that must be paid off in the way many assume.",
        "At its core, debt-to-GDP is simply a ratio: it compares the total stock of government debt to the size of the economy. That makes it useful for context, but easy to misinterpret. A high ratio does not automatically mean a country is in trouble, and a lower ratio does not guarantee stability. What matters is not just how large the debt is, but how it relates to growth, borrowing costs, and the structure of that debt.",
        "Understanding this distinction is essential. Debt-to-GDP is a starting point for analysis - not the conclusion. It tells you something about scale, but very little on its own about risk, affordability, or the true cost of borrowing."
      ]
    },
    {
      id: "why-country-comparisons",
      heading: "Why G7 comparisons help",
      body: [
        "To understand debt-to-GDP properly, it helps to put it into context - and that is where comparisons with other major economies, particularly the G7, become useful. On its own, the ratio simply measures the size of government debt relative to the size of the economy. For example, a country with £1 trillion of debt and £2 trillion of GDP would have a debt-to-GDP ratio of 50%. The larger the economy relative to its debt, the greater its capacity to carry that debt.",
        "This is why economists use the ratio in the first place: it allows meaningful comparisons between countries of very different sizes. A large economy can sustain a higher level of absolute debt than a smaller one, because it generates more income, more tax revenue, and has a broader base to support borrowing. By comparing debt-to-GDP across the G7, we can see not just how much a country owes, but how that debt relates to its economic strength.",
        "However, these comparisons also highlight an important point: there is no single 'safe' level. Different countries operate comfortably with very different ratios, depending on their growth, borrowing costs, and economic structure. Looking at the UK alongside its peers helps frame the discussion - it shows whether the UK is broadly in line with similar economies or diverging from them - but it also reinforces the idea that the ratio is only part of the story."
      ],
    }, {
      heading: "How the ratio rises and falls",
      id: "how-the-ratio-rises-and-falls",
      body: [
        "One of the most important - and often misunderstood - aspects of debt-to-GDP is that it can improve without any meaningful reduction in the debt itself. The ratio depends on two moving parts: the size of the debt and the size of the economy. If the economy grows faster than the debt, the ratio falls. This means that even with stable or rising debt in absolute terms, strong economic growth can make the burden look smaller relative to the economy. Inflation can have a similar effect, increasing nominal GDP and reducing the ratio without any real change in underlying debt sustainability.",
        "This is why countries do not need to 'pay off' their debt to improve their debt-to-GDP position. Over time, as economies expand, past borrowing becomes smaller relative to current output. This dynamic has historically played a major role in reducing debt burdens after periods of high borrowing. Growth, rather than repayment, is often the primary mechanism through which debt ratios stabilise or decline.",
        "However, the reverse is also true. The ratio can worsen even if borrowing slows or appears under control. If economic growth is weak or stagnates, the denominator in the ratio stops expanding, making existing debt more burdensome. At the same time, higher interest costs can cause the debt stock to grow more quickly, particularly if borrowing is required to meet those payments. Persistent deficits, even at lower levels, continue to add to the total debt over time.",
        "The result is that debt-to-GDP can drift upward without any single dramatic event. A combination of weak growth, ongoing borrowing, and rising interest costs can gradually push the ratio higher, making the fiscal position more fragile. Understanding this balance between growth and debt is key: it is not just how much is borrowed, but how the economy evolves alongside it that determines whether the ratio improves or deteriorates."
      ]
    }, {
      heading: "The key weakness of debt-to-GDP",
      id: "key-weakness-of-ratio",
      body: [
        "Debt-to-GDP is useful as a broad measure, but it has important limitations - most notably, it says very little about the <b>actual cost of carrying that debt</b>. Two countries can have the same debt-to-GDP ratio, yet face very different borrowing costs depending on how markets price their risk. One may be able to borrow cheaply and sustainably, while the other pays significantly higher interest, making its position far more fragile. In that sense, the ratio captures size, but not affordability.",
        "It also overlooks the structure of the debt itself. Not all debt behaves in the same way. Some countries issue long-term, fixed-rate debt that locks in borrowing costs for decades, while others are more exposed to changes in interest rates or inflation. Debt that is linked to inflation, for example, can increase in value as prices rise, adding to both the stock of debt and the cost of servicing it. Similarly, shorter maturities mean more frequent refinancing, exposing governments to current market rates. These structural differences can materially change the risk profile, even when headline ratios appear similar.",
        "Another factor the ratio ignores is <b>who holds the debt</b>. Countries with a strong domestic investor base - such as pension funds, banks, or central banks - tend to have more stable demand for their bonds. Others rely more heavily on international investors, making them more sensitive to shifts in global sentiment. This can affect both the level and the volatility of borrowing costs.",
        "The key point is that debt-to-GDP can remain stable, or even improve, while underlying risks increase. If borrowing costs rise, if the structure of debt becomes more exposed, or if investor demand becomes less stable, the fiscal position can deteriorate without being immediately visible in the ratio. To understand sustainability, it is not enough to look at how large the debt is — you also need to consider <b>how it is financed, who is holding it, and how much it costs to maintain</b>."
      ]
    }, {
      heading: "Growth vs debt: the real equation",
      id: "growth-vs-debt",
      body: [
        "At the heart of debt sustainability is a simple relationship: the balance between economic growth and the cost of borrowing. This is often more important than the level of debt itself. If an economy is growing faster than the interest rate it pays on its debt, then the burden of that debt becomes easier to manage over time. Even if the government continues to run modest deficits, the economy expands faster than the debt, allowing the ratio to stabilise or fall naturally.",
        "In this scenario - where growth exceeds interest - the system works in the government's favour. Rising incomes, higher employment, and stronger business activity increase tax revenues, while the existing debt becomes smaller relative to the size of the economy. This is how many countries have historically reduced high debt burdens: not by paying them down directly, but by growing out of them.",
        "The situation reverses when interest rates rise above the rate of economic growth. In this case, the cost of servicing the debt grows faster than the economy itself. Even if borrowing is controlled, the existing debt becomes more expensive to maintain, and a larger share of government revenue is consumed by interest payments. This creates what is often referred to as a <b>'snowball effect'</b>, where debt begins to compound faster than the economy can absorb it.",
        "Once this dynamic takes hold, stabilising the debt becomes much more difficult. The government must either run larger surpluses, reduce spending, increase taxes, or rely on stronger growth to offset the higher interest burden. Without one of these adjustments, the debt-to-GDP ratio will continue to rise over time.",
        "This is why the relationship between growth and interest rates is so important. Debt is not inherently problematic, but it becomes so when the cost of carrying it outpaces the economy's ability to support it. Understanding this balance is key to assessing whether a country's debt is sustainable - not just in theory, but in practice."
      ]
    }, {
      heading: "The UK today: why the picture is more fragile than it looks",
      id: "fragile-picture",
      body: [
        "At first glance, the UK's position does not appear exceptional. The debt-to-GDP ratio is elevated by historical standards, but it sits broadly in line with other advanced economies. Across the G7, higher debt levels have become the norm rather than the exception. On that basis alone, the UK does not stand out as being in immediate trouble.",
        "However, this is where the limitations of the ratio become clear. While the level of debt may be comparable, the underlying conditions are less favourable. Economic growth has been relatively weak, limiting the expansion of the tax base. At the same time, borrowing costs have risen, increasing the cost of servicing that debt. This combination - slower growth and higher interest - moves the UK closer to the point where debt becomes harder to stabilise.",
        "The structure of the UK's debt adds to this pressure. A relatively large share is exposed to inflation and to refinancing at current market rates, which makes costs more sensitive to changes in economic conditions. This means that even without a sharp increase in borrowing, the overall burden can rise more quickly than in countries with more stable or longer-term debt structures.",
        "There is also the question of demand. While the UK benefits from strong institutional investors, it relies more on market-based and international demand than some of its peers. This makes borrowing costs more responsive to shifts in investor sentiment and confidence. When combined with weaker growth and higher exposure to interest-rate changes, it creates a more fragile position than the headline debt-to-GDP figure suggests.",
        "The result is a disconnect between perception and reality. The UK may not look like an outlier when judged purely on the size of its debt, but the factors that determine sustainability - growth, borrowing costs, debt structure, and investor demand - are less favourable. It is this combination that makes the current position more vulnerable than it first appears."
      ], 
    }, {
      heading: "Where policy is going wrong",
      id: "policy-going-wrong",
      body: [
        "Improving debt sustainability is not about hitting a specific ratio - it is about addressing the underlying drivers of the system. Sustainable public finances come from <b>a combination of economic growth, manageable borrowing costs, and controlled spending</b>. Growth expands the tax base, lower borrowing costs reduce the burden of servicing debt, and disciplined spending prevents the gap from widening further. When these elements work together, the debt position can stabilise and improve over time.",
        "The problem is that policy often focused on the wrong target. Rather than addressing these fundamentals, there has been a tendency to focus on <b>debt-to-GDP</b> as an outcome, treating it as something to be managed directly. This can lead to short-term decisions aimed at improving the headline number, without tackling the deeper issues that determine whether the debt is actually sustainable. A stable or falling ratio can mask underlying weaknesses if growth is weak, borrowing costs are rising, or the structure of the debt is becoming more exposed.",
        "At the same time, insufficient attention has been given to the conditions required for sustained economic growth. High cost structures, low investment, and weak productivity have limited the economy's ability to expand. Without stronger growth, the burden of existing commitments becomes harder to carry, and the room for manoeuvre narrows. Efforts to manage the public finances without addressing these constraints risk becoming reactive rather than strategic.",
        "The key mistake is treating the symptom rather than the cause. Debt levels are the result of economic performance, policy choices, and structural conditions - not the starting point. Focusing on the ratio alone does not generate growth, reduce costs, or improve resilience. A more effective approach would prioritise the fundamentals: creating the conditions for growth, stabilising borrowing costs, and ensuring that spending is sustainable over the long term."
      ]
    }, {
      heading: "What debt-to-GDP tells us - and what it doesn't",
      id: "what-it-tell-us",
      body: [
        "Debt-to-GDP remains a useful measure. It provides a broad comparison across countries and gives a sense of the scale of government debt relative to the economy. It can highlight long-term trends and offer a starting point for understanding how a country's finances are evolving. But on its own, it is an incomplete picture.",
        "What it does not show is just as important. It does not capture the cost of borrowing, the structure of the debt, the stability of investor demand, or the strength of economic growth. These are the factors that determine whether debt is manageable in practice. A country can have a stable ratio while risks are building beneath the surface, or a higher ratio while remaining relatively stable because those underlying conditions are stronger.",
        "The danger is in treating the ratio as the objective rather than the outcome. Focusing on hitting a particular number can distract from the real drivers of sustainability - growth, borrowing costs, and spending discipline. It can create the impression of control while the underlying pressures continue to build."
      ],
      callout: {
        label: "Takeaway",
        text: "The more useful way to view debt-to-GDP is as a signal, not a solution. It tells you where to look, but not what to fix. If the focus remains on the headline figure alone, policy risks missing the deeper issues that ultimately determine whether the public finances are stable or vulnerable."
      }
    }
  ],
  sources: [
    {
      label: "ONS public sector net debt as a percentage of GDP",
      note: "Used for the UK debt-to-GDP level and historical trend referenced throughout the article and for the headline metric.",
    },
    {
      label: "IMF World Economic Outlook",
      note: "Used for cross-country G7 debt-to-GDP comparisons to provide international context.",
    },
    {
      label: "OBR public finances databank",
      note: "Used for UK debt levels, borrowing trends and deficit context supporting the discussion on how debt evolves relative to GDP.",
    },
    {
      label: "ONS national accounts (GDP data)",
      note: "Used for GDP levels and growth context, including the relationship between economic expansion and changes in the debt-to-GDP ratio.",
    },
    {
      label: "OECD long-term interest rates",
      note: "Used for contextual comparison of borrowing costs across G7 economies when explaining why similar debt ratios can result in different outcomes.",
    },
    {
      label: "Bank of England yield curve data",
      note: "Used for UK borrowing cost context, supporting the discussion on the relationship between yields, interest costs and debt sustainability.",
    },
    {
      label: "UK Debt Management Office financing remit",
      note: "Used for context on debt structure, refinancing exposure and maturity profile referenced in the analysis of debt sustainability.",
    },
    {
      label: "OBR economic and fiscal outlook",
      note: "Used for forward-looking context on debt dynamics, interest costs and the interaction between growth and borrowing.",
    },
  ],
  relatedArticleSlugs: [
    "debt-interest-explained",
    "why-gilt-yields-matter",
    "borrowing-over-time",
    "where-government-money-goes",
  ],
};
