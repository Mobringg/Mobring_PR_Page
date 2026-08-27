// pages/api/admin/site-content.js

import { saveSiteContent } from "@/lib/site-content-blob";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "POST만 허용됩니다." });
  }

  const content = request.body;
  if (!content || typeof content !== "object") {
    return response.status(400).json({ error: "잘못된 요청입니다." });
  }

  await saveSiteContent(content);
  return response.status(200).json({ ok: true });
}
