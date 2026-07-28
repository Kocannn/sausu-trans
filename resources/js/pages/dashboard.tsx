import { Head } from '@inertiajs/react';
import { useState } from 'react';
import PendingInvitationsModal from '@/components/pending-invitations-modal';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { dashboard } from '@/routes';
import type { DashboardInvitation } from '@/types';

import { Newspaper, Image as ImageIcon, Users, FileText } from 'lucide-react';

type Props = {
    pendingInvitations?: DashboardInvitation[];
    stats?: {
        news_count: number;
        gallery_count: number;
        officials_count: number;
        services_count: number;
    };
};

export default function Dashboard({ pendingInvitations = [], stats = { news_count: 0, gallery_count: 0, officials_count: 0, services_count: 0 } }: Props) {
    const [showInvitations, setShowInvitations] = useState(
        pendingInvitations.length > 0,
    );

    return (
        <>
            <Head title="Dashboard" />
            <PendingInvitationsModal
                invitations={pendingInvitations}
                open={pendingInvitations.length > 0 && showInvitations}
                onOpenChange={setShowInvitations}
            />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card text-card-foreground shadow p-6 flex flex-col items-center justify-center gap-2">
                        <Newspaper className="h-8 w-8 text-primary" />
                        <h3 className="text-2xl font-bold">{stats.news_count}</h3>
                        <p className="text-sm text-muted-foreground">Berita</p>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card text-card-foreground shadow p-6 flex flex-col items-center justify-center gap-2">
                        <ImageIcon className="h-8 w-8 text-primary" />
                        <h3 className="text-2xl font-bold">{stats.gallery_count}</h3>
                        <p className="text-sm text-muted-foreground">Media Galeri</p>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card text-card-foreground shadow p-6 flex flex-col items-center justify-center gap-2">
                        <Users className="h-8 w-8 text-primary" />
                        <h3 className="text-2xl font-bold">{stats.officials_count}</h3>
                        <p className="text-sm text-muted-foreground">Aparatur</p>
                    </div>
                    <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border bg-card text-card-foreground shadow p-6 flex flex-col items-center justify-center gap-2">
                        <FileText className="h-8 w-8 text-primary" />
                        <h3 className="text-2xl font-bold">{stats.services_count}</h3>
                        <p className="text-sm text-muted-foreground">Layanan Publik</p>
                    </div>
                </div>
                <div className="relative min-h-[50vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border p-6 bg-card">
                    <h2 className="text-xl font-bold mb-4">Selamat Datang di Panel Admin</h2>
                    <p className="text-muted-foreground">Gunakan menu di sidebar untuk mengelola konten website Desa Sausu Trans.</p>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (props: { currentTeam?: { slug: string } | null }) => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: props.currentTeam ? dashboard(props.currentTeam.slug) : '/',
        },
    ],
});
