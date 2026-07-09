# 하승엽 포트폴리오

Next.js로 제작한 개인 포트폴리오 사이트입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 페이지 구성

- `/` 홈
- `/about` 자기소개서 (아코디언)
- `/portfolio` 포트폴리오 프로젝트
- `/contact` 연락처

## 내용 수정 방법

대부분의 텍스트(이름, 소개 문구, 자기소개서, 프로젝트 목록, 스킬)는
`lib/data.js` 한 파일에 모여 있습니다. 이 파일만 고치면 사이트 전체에 반영됩니다.

## Vercel로 배포하기

### 방법 A. GitHub 연동 (권장)

1. GitHub에 새 저장소를 만들고 이 프로젝트 폴더를 올립니다.
   ```bash
   git init
   git add .
   git commit -m "init"
   git branch -M main
   git remote add origin <본인 저장소 주소>
   git push -u origin main
   ```
2. https://vercel.com 에 GitHub 계정으로 로그인합니다.
3. "Add New… → Project"에서 방금 올린 저장소를 선택합니다.
4. Framework Preset이 Next.js로 자동 인식됩니다. 설정 변경 없이 "Deploy" 클릭.
5. 배포가 끝나면 `프로젝트이름.vercel.app` 주소가 발급됩니다.
6. 이후로는 GitHub에 `git push`만 하면 Vercel이 자동으로 재배포합니다.

### 방법 B. Vercel CLI (GitHub 없이 바로 배포)

```bash
npm i -g vercel
vercel login
vercel
```

프로젝트 폴더에서 위 명령어를 실행하면 질문 몇 개에 답하는 것만으로 바로 배포됩니다.
이후 수정 사항을 반영하려면 같은 폴더에서 `vercel --prod`를 다시 실행하면 됩니다.

## 커스텀 도메인 연결 (선택)

Vercel 프로젝트 설정 → Domains 에서 보유한 도메인을 추가하고,
도메인 등록업체(가비아 등)에서 안내되는 DNS 레코드를 등록하면 연결됩니다.
