'use client'

import { useState, useEffect } from 'react'
import { Reorder } from 'framer-motion'
import { WhyChooseUsSector } from '@/types/database'
import { updateWhyChooseUsSectorPriorities, deleteWhyChooseUsSector, updateWhyChooseUsSector } from '@/app/actions/extra-actions'
import { Loader2, GripVertical, Trash2, Pencil, Check, X } from 'lucide-react'

function SectorRow({ item, onDeleted }: { item: WhyChooseUsSector, onDeleted: (id: string) => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(item.name)
  const [isPending, setIsPending] = useState(false)

  const handleSave = async () => {
    setIsPending(true)
    try {
      await updateWhyChooseUsSector(item.id, { name: editName })
      setIsEditing(false)
    } catch (e: any) {
      alert(`Failed to update: ${e.message}`)
    } finally {
      setIsPending(false)
    }
  }

  if (isEditing) {
    return (
      <div className="p-3 border border-blue-200 bg-blue-50/50 rounded-lg flex items-center shadow-sm gap-4 mb-3">
        <div className="flex-1 space-y-3 pl-2">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Sector Name</label>
            <input 
              type="text" 
              value={editName} 
              onChange={e => setEditName(e.target.value)} 
              className="w-full text-sm rounded border-slate-300 px-2 py-1"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button onClick={handleSave} disabled={isPending} className="p-2 text-green-600 hover:bg-green-100 rounded disabled:opacity-50 transition-colors" title="Save">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
          </button>
          <button onClick={() => setIsEditing(false)} disabled={isPending} className="p-2 text-slate-500 hover:bg-slate-200 rounded disabled:opacity-50 transition-colors" title="Cancel">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative bg-white border border-slate-100 rounded-xl p-4 flex items-center hover:border-slate-200 hover:shadow-md transition-all duration-200 gap-4">
      <div className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 p-1 shrink-0">
        <GripVertical className="w-5 h-5" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-navy-900 text-sm mb-1 truncate">{item.name}</h3>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors shrink-0"
          title="Edit Sector"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDeleted(item.id)}
          disabled={isPending}
          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded disabled:opacity-50 transition-colors shrink-0"
          title="Delete Sector"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

export function WhyChooseUsSectorsList({ initialSectors }: { initialSectors: WhyChooseUsSector[] }) {
  const [items, setItems] = useState(initialSectors)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    setItems(initialSectors)
  }, [initialSectors])

  const handleReorder = async (newOrder: WhyChooseUsSector[]) => {
    setItems(newOrder)
    setIsSaving(true)
    
    const updates = newOrder.map((item, index) => ({
      id: item.id,
      priority: newOrder.length - index
    }))
    
    try {
      await updateWhyChooseUsSectorPriorities(updates)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this sector? Any cards linked to it will also be deleted if CASCADE is on.')) return
    setDeletingId(id)
    try {
      await deleteWhyChooseUsSector(id)
      setItems(prev => prev.filter(i => i.id !== id))
    } catch (error) {
      console.error(error)
      alert('Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  if (items.length === 0) {
    return (
      <div className="py-8 text-center text-slate-500 text-sm border border-dashed border-slate-200 rounded-lg">
        No sectors found. Add one above!
      </div>
    )
  }

  return (
    <div className="relative">
      {isSaving && (
        <div className="absolute top-0 right-0 -mt-8 flex items-center text-sm text-navy-500">
          <Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving order...
        </div>
      )}
      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-3">
        {items.map((item) => (
          <Reorder.Item key={item.id} value={item} className="relative z-0">
            <SectorRow item={item} onDeleted={handleDelete} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}
