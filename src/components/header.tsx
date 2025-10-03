
'use client'

import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

const pages = [
  { path: '/', title: 'Home' },
  { path: '/prediction', title: 'AI Race Predictions' },
  { path: '/blog', title: 'Blog' },
  { path: '/simulation', title: 'Aerodynamic Simulations' },
]

export function Header() {
  const pathname = usePathname()
  const pageTitle = pages.find(p => pathname.startsWith(p.path) && p.path !== '/')?.title || pages.find(p => p.path === pathname)?.title || 'F1 Insights';

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background/60 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10 shrink-0">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <h1 className="text-lg font-headline font-semibold">{pageTitle}</h1>
      </div>
    </header>
  )
}
