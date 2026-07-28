import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Newspaper, Search, ChevronLeft, ChevronRight, Calendar, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormEventHandler } from 'react';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type NewsItem = {
    id: number;
    title: string;
    slug: string;
    content: string;
    thumbnail: string | null;
    published_at: string;
    category: { name: string };
    user: { name: string };
};

type Props = {
    profile: any;
    news: {
        data: NewsItem[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search?: string;
    };
};

export default function NewsIndex({ profile, news, filters }: Props) {
    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
    });

    const handleSearch: FormEventHandler = (e) => {
        e.preventDefault();
        get('/berita', { preserveState: true });
    };

    return (
        <PublicLayout>
            <Head title="Berita & Kegiatan" />
            
            {/* Page Header */}
            <div className="bg-slate-900 text-white py-16 md:py-24 border-b border-emerald-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Kabar Desa</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Informasi terkini, berita, dan kegiatan dari Desa {profile?.name || 'Sausu Trans'}.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-12">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input 
                                type="text" 
                                placeholder="Cari judul atau isi berita..." 
                                className="pl-10 rounded-full bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 focus-visible:ring-emerald-500 h-12"
                                value={data.search}
                                onChange={e => setData('search', e.target.value)}
                            />
                        </div>
                        <Button type="submit" disabled={processing} className="rounded-full h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white">
                            Cari
                        </Button>
                    </form>
                </div>

                {/* News Grid */}
                {news.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {news.data.map(item => (
                                <Link key={item.id} href={`/berita/${item.slug}`} className="group flex flex-col bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-800 hover:shadow-xl transition-all">
                                    <div className="aspect-[16/9] bg-slate-100 dark:bg-zinc-900 relative overflow-hidden">
                                        {item.thumbnail ? (
                                            <img src={`/storage/${item.thumbnail}`} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                                <Newspaper className="h-16 w-16" />
                                            </div>
                                        )}
                                        {item.category && (
                                            <div className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                                                {item.category.name}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4" />
                                                <span>{new Date(item.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <User className="h-4 w-4" />
                                                <span>{item.user?.name || 'Admin'}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed flex-1">
                                            {item.content.replace(/<[^>]*>?/gm, '')}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        {news.last_page > 1 && (
                            <div className="flex justify-center items-center gap-2">
                                {news.links.map((link, i) => {
                                    const isPrevious = link.label.includes('Previous');
                                    const isNext = link.label.includes('Next');
                                    
                                    if (link.url === null) {
                                        return (
                                            <div key={i} className="px-4 py-2 text-sm text-slate-400 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg cursor-not-allowed">
                                                {isPrevious ? <ChevronLeft className="h-4 w-4" /> : isNext ? <ChevronRight className="h-4 w-4" /> : link.label}
                                            </div>
                                        );
                                    }

                                    return (
                                        <Link 
                                            key={i}
                                            href={link.url}
                                            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors flex items-center justify-center ${
                                                link.active 
                                                    ? 'bg-emerald-600 text-white border-emerald-600' 
                                                    : 'bg-white dark:bg-zinc-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900'
                                            }`}
                                        >
                                            {isPrevious ? <ChevronLeft className="h-4 w-4" /> : isNext ? <ChevronRight className="h-4 w-4" /> : link.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200 dark:border-zinc-800 max-w-3xl mx-auto">
                        <Newspaper className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Tidak Ada Berita</h3>
                        <p className="text-slate-500">
                            {filters.search 
                                ? `Tidak ditemukan berita dengan kata kunci "${filters.search}".` 
                                : 'Belum ada berita yang dipublikasikan.'}
                        </p>
                        {filters.search && (
                            <Button asChild variant="outline" className="mt-6 rounded-full">
                                <Link href="/berita">Tampilkan Semua Berita</Link>
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
