import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import PendingInvitationsModal from '@/components/pending-invitations-modal';
import { dashboard } from '@/routes';
import type { DashboardInvitation, Auth } from '@/types';
import {
    Newspaper,
    Image as ImageIcon,
    Users,
    FileText,
    Store,
    Settings,
    Plus,
    ExternalLink,
    Clock,
    CheckCircle2,
    ChevronRight,
    Pencil,
    Activity,
    Building2,
} from 'lucide-react';

type NewsItem = {
    id: number;
    title: string;
    slug: string;
    status: 'draft' | 'published';
    category_name: string;
    created_at: string;
};

type MediaItem = {
    id: number;
    title: string;
    file_path: string;
    type: 'photo' | 'video';
    album_title: string;
    created_at: string;
};

type Props = {
    pendingInvitations?: DashboardInvitation[];
    stats?: {
        news_count: number;
        news_published?: number;
        news_draft?: number;
        gallery_count: number;
        albums_count?: number;
        officials_count: number;
        services_count: number;
        potentials_count?: number;
    };
    recentNews?: NewsItem[];
    recentMedia?: MediaItem[];
};

export default function Dashboard({
    pendingInvitations = [],
    stats = {
        news_count: 0,
        news_published: 0,
        news_draft: 0,
        gallery_count: 0,
        albums_count: 0,
        officials_count: 0,
        services_count: 0,
        potentials_count: 0,
    },
    recentNews = [],
    recentMedia = [],
}: Props) {
    const { auth } = usePage().props as { auth?: Auth };
    const [showInvitations, setShowInvitations] = useState(
        pendingInvitations.length > 0
    );
    const [greeting, setGreeting] = useState('Selamat Datang');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 4 && hour < 11) {
            setGreeting('Selamat Pagi');
        } else if (hour >= 11 && hour < 15) {
            setGreeting('Selamat Siang');
        } else if (hour >= 15 && hour < 18) {
            setGreeting('Selamat Sore');
        } else {
            setGreeting('Selamat Malam');
        }
    }, []);

    const userName = auth?.user?.name || 'Administrator';

    const quickActions = [
        {
            title: 'Kelola Berita',
            desc: 'Buat & publikasikan artikel informasi desa',
            href: '/admin/news',
            actionHref: '/admin/news/create',
            actionLabel: '+ Tulis',
        },
        {
            title: 'Galeri Media',
            desc: 'Upload foto & video kegiatan desa',
            href: '/admin/gallery-albums',
            actionHref: '/admin/gallery-albums',
            actionLabel: 'Kelola',
        },
        {
            title: 'Aparatur Desa',
            desc: 'Atur struktur organisasi & perangkat desa',
            href: '/admin/officials',
            actionHref: '/admin/officials',
            actionLabel: 'Atur',
        },
        {
            title: 'Layanan Publik',
            desc: 'Informasi persyaratan & layanan warga',
            href: '/admin/public-services',
            actionHref: '/admin/public-services',
            actionLabel: 'Detail',
        },
        {
            title: 'Etalase Potensi',
            desc: 'Promosi produk & komoditas khas desa',
            href: '/admin/village-potentials',
            actionHref: '/admin/village-potentials',
            actionLabel: 'Lihat',
        },
        {
            title: 'Pengaturan Desa',
            desc: 'Update profil, visi misi & alamat desa',
            href: '/admin/village-profile',
            actionHref: '/admin/village-profile',
            actionLabel: 'Edit',
        },
    ];

    return (
        <>
            <Head title="Dashboard Admin - Desa Sausu Trans" />
            <PendingInvitationsModal
                invitations={pendingInvitations}
                open={pendingInvitations.length > 0 && showInvitations}
                onOpenChange={setShowInvitations}
            />

            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full bg-white">
                {/* Welcome Section */}
                <div className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">Admin Portal</span>
                            <h1 className="mt-2 text-4xl md:text-5xl font-serif text-slate-900">
                                {greeting}, {userName}
                            </h1>
                            <p className="mt-3 text-lg text-slate-600 max-w-2xl">
                                Kelola informasi publik, berita, galeri, dan layanan masyarakat desa.
                            </p>
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/admin/news/create"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm rounded-none transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Tulis Berita</span>
                            </Link>
                            <Link
                                href="/"
                                target="_blank"
                                className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-300 text-slate-900 font-medium text-sm rounded-none hover:bg-slate-50 transition-colors"
                            >
                                <ExternalLink className="h-4 w-4" />
                                <span>Lihat Website</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Key Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Berita */}
                    <Link
                        href="/admin/news"
                        className="p-5 border border-slate-200 hover:border-amber-700 transition-colors group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <Newspaper className="h-6 w-6 text-amber-700" />
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-slate-900 mb-1">
                            {stats.news_count}
                        </h3>
                        <p className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-4">Berita & Artikel</p>
                        <div className="pt-3 border-t border-slate-200 text-xs text-slate-600">
                            <span>{stats.news_published || 0} Terbit</span>
                            <span className="mx-2">•</span>
                            <span className="text-amber-700">{stats.news_draft || 0} Draf</span>
                        </div>
                    </Link>

                    {/* Galeri */}
                    <Link
                        href="/admin/gallery-albums"
                        className="p-5 border border-slate-200 hover:border-amber-700 transition-colors group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <ImageIcon className="h-6 w-6 text-amber-700" />
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-slate-900 mb-1">
                            {stats.gallery_count}
                        </h3>
                        <p className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-4">Media Galeri</p>
                        <div className="pt-3 border-t border-slate-200 text-xs text-slate-600">
                            {stats.albums_count || 0} Album
                        </div>
                    </Link>

                    {/* Aparatur */}
                    <Link
                        href="/admin/officials"
                        className="p-5 border border-slate-200 hover:border-amber-700 transition-colors group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <Users className="h-6 w-6 text-amber-700" />
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-slate-900 mb-1">
                            {stats.officials_count}
                        </h3>
                        <p className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-4">Aparatur Desa</p>
                        <div className="pt-3 border-t border-slate-200 text-xs text-slate-600">
                            Struktur Aktif
                        </div>
                    </Link>

                    {/* Layanan */}
                    <Link
                        href="/admin/public-services"
                        className="p-5 border border-slate-200 hover:border-amber-700 transition-colors group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <FileText className="h-6 w-6 text-amber-700" />
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-slate-900 mb-1">
                            {stats.services_count}
                        </h3>
                        <p className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-4">Layanan Publik</p>
                        <div className="pt-3 border-t border-slate-200 text-xs text-slate-600">
                            Informasi Syarat
                        </div>
                    </Link>

                    {/* Potensi */}
                    <Link
                        href="/admin/village-potentials"
                        className="p-5 border border-slate-200 hover:border-amber-700 transition-colors group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <Store className="h-6 w-6 text-amber-700" />
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-slate-900 mb-1">
                            {stats.potentials_count || 0}
                        </h3>
                        <p className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-4">Potensi & UMKM</p>
                        <div className="pt-3 border-t border-slate-200 text-xs text-slate-600">
                            Produk Desa
                        </div>
                    </Link>
                </div>

                {/* Quick Actions Grid */}
                <div className="border-t border-slate-200 pt-8">
                    <div className="mb-6">
                        <h2 className="text-2xl font-serif text-slate-900 mb-1">Pengelolaan Modul</h2>
                        <p className="text-slate-600 text-sm">Akses cepat ke semua fitur utama portal desa</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {quickActions.map((item, idx) => (
                            <div
                                key={idx}
                                className="border border-slate-200 p-5 hover:border-amber-700 transition-colors group"
                            >
                                <div className="mb-4">
                                    <h3 className="font-serif font-bold text-slate-900 text-base group-hover:text-amber-700 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-slate-600 mt-1">
                                        {item.desc}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
                                    <Link
                                        href={item.href}
                                        className="text-xs font-medium text-slate-600 hover:text-amber-700 transition-colors flex items-center gap-1"
                                    >
                                        Buka
                                        <ChevronRight className="h-3 w-3" />
                                    </Link>
                                    <Link
                                        href={item.actionHref}
                                        className="text-xs font-medium px-3 py-1 bg-amber-700 text-white hover:bg-amber-800 transition-colors"
                                    >
                                        {item.actionLabel}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Two Column Layout: Recent News & Media */}
                <div className="border-t border-slate-200 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Recent News */}
                    <div className="lg:col-span-7 border border-slate-200 p-6">
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                            <div>
                                <h2 className="text-xl font-serif font-bold text-slate-900">Berita Terbaru</h2>
                                <p className="text-xs text-slate-600 mt-1">Publikasi terkini portal desa</p>
                            </div>
                            <Link
                                href="/admin/news"
                                className="text-xs font-medium text-amber-700 hover:text-amber-800 flex items-center gap-1"
                            >
                                Lihat Semua
                                <ChevronRight className="h-3 w-3" />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recentNews && recentNews.length > 0 ? (
                                recentNews.map((news) => (
                                    <div key={news.id} className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 last:border-b-0">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-700">
                                                    {news.category_name}
                                                </span>
                                                {news.status === 'published' ? (
                                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-700" />
                                                        Terbit
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                                        Draf
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-sm font-medium text-slate-900 line-clamp-1 group-hover:text-amber-700 transition-colors">
                                                {news.title}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {news.created_at}
                                            </p>
                                        </div>

                                        <Link
                                            href={`/admin/news/${news.id}/edit`}
                                            className="p-2 border border-slate-200 hover:border-amber-700 text-slate-600 hover:text-amber-700 transition-colors shrink-0"
                                            title="Edit Berita"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="py-8 text-center text-slate-500">
                                    <Newspaper className="h-8 w-8 mx-auto opacity-40 mb-2" />
                                    <p className="text-sm">Belum ada berita dipublikasikan</p>
                                    <Link
                                        href="/admin/news/create"
                                        className="inline-block mt-3 text-xs font-medium text-amber-700 hover:text-amber-800"
                                    >
                                        + Tulis berita pertama
                                    </Link>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-200">
                            <Link
                                href="/admin/news/create"
                                className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 bg-amber-700 text-white hover:bg-amber-800 transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                Tulis Berita Baru
                            </Link>
                        </div>
                    </div>

                    {/* Recent Media & System Status */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        {/* Media Gallery */}
                        <div className="border border-slate-200 p-6">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
                                <div>
                                    <h2 className="text-xl font-serif font-bold text-slate-900">Media Terbaru</h2>
                                    <p className="text-xs text-slate-600 mt-1">Galeri kegiatan desa</p>
                                </div>
                                <Link
                                    href="/admin/gallery-albums"
                                    className="text-xs font-medium text-amber-700 hover:text-amber-800"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                            </div>

                            {recentMedia && recentMedia.length > 0 ? (
                                <div className="grid grid-cols-3 gap-2">
                                    {recentMedia.slice(0, 6).map((item) => (
                                        <div
                                            key={item.id}
                                            className="aspect-square bg-slate-200 border border-slate-200 overflow-hidden group"
                                        >
                                            {item.type === 'video' ? (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white text-xs font-semibold">
                                                    📹 Video
                                                </div>
                                            ) : (
                                                <img
                                                    src={`/storage/${item.file_path}`}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300';
                                                    }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center text-slate-500">
                                    <ImageIcon className="h-8 w-8 mx-auto opacity-40 mb-2" />
                                    <p className="text-xs">Belum ada foto/video diunggah</p>
                                </div>
                            )}
                        </div>

                        {/* System Status */}
                        <div className="border border-slate-200 p-6">
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-200">
                                <Activity className="h-5 w-5 text-amber-700" />
                                <div>
                                    <h2 className="font-serif font-bold text-slate-900 text-sm">Status Sistem Portal</h2>
                                    <p className="text-xs text-slate-600">Informasi operasional server</p>
                                </div>
                            </div>

                            <div className="space-y-2 text-xs">
                                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200">
                                    <span className="text-slate-600 flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-amber-700" />
                                        Status Server Website
                                    </span>
                                    <span className="font-medium text-amber-700">Online & Stabil</span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200">
                                    <span className="text-slate-600 flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-amber-700" />
                                        Desa / Lokasi
                                    </span>
                                    <span className="font-medium text-slate-900">Sausu Trans</span>
                                </div>
                            </div>
                        </div>
                    </div>
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
