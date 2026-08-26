// pages/admin.js
//
// 본인만 쓰는 포트폴리오 업로드 페이지입니다.
// middleware.js가 이미 이 경로 전체를 아이디·비밀번호로 막고 있습니다.

import { useState } from "react";
import { upload } from "@vercel/blob/client";
import { getDynamicProjects } from "@/lib/portfolio-blob";

export async function getServerSideProps() {
  const dynamicProjects = await getDynamicProjects();
  return { props: { dynamicProjects } };
}

const emptyMeta = [
  { label: "Role", value: "" },
  { label: "Format", value: "" },
  { label: "Genre", value: "" },
];

export default function Admin({ dynamicProjects }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    genre: "",
    summary: "",
    linkLabel: "",
  });
  const [meta, setMeta] = useState(emptyMeta);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [items, setItems] = useState(dynamicProjects);

  function updateMeta(index, field, value) {
    setMeta((prev) =>
      prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      setStatus("파일을 선택해주세요.");
      return;
    }
    setStatus("업로드 중...");

    try {
      // 1) 브라우저에서 Blob으로 파일 직접 업로드
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/admin/blob-upload",
      });

      // 2) 업로드된 파일 URL + 메타데이터를 manifest에 기록
      const res = await fetch("/api/admin/add-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          meta: meta.filter((m) => m.value),
          fileUrl: blob.url,
        }),
      });

      if (!res.ok) throw new Error((await res.json()).error || "추가 실패");
      const newItem = await res.json();

      setItems((prev) => [...prev, newItem]);
      setForm({ title: "", category: "", genre: "", summary: "", linkLabel: "" });
      setMeta(emptyMeta);
      setFile(null);
      setStatus("추가 완료! 포트폴리오 페이지에 반영되었습니다.");
    } catch (err) {
      setStatus(`실패: ${err.message}`);
    }
  }

  async function handleDelete(id) {
    if (!confirm("삭제하시겠습니까?")) return;
    await fetch("/api/admin/delete-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <section className="section" style={{ paddingTop: 70 }}>
      <div className="shell" style={{ maxWidth: 640 }}>
        <p className="section-label">Admin</p>
        <h1 className="section-title">포트폴리오 관리</h1>

        <form
          onSubmit={handleSubmit}
          style={{ display: "grid", gap: 10, margin: "24px 0 40px" }}
        >
          <input
            placeholder="제목 (예: 승리의 여신: 니케 — 신규 미니게임 제안서)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            placeholder="카테고리 (예: 제안서)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <input
            placeholder="장르 (예: 오토배틀러 미니게임 기획)"
            value={form.genre}
            onChange={(e) => setForm({ ...form, genre: e.target.value })}
          />
          <textarea
            placeholder="요약 설명"
            rows={3}
            value={form.summary}
            onChange={(e) => setForm({ ...form, summary: e.target.value })}
            required
          />
          <input
            placeholder="링크 버튼 텍스트 (예: 제안서 PDF 보기) — 비우면 '문서 보기'"
            value={form.linkLabel}
            onChange={(e) => setForm({ ...form, linkLabel: e.target.value })}
          />

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 13, color: "var(--ink-soft)" }}>
              메타 정보 (카드 하단에 표시되는 3칸)
            </label>
            {meta.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 8 }}>
                <input
                  style={{ width: 100 }}
                  value={m.label}
                  onChange={(e) => updateMeta(i, "label", e.target.value)}
                />
                <input
                  style={{ flex: 1 }}
                  placeholder="값"
                  value={m.value}
                  onChange={(e) => updateMeta(i, "value", e.target.value)}
                />
              </div>
            ))}
          </div>

          <input
            type="file"
            accept=".pdf,.html"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
          />

          <button type="submit" className="btn btn-primary">
            추가하기
          </button>
          {status && <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>{status}</p>}
        </form>

        <h2 className="section-title" style={{ fontSize: 20 }}>
          관리자 페이지에서 추가한 문서 ({items.length})
        </h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span>{item.title}</span>
              <button className="btn btn-ghost" onClick={() => handleDelete(item.id)}>
                삭제
              </button>
            </li>
          ))}
        </ul>
        <p style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 20 }}>
          기존에 lib/data.js에 직접 넣어둔 프로젝트(역기획서·세븐나이츠 분석 등)는
          이 목록에 나오지 않습니다 — 그건 코드에 있는 원본이고, 여기는 이후로 새로
          추가하는 문서만 관리합니다.
        </p>
      </div>
    </section>
  );
}
