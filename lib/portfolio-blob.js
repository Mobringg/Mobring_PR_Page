// lib/portfolio-blob.js
//
// 관리자 페이지(/admin)에서 추가한 포트폴리오 항목들을 Vercel Blob에 저장하고 불러옵니다.
// 항목의 형태는 lib/data.js의 PROJECTS 배열 항목과 완전히 동일하게 맞춰서,
// portfolio.js / index.js의 기존 렌더링 코드를 그대로 재사용할 수 있게 했습니다.
//
// 저장 방식: portfolio/manifest.json 파일 하나에 배열 전체를 저장합니다.
// (개인 포트폴리오 규모라 수십 개 수준이므로, 통째로 읽고 통째로 쓰는 방식으로 충분합니다.)

import { put, list } from "@vercel/blob";

const MANIFEST_PATH = "portfolio/manifest.json";

export async function getDynamicProjects() {
  const { blobs } = await list({ prefix: MANIFEST_PATH });
  const manifestBlob = blobs.find((b) => b.pathname === MANIFEST_PATH);
  if (!manifestBlob) return [];

  const res = await fetch(manifestBlob.url, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

async function saveDynamicProjects(items) {
  await put(MANIFEST_PATH, JSON.stringify(items, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false, // 반드시 false여야 매번 같은 파일(portfolio/manifest.json)을 덮어씁니다
  });
}

/**
 * 새 프로젝트 항목을 추가합니다.
 * fileUrl은 브라우저에서 @vercel/blob/client로 이미 업로드가 끝난 뒤 전달받은 URL입니다.
 */
export async function addDynamicProject({
  title,
  category,
  genre,
  summary,
  linkLabel,
  meta,
  fileUrl,
}) {
  const items = await getDynamicProjects();

  const newItem = {
    id: `dyn-${Date.now()}`,
    category,
    title,
    genre,
    link: fileUrl,
    linkLabel: linkLabel || "문서 보기",
    external: true,
    summary,
    meta, // [{ label, value }, ...] 형태 그대로 전달받아 저장
    dynamic: true, // 관리자 페이지에서 추가했다는 표시 (삭제 UI 등에 활용)
  };

  await saveDynamicProjects([...items, newItem]);
  return newItem;
}

export async function removeDynamicProject(id) {
  const items = await getDynamicProjects();
  await saveDynamicProjects(items.filter((item) => item.id !== id));
}
