export type PlaybookArticle = {
  slug: string;
  title: string;
  description: string;
  category: "Gold" | "Crypto" | "Equity" | "REITs";
};

export const playbookIndex: PlaybookArticle[] = [
  {
    slug: "gold",
    title: "Gold in a Long-Term Portfolio",
    description: "Why gold acts as insurance, not growth.",
    category: "Gold",
  },
  {
    slug: "crypto",
    title: "Crypto as a Volatility Sleeve",
    description: "Sizing, cycles, and when it helps vs hurts.",
    category: "Crypto",
  },
  {
    slug: "equity",
    title: "Equity Core: Own the Economy",
    description: "The default engine for long-term growth.",
    category: "Equity",
  },
  {
    slug: "reits",
    title: "REITs: Rates + Real Assets",
    description: "How to think about them across regimes.",
    category: "REITs",
  },
];
