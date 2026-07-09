import Link from "next/link";
import SkillBar from "@/components/SkillBar";
import { SITE, STRENGTHS, SKILLS, PLAYED_GAMES } from "@/lib/data";

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

      <section className="section">
        <div className="shell">
          <p className="section-label">Played Games</p>
          <h2 className="section-title">{PLAYED_GAMES.title}</h2>
          <p className="section-desc">{PLAYED_GAMES.desc}</p>
          <a
            href={PLAYED_GAMES.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ marginTop: 26 }}
          >
            플레이 기록 보러가기 ↗
          </a>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <p className="section-label">Skills &amp; Tools</p>
          <h2 className="section-title">다루는 스킬과 툴</h2>
          <p className="section-desc">
            기획 문서를 실제 구현 가능한 형태로 옮기고, 팀과 함께 작업하는 데 사용하는
            도구들입니다.
          </p>
          <div className="skill-list">
            {SKILLS.map((s) => (
              <SkillBar key={s.name} name={s.name} level={s.level} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
