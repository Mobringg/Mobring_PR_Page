// pages/api/admin/toggle-publish.js

import { setPublished } from "@/lib/portfolio-blob";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "POST만 허용됩니다." });
  }

  const { id, published } = request.body;
  if (!id || typeof published !== "boolean") {
    return response.status(400).json({ error: "id와 published(boolean)는 필수입니다." });
  }

  const updated = await setPublished(id, published);
  return response.status(200).json(updated);
}
