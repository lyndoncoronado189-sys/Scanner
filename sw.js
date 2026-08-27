/* Simple offline cache for Bubble Grader.
   App shell is cached on install. The OpenCV engine (cross-origin CDN) is
   cached the first time it loads successfully, so later launches work offline. */
var CACHE = "bubble-grader-v1";
var SHELL = [
  "./",
  "./index.html",
  "./template.js",
  "./answer-sheet.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { if (k !== CACHE) return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function (hit) {
      if (hit) return hit;
      return fetch(e.request).then(function (res) {
        // cache opencv.js and other successful/opaque GETs for offline reuse
        try {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
        } catch (err) {}
        return res;
      }).catch(function () { return hit; });
    })
  );
});
