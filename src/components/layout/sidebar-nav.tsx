'use client';

import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import Link from 'next/link';
import {
  LayoutDashboard,
  ArrowLeftRight,
  PiggyBank,
  FileText,
  Settings,
} from 'lucide-react';
import { Button } from '../ui/button';

const links = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { href: '/budgets', label: 'Budgets', icon: PiggyBank },
  { href: '/reports', label: 'Reports', icon: FileText },
];

const bottomLinks = [
    { href: '/settings', label: 'Settings', icon: Settings },
]

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <span className="text-lg font-semibold">PennyWise</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Button
                asChild
                variant={pathname === link.href ? 'default' : 'ghost'}
                className="w-full justify-start"
              >
                <Link href={link.href}>
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.label}
                </Link>
              </Button>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <SidebarMenu>
            {bottomLinks.map((link) => (
                 <SidebarMenuItem key={link.href}>
                 <Button
                   asChild
                   variant={pathname === link.href ? 'secondary' : 'ghost'}
                   className="w-full justify-start"
                 >
                   <Link href={link.href}>
                     <link.icon className="mr-2 h-4 w-4" />
                     {link.label}
                   </Link>
                 </Button>
               </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
