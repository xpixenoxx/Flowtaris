'use client'

import { useState } from 'react'
import { addManagementCapability } from '@/app/actions/management-actions'

export function ManagementCapabilitiesForm() {
  const [isPending, setIsPending] = useState(false)
  const [message, setMessage] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setMessage('')
    
    const formData = new FormData(e.currentTarget)

    const data = {
      metric_value: formData.get('metric_value') as string,
      metric_label: formData.get('metric_label') as string,
      counter_value: formData.get('counter_value') as string,
      counter_label: formData.get('counter_label') as string,
      display_order: 0,
    }

    try {
      await addManagementCapability(data)
      setMessage('Capability added successfully!')
      ;(e.target as HTMLFormElement).reset()
    } catch (error: any) {
      setMessage(`Error: ${error.message}`)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-4 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="metric_value" className="block text-sm font-medium text-navy-900 mb-1">
            Metric Value *
          </label>
          <input
            type="text"
            name="metric_value"
            id="metric_value"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. #1"
          />
        </div>

        <div>
          <label htmlFor="metric_label" className="block text-sm font-medium text-navy-900 mb-1">
            Metric Label *
          </label>
          <input
            type="text"
            name="metric_label"
            id="metric_label"
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. ERP SOFTWARE"
          />
        </div>

        <div>
          <label htmlFor="counter_value" className="block text-sm font-medium text-navy-900 mb-1">
            Counter Value
          </label>
          <input
            type="text"
            name="counter_value"
            id="counter_value"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 25+"
          />
        </div>

        <div>
          <label htmlFor="counter_label" className="block text-sm font-medium text-navy-900 mb-1">
            Counter Label
          </label>
          <input
            type="text"
            name="counter_label"
            id="counter_label"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. BUSINESS MODULES"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors disabled:opacity-50"
        >
          {isPending ? 'Adding...' : 'Add Capability'}
        </button>
        {message && (
          <span className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </span>
        )}
      </div>
    </form>
  )
}
