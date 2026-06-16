'use client'

import { useState, useEffect } from 'react'
import { Reorder } from 'framer-motion'
import { WhyChooseUsCard, WhyChooseUsSector } from '@/types/database'
import { updateWhyChooseUsPriorities, deleteWhyChooseUs, updateWhyChooseUsCard } from '@/app/actions/extra-actions'
import { Loader2, GripVertical, Trash2, Pencil, Check, X } from 'lucide-react'
import { ImageUpload } from '@/components/admin/ImageUpload'

function CardRow({ item, sectors, onDeleted }: { item: WhyChooseUsCard, sectors: WhyChooseUsSector[], onDeleted: (id: string) => void }) {
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(item.description)
  const [smallDescription, setSmallDescription] = useState(item.small_description || '')
  const [imageUrl, setImageUrl] = useState(item.image_url || '')
  const [sectorId, setSectorId] = useState(item.sector_id || '')
  const [isPending, setIsPending] = useState(false)

  const handleSave = async () => {
    setIsPending(true)
    try {
      await updateWhyChooseUsCard(item.id, {
        description,
        small_description: smallDescription || null,
        image_url: imageUrl || null,
        sector_id: sectorId || null
      })
      setIsEditing(false)
    } catch (e: any) {
      alert(`Failed to update: ${e.message}`)
    } finally {
      setIsPending(false)
    }
  }

  if (isEditing) {
    return (
      <div className="p-4 border border-blue-200 bg-blue-50/50 rounded-xl shadow-sm space-y-4 mb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Main Description (Title)</label>
            <input 
              type="text" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="w-full text-sm rounded border-slate-300 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Sector (Tab)</label>
            <select
              value={sectorId}
              onChange={e => setSectorId(e.target.value)}
              className="w-full text-sm rounded border-slate-300 px-3 py-2"
            >
              <option value="">-- Select Sector --</option>
              {sectors.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Small Description</label>
          <textarea 
            value={smallDescription} 
            onChange={e => setSmallDescription(e.target.value)} 
            rows={2}
            className="w-full text-sm rounded border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <ImageUpload
            label="Image"
            value={imageUrl}
            onChange={setImageUrl}
          />
        </div>

        <div className="flex gap-2 pt-2 border-t border-blue-100">
          <button onClick={handleSave} disabled={isPending} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white hover:bg-green-700 rounded text-sm disabled:opacity-50 transition-colors">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Save
          </button>
          <button onClick={() => setIsEditing(false)} disabled={isPending} className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded text-sm disabled:opacity-50 transition-colors">
            <X className="w-4 h-4" /> Cancel
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
      
      {item.image_url && (
        <div className="w-16 h-16 bg-slate-100 rounded-md flex items-center justify-center overflow-hidden shrink-0">
          <img src={item.image_url} alt="Card Image" className="w-full h-full object-cover" />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-navy-900 text-sm mb-1 truncate">
          {item.sector_id ? <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs mr-2 font-medium">{sectors.find(s => s.id === item.sector_id)?.name || 'Unknown Sector'}</span> : null}
          {item.description}
        </h3>
        <p className="text-xs text-slate-500 truncate">{item.small_description}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors shrink-0"
          title="Edit Card"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDeleted(item.id)}
          disabled={isPending}
          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded disabled:opacity-50 transition-colors shrink-0"
          title="Delete Card"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )
}

export function WhyChooseUsList({ initialCards, sectors }: { initialCards: WhyChooseUsCard[], sectors: WhyChooseUsSector[] }) {
  const [items, setItems] = useState(initialCards)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    setItems(initialCards)
  }, [initialCards])

  const handleReorder = async (newOrder: WhyChooseUsCard[]) => {
    setItems(newOrder)
    setIsSaving(true)
    
    const updates = newOrder.map((item, index) => ({
      id: item.id,
      priority: newOrder.length - index
    }))
    
    try {
      await updateWhyChooseUsPriorities(updates)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this card?')) return
    setDeletingId(id)
    try {
      await deleteWhyChooseUs(id)
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
        No cards found. Add one above!
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
            <CardRow item={item} sectors={sectors} onDeleted={handleDelete} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}
