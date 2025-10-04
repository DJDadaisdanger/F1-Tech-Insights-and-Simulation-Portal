
'use client'

import { MainNav } from "@/components/main-nav"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"

export function Header() {

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background/60 backdrop-blur-sm px-4 lg:px-6 sticky top-0 z-50 shrink-0">
      <div className="flex-1">
        <div className="hidden md:flex">
         <MainNav />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <MainNav />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
