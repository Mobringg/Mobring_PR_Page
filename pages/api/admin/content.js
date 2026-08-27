// pages/admin/content.js
//
// 홈/자기소개서 페이지의 텍스트를 코드 수정 없이 편집하는 화면입니다.
// middleware.js가 /admin/:path* 전체를 이미 보호하고 있어 이 페이지도 자동으로 보호됩니다.

import { useState } from "react";
import Link from "next/link";
import { getSiteContent } from "@/lib/site-content-blob";

export async function getServerSideProps() {
  const content = await getSiteContent();
  return { props: { initialContent: content } };
}

const inputStyle = { width: "100%" };
const rowStyle = { display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" };
const smallBtn = { padding: "5px 10px", fontSize: 12 };

export default function AdminContent({ initialContent }) {
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState("");

  function update(path, value) {
    setContent((prev) => {
      const next = structuredClone(prev);
      let obj = next;
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
      obj[path[path.length - 1]] = value;
      return next;
    });
  }

  async function handleSave() {
    setStatus("저장 중...");
    const res = await fetch("/api/admin/site-content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setStatus(res.ok ? "저장 완료! 홈/자기소개서 페이지에 반영됩니다 (수 초 지연될 수 있음)." : "저장 실패했습니다.");
  }

  return (
    <section className="section" style={{ paddingTop: 70 }}>
      <div className="shell" style={{ maxWidth: 720 }}>
        <p className="section-label">Admin</p>
        <h1 className="section-title">사이트 콘텐츠 관리</h1>
        <p style={{ marginBottom: 20 }}>
          <Link href="/admin" className="btn btn-ghost">← 문서 관리로 돌아가기</Link>
        </p>

        {/* 기본 정보 */}
        <h2 className="section-title" style={{ fontSize: 18 }}>기본 정보</h2>
        <div style={{ display: "grid", gap: 8, marginBottom: 30 }}>
          <input style={inputStyle} placeholder="이름" value={content.site.name}
            onChange={(e) => update(["site", "name"], e.target.value)} />
          <input style={inputStyle} placeholder="직무 (예: 게임 컨텐츠 기획자 지망)" value={content.site.role}
            onChange={(e) => update(["site", "role"], e.target.value)} />
          <textarea style={inputStyle} rows={2} placeholder="한 줄 소개 문구" value={content.site.tagline}
            onChange={(e) => update(["site", "tagline"], e.target.value)} />
          <input style={inputStyle} placeholder="이메일" value={content.site.email}
            onChange={(e) => update(["site", "email"], e.target.value)} />
          <input style={inputStyle} placeholder="LinkedIn URL" value={content.site.linkedin}
            onChange={(e) => update(["site", "linkedin"], e.target.value)} />
        </div>

        {/* 강점 3가지 */}
        <h2 className="section-title" style={{ fontSize: 18 }}>강점 카드 (홈 화면 "제가 기획을 대하는 방식")</h2>
        {content.strengths.map((s, i) => (
          <div key={i} style={{ border: "1px solid #eee", borderRadius: 6, padding: 10, marginBottom: 8 }}>
            <input style={{ ...inputStyle, marginBottom: 6, fontWeight: 700 }} placeholder="제목" value={s.title}
              onChange={(e) => update(["strengths", i, "title"], e.target.value)} />
            <textarea style={inputStyle} rows={2} placeholder="설명" value={s.desc}
              onChange={(e) => update(["strengths", i, "desc"], e.target.value)} />
            <button className="btn btn-ghost" style={smallBtn}
              onClick={() => update(["strengths"], content.strengths.filter((_, idx) => idx !== i))}>
              이 강점 삭제
            </button>
          </div>
        ))}
        <button className="btn btn-ghost" style={{ ...smallBtn, marginBottom: 30 }}
          onClick={() => update(["strengths"], [...content.strengths, { title: "", desc: "" }])}>
          + 강점 추가
        </button>

        {/* 스킬 */}
        <h2 className="section-title" style={{ fontSize: 18 }}>스킬 &amp; 툴 (막대그래프)</h2>
        {content.skills.map((s, i) => (
          <div key={i} style={rowStyle}>
            <input style={{ flex: 2 }} placeholder="이름 (예: Unreal Engine)" value={s.name}
              onChange={(e) => update(["skills", i, "name"], e.target.value)} />
            <input style={{ flex: 1 }} type="number" min={0} max={100} placeholder="숙련도 (0~100)" value={s.level}
              onChange={(e) => update(["skills", i, "level"], Number(e.target.value))} />
            <button className="btn btn-ghost" style={smallBtn}
              onClick={() => update(["skills"], content.skills.filter((_, idx) => idx !== i))}>삭제</button>
          </div>
        ))}
        <button className="btn btn-ghost" style={{ ...smallBtn, marginBottom: 30 }}
          onClick={() => update(["skills"], [...content.skills, { name: "", level: 50 }])}>
          + 스킬 추가
        </button>

        {/* 핵심 역량 태그 */}
        <h2 className="section-title" style={{ fontSize: 18 }}>핵심 역량 태그</h2>
        {content.coreCompetencies.map((c, i) => (
          <div key={i} style={rowStyle}>
            <input style={{ flex: 1 }} value={c}
              onChange={(e) => update(["coreCompetencies", i], e.target.value)} />
            <button className="btn btn-ghost" style={smallBtn}
              onClick={() => update(["coreCompetencies"], content.coreCompetencies.filter((_, idx) => idx !== i))}>삭제</button>
          </div>
        ))}
        <button className="btn btn-ghost" style={{ ...smallBtn, marginBottom: 30 }}
          onClick={() => update(["coreCompetencies"], [...content.coreCompetencies, ""])}>
          + 태그 추가
        </button>

        {/* 플레이한 게임 안내 */}
        <h2 className="section-title" style={{ fontSize: 18 }}>플레이한 게임 안내 (홈 화면 하단)</h2>
        <div style={{ display: "grid", gap: 8, marginBottom: 30 }}>
          <input style={inputStyle} placeholder="제목" value={content.playedGames.title}
            onChange={(e) => update(["playedGames", "title"], e.target.value)} />
          <textarea style={inputStyle} rows={2} placeholder="설명" value={content.playedGames.desc}
            onChange={(e) => update(["playedGames", "desc"], e.target.value)} />
          <input style={inputStyle} placeholder="링크 (예: 구글 시트 URL)" value={content.playedGames.link}
            onChange={(e) => update(["playedGames", "link"], e.target.value)} />
        </div>

        {/* 자기소개서 섹션 */}
        <h2 className="section-title" style={{ fontSize: 18 }}>자기소개서 섹션</h2>
        {content.aboutSections.map((sec, i) => (
          <div key={i} style={{ border: "1px solid #eee", borderRadius: 6, padding: 12, marginBottom: 10 }}>
            <input style={{ ...inputStyle, marginBottom: 8, fontWeight: 700 }} placeholder="섹션 제목" value={sec.title}
              onChange={(e) => update(["aboutSections", i, "title"], e.target.value)} />
            {sec.paragraphs.map((p, j) => (
              <div key={j} style={rowStyle}>
                <textarea style={{ flex: 1 }} rows={3} value={p}
                  onChange={(e) => update(["aboutSections", i, "paragraphs", j], e.target.value)} />
                <button className="btn btn-ghost" style={smallBtn}
                  onClick={() => update(["aboutSections", i, "paragraphs"], sec.paragraphs.filter((_, idx) => idx !== j))}>
                  단락 삭제
                </button>
              </div>
            ))}
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-ghost" style={smallBtn}
                onClick={() => update(["aboutSections", i, "paragraphs"], [...sec.paragraphs, ""])}>
                + 단락 추가
              </button>
              <button className="btn btn-ghost" style={smallBtn}
                onClick={() => update(["aboutSections"], content.aboutSections.filter((_, idx) => idx !== i))}>
                이 섹션 전체 삭제
              </button>
            </div>
          </div>
        ))}
        <button className="btn btn-ghost" style={{ ...smallBtn, marginBottom: 30 }}
          onClick={() => update(["aboutSections"], [...content.aboutSections, { title: "", paragraphs: [""] }])}>
          + 섹션 추가
        </button>

        <div style={{ position: "sticky", bottom: 0, background: "#fff", padding: "16px 0", borderTop: "1px solid #eee" }}>
          <button className="btn btn-primary" onClick={handleSave}>전체 저장</button>
          {status && <span style={{ marginLeft: 12, fontSize: 13, color: "var(--ink-soft)" }}>{status}</span>}
        </div>
      </div>
    </section>
  );
}
