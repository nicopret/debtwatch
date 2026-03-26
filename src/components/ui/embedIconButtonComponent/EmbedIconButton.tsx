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
        <circle cx="5" cy="12" r="2.3" fill="#ffffff" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="18" cy="4.8" r="2.3" fill="#ffffff" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="18" cy="19.2" r="2.3" fill="#ffffff" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M7 10.9 15.8 5.9M7 13.1l8.8 5"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.9"
        />
      </svg>
    </button>
  );
}
