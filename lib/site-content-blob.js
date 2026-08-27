// lib/site-content-blob.js
//
// 홈/자기소개서 페이지의 텍스트 콘텐츠(이름, 소개문구, 강점, 스킬, 자기소개서 섹션 등)를
// portfolio/site-content.json 파일 하나에 저장하고 불러옵니다.
//
// 이 파일이 아직 없을 때(맨 처음 상태)는 lib/data.js에 있던 기존 값을
// 기본값(DEFAULTS)으로 그대로 사용합니다 — 관리자 페이지에서 저장하기 전까지는
// 지금까지와 동일한 화면이 보장됩니다.

import { put, list } from "@vercel/blob";
import {
  SITE,
  STRENGTHS,
  SKILLS,
  PLAYED_GAMES,
  CORE_COMPETENCIES,
  ABOUT_SECTIONS,
} from "@/lib/data";

const SITE_CONTENT_PATH = "portfolio/site-content.json";

export const DEFAULT_SITE_CONTENT = {
  site: SITE,
  strengths: STRENGTHS,
  skills: SKILLS,
  playedGames: PLAYED_GAMES,
  coreCompetencies: CORE_COMPETENCIES,
  aboutSections: ABOUT_SECTIONS,
};

export async function getSiteContent() {
  const { blobs } = await list({ prefix: SITE_CONTENT_PATH });
  const blob = blobs.find((b) => b.pathname === SITE_CONTENT_PATH);
  if (!blob) return DEFAULT_SITE_CONTENT;

  // manifest.json과 같은 이유로 캐시 무효화 파라미터를 붙여 항상 최신 내용을 가져옵니다.
  const bustCacheUrl = `${blob.url}?t=${Date.now()}`;
  const res = await fetch(bustCacheUrl, { cache: "no-store" });
  if (!res.ok) return DEFAULT_SITE_CONTENT;

  const saved = await res.json();
  // 혹시 저장된 파일에 일부 필드가 빠져있어도 기본값으로 채워지도록 병합합니다.
  return { ...DEFAULT_SITE_CONTENT, ...saved };
}

export async function saveSiteContent(content) {
  await put(SITE_CONTENT_PATH, JSON.stringify(content, null, 2), {
    access: "public",
    contentType: "application/json",
    allowOverwrite: true,
    addRandomSuffix: false,
    cacheControlMaxAge: 0,
  });
}
