import { PROJECTS } from "@/lib/data";

export default function Portfolio() {
  return (
    <section className="section" style={{ paddingTop: 70 }}>
      <div className="shell">
        <p className="section-label">Portfolio</p>
        <h1 className="section-title">프로젝트</h1>
        <p className="section-desc">
          팀 프로젝트에서 담당한 기획 업무와 산출물입니다. 프로젝트명을 클릭하면 상세
          기획 문서로 이동합니다.
        </p>

        {PROJECTS.map((p) => (
          <article className="project-card" key={p.id}>
            <div className="project-head">
              <h2 className="project-title">{p.title}</h2>
              <span className="project-genre">{p.genre}</span>
            </div>
            <div className="shell" style={{ padding: "18px 34px 0" }}>
              <p style={{ color: "var(--ink-soft)", fontSize: 15, margin: 0 }}>
                {p.summary}
              </p>
            </div>
            <div className="project-meta-grid">
              <div className="project-meta-cell">
                <div className="project-meta-label">Role</div>
                <div className="project-meta-value">{p.role}</div>
              </div>
              <div className="project-meta-cell">
                <div className="project-meta-label">Engine</div>
                <div className="project-meta-value">{p.engine}</div>
              </div>
              <div className="project-meta-cell">
                <div className="project-meta-label">Genre</div>
                <div className="project-meta-value">{p.genre}</div>
              </div>
            </div>
            <div className="project-foot">
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                기획 문서 보기 ↗
              </a>
            </div>
          </article>
        ))}

        <div className="project-note">
          추가 프로젝트와 산출물(기획서, 다이어그램 등)은 준비되는 대로 이곳에
          업데이트됩니다.
        </div>
      </div>
    </section>
  );
}
