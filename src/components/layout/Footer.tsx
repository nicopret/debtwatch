import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container site-footer-inner">
        <div>
          <p className="site-logo">DebtWatch</p>
          <p className="site-tagline">
            UK debt, borrowing and public finance explained.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="site-nav-list">
            <li>
              <Link href="/sources">Sources</Link>
            </li>
            <li>
              <Link href="/articles">Articles</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
