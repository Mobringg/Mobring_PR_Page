import { SITE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>Contact</h4>
          <a href={`mailto:${SITE.email}`} className="footer-tag" style={{ display: "inline-block" }}>
            {SITE.email}
          </a>
        </div>
      </div>
      <p className="footer-copy">
        © {new Date().getFullYear()} {SITE.name}. Game Design Portfolio.
      </p>
    </footer>
  );
}
