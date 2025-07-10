"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import Image from "next/image"

export function ThemeLogo({ className = "", width = 120, height = 40, alt = "Marwyck Logo" }) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder during SSR to avoid hydration mismatch
    return (
      <div 
        className={`${className}`}
        style={{ width, height }}
      >
        <span className="font-bold text-xl">Marwyck</span>
      </div>
    )
  }

  // Determine which logo to show based on the current theme
  const currentTheme = resolvedTheme || theme
  const logoSrc = currentTheme === 'dark' ? '/logo-dark.png' : '/logo-light.png'

  return (
    <Image
      src={logoSrc}
      alt={alt}
      width={width}
      height={height}
      className={`object-contain ${className}`}
      priority
      unoptimized
    />
  )
}