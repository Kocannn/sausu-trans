import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Newspaper, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewsCategory, NewsItem, PaginatedNews } from './components/NewsTypes';
import NewsCard from './components/NewsCard';
import NewsFeaturedHero from './components/NewsFeaturedHero';
import NewsCategoryTabs from './components/NewsCategoryTabs';
import NewsSearchBar from './components/NewsSearchBar';
import NewsSidebar from './components/NewsSidebar';
import NewsPagination from './components/NewsPagination';

type Props = {
    profile: any;
    news: PaginatedNews;
    categories?: NewsCategory[];
    featuredNews?: NewsItem | null;
    trendingNews?: NewsItem[];
    filters: {
        search?: string;
        category?: string;
    };
};

export default function NewsIndex({ profile, news, categories = [], featuredNews, trendingNews = [], filters }: Props) {
    const isFiltered = Boolean(filters.search || filters.category);

    // Filter out featured news from the main grid if hero is displayed to avoid duplicate
    const gridNewsList = (featuredNews && !isFiltered && news.current_page === 1)
        ? news.data.filter(item => item.id !== featuredNews.id)
        : news.data;

    return (
        <PublicLayout>
            <Head title="Kabar & Berita Desa" />

            {/* Page Header */}
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
                    <div className="mb-8">
                        <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">Kabar & Informasi</span>
                        <h1 className="mt-2 text-5xl lg:text-6xl font-serif text-slate-900 leading-tight">
                            Kabar & Kegiatan Desa
                        </h1>
                        <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
                            Berita terbaru, pengumuman publik, dan update pembangunan Desa {profile?.name || 'Sausu Trans'}.
                        </p>
                        <div className="mt-4 h-1 w-16 bg-amber-700"></div>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-8 max-w-2xl">
                        <NewsSearchBar
                            initialSearch={filters.search}
                            activeCategory={filters.category}
                        />
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="bg-white">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">

                    {/* Category Filter Tabs */}
                    {categories.length > 0 && (
                        <div className="mb-12 border-b border-slate-200 pb-6">
                            <NewsCategoryTabs
                                categories={categories}
                                activeCategory={filters.category}
                                currentSearch={filters.search}
                            />
                        </div>
                    )}

                    {/* Featured Hero (shown on page 1 when no search/category filter active) */}
                    {featuredNews && !isFiltered && news.current_page === 1 && (
                        <div className="mb-16">
                            <NewsFeaturedHero news={featuredNews} />
                        </div>
                    )}

                    {/* Active Filter Indicator */}
                    {isFiltered && (
                        <div className="bg-slate-50 border border-slate-200 p-6 mb-8 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3 text-sm">
                                <SlidersHorizontal className="h-4 w-4 text-amber-700 flex-shrink-0" />
                                <span className="text-slate-600 font-medium">Hasil pencarian:</span>
                                {filters.search && (
                                    <span className="bg-white text-slate-900 px-3 py-1 border border-slate-200 text-xs font-medium">
                                        "{filters.search}"
                                    </span>
                                )}
                                {filters.category && (
                                    <span className="bg-white text-slate-900 px-3 py-1 border border-slate-200 text-xs font-medium uppercase">
                                        {categories.find(c => c.slug === filters.category)?.name || filters.category}
                                    </span>
                                )}
                            </div>
                            <Button asChild variant="ghost" size="sm" className="text-xs text-amber-700 hover:text-amber-800 hover:bg-amber-50">
                                <Link href="/berita">Hapus Filter</Link>
                            </Button>
                        </div>
                    )}

                    {/* News Grid + Sidebar Layout */}
                    {news.data.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Main Grid */}
                            <div className="lg:col-span-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                                    {gridNewsList.map((item) => (
                                        <NewsCard key={item.id} news={item} variant="grid" />
                                    ))}
                                </div>

                                {/* Pagination */}
                                <NewsPagination links={news.links} />
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-4">
                                <NewsSidebar
                                    trendingNews={trendingNews}
                                    categories={categories}
                                    activeCategory={filters.category}
                                />
                            </div>
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-24 bg-slate-50 border border-slate-200 max-w-2xl mx-auto">
                            <div className="w-16 h-16 bg-white border border-slate-200 flex items-center justify-center mx-auto mb-6 text-slate-400">
                                <Newspaper className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Tidak Ada Berita Ditemukan</h3>
                            <p className="text-slate-600 text-sm max-w-md mx-auto mb-8">
                                {filters.search
                                    ? `Tidak ada berita yang cocok dengan kata kunci "${filters.search}".`
                                    : 'Belum ada berita yang dipublikasikan dalam kategori ini.'}
                            </p>
                            <Button asChild className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2.5 rounded-none">
                                <Link href="/berita">Lihat Semua Berita</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
