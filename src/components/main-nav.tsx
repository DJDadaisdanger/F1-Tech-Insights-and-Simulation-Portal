'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { F1Car } from "@/components/icons";
import { SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { BrainCircuit, Gauge, LayoutDashboard, Wind } from "lucide-react";

const links = [
    { href: '/', label: 'Home', icon: LayoutDashboard },
    { href: '/prediction', label: 'AI Predictions', icon: BrainCircuit },
    { href: '/dashboard', label: 'Community', icon: Gauge },
    { href: '/simulation', label: 'Simulations', icon: Wind },
];

export function MainNav() {
    const pathname = usePathname();
    return (
        <>
            <SidebarHeader>
                <div className="flex items-center gap-2">
                    <F1Car className="w-8 h-8 text-primary" />
                    <div className="flex flex-col">
                        <h2 className="text-lg font-headline font-semibold tracking-tighter">F1 Insights</h2>
                        <p className="text-xs text-muted-foreground">Tech & Sim Portal</p>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {links.map((link) => (
                        <SidebarMenuItem key={link.href}>
                            <SidebarMenuButton asChild isActive={pathname === link.href}>
                                <Link href={link.href}>
                                    <link.icon className="w-5 h-5" />
                                    <span>{link.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </>
    )
}
