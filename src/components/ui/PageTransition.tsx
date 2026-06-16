'use client'

import { createContext, useContext, useState, useEffect, forwardRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import NextLink, { LinkProps } from 'next/link'

// 1. Transition Context
interface TransitionContextType {
  isTransitioning: boolean
  navigate: (href: string) => void
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined)

export function useTransitionContext() {
  const context = useContext(TransitionContext)
  if (!context) {
    throw new Error('useTransitionContext must be used within a PageTransitionProvider')
  }
  return context
}

// 2. Transition Provider
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [pendingPath, setPendingPath] = useState<string | null>(null)

  const navigate = (href: string) => {
    // If external, hash, mailto, etc., bypass transition
    if (
      href.startsWith('http') ||
      href.startsWith('#') ||
      href.includes('mailto:') ||
      href.includes('tel:') ||
      href.startsWith('javascript:')
    ) {
      window.location.href = href
      return
    }

    // Bypass if it's the current page
    if (pathname === href) {
      return
    }

    // Bypass admin paths
    if (href.startsWith('/admin') || pathname.startsWith('/admin')) {
      router.push(href)
      return
    }

    setPendingPath(href)
    setIsTransitioning(true)
  }

  // Once transition starts, wait for the curtain to close, then change route
  useEffect(() => {
    if (isTransitioning && pendingPath) {
      const timer = setTimeout(() => {
        router.push(pendingPath)
      }, 750) // Wait for the staggered curtain columns (700ms duration + stagger delays) to cover the screen

      return () => clearTimeout(timer)
    }
    return undefined
  }, [isTransitioning, pendingPath, router])

  // When pathname changes, we stop transitioning and clear the pending path,
  // which will trigger the exit animation to slide the curtain down/out.
  useEffect(() => {
    setIsTransitioning(false)
    setPendingPath(null)
  }, [pathname])

  // Global click interceptor to catch any Link or standard anchor click on public pages
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Find closest anchor tag
      let target = e.target as HTMLElement | null
      while (target && target.tagName !== 'A') {
        target = target.parentElement
      }

      if (!target || !(target instanceof HTMLAnchorElement)) return

      const href = target.getAttribute('href')
      if (!href) return

      // Don't intercept if target="_blank"
      if (target.getAttribute('target') === '_blank') return

      // Don't intercept external links, hashes, mailto, tel, etc.
      if (
        href.startsWith('http') ||
        href.startsWith('#') ||
        href.includes('mailto:') ||
        href.includes('tel:') ||
        href.startsWith('javascript:')
      ) {
        return
      }

      // Ignore modifier clicks (cmd/ctrl click to open in new tab)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
        return
      }

      // Bypass transition if it's an admin path
      if (href.startsWith('/admin') || window.location.pathname.startsWith('/admin')) {
        return
      }

      // Bypass transition if same pathname
      const currentPath = window.location.pathname
      if (currentPath === href) {
        return
      }

      // Intercept and navigate with transition
      e.preventDefault()
      navigate(href)
    }

    document.addEventListener('click', handleGlobalClick, { capture: true })
    return () => {
      document.removeEventListener('click', handleGlobalClick, { capture: true })
    }
  }, [pathname])

  return (
    <TransitionContext.Provider value={{ isTransitioning, navigate }}>
      {children}
    </TransitionContext.Provider>
  )
}

// 3. Custom Link Component for Transitions
export interface TransitionLinkProps extends React.ComponentPropsWithoutRef<typeof NextLink> {
  children: React.ReactNode
}

export const Link = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ href, onClick, children, ...props }, ref) => {
    const { navigate } = useTransitionContext()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Allow modifier clicks (cmd/ctrl click to open in new tab)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
        return
      }

      e.preventDefault()
      if (onClick) onClick(e)
      navigate(href.toString())
    }

    return (
      <NextLink ref={ref} href={href} onClick={handleClick} {...props}>
        {children}
      </NextLink>
    )
  }
)
Link.displayName = 'Link'

// 4. PageTransition Curtain Component
export function PageTransition() {
  const { isTransitioning } = useTransitionContext()
  const columns = [0, 1, 2, 3, 4]

  return (
    <AnimatePresence>
      {isTransitioning && (
        <div className="fixed inset-0 z-[9998] flex w-screen h-screen overflow-hidden pointer-events-none">
          {/* Staggered Shutter Columns */}
          {columns.map((i) => (
            <motion.div
              key={i}
              initial={{ y: '-100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{
                duration: 0.7,
                ease: [0.76, 0, 0.24, 1],
                delay: i * 0.05,
              }}
              style={{
                background: 'linear-gradient(to bottom, #0F2040 0%, #060D1A 100%)',
              }}
              className="h-full flex-1 relative border-r border-white/[0.015] last:border-r-0 pointer-events-auto"
            >
              {/* Gold Sweeping Line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, transparent, #E8A020, #F5C860, transparent)',
                  boxShadow: '0 0 12px rgba(232, 160, 32, 0.6)',
                }}
              />
            </motion.div>
          ))}

          {/* Central Logo & Tagline Container */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="flex flex-col items-center max-w-xl w-[90%] text-center"
            >
              <div className="relative mb-6">
                {/* Logo glow pulse */}
                <div className="absolute -inset-4 rounded-full bg-gold-500/10 blur-xl opacity-60 animate-pulse pointer-events-none" />
                <Image
                  src="/images/logo.png"
                  alt="Flowtaris Logo"
                  width={112}
                  height={112}
                  className="w-24 h-24 md:w-28 md:h-28 object-contain relative z-10 filter drop-shadow-[0_0_12px_rgba(232,160,32,0.4)]"
                  priority
                />
              </div>

              {/* Tagline */}
              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                style={{
                  fontFamily: 'var(--font-sora)',
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                  fontWeight: '700',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #FFF 30%, #F9DFA0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: '1.2',
                }}
              >
                The Science of Business Flow
              </motion.h1>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

