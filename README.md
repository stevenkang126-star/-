# 신우회 기도제목 · 출석부 (v4)

군 신우회를 위한 웹앱입니다. **6개 부대(반)별로 명단·출석·통계·기도제목이 완전히 나뉘어** 있고, 반마다 전용 링크가 있습니다. **Google 계정으로 로그인하면 기도제목을 신우들과 실시간으로 나눌 수 있고**, 반 담임 교사와 대표신우는 자기 반 화면을 함께 씁니다. 서버를 따로 두지 않고 GitHub Pages + Firebase(Firestore)로 동작하며, 안드로이드 크롬에서는 앱처럼 설치해 쓸 수 있습니다.

앱 주소: <https://stevenkang126-star.github.io/-/>

## 6개 반과 전용 링크

| 반 | 담임 교사 | 전용 링크 |
| --- | --- | --- |
| 701통신 · 운영대대 | 이재인 집사 | <https://stevenkang126-star.github.io/-/?room=701comm> |
| 군사경찰 · 특임대 | 박민지 집사님 | <https://stevenkang126-star.github.io/-/?room=mp> |
| 통신단 본부 | 박상두 집사님 | <https://stevenkang126-star.github.io/-/?room=commhq> |
| 본부대 | 강현욱 집사님 | <https://stevenkang126-star.github.io/-/?room=bonbu> |
| 군악대 | 마재국 집사님 | <https://stevenkang126-star.github.io/-/?room=band> |
| 140정보대대 · 방첩 · 파견부대 | 박규환 집사님 | <https://stevenkang126-star.github.io/-/?room=140intel> |

- 주소의 `?room=` 이 그 사람의 반을 정합니다. 앱 안에서 보이는 명단·출석·통계·기도제목은 그 반의 자료뿐입니다.
- `?room=` 없이 들어온 일반 신우·교사에게는 **소속 반 선택** 화면이 먼저 나옵니다. 반을 누르면 그 반 주소로 들어갑니다.
- 총괄 관리자는 `?room=` 없이 들어와도 **본부대**로 열리고, 상단의 반 선택 드롭다운으로 6개 반을 오가며 모든 반을 조회·관리합니다.

## 누구에게 무엇이 보이나

| 로그인 | 보이는 화면 | 기도제목 |
| --- | --- | --- |
| 로그인 안 함 | Google 로그인 안내 화면 (이 기기에 출석 자료가 있으면 ‘로컬 출석부 열기’도 표시) | — |
| 일반 신우 | **기도제목 화면만** | 그 반의 전체 공유 글 + 내가 쓴 비공개 글 |
| 반 대표신우 (`rooms/{반}/leaders/{이메일}` 의 `role: 'rep'`) | **출석 체크 + 기도제목** (출석 화면에 이름·목장·입대일·전역 D-day·생일 표시) | 위와 같음 |
| 반 담임 교사 (`role: 'teacher'`) | **출석 체크 · 신우 명단 · 통계·기록 · 기도제목** (자기 반만) + 자기 반 대표신우 지정·해제 | 위와 같음 |
| 총괄 관리자 (`stevenkang126@gmail.com`) | 모든 탭 + 6개 반 전환 + 반별 링크 복사 + 반별 담임 교사·대표신우 지정 + 반별 클라우드 올리기 | 모든 신우의 비공개 글 |

- 로그인하지 않고 쓰는 출석부는 **이 기기(브라우저)에 반별로** 저장됩니다. v3까지 이 폰에 있던 자료는 본부대 자료로 이어받습니다.
- 총괄 관리자가 ‘저장·백업’에서 **올리기**를 누르면 지금 선택된 반의 명단과 출석 기록이 Firestore로 올라가 그 반 교사·대표신우와 실시간으로 공유됩니다. 올라가는 것은 이름·목장·직분·입대일·전역일·생일·출석 상태이며 **연락처·비고는 이 폰에만** 남습니다.
- 담임 교사가 명단을 등록·수정·삭제하면 그 반 클라우드 명단에 바로 반영됩니다. (대표신우는 명단을 읽기만 합니다)
- 기도제목 공개 범위는 글마다 고릅니다.
  - 🌐 **전체 공유** — 그 반 신우들이 함께 보고 기도합니다.
  - 🔒 **리더에게만 비공개** — 나와 총괄 관리자만 봅니다.

## 기도제목 쓰는 법

1. 자기 반 링크로 들어가 로그인하면 기도제목 화면이 열립니다.
2. **+ 기도제목 나누기** → 이름(Google 이름이 기본, 수정 가능), 카테고리, 내용을 적고 공개 범위를 고릅니다.
3. 올린 글은 같은 반 신우들 화면에 **실시간**으로 나타납니다. 응답을 받으면 **응답 체크**로 감사 표시를 합니다.
4. 내가 쓴 글만 수정·삭제·응답 체크할 수 있습니다. (총괄 관리자는 모든 글을 관리)

## 담임 교사 · 대표신우 지정

1. **총괄 관리자**: 저장·백업 탭(또는 신우 명단 탭)의 **👥 이 반 담임 교사·대표신우** 카드 → 반을 고른 뒤 구글 이메일과 역할(담임 교사/대표신우)을 넣고 **추가**.
2. **반 담임 교사**: 신우 명단 탭의 같은 카드에서 **자기 반 대표신우만** 추가·해제할 수 있습니다. (담임 교사 변경은 총괄 관리자만)
3. 지정된 사람이 그 반 링크로 구글 로그인하면 상단에 `반 담임 교사` 또는 `대표신우` 배지가 붙고, 자기 반 화면이 열립니다.
4. 출석 버튼을 누르면 `rooms/{반}/attendance/{날짜_모임}` 문서에 즉시 저장되어 같은 반 교사·대표신우 화면에도 실시간으로 나타납니다.
5. 권한을 뺄 때는 목록에서 **삭제**.

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

- Firestore 컬렉션 (반별 서브컬렉션)
  - `rooms/{roomId}/leaders/{email}`: 반 담임 교사·대표신우. `email`, `role`(`teacher`·`rep`), `addedBy`, `addedAt`. 문서 ID = 소문자 구글 이메일.
  - `rooms/{roomId}/members/{memberId}`: 명단 공유용 최소 정보. `name`, `group`, `role`, `enlistDate`, `dischargeDate`, `birthday`, `order`, `active`, `updatedAt` (연락처·비고는 올리지 않음).
  - `rooms/{roomId}/attendance/{날짜_모임}`: 날짜별 출석. `records.{memberId} = {status, note, updatedBy, updatedAt}`, `date`, `meeting`, `room`, `updatedAt`, `updatedBy`. 예: `2026-11-22_주일예배`.
  - `rooms/{roomId}/prayers/{prayerId}`: 기도제목. `authorUid`, `authorName`, `authorEmail`, `visibility`(`public`·`private`), `content`, `category`, `answered`, `answeredAt`, `createdAt`, `updatedAt`.
  - `users/{userId}`: 계정별 설정 자리.
  - roomId: `701comm`, `mp`, `commhq`, `bonbu`, `band`, `140intel`
- 보안 규칙 요약
  - `leaders`: 총괄 관리자 전체. 담임 교사는 자기 반 목록 읽기와 **대표신우(`rep`) 추가·삭제만**. 본인 문서는 본인이 읽기.
  - `members`: 읽기는 총괄 관리자·그 반 교사·대표신우, 쓰기는 총괄 관리자·그 반 담임 교사.
  - `attendance`: 읽기·쓰기 모두 총괄 관리자·그 반 교사·대표신우.
  - `prayers`: 읽기는 `public` 글이거나 내 글, 또는 총괄 관리자. 쓰기·수정·삭제는 작성자 또는 총괄 관리자.
- 일반 신우는 규칙 때문에 전체 컬렉션을 구독할 수 없으므로, 앱은 `where('visibility','==','public')`과 `where('authorUid','==',내 uid)`를 각각 구독해 합칩니다. 교사·대표신우·총괄 관리자는 그 반 컬렉션을 구독합니다.
- Google 로그인을 쓰려면 Firebase 콘솔의 **Authentication → Settings → 승인된 도메인**에 `stevenkang126-star.github.io`가 있어야 합니다.

## 배포 · 업데이트

- 실제 서비스 주소는 GitHub Pages의 `gh-pages` 브랜치에서 나옵니다.
- `main`과 `gh-pages` 두 브랜치의 내용을 같게 유지합니다. `index.html`을 고친 뒤 두 브랜치에 모두 올리세요.
- 앱을 한 번 설치한 기기는 서비스 워커 캐시를 씁니다. 새 버전을 올릴 때는 `sw.js`의 `CACHE_NAME`을 올려야 홈 화면 앱에도 반영됩니다. (v4: `sinyuhoe-attendance-v5`)
- 폰에서는 앱을 완전히 닫았다 다시 열면 새 버전이 적용됩니다.
