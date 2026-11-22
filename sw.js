/* 신우회 출석부 - 오프라인 실행용 서비스 워커 (v3: 실시간 공유 대응) */
var CACHE_NAME = 'sinyuhoe-attendance-v3';
var ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

/* 로그인·실시간 공유( Firebase / Google ) 요청은 캐시하지 않고 네트워크로 그대로 보냅니다.
   서비스 워커가 가로채면 로그인 팝업과 실시간 구독이 막히기 때문입니다. */
var BYPASS_HOSTS = [
  'gstatic.com',
  'googleapis.com',
  'firebaseapp.com',
  'firebaseio.com',
  'firebase.google.com',
  'google.com',
  'googleusercontent.com',
  'accounts.google.com'
];

function isBypassHost(hostname) {
  var h = String(hostname || '').toLowerCase();
  for (var i = 0; i < BYPASS_HOSTS.length; i++) {
    var b = BYPASS_HOSTS[i];
    if (h === b || h.slice(-(b.length + 1)) === '.' + b) return true;
  }
  return false;
}

/* 설치: 앱 껍데기 파일을 미리 캐시 */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS).catch(function () {
        /* 개별 파일이 없어도 설치는 계속 진행 */
        return Promise.all(ASSETS.map(function (url) {
          return cache.add(url).catch(function () { return null; });
        }));
      });
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

/* 활성화: 이전 버전 캐시 정리 */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (key) {
        if (key !== CACHE_NAME) return caches.delete(key);
        return null;
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

/* 요청 처리
   - Firebase / Google / googleapis 등 외부 API: 캐시 없이 네트워크로 통과
   - 페이지 이동: 네트워크 우선(오프라인이면 캐시)
   - 그 밖의 같은 주소 파일: 캐시 우선 + 백그라운드 갱신 */
self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;

  var url;
  try { url = new URL(req.url); } catch (e) { return; }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  if (url.origin !== self.location.origin) return;
  if (isBypassHost(url.hostname)) return;
  if (url.pathname.indexOf('/__/auth/') >= 0) return;

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put('./index.html', copy); });
        return res;
      }).catch(function () {
        return caches.match('./index.html').then(function (hit) {
          return hit || caches.match('./');
        });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(function (hit) {
      var network = fetch(req).then(function (res) {
        if (res && res.status === 200 && res.type === 'basic') {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () { return hit; });
      return hit || network;
    })
  );
});
