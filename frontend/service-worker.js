self.addEventListener('install', (event) => {

  event.waitUntil(
    caches.open('rescuenet-cache').then(cache => {

      return cache.addAll([
        '/',
        '/index.html',
        '/assets/css/style.css'
      ]);

    })
  );

});
