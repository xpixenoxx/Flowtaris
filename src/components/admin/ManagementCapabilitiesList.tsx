'use client'

import { useState, useEffect } from 'react'
import { Reorder } from 'framer-motion'
import { ManagementCapability } from '@/types/database'
import { deleteManagementCapability, updateManagementCapabilityPriorities, updateManagementCapability } from '@/app/actions/management-actions'
import { Loader2, GripVertical, Edit2, X, Check, Trash2 } from 'lucide-react'

export function ManagementCapabilitiesList({ initialCapabilities }: { initialCapabilities: ManagementCapability[] }) {
  const [items, setItems] = useState(initialCapabilities)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<ManagementCapability>>({})

  useEffect(() => {
    setItems(initialCapabilities)
  }, [initialCapabilities])

  const handleReorder = async (newOrder: ManagementCapability[]) => {
    setItems(newOrder)
    setIsSaving(true)
    
    const updates = newOrder.map((item, index) => ({
      id: item.id,
      display_order: index
    }))
    
    try {
      await updateManagementCapabilityPriorities(updates)
    } catch (e) {
      console.error(e)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this capability?')) return
    setDeletingId(id)
    try {
      await deleteManagementCapability(id)
      setItems(prev => prev.filter(i => i.id !== id))
    } catch (error) {
      console.error(error)
      alert('Failed to delete')
    } finally {
      setDeletingId(null)
    }
  }

  const startEdit = (item: ManagementCapability) => {
    setEditingId(item.id)
    setEditForm(item)
  }

  const saveEdit = async () => {
    if (!editingId) return
    setIsSaving(true)
    try {
      await updateManagementCapability(editingId, editForm)
      setItems(prev => prev.map(i => i.id === editingId ? { ...i, ...editForm } : i))
      setEditingId(null)
    } catch (error) {
      console.error(error)
      alert('Failed to update')
    } finally {
      setIsSaving(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="py-8 text-center text-slate-500 text-sm border border-dashed border-slate-200 rounded-lg">
        No management capabilities found. Add one above!
      </div>
    )
  }

  return (
    <div className="relative">
      {isSaving && (
        <div className="absolute top-0 right-0 -mt-8 flex items-center text-sm text-navy-500">
          <Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving...
        </div>
      )}
      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-3">
        {items.map((item) => (
          <Reorder.Item key={item.id} value={item} className="relative z-0">
            <div className="group relative bg-white border border-slate-100 rounded-xl p-4 flex items-center hover:border-slate-200 hover:shadow-md transition-all duration-200 gap-4">
              <div className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 p-1 shrink-0">
                <GripVertical className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                {editingId === item.id ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input 
                        type="text" 
                        value={editForm.metric_value || ''} 
                        onChange={e => setEditForm({...editForm, metric_value: e.target.value})}
                        className="w-full text-sm border border-slate-300 rounded px-2 py-1 mb-1" 
                        placeholder="Metric Value"
                      />
                      <input 
                        type="text" 
                        value={editForm.metric_label || ''} 
                        onChange={e => setEditForm({...editForm, metric_label: e.target.value})}
                        className="w-full text-xs border border-slate-300 rounded px-2 py-1 text-slate-500" 
                        placeholder="Metric Label"
                      />
                    </div>
                    <div>
                      <input 
                        type="text" 
                        value={editForm.counter_value || ''} 
                        onChange={e => setEditForm({...editForm, counter_value: e.target.value})}
                        className="w-full text-sm border border-slate-300 rounded px-2 py-1 mb-1" 
                        placeholder="Counter Value"
                      />
                      <input 
                        type="text" 
                        value={editForm.counter_label || ''} 
                        onChange={e => setEditForm({...editForm, counter_label: e.target.value})}
                        className="w-full text-xs border border-slate-300 rounded px-2 py-1 text-slate-500" 
                        placeholder="Counter Label"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-navy-900 text-sm mb-1 truncate">Metric: {item.metric_value}</h3>
                      <div className="text-xs text-slate-500">
                        Label: {item.metric_label}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy-900 text-sm mb-1 truncate">Counter: {item.counter_value || 'N/A'}</h3>
                      <div className="text-xs text-slate-500">
                        Label: {item.counter_label || 'N/A'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {editingId === item.id ? (
                  <>
                    <button onClick={saveEdit} className="text-xs bg-green-50 text-green-600 hover:bg-green-100 p-2 rounded transition-colors" title="Save">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={() => setEditingId(null)} className="text-xs bg-slate-50 text-slate-600 hover:bg-slate-100 p-2 rounded transition-colors" title="Cancel">
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(item)} className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 p-2 rounded transition-colors" title="Edit Capability">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="text-xs bg-red-50 text-red-600 hover:bg-red-100 p-2 rounded transition-colors disabled:opacity-50"
                      title="Delete Capability"
                    >
                      {deletingId === item.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </button>
                  </>
                )}
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  )
}
