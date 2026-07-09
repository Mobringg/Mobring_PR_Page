import { PROJECTS } from "@/lib/data";

function groupByCategory(projects) {
  const groups = [];
  const indexByCategory = {};
  for (const p of projects) {
    if (!(p.category in indexByCategory)) {
      indexByCategory[p.category] = groups.length;
      groups.push({ category: p.category, items: [] });
    }
    groups[indexByCategory[p.category]].items.push(p);
  }
  return groups;
}

export default function Portfolio() {
  const groups = groupByCategory(PROJECTS);

  return (
    <section className="section" style={{ paddingTop: 70 }}>
      <div className="shell">
        <p className="section-label">Portfolio</p>
        <h1 className="section-title">프로젝트</h1>
        <p className="section-desc">
          팀 프로젝트에서 담당한 기획 업무, 개인 제안서, 역기획서를 카테고리별로
          정리했습니다. 제목이나 링크를 클릭하면 상세 문서로 이동합니다.
        </p>

        {groups.map((group) => (
          <div key={group.category} className="portfolio-group">
            <div className="portfolio-group-head">
              <span className="portfolio-group-title">{group.category}</span>
              <span className="portfolio-group-count">{group.items.length}</span>
            </div>

            {group.items.map((p) => (
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
                <div
                  className="project-meta-grid"
                  style={{
                    gridTemplateColumns: `repeat(${p.meta.length}, 1fr)`,
                  }}
                >
                  {p.meta.map((m) => (
                    <div className="project-meta-cell" key={m.label}>
                      <div className="project-meta-label">{m.label}</div>
                      <div className="project-meta-value">{m.value}</div>
                    </div>
                  ))}
                </div>
                <div className="project-foot">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    {p.linkLabel || "자세히 보기"} ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
        ))}

        <div className="project-note">
          추가 프로젝트와 산출물(기획서, 다이어그램 등)은 준비되는 대로 이곳에
          업데이트됩니다.
        </div>
      </div>
    </section>
  );
}
