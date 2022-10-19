
    const CACHE_STATIC_NAME  = 'pwa-static-v1';
    const CACHE_DYNAMIC_NAME = 'pwa-dynamic-v1';
    const CACHE_INMUTABLE_NAME = 'pwa-inmutable-v1';
    
    const CACHE_DYNAMIC_LIMIT = 50;
    
    var APP_SHELL = [
        '/',
        'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap',
        '/offline.html',
        '/no-img.jpg'
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
                .then( cache => {
                    cache.add('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css');
                    cache.add('https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js');
                });
    
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
    
                // No existe el archivo EN CACHE
                return fetch( e.request ).then( newResp => {

                    if ( !newResp.ok ) {
                        //Sin red
                        if ( /\.(png|jpg|jpeg)$/i.test( e.request.url ) ) {
                            return caches.match('no-img.jpg');
                        }    
                        console.log(e.request.url);
                    }
    
                    caches.open( CACHE_DYNAMIC_NAME )
                        .then( cache => {
                            cache.put( e.request, newResp );
                            limpiarCache( CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT );
                        });
    
                    return newResp.clone();
                })
                .catch( err => {
                    if ( /\.(png|jpg|jpeg)$/i.test( e.request.url ) ) {
                        return caches.match('no-img.jpg');
                    }    

                    console.log(e.request.url);
                });
    
            });
    
        e.respondWith( respuesta );
 
    });

   