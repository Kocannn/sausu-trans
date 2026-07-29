import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ArrowLeft, Calendar, Clock, User, Newspaper, ChevronRight } from 'lucide-react';
import { NewsCategory, NewsItem, getReadingTime, formatDate } from './components/NewsTypes';
import NewsCard from './components/NewsCard';
import NewsShareBar from './components/NewsShareBar';
import NewsReadingProgress from './components/NewsReadingProgress';
import NewsSidebar from './components/NewsSidebar';

type Props = {
    profile: any;
    newsItem: NewsItem;
    relatedNews: NewsItem[];
    categories?: NewsCategory[];
};

export default function NewsShow({ profile, newsItem, relatedNews = [], categories = [] }: Props) {
    const readingTime = getReadingTime(newsItem.content || '');
    const formattedDate = formatDate(newsItem.published_at);

    return (
        <PublicLayout>
            <Head title={newsItem.title} />

            {/* Reading progress bar indicator */}
            <NewsReadingProgress />

            {/* Sub-Header / Breadcrumb */}
            <section className="bg-slate-900 text-white py-12 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap">
                        <Link href="/" className="hover:text-amber-400 transition-colors">Beranda</Link>
                        <ChevronRight className="h-3 w-3 text-slate-600" />
                        <Link href="/berita" className="hover:text-amber-400 transition-colors">Kabar Desa</Link>
                        <ChevronRight className="h-3 w-3 text-slate-600" />
                        {newsItem.category && (
                            <>
                                <Link href={`/berita?category=${newsItem.category.slug}`} className="hover:text-amber-400 transition-colors">
                                    {newsItem.category.name}
                                </Link>
                                <ChevronRight className="h-3 w-3 text-slate-600" />
                            </>
                        )}
                        <span className="text-slate-300 font-medium line-clamp-1">{newsItem.title}</span>
                    </nav>

                    <Link
                        href="/berita"
                        className="inline-flex items-center text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors uppercase tracking-wider"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Indeks Berita
                    </Link>
                </div>
            </section>

            {/* Article Main Section */}
            <section className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Main Article Column */}
                        <div className="lg:col-span-8">
                            <article>
                                {/* Header Metadata */}
                                <header className="mb-10">
                                    {newsItem.category && (
                                        <div className="mb-4">
                                            <span className="bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1  uppercase tracking-wider">
                                                {newsItem.category.name}
                                            </span>
                                        </div>
                                    )}

                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight mb-6">
                                        {newsItem.title}
                                    </h1>

                                    {/* Author & Time Metadata */}
                                    <div className="flex flex-wrap items-center gap-6 py-4 border-y border-slate-100 text-xs text-slate-500">
                                        <span className="flex items-center gap-1.5 font-medium text-slate-700">
                                            <User className="h-4 w-4 text-amber-700" />
                                            {newsItem.user?.name || 'Admin Desa'}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="h-4 w-4 text-slate-400" />
                                            {formattedDate}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="h-4 w-4 text-slate-400" />
                                            {readingTime} menit baca
                                        </span>
                                    </div>
                                </header>

                                {/* Featured Image */}
                                {newsItem.thumbnail && (
                                    <figure className="mb-10  overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
                                        <img
                                            src={`/storage/${newsItem.thumbnail}`}
                                            alt={newsItem.title}
                                            className="w-full h-auto max-h-[550px] object-cover"
                                        />
                                    </figure>
                                )}

                                {/* Article Body HTML */}
                                <div
                                    className="rich-content max-w-none mb-12 text-slate-800 leading-relaxed font-sans"
                                    dangerouslySetInnerHTML={{ __html: newsItem.content }}
                                />

                                {/* Share Bar Component */}
                                <NewsShareBar title={newsItem.title} />
                            </article>
                        </div>

                        {/* Sidebar Column */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-8">
                                <NewsSidebar
                                    trendingNews={relatedNews}
                                    categories={categories}
                                    activeCategory={newsItem.category?.slug}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related News Cards Grid */}
            {relatedNews.length > 0 && (
                <section className="bg-slate-50 py-16 border-t border-slate-200">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">Rekomendasi</span>
                                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-slate-900">Berita Terkait</h3>
                            </div>
                            <Link href="/berita" className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1">
                                Lihat Semua <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedNews.map((item) => (
                                <NewsCard key={item.id} news={item} variant="grid" />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    );
}
