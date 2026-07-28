import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Users, Map, Clock, ChevronRight, Newspaper } from 'lucide-react';

type Props = {
    profile: any;
    latestNews: any[];
    services: any[];
};

export default function Home({ profile, latestNews, services }: Props) {
    return (
        <PublicLayout>
            <Head title="Beranda" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-900 text-white min-h-[500px] flex items-center">
                {/* Background Pattern/Overlay */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-slate-900 to-black"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12 py-20">
                    <div className="flex-1 text-center md:text-left">
                        <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-semibold tracking-wider mb-4 border border-emerald-500/30">
                            SELAMAT DATANG DI
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                            Portal Informasi<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                                Desa {profile?.name || 'Sausu Trans'}
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                            Mewujudkan tata kelola desa yang transparan, inovatif, dan berpusat pada kesejahteraan masyarakat melalui pelayanan digital.
                        </p>
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                            <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-8">
                                <Link href="/layanan">Jelajahi Layanan</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full px-8 text-slate-900 dark:text-slate-900 border-white/20">
                                <Link href="/profil">Profil Desa</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistik Desa Singkat */}
            <section className="py-12 bg-white dark:bg-zinc-950 relative -mt-8 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-zinc-800 p-8 flex items-center gap-6 transform transition-transform hover:-translate-y-1">
                            <div className="h-14 w-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                                <Users className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Penduduk</p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{profile?.demographics?.population?.total || '2,450'} <span className="text-base font-normal text-slate-500">Jiwa</span></h3>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-zinc-800 p-8 flex items-center gap-6 transform transition-transform hover:-translate-y-1">
                            <div className="h-14 w-14 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shrink-0">
                                <Map className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Luas Wilayah</p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{profile?.demographics?.territorial?.area || '15.5'} <span className="text-base font-normal text-slate-500">Ha</span></h3>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-zinc-800 p-8 flex items-center gap-6 transform transition-transform hover:-translate-y-1">
                            <div className="h-14 w-14 rounded-full bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center shrink-0">
                                <Clock className="h-7 w-7 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Berdiri Sejak</p>
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{profile?.established_year || '1982'}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Profil Desa Section pada Beranda */}
            <section className="py-20 bg-white dark:bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Profil Desa</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Mengenal lebih dekat sejarah, visi, dan misi Desa {profile?.name || 'Sausu Trans'}.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Sejarah */}
                        <div className="bg-slate-50 dark:bg-zinc-900/50 rounded-3xl p-8 border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col h-full">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <div className="h-8 w-2 rounded-full bg-emerald-500"></div>
                                Sejarah
                            </h3>
                            <div className="prose dark:prose-invert text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap flex-1 text-sm">
                                {profile?.history ? (
                                    <>{profile.history}</>
                                ) : (
                                    <p>Belum ada informasi sejarah desa yang ditambahkan.</p>
                                )}
                            </div>
                        </div>

                        {/* Visi */}
                        <div className="bg-slate-50 dark:bg-zinc-900/50 rounded-3xl p-8 border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col h-full">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <div className="h-8 w-2 rounded-full bg-teal-500"></div>
                                Visi
                            </h3>
                            <div className="prose dark:prose-invert text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap flex-1 text-sm font-medium">
                                {profile?.vision ? (
                                    <>{profile.vision}</>
                                ) : (
                                    <p>Belum ada informasi visi desa yang ditambahkan.</p>
                                )}
                            </div>
                        </div>

                        {/* Misi */}
                        <div className="bg-slate-50 dark:bg-zinc-900/50 rounded-3xl p-8 border border-slate-100 dark:border-zinc-800 shadow-sm flex flex-col h-full">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <div className="h-8 w-2 rounded-full bg-indigo-500"></div>
                                Misi
                            </h3>
                            <div className="prose dark:prose-invert text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap flex-1 text-sm">
                                {profile?.mission ? (
                                    <>{profile.mission}</>
                                ) : (
                                    <p>Belum ada informasi misi desa yang ditambahkan.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Akses Cepat Layanan */}
            <section className="py-20 bg-slate-50 dark:bg-zinc-950/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Layanan Publik</h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Akses cepat ke berbagai layanan administrasi yang disediakan oleh pemerintah desa.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.length > 0 ? services.map(service => (
                            <div key={service.id} className="group bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors cursor-pointer">
                                <div className="h-12 w-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{service.name}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                                    {service.description}
                                </p>
                                <Link href={`/layanan`} className="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700">
                                    Lihat Syarat <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        )) : (
                            <div className="col-span-full text-center text-slate-500 py-8">
                                Belum ada data layanan yang ditambahkan.
                            </div>
                        )}
                    </div>

                    {services.length > 0 && (
                        <div className="mt-10 text-center">
                            <Button asChild variant="outline" className="rounded-full">
                                <Link href="/layanan">Lihat Semua Layanan</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Highlight Berita Terbaru */}
            <section className="py-20 bg-white dark:bg-zinc-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Kabar Desa</h2>
                            <p className="text-slate-600 dark:text-slate-400">
                                Berita dan kegiatan terbaru dari desa.
                            </p>
                        </div>
                        <Button asChild variant="ghost" className="hidden sm:flex text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                            <Link href="/berita">Lihat Semua <ChevronRight className="ml-1 h-4 w-4" /></Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {latestNews.length > 0 ? latestNews.map(news => (
                            <Link key={news.id} href={`/berita/${news.slug}`} className="group flex flex-col bg-slate-50 dark:bg-zinc-900/50 rounded-2xl overflow-hidden border border-slate-100 dark:border-zinc-800 hover:shadow-lg transition-all">
                                <div className="aspect-[16/9] bg-slate-200 dark:bg-zinc-800 relative overflow-hidden">
                                    {news.thumbnail ? (
                                        <img src={`/storage/${news.thumbnail}`} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                            <Newspaper className="h-12 w-12 opacity-50" />
                                        </div>
                                    )}
                                    {news.category && (
                                        <div className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                            {news.category.name}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="text-xs text-slate-500 mb-3 flex items-center gap-2">
                                        <span>{new Date(news.published_at || news.created_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        <span>•</span>
                                        <span>{news.user?.name || 'Admin'}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                                        {news.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-1">
                                        {/* Simple strip tags for preview */}
                                        {news.content.replace(/<[^>]*>?/gm, '').substring(0, 150)}...
                                    </p>
                                    <span className="inline-flex items-center text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                                        Baca selengkapnya <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        )) : (
                            <div className="col-span-full text-center text-slate-500 py-12 bg-slate-50 dark:bg-zinc-900/30 rounded-2xl">
                                Belum ada berita yang dipublikasikan.
                            </div>
                        )}
                    </div>

                    <div className="mt-8 text-center sm:hidden">
                        <Button asChild variant="outline" className="w-full">
                            <Link href="/berita">Lihat Semua Berita</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
