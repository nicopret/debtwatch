import Link from "next/link";

export type MetricCardTone = "neutral" | "teal" | "amber";

export interface MetricCardProps {
  label: string;
  value: string;
  helperText: string;
  tone?: MetricCardTone;
  href?: string;
  linkLabel?: string;
}

export default function MetricCard({
  label,
  value,
  helperText,
  tone = "neutral",
  href,
  linkLabel,
}: MetricCardProps) {
  // Presentational component: renders display props only and stays data-source agnostic.
  return (
    <article className={`metric-card metric-card--${tone}`}>
      <p className="metric-card-label">{label}</p>
      <p className="metric-card-value">{value}</p>
      <p className="metric-card-helper">{helperText}</p>
      {href && linkLabel ? (
        <Link className="metric-card-link" href={href}>
          {linkLabel}
        </Link>
      ) : null}
    </article>
  );
}
