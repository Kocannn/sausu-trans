import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Settings, Users, Newspaper, Image as ImageIcon, FileText, Store, UserCog, Shield } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const page = usePage();
    const dashboardUrl = page.props.currentTeam
        ? dashboard(page.props.currentTeam.slug)
        : '/';


    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboardUrl,
            icon: LayoutGrid,
        },
        {
            title: 'Pengaturan Desa',
            href: '/admin/village-profile',
            icon: Settings,
        },
        {
            title: 'Aparatur Desa',
            href: '/admin/officials',
            icon: Users,
        },
        {
            title: 'Lembaga Desa',
            href: '/admin/village-institutions',
            icon: Shield,
        },
        {
            title: 'Berita & Artikel',
            href: '/admin/news',
            icon: Newspaper,
        },
        {
            title: 'Galeri Media',
            href: '/admin/gallery-albums',
            icon: ImageIcon,
        },
        {
            title: 'Layanan Publik',
            href: '/admin/public-services',
            icon: FileText,
        },
        {
            title: 'Etalase Potensi',
            href: '/admin/village-potentials',
            icon: Store,
        },
        {
            title: 'Manajemen User',
            href: '/admin/users',
            icon: UserCog,
        },
    ];


    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardUrl} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>



        </Sidebar>
    );
}
