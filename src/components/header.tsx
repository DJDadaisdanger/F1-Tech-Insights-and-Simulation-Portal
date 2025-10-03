'use client'

import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PlaceHolderImages } from '@/lib/placeholder-images'


const pages = [
  { path: '/', title: 'Home' },
  { path: '/prediction', title: 'AI Race Predictions' },
  { path: '/dashboard', title: 'Community Dashboard' },
  { path: '/simulation', title: 'Aerodynamic Simulations' },
]

export function Header() {
  const pathname = usePathname()
  const pageTitle = pages.find(p => pathname.startsWith(p.path) && p.path !== '/')?.title || pages.find(p => p.path === pathname)?.title || 'F1 Insights';
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');


  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background/60 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6 sticky top-0 z-10 shrink-0">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        <h1 className="text-lg font-headline font-semibold">{pageTitle}</h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer h-9 w-9">
            {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" data-ai-hint={userAvatar.imageHint} />}
            <AvatarFallback>F1</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
