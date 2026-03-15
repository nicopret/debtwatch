import styles from "./embedIconButton.module.css";

export interface EmbedIconButtonProps {
  ariaLabel?: string;
  onClick: () => void;
}

export default function EmbedIconButton({
  ariaLabel = "Open embed options",
  onClick,
}: EmbedIconButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <svg
        aria-hidden="true"
        className={styles.icon}
        viewBox="0 0 24 24"
      >
        <path
          d="M15 5h4v4M10 14 19 5M19 14v4h-4M5 10V6h4M5 19h4v-4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    </button>
  );
}

