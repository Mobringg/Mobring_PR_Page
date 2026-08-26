# 포트폴리오 동적 관리 적용 가이드

실제 프로젝트(haseungyeop-portfolio) 구조에 맞춰 아래 파일들을 추가/수정했습니다.

## 새로 추가된 파일
- `middleware.js` — `/admin`, `/api/admin/*` 를 아이디·비밀번호로 보호
- `lib/portfolio-blob.js` — Vercel Blob에서 항목 읽기/쓰기
- `pages/api/admin/blob-upload.js` — 브라우저 → Blob 직접 업로드용 토큰 발급
- `pages/api/admin/add-item.js` — 업로드된 파일 정보를 목록에 추가
- `pages/api/admin/delete-item.js` — 항목 삭제
- `pages/admin.js` — 관리자 업로드 페이지

## 수정된 파일
- `pages/portfolio.js` — 기존 `PROJECTS`에 Blob에 저장된 동적 항목을 합쳐서 렌더링
- `pages/index.js` — 상단 통계(총 문서 수, 카테고리별 개수)가 동적 항목까지 반영하도록 수정
- `package.json` — `@vercel/blob` 의존성 추가

기존에 있던 `lib/data.js`, 디자인, 스타일은 전혀 건드리지 않았습니다. 기존 6개 문서는 지금처럼 그대로 코드에 남아있고, **앞으로 추가하는 문서만 `/admin`을 통해 관리**되는 구조입니다.

## 배포 순서

### 1. Vercel에서 Blob 스토어 생성
1. vercel.com → 이 프로젝트 선택 → 상단 **Storage** 탭
2. **Create Database** → **Blob** 선택 → 생성
3. 생성하면 `BLOB_READ_WRITE_TOKEN`이 프로젝트에 자동으로 연결됩니다 (직접 복사/입력 불필요)

### 2. 관리자 로그인 정보 설정
Vercel 대시보드 → 프로젝트 → **Settings → Environment Variables**에 추가:

| Key | Value |
|---|---|
| `ADMIN_USER` | 원하는 아이디 (예: haseungyeop) |
| `ADMIN_PASSWORD` | 원하는 비밀번호 |

### 3. 로컬에서 테스트하고 싶다면
`.env.local` 파일을 프로젝트 루트에 만들고:
```
BLOB_READ_WRITE_TOKEN=Vercel 대시보드 Storage 탭에서 확인 가능한 토큰 값
ADMIN_USER=원하는 아이디
ADMIN_PASSWORD=원하는 비밀번호
```
그 다음:
```
npm install
npm run dev
```

### 4. 배포
```
git add .
git commit -m "포트폴리오 동적 관리 기능 추가 (Vercel Blob)"
git push
```
**이게 이 기능과 관련해 마지막으로 코드를 건드리는 순간입니다.** 이후로는 새 문서를 추가할 때 코드를 안 건드립니다.

## 사용법
1. `https://mobring-pr-page.vercel.app/admin` 접속
2. 브라우저가 아이디·비밀번호를 물으면 2번에서 설정한 값 입력
3. 제목·카테고리·장르·요약·메타 정보 입력 + 파일(PDF/HTML) 선택 → **추가하기**
4. `/portfolio`와 홈 화면 통계에 바로 반영됩니다 (재배포 불필요)
5. 잘못 올렸다면 관리자 페이지 목록에서 **삭제** 버튼으로 제거

## 알아두시면 좋은 점
- 파일 업로드는 브라우저에서 Blob으로 **직접** 전송됩니다. 서버(우리 API)를 거치지 않기 때문에 큰 PDF(예: 지금 있는 니케 제안서 2.5MB 등)를 올려도 서버리스 함수의 요청 크기 제한에 걸리지 않습니다.
- Basic Auth는 개인 혼자 쓰는 관리자 페이지에 적합한 수준의 간단한 보호입니다. 회사 서비스처럼 여러 명이 쓰거나 민감한 정보를 다루는 용도라면 더 강한 인증(NextAuth 등)이 필요하지만, 개인 포트폴리오 관리 용도로는 충분합니다.
- `pages/portfolio.js`와 `pages/index.js`는 매 요청마다 서버에서 최신 데이터를 가져오는 방식(`getServerSideProps`)으로 바꿨습니다. 개인 포트폴리오는 트래픽이 크지 않아 이 방식이 가장 단순하고 확실합니다. 나중에 방문자가 많아지면 캐싱(ISR)으로 전환할 수 있습니다.
