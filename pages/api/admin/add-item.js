// pages/api/admin/add-item.js
//
// 브라우저에서 파일 업로드(@vercel/blob/client)가 끝난 뒤,
// 제목·설명 등 메타데이터와 방금 받은 fileUrl을 이 라우트로 보내
// manifest.json에 새 항목으로 기록합니다.

import { addDynamicProject } from "@/lib/portfolio-blob";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "POST만 허용됩니다." });
  }

  const { title, category, genre, summary, linkLabel, meta, fileUrl } = request.body;

  if (!title || !category || !fileUrl) {
    return response.status(400).json({ error: "title, category, fileUrl은 필수입니다." });
  }

  const newItem = await addDynamicProject({
    title,
    category,
    genre,
    summary,
    linkLabel,
    meta,
    fileUrl,
  });

  return response.status(200).json(newItem);
}
