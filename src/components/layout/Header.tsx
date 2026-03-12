import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-container site-header-inner">
        <Link className="site-brand" href="/">
          <Image
            src="/assets/debtwatch-logo.png"
            alt="DebtWatch logo"
            width={36}
            height={36}
            priority
          />
          <span className="site-logo">DebtWatch</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="site-nav-list">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/articles">Articles</Link>
            </li>
            <li>
              <Link href="/methodology">Methodology</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
