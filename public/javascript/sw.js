const CACHE_NAME = "o-todo-v1";

const APP_FILES = [
  "./",
  "./index.html",
  "./header.css",
  "./style.css",
  "./Table.css",
  "./Livros.css",
  "./Clock.css",
  "./script.js",
  "./Profile.js",
  "./Anim.js",
  "./Clock.js",
  "./ico/Logo.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);

    await Promise.allSettled(
      APP_FILES.map(async (file) => {
        try {
          const response = await fetch(file);

          if (response.ok) {
            await cache.put(file, response);
          }
        } catch {
          // Um recurso indisponível não deve
          // impedir a instalação do service worker.
        }
      })
    );

    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();

    await Promise.all(
      keys
        .filter((key) =>
          key.startsWith("o-todo-") &&
          key !== CACHE_NAME
        )
        .map((key) => caches.delete(key))
    );

    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin
  ) {
    return;
  }

  event.respondWith((async () => {
    try {
      const response = await fetch(request);

      if (response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }

      return response;
    } catch {
      const cached = await caches.match(request);

      if (cached) {
        return cached;
      }

      if (request.mode === "navigate") {
        const home = await caches.match("./index.html");

        if (home) return home;
      }

      return new Response(
        "Conteúdo indisponível offline.",
        {
          status: 503,
          headers: {
            "Content-Type": "text/plain; charset=utf-8"
          }
        }
      );
    }
  })());
});