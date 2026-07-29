import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Newspaper } from 'lucide-react';
import NewsCard from './news/components/NewsCard';

type Props = {
    profile: any;
    latestNews: any[];
    services: any[];
};

export default function Home({ profile, latestNews, services }: Props) {
    return (
        <PublicLayout>
            <Head title="Beranda" />

            {/* Hero Section - Full Background */}
            <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('/hero.jpg')" }}
                ></div>
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                
                {/* Content */}
                <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center md:text-left text-white w-full">
                    <span className="text-sm font-bold text-amber-500 tracking-widest uppercase">Portal Informasi Desa</span>
                    <h1 className="mt-4 text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight drop-shadow-lg">
                        Desa {profile?.name || 'Sausu Trans'}
                    </h1>
                    <p className="mt-6 text-lg md:text-xl text-slate-200 leading-relaxed max-w-3xl drop-shadow">
                        {profile?.tagline || 'Tata kelola transparan, inovatif, dan berpusat pada kesejahteraan masyarakat melalui layanan digital yang mudah diakses.'}
                    </p>
                    <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
                        <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 h-auto text-base font-semibold rounded-none border border-amber-600">
                            <Link href="/layanan">Jelajahi Layanan</Link>
                        </Button>
                        <Button asChild variant="outline" className="px-8 py-3 h-auto text-base font-semibold rounded-none bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm">
                            <Link href="/profil">Profil Desa</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Key Stats - Clean grid without cards */}
            <section className="bg-slate-50 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <div className="text-4xl font-serif font-bold text-slate-900 mb-2">
                                {profile?.demographics?.population?.total || '2,450'}
                            </div>
                            <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Penduduk</p>
                            <div className="mt-3 h-1 w-12 bg-amber-700"></div>
                        </div>
                        <div>
                            <div className="text-4xl font-serif font-bold text-slate-900 mb-2">
                                {profile?.demographics?.territorial?.area || '15.5'} Ha
                            </div>
                            <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Luas Wilayah</p>
                            <div className="mt-3 h-1 w-12 bg-amber-700"></div>
                        </div>
                        <div>
                            <div className="text-4xl font-serif font-bold text-slate-900 mb-2">
                                {profile?.established_year || '1982'}
                            </div>
                            <p className="text-sm font-medium text-slate-600 uppercase tracking-wide">Berdiri Sejak</p>
                            <div className="mt-3 h-1 w-12 bg-amber-700"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Profile Section - Three column layout */}
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
                    <div className="mb-12">
                        <h2 className="text-4xl font-serif text-slate-900 mb-2">Profil Desa</h2>
                        <div className="h-1 w-16 bg-amber-700 mt-4"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Sejarah */}
                        <div className="flex flex-col">
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-4">Sejarah</h3>
                            <p className="text-slate-600 leading-relaxed text-sm flex-1 whitespace-pre-wrap">
                                {profile?.history ? (
                                    profile.history
                                ) : (
                                    'Belum ada informasi sejarah desa yang ditambahkan.'
                                )}
                            </p>
                        </div>

                        {/* Visi */}
                        <div className="flex flex-col">
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-4">Visi</h3>
                            <p className="text-slate-600 leading-relaxed text-sm flex-1 italic whitespace-pre-wrap">
                                {profile?.vision ? (
                                    profile.vision
                                ) : (
                                    'Belum ada informasi visi desa yang ditambahkan.'
                                )}
                            </p>
                        </div>

                        {/* Misi */}
                        <div className="flex flex-col">
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-4">Misi</h3>
                            <p className="text-slate-600 leading-relaxed text-sm flex-1 whitespace-pre-wrap">
                                {profile?.mission ? (
                                    profile.mission
                                ) : (
                                    'Belum ada informasi misi desa yang ditambahkan.'
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section - Grid without hover effects */}
            <section className="bg-slate-50 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
                    <div className="mb-12">
                        <h2 className="text-4xl font-serif text-slate-900 mb-2">Layanan Publik</h2>
                        <p className="text-slate-600 mt-2">Akses ke layanan administrasi desa</p>
                        <div className="h-1 w-16 bg-amber-700 mt-4"></div>
                    </div>

                    {services.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {services.map(service => (
                                    <div
                                        key={service.id}
                                        className="p-6 bg-white border border-slate-200 hover:border-amber-700 transition-colors group flex flex-col"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <FileText className="h-6 w-6 text-amber-700 flex-shrink-0" />
                                        </div>
                                        <h3 className="text-sm font-bold text-slate-900 mb-3">{service.name}</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 flex-1">
                                            {service.description}
                                        </p>
                                        <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-100">
                                            <Link href="/layanan" className="text-xs font-medium text-amber-700 hover:text-amber-800 flex items-center">
                                                Lihat detail <ArrowRight className="ml-1 h-3 w-3" />
                                            </Link>
                                            {service.online_link && (
                                                <a href={service.online_link} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 px-3 py-1.5 rounded transition-colors">
                                                    Akses Online
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-12 text-center">
                                <Button asChild variant="outline" className="px-6 py-2.5 rounded-none border-slate-300 hover:bg-slate-100">
                                    <Link href="/layanan">Lihat Semua Layanan</Link>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="py-12 text-center text-slate-500">
                            Belum ada data layanan yang ditambahkan.
                        </div>
                    )}
                </div>
            </section>

            {/* News Section - List style */}
            <section className="bg-white">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
                    <div className="flex justify-between items-baseline mb-12">
                        <div>
                            <h2 className="text-4xl font-serif text-slate-900 mb-2">Kabar Desa</h2>
                            <p className="text-slate-600">Berita dan kegiatan terkini</p>
                            <div className="h-1 w-16 bg-amber-700 mt-4"></div>
                        </div>
                        <Button asChild variant="ghost" className="hidden sm:inline-flex text-amber-700 hover:text-amber-800 hover:bg-amber-50 px-0">
                            <Link href="/berita">
                                Lihat Semua <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    {latestNews.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {latestNews.slice(0, 3).map(news => (
                                    <NewsCard key={news.id} news={news} variant="grid" />
                                ))}
                            </div>

                            <div className="mt-12 text-center sm:hidden">
                                <Button asChild variant="outline" className="w-full px-6 py-2.5 rounded-xl">
                                    <Link href="/berita">Lihat Semua Berita</Link>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="py-12 text-center text-slate-500">
                            Belum ada berita yang dipublikasikan.
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
