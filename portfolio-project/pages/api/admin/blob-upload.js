// pages/api/admin/blob-upload.js
//
// 브라우저가 파일을 "직접" Vercel Blob으로 업로드할 수 있도록 임시 토큰을 발급하는 라우트입니다.
// 파일 자체는 이 서버를 거치지 않고 브라우저 → Blob으로 바로 전송되기 때문에,
// 대용량 PDF를 올려도 서버리스 함수의 요청 크기 제한에 걸리지 않습니다.
//
// 이 라우트 자체는 middleware.js에 의해 /api/admin/* 로 이미 보호되고 있습니다.

import { handleUpload } from "@vercel/blob/client";

export default async function handler(request, response) {
  try {
    const jsonResponse = await handleUpload({
      body: request.body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: ["application/pdf", "text/html"],
          addRandomSuffix: true,
          pathname: `portfolio/files/${pathname}`,
        };
      },
      onUploadCompleted: async () => {
        // 업로드 완료 후 별도 처리는 pages/api/admin/add-item.js 에서
        // 클라이언트가 명시적으로 호출하는 방식으로 처리합니다 (더 단순하고 확실함).
      },
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
}
