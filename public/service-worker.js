self.importScripts('https://unpkg.com/dexie@3.0.3/dist/dexie.js')

async function handleRequest(request) {
  const res = await fetch(request)
  const original = await res.json()
  const db = new Dexie('database')
  db.version(1).stores({
    images: 'id',
  })
  const image = await db.images.get(1)
  original.icons.forEach(i => {
    if (!image) return
    i.src = image.dataUrl
  })
  const response = new Response(JSON.stringify(original, null, 2), {
    headers: {
      'Content-type': 'application/json',
    },
  })
  return response
}

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('manifest')) {
    event.respondWith(handleRequest(event.request))
  }
})
