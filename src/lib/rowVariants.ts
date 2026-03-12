import type { RowProps } from "@/components/ui/rowComponent/Row";

export type RowVariant = "default" | "metrics" | "content" | "articles";

export type RowLayoutConfig = Pick<
  RowProps,
  "columns" | "gap" | "align" | "justify" | "wrap"
>;

export const ROW_VARIANTS: Record<RowVariant, RowLayoutConfig> = {
  default: {
    gap: "1rem",
    wrap: true,
    align: "stretch",
    justify: "flex-start",
  },
  metrics: {
    columns: 4,
    gap: "1rem",
    wrap: true,
    align: "stretch",
    justify: "flex-start",
  },
  content: {
    columns: 2,
    gap: "1.5rem",
    wrap: true,
    align: "stretch",
    justify: "flex-start",
  },
  articles: {
    columns: 3,
    gap: "1.25rem",
    wrap: true,
    align: "stretch",
    justify: "flex-start",
  },
};
