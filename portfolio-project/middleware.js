// middleware.js (프로젝트 최상위 루트에 위치 — pages/ 폴더와 같은 레벨)
//
// /admin 페이지와 /api/admin/* 요청 전체를 HTTP Basic Auth로 보호합니다.
// 브라우저로 /admin에 접속하면 아이디·비밀번호를 묻는 팝업이 뜹니다.
// 한 번 입력하면 브라우저가 세션 동안 기억해서, 이후 /api/admin/* 요청에도
// 자동으로 같은 인증정보를 실어 보내줍니다.

import { NextResponse } from "next/server";

export function middleware(request) {
  const authHeader = request.headers.get("authorization");

  const validUser = process.env.ADMIN_USER;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (authHeader) {
    const encoded = authHeader.split(" ")[1];
    const decoded = Buffer.from(encoded, "base64").toString();
    const [user, password] = decoded.split(":");

    if (user === validUser && password === validPassword) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Admin"' },
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
