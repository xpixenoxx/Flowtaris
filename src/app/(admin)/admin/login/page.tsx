import type { Metadata } from 'next'
import Image from 'next/image'
import { AdminLoginForm } from '@/components/admin/AdminLoginForm'

export const metadata: Metadata = {
  title: 'Admin Login | Flowtaris',
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <Image
            src="/images/logo.png"
            alt="Flowtaris"
            width={40}
            height={40}
            className="w-9 h-9 object-contain"
          />
          <div>
            <div className="text-white font-bold text-base tracking-wide"
                 style={{ fontFamily: 'var(--font-sora)' }}>FLOWTARIS</div>
            <div className="text-[9px] text-gold-500/70 font-medium tracking-[0.14em] uppercase"
                 style={{ fontFamily: 'var(--font-jetbrains)' }}>Admin Portal</div>
          </div>
        </div>

        <div className="bg-navy-900 border border-navy-700 rounded-2xl p-7">
          <h1
            className="text-lg font-bold text-white mb-1"
            style={{ fontFamily: 'var(--font-sora)' }}
          >
            Sign In
          </h1>
          <p className="text-sm text-navy-400 mb-6">Access the Flowtaris admin panel</p>
          <AdminLoginForm />
        </div>
      </div>
    </div>
  )
}
