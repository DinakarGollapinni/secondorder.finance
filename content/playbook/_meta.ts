export type PlaybookItem = {
  slug: string;
  title: string;
  category: "Gold" | "Crypto" | "Equity" | "REITs";
};

export const PLAYBOOK_ITEMS: PlaybookItem[] = [
  { slug: "gold", title: "Gold in a Long-Term Portfolio", category: "Gold" },
  { slug: "crypto", title: "Crypto as a Volatility Sleeve", category: "Crypto" },
  { slug: "equity", title: "Equity Core: Own the Economy", category: "Equity" },
  { slug: "reits", title: "REITs: Rates + Real Assets", category: "REITs" },
];

export const PLAYBOOK_CATEGORIES = ["Gold", "Crypto", "Equity", "REITs"] as const;
