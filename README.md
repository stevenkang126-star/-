# 신우회 기도제목 · 출석부 (v2)

군 신우회를 위한 웹앱입니다. **Google 계정으로 로그인하면 기도제목을 신우들과 실시간으로 나눌 수 있고**, 리더(현욱 님)는 같은 주소에서 출석부·명단·통계까지 관리합니다. 서버를 따로 두지 않고 GitHub Pages + Firebase(Firestore)로 동작하며, 안드로이드 크롬에서는 앱처럼 설치해 쓸 수 있습니다.

앱 주소: <https://stevenkang126-star.github.io/-/>

## 누구에게 무엇이 보이나

| 로그인 | 보이는 화면 | 기도제목 |
| --- | --- | --- |
| 로그인 안 함 | Google 로그인 안내 화면 (이 기기에 출석 자료가 있으면 ‘로컬 출석부 열기’도 표시) | — |
| 일반 신우 (모든 Google 계정) | **기도제목 화면만** (출석·명단·통계·백업 탭은 숨김) | 전체 공유 글 + 내가 쓴 비공개 글 |
| 리더 · 관리자 (`stevenkang126@gmail.com`) | 모든 탭 (출석 체크·기도제목·신우 명단·통계·기록·저장·백업) | 전체 공유 글 + 모든 신우의 비공개 글 |

- 입대일·전역일·생일·출석 기록은 **이 기기(브라우저)에만** 저장되고, 로그인해도 클라우드로 올라가지 않습니다.
- 일반 신우 화면에서는 개인정보가 담긴 탭 자체가 보이지 않습니다.
- 기도제목 공개 범위는 글마다 고릅니다.
  - 🌐 **전체 공유** — 신우들이 함께 보고 기도합니다.
  - 🔒 **리더에게만 비공개** — 나와 리더(현욱 님)만 봅니다.

## 기도제목 쓰는 법

1. 로그인하면 바로 기도제목 화면이 열립니다.
2. **+ 기도제목 나누기** → 이름(Google 이름이 기본, 수정 가능), 카테고리(건강·가족·군 생활·학업·진로·신앙·감사·기타), 내용을 적고 공개 범위를 고릅니다.
3. 올린 글은 신우들 화면에 **실시간**으로 나타납니다. 응답을 받으면 **응답 체크**로 감사 표시를 합니다.
4. 내가 쓴 글만 수정·삭제·응답 체크할 수 있습니다. (리더는 모든 글을 관리)

## 리더(현욱 님) 화면

- 기존 출석부 기능은 그대로입니다: 출석 체크, 신우 명단(입대일·전역일·생일), 통계·기록, JSON 백업/복원, CSV 내보내기.
- 기도제목 탭은 클라우드 실시간 모드로 바뀌어 전체 공유 글과 모든 신우의 비공개 글을 함께 봅니다.
- 예전 버전에서 이 폰에 적어 둔 기도제목이 있으면 기도제목 탭 위에 **‘클라우드로 옮기기’** 카드가 뜹니다. 한 번 누르면 전부 전체 공유로 올라가고, 이 폰의 원본은 그대로 남습니다.

## 파일 구성

| 파일 | 설명 |
| --- | --- |
| `index.html` | 앱 본체 (단일 파일) |
| `manifest.webmanifest` | 앱 이름·아이콘·전체화면 설정 |
| `sw.js` | 오프라인 실행용 서비스 워커 (Firebase·Google 요청은 캐시하지 않고 통과) |
| `icon-192.png`, `icon-512.png` | 앱 아이콘 |

## Firebase 설정

```js
const firebaseConfig = {
  apiKey: "AIzaSyDw_KiD04PtZ77pPEsI8LpQAh6zE6wcr1A",
  authDomain: "sinyuhoe-prayer.firebaseapp.com",
  projectId: "sinyuhoe-prayer",
  storageBucket: "sinyuhoe-prayer.firebasestorage.app",
  messagingSenderId: "939432194243",
  appId: "1:939432194243:web:633dc3fd23c21deba03276"
};
```

- Firestore 컬렉션: `prayers/{prayerId}`
- 문서 필드: `authorUid`, `authorName`, `authorEmail`, `visibility`(`public`·`private`), `content`, `category`, `answered`, `answeredAt`, `createdAt`, `updatedAt`
- 보안 규칙 요약: 읽기는 `public` 글이거나 내 글, 또는 관리자. 쓰기·수정·삭제는 작성자 또는 관리자.
- 일반 신우는 규칙 때문에 전체 컬렉션을 구독할 수 없으므로, 앱은 `where('visibility','==','public')`과 `where('authorUid','==',내 uid)`를 각각 구독해 합칩니다. 관리자만 전체 컬렉션을 구독합니다.
- Google 로그인을 쓰려면 Firebase 콘솔의 **Authentication → Settings → 승인된 도메인**에 `stevenkang126-star.github.io`가 있어야 합니다.

## 배포 · 업데이트

- 실제 서비스 주소는 GitHub Pages의 `gh-pages` 브랜치에서 나옵니다.
- `main`과 `gh-pages` 두 브랜치의 내용을 같게 유지합니다. `index.html`을 고친 뒤 두 브랜치에 모두 올리세요.
- 앱을 한 번 설치한 기기는 서비스 워커 캐시를 씁니다. 새 버전을 올릴 때는 `sw.js`의 `CACHE_NAME`을 올려야 홈 화면 앱에도 반영됩니다. (v3: `sinyuhoe-attendance-v3`)
- 폰에서는 앱을 완전히 닫았다 다시 열면 새 버전이 적용됩니다.
