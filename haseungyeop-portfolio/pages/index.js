import Link from "next/link";
import { SITE, STRENGTHS } from "@/lib/data";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="shell">
          <div className="doc-meta">
            <span><b>PORTFOLIO</b> DOCUMENT</span>
            <span>GAME CONTENTS DESIGN</span>
            <span>2026</span>
          </div>
          <div className="rule" />
          <p className="hero-eyebrow">Game Contents Designer</p>
          <h1 className="hero-name">{SITE.name}</h1>
          <p className="hero-role">{SITE.role}</p>
          <p className="hero-tagline">{SITE.tagline}</p>
          <div className="hero-actions">
            <Link href="/portfolio" className="btn btn-primary">
              포트폴리오 보기
            </Link>
            <Link href="/about" className="btn btn-ghost">
              자기소개서 읽기
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <p className="section-label">Design Principle</p>
          <h2 className="section-title">제가 기획을 대하는 방식</h2>
          <p className="section-desc">
            플레이어의 행동을 제한하기보다, 선택을 유도하는 규칙과 구조를 설계하려 합니다.
            아래 세 가지는 그 과정에서 제가 놓치지 않으려는 기준입니다.
          </p>
          <div className="card-grid">
            {STRENGTHS.map((s, i) => (
              <div className="strength-card" key={s.title}>
                <div className="strength-num">{String(i + 1).padStart(2, "0")}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
