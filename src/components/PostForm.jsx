import { useEffect, useState } from 'react'
import Button from './Button.jsx'
import { createPost, uploadPostImage } from '../lib/posts.js'

const inputBaseClass =
  'w-full rounded-xl border px-4 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)]'

function PostForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [youtubeLink, setYoutubeLink] = useState('')
  const [category, setCategory] = useState('general')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl('')
      return
    }

    const objectUrl = URL.createObjectURL(imageFile)
    setImagePreviewUrl(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [imageFile])

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] ?? null
    setImageFile(file)
  }

  const clearForm = () => {
    setTitle('')
    setDescription('')
    setYoutubeLink('')
    setCategory('general')
    setImageFile(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!imageFile) {
      setSubmitError('Please choose an image file first.')
      return
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      videoUrl: youtubeLink.trim(),
      category,
      image: '',
    }

    try {
      setIsSubmitting(true)
      setSubmitMessage('')
      setSubmitError('')

      const imageUrl = await uploadPostImage(imageFile)
      payload.image = imageUrl

      if (onSubmit) {
        await onSubmit({ ...payload, imageFile })
      }

      await createPost(payload)
      clearForm()
      setSubmitMessage('Post published successfully.')
    } catch (error) {
      setSubmitError(error.message || 'Failed to publish post.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className="rounded-2xl border p-5 sm:p-6"
      style={{ backgroundColor: 'var(--card)', borderColor: 'var(--accent)' }}
    >
      <header className="mb-5">
        <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
          Create Post
        </h2>
        <p className="mt-1 text-sm" style={{ color: 'var(--text)', opacity: 0.7 }}>
          Add content details, upload a thumbnail, and publish directly.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span
            className="mb-2 block text-sm font-medium"
            style={{ color: 'var(--text)' }}
          >
            Title
          </span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter post title"
            required
            className={inputBaseClass}
            style={{
              backgroundColor: 'var(--bg)',
              color: 'var(--text)',
              borderColor: 'var(--border)',
              boxShadow: 'none',
            }}
          />
        </label>

        <label className="block">
          <span
            className="mb-2 block text-sm font-medium"
            style={{ color: 'var(--text)' }}
          >
            Category
          </span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className={inputBaseClass}
            style={{
              backgroundColor: 'var(--bg)',
              color: 'var(--text)',
              borderColor: 'var(--border)',
              boxShadow: 'none',
            }}
          >
            <option value="general">General</option>
            <option value="video">Video</option>
            <option value="update">Update</option>
            <option value="announcement">Announcement</option>
          </select>
        </label>

        <label className="block">
          <span
            className="mb-2 block text-sm font-medium"
            style={{ color: 'var(--text)' }}
          >
            Description
          </span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Write a short description"
            required
            rows={4}
            className={`${inputBaseClass} resize-y`}
            style={{
              backgroundColor: 'var(--bg)',
              color: 'var(--text)',
              borderColor: 'var(--border)',
              boxShadow: 'none',
            }}
          />
        </label>

        <label className="block">
          <span
            className="mb-2 block text-sm font-medium"
            style={{ color: 'var(--text)' }}
          >
            Image Upload
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="block w-full rounded-xl border px-3 py-2 text-sm file:mr-3 file:rounded-lg file:border-0 file:px-3 file:py-1.5 file:text-sm file:font-semibold"
            style={{
              backgroundColor: 'var(--bg)',
              color: 'var(--text)',
              borderColor: 'var(--border)',
            }}
          />
        </label>

        {imagePreviewUrl ? (
          <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'var(--accent)' }}>
            <img
              src={imagePreviewUrl}
              alt="Selected upload preview"
              className="h-52 w-full object-cover"
            />
          </div>
        ) : null}

        <label className="block">
          <span
            className="mb-2 block text-sm font-medium"
            style={{ color: 'var(--text)' }}
          >
            YouTube Link
          </span>
          <input
            type="url"
            value={youtubeLink}
            onChange={(event) => setYoutubeLink(event.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            required
            className={inputBaseClass}
            style={{
              backgroundColor: 'var(--bg)',
              color: 'var(--text)',
              borderColor: 'var(--border)',
              boxShadow: 'none',
            }}
          />
        </label>

        {submitMessage ? (
          <p
            className="rounded-xl border px-3 py-2 text-sm"
            style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
          >
            {submitMessage}
          </p>
        ) : null}

        {submitError ? (
          <p
            className="rounded-xl border px-3 py-2 text-sm"
            style={{ borderColor: '#ef4444', color: '#ef4444' }}
          >
            {submitError}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-1">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={clearForm}
            disabled={isSubmitting}
          >
            Reset
          </Button>
        </div>
      </form>
    </section>
  )
}

export default PostForm
