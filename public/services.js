
    const CACHE_STATIC_NAME  = 'pwa-static-v1';
    const CACHE_DYNAMIC_NAME = 'pwa-dynamic-v1';
    const CACHE_INMUTABLE_NAME = 'pwa-inmutable-v1';
    
    const CACHE_DYNAMIC_LIMIT = 50;
    
    var APP_SHELL = [
        '/',
        '/offline.html'
    ];
    
    
    function limpiarCache( cacheName, numeroItems ) {
    
    
        caches.open( cacheName )
            .then( cache => {
    
                return cache.keys()
                    .then( keys => {
                        
                        if ( keys.length > numeroItems ) {
                            cache.delete( keys[0] )
                                .then( limpiarCache(cacheName, numeroItems) );
                        }
                    });
    
                
            });
    }
    
    
    
    
    self.addEventListener('install', e => {
    
    
        const cacheProm = caches.open( CACHE_STATIC_NAME )
            .then( cache => {
    
                return cache.addAll(APP_SHELL);
    
            
            });
    
        const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME )
                .then( cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));
    
    
        e.waitUntil( Promise.all([cacheProm, cacheInmutable]) );
    
    });
    
    
    self.addEventListener('activate', e => {
    
    
        const respuesta = caches.keys().then( keys => {
    
            keys.forEach( key => {
    
                if (  key !== CACHE_STATIC_NAME && key.includes('static') ) {
                    return caches.delete(key);
                }
    
            });
    
        });
    
    
    
        e.waitUntil( respuesta );
    
    });
    
    
    
    
    
    self.addEventListener('fetch', e => {
    
    
        // 2- Cache with Network Fallback
        const respuesta = caches.match( e.request )
            .then( res => {
    
                if ( res ) return res;
    
                // No existe el archivo
    
                return fetch( e.request ).then( newResp => {
    
                    caches.open( CACHE_DYNAMIC_NAME )
                        .then( cache => {
                            cache.put( e.request, newResp );
                            limpiarCache( CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT );
                        });
    
                    return newResp.clone();
                })
                .catch( err => {
    
                    if ( e.request.headers.get('accept').includes('text/html') ) {
                        return caches.match('offline.html');
                    }
    
                    if ( /\.(png|jpg)$/i.test( e.request.url ) ) {
    
                        return caches.match('no-img.jpg');
                    }    
    
                
                });
    
    
            });
    
    
    
    
        e.respondWith( respuesta );
    
    
    
    });








    // Instalar en caché
  /*self.addEventListener("install", event => {
    console.log("SW: Instalación - inicio");
      this.skipWaiting();
      event.waitUntil(
          caches.open(staticCacheName)
              .then(cache => {
                  return cache.addAll(filesToCache);
              })
      )
      console.log("SW: Instalación - final");
  });

  // Limpiar caché y activar
  self.addEventListener('activate', event => {
      event.waitUntil(
          caches.keys().then(cacheNames => {
              return Promise.all(
                  cacheNames
                      .filter(cacheName => (cacheName.startsWith("pwa-")))
                      .filter(cacheName => (cacheName !== staticCacheName))
                      .map(cacheName => caches.delete(cacheName))
              );
          })
      );
  });*/

  // Revisar caché cuando no hay conexión
  self.addEventListener("fetch", event => {
      event.respondWith(
          caches.match(event.request)
              .then(response => {
                  console.log(event.request);
                  return response || fetch(event.request);
              })
              .catch(() => {
                  console.log("No encontrado", event.request);
                  //return caches.match('/offline.html');
              })
      )
  });