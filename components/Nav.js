import Link from "next/link";
import { useRouter } from "next/router";

const LINKS = [
  { href: "/", label: "홈" },
  { href: "/about", label: "자기소개서" },
  { href: "/portfolio", label: "포트폴리오" },
  { href: "/contact", label: "연락처" },
];

export default function Nav() {
  const router = useRouter();

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          하<span>승엽</span>
        </Link>
        <nav className="nav-links">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                "nav-link" +
                (router.pathname === link.href ? " active" : "")
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
