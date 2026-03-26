import { getApiUrl } from './api.js'

export async function uploadPostImage(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(getApiUrl('/api/upload'), {
    method: 'POST',
    body: formData,
    credentials: 'include',
    cache: 'no-store',
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}))
    throw new Error(payload.message || `Image upload failed (${response.status})`)
  }

  const payload = await response.json()
  return payload.url
}

export async function createPost(postInput) {
  const response = await fetch(getApiUrl('/api/posts'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
    },
    credentials: 'include',
    cache: 'no-store',
    body: JSON.stringify(postInput),
  })

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}))
    throw new Error(payload.message || `Post creation failed (${response.status})`)
  }

  return response.json()
}
