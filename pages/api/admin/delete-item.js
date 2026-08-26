// pages/api/admin/delete-item.js

import { removeDynamicProject } from "@/lib/portfolio-blob";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "POST만 허용됩니다." });
  }

  const { id } = request.body;
  if (!id) {
    return response.status(400).json({ error: "id는 필수입니다." });
  }

  await removeDynamicProject(id);
  return response.status(200).json({ ok: true });
}
