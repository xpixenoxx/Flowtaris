'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Database, Zap, Globe, ShieldCheck, BarChart3, ArrowUpRight, Code } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DynamicServiceClient({
  service,
  hero,
  whyChoose,
  businessMain,
  businessItems,
  erpMain,
  erpCards,
  deepModules
}: any) {
  const [activeTab, setActiveTab] = useState(businessItems[0] || null)
  const [scrolled, setScrolled] = useState(false)

  // Scroll detection for sticky nav
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 150
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  // Fallback defaults
  const bgColor = hero?.color || '#7A84F2'
  const heroTitle = hero?.hero_description || service.name
  const heroDesc = hero?.normal_description || 'We engineer unified data models, automate complex financials, and deploy scalable ERP architectures.'

  return (
    <main className="bg-white">

      {/* ─────────────────────────────────────────────────────────────────────────────
          1. THE HERO SECTION
          ───────────────────────────────────────────────────────────────────────────── */}
      <section 
        className="relative pt-[100px] pb-24 overflow-hidden transition-colors duration-500"
        style={{ backgroundColor: bgColor }}
      >
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

            {/* Left: Copy */}
            <motion.div
              className="lg:w-[55%]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[42px] lg:text-[56px] font-extrabold text-white leading-[1.1] tracking-tight mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
                {heroTitle}
              </h1>

              <div className="w-16 h-1 bg-[#FFD166] mb-8" />

              <p className="text-[18px] text-white/90 leading-relaxed mb-10 max-w-2xl font-light whitespace-pre-wrap">
                {heroDesc}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 rounded-[4px] bg-[#141736] text-white font-bold text-[15px] hover:bg-[#0B0D1F] transition-colors border border-transparent shadow-lg">
                  Schedule Consultation
                </Link>
              </div>
            </motion.div>

            {/* Right: Graphic */}
            <div className="lg:w-[45%] relative h-[400px] lg:h-[500px] w-full hidden md:block">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full max-w-[450px] aspect-square">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
                    className="absolute top-0 right-10 w-64 h-64 rounded-full bg-[#141736]/40 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                    <BarChart3 className="w-16 h-16 text-white opacity-90" strokeWidth={1} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
                    className="absolute bottom-10 left-0 w-56 h-56 rounded-full bg-[#FFD166]/80 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                    <Database className="w-16 h-16 text-[#141736] opacity-90" strokeWidth={1} />
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }}
                    className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                    <ShieldCheck className="w-12 h-12 text-white opacity-90" strokeWidth={1} />
                  </motion.div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────────────────
          3. BENEFITS (WHY CHOOSE)
          ───────────────────────────────────────────────────────────────────────────── */}
      {whyChoose.length > 0 && (
        <section id="benefits" className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
            <div className="mb-16 text-center">
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#141736] mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
                Why Choose {service.name}?
              </h2>
              <div className="w-16 h-1 bg-[#FFD166] mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChoose.map((benefit: any, i: number) => (
                <div key={i} className="bg-white p-8 border border-slate-200 rounded-[8px] hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-[#F4F5FF] flex items-center justify-center mb-6 text-blue-600 rounded-[4px] group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Database className="w-6 h-6" />
                  </div>
                  <h3 className="text-[20px] font-bold text-[#141736] mb-3">{benefit.main_description}</h3>
                  <p className="text-slate-600 leading-relaxed text-[15px]">{benefit.small_description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          4. BUSINESS SUITE
          ───────────────────────────────────────────────────────────────────────────── */}
      {businessItems.length > 0 && (
        <section id="features" className="py-28 relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16 relative z-10">
            <div className="mb-16 text-center">
              <h2 className="text-[36px] md:text-[46px] font-bold text-white mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
                A Complete Business Suite
              </h2>
              <div className="w-16 h-1 bg-[#FFD166] mx-auto mb-6" />
              <p className="text-[18px] text-white/90 max-w-3xl mx-auto font-light">
                {businessMain?.small_description || 'Explore the modules that power the most successful high-growth organizations.'}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row relative mt-16">
              <div className="w-full lg:w-[30%] flex flex-col z-20 relative lg:-mr-4">
                {businessItems.map((tab: any) => {
                  const isActive = activeTab?.id === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        "text-left px-8 py-6 transition-all duration-300 w-full rounded-l-[12px] relative",
                        isActive ? "bg-white text-[#141736] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] rounded-r-[12px] lg:rounded-r-none z-30" : "text-white hover:bg-white/10"
                      )}
                    >
                      <span className={cn("font-bold text-[18px]", isActive ? "text-[#141736]" : "text-white/80")}>
                        {tab.title}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="w-full lg:w-[70%] bg-white rounded-[12px] shadow-xl relative z-10 mt-6 lg:mt-0 min-h-[400px] border border-white/10 p-10">
                <AnimatePresence mode="wait">
                  {activeTab && (
                    <motion.div
                      key={activeTab.id}
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="flex flex-col h-full"
                    >
                      <h3 className="text-[28px] font-bold text-[#141736] mb-6" style={{ fontFamily: 'var(--font-sora)' }}>
                        {activeTab.title}
                      </h3>
                      <p className="text-slate-600 text-[16px] leading-relaxed mb-10">
                        {activeTab.description}
                      </p>
                      {activeTab.image_url && (
                        <div className="mt-auto w-full aspect-video relative rounded bg-slate-100 overflow-hidden border border-slate-200">
                          <img src={activeTab.image_url} alt={activeTab.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      )}

    </main>
  )
}
