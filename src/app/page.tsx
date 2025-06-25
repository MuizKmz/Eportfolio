/* /app/page.tsx */
'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* ---------- 1 · BLACK OVERLAY ---------- */}
      <motion.div
        className="absolute inset-0 bg-black z-20"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* ---------- 2 · GRADIENT BACKDROP ---------- */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, rgba(233,242,245,1) 0%, rgba(159,120,191,1) 53%, rgba(133,39,227,1) 100%)',
        }}
      />

      {/* ---------- 3 · HERO IMAGE ---------- */}
      <AnimatePresence>
        <motion.div
          key="hero"
          className="relative z-30 flex h-screen w-full items-center justify-center"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
        >
          <Image
            src="/assets/profile.png"       // <-- put the PNG here
            alt="Shadow-hunter avatar"
            width={400}
            height={400}
            priority
            className="pointer-events-none select-none drop-shadow-[0_15px_25px_rgba(0,0,0,0.45)]"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
