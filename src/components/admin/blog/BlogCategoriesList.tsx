'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { BlogCategory } from '@/types/database'
import { createBlogCategory, updateBlogCategory, deleteBlogCategory } from '@/app/actions/blog-actions'
import { Plus, Trash2, Edit2, Loader2, X, Check } from 'lucide-react'

export function BlogCategoriesList({ initialCategories }: { initialCategories: BlogCategory[] }) {
  const [categories, setCategories] = useState(initialCategories)
  const [newName, setNewName] = useState('')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')
  const router = useRouter()

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!newName.trim()) return
    setError('')
    startTransition(async () => {
      try {
        await createBlogCategory(newName.trim())
        setNewName('')
        router.refresh()
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to create category')
      }
    })
  }

  function startEdit(cat: BlogCategory) {
    setEditingId(cat.id)
    setEditName(cat.name)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditName('')
  }

  async function saveEdit(id: string) {
    if (!editName.trim()) return
    startTransition(async () => {
      try {
        await updateBlogCategory(id, editName.trim())
        setEditingId(null)
        router.refresh()
      } catch (err: unknown) {
        console.error(err)
      }
    })
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this category? It will be removed from all blogs that use it.')) return
    startTransition(async () => {
      try {
        await deleteBlogCategory(id)
        router.refresh()
      } catch (err: unknown) {
        console.error(err)
      }
    })
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-navy-900" style={{ fontFamily: 'var(--font-sora)' }}>
          Blog Categories
        </h1>
        <p className="text-slate-500 mt-1 text-sm">
          Manage the categories that can be assigned to your blog posts.
        </p>
      </div>

      {/* Add New Category */}
      <form onSubmit={handleCreate} className="flex gap-3 items-end p-5 border border-slate-200 bg-white rounded-xl shadow-sm">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-600 mb-1">New Category Name</label>
          <input
            required
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. Artificial Intelligence"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isPending || !newName.trim()}
          className="flex items-center gap-1.5 bg-navy-950 hover:bg-navy-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm disabled:opacity-50"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Add
        </button>
      </form>
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

      {/* Category List */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {initialCategories.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">No categories found. Create one above!</div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {initialCategories.map((cat) => {
              const isEditing = editingId === cat.id

              return (
                <li key={cat.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                  {isEditing ? (
                    <div className="flex items-center gap-3 flex-1 mr-4">
                      <input
                        autoFocus
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="flex-1 rounded border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button onClick={() => saveEdit(cat.id)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded" title="Save">
                        <Check className="w-4 h-4" />
                      </button>
                      <button onClick={cancelEdit} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded" title="Cancel">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-sm font-bold text-slate-800">{cat.name}</span>
                    </div>
                  )}

                  {!isEditing && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(cat)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        disabled={isPending}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
