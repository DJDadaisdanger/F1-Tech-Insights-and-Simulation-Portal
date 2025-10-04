
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { F1Car } from "@/components/icons";
import { BrainCircuit, Newspaper, LayoutDashboard, Wind } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
    { href: '/', label: 'Home', icon: LayoutDashboard },
    { href: '/prediction', label: 'AI Predictions', icon: BrainCircuit },
    { href: '/blog', label: 'Blog', icon: Newspaper },
    { href: '/simulation', label: 'Simulations', icon: Wind },
];

export function MainNav() {
    const pathname = usePathname();
    return (
        <nav className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 text-sm font-medium">
            <Link href="/" className="flex items-center gap-2 font-headline font-semibold text-lg md:text-base">
                <F1Car className="w-8 h-8 text-primary" />
                <div className="flex flex-col">
                    <h2 className="text-lg font-headline font-semibold tracking-tighter">F1 Insights</h2>
                    <p className="text-xs text-muted-foreground -mt-1">Tech & Sim Portal</p>
                </div>
            </Link>
            <div className="flex flex-col md:flex-row gap-4 md:gap-5 md:ml-6 mt-4 md:mt-0">
            {links.map((link) => (
                <Link 
                    key={link.href} 
                    href={link.href}
                    className={cn(
                        "flex items-center gap-2 transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-muted-foreground"
                    )}
                    >
                    <link.icon className="w-5 h-5 md:hidden" />
                    <span>{link.label}</span>
                </Link>
            ))}
            </div>
        </nav>
    )
}
