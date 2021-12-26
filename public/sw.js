let cacheData = "appV1";
this.addEventListener('install',(event)=>{
    event.waitUntil(
        caches.open(cacheData).then((cache)=>{
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/index.html',
                '/',
                "/items",
                
            ])
        })
    )
})

this.addEventListener("fetch", (event)=>{
    if(!navigator.online){
        event.respondWith(
            caches.match(event.request).then((response)=>{
                if(response){
                    return response;
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl);
            })
        )
    }
       
})