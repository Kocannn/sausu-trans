import { Link } from '@inertiajs/react';
import { Newspaper, Calendar, Clock, ArrowRight, Sparkles, User } from 'lucide-react';
import { NewsItem, getReadingTime, formatDate } from './NewsTypes';

type Props = {
    news: NewsItem;
};

export default function NewsFeaturedHero({ news }: Props) {
    const readingTime = getReadingTime(news.content || '');
    const formattedDate = formatDate(news.published_at);
    const cleanExcerpt = news.content ? news.content.replace(/<[^>]*>?/gm, '') : '';

    return (
        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900  overflow-hidden shadow-2xl border border-slate-800 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
                {/* Content Side */}
                <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between z-10">
                    <div>
                        {/* Header Pills */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold px-3 py-1  uppercase tracking-wider">
                                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                                Berita Utama
                            </span>
                            {news.category && (
                                <span className="bg-slate-800 text-slate-300 border border-slate-700 text-xs font-medium px-3 py-1 ">
                                    {news.category.name}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-4 hover:text-amber-300 transition-colors">
                            <Link href={`/berita/${news.slug}`}>
                                {news.title}
                            </Link>
                        </h2>

                        {/* Excerpt */}
                        <p className="text-slate-300 text-base leading-relaxed line-clamp-3 mb-8 max-w-2xl font-light">
                            {cleanExcerpt}
                        </p>
                    </div>

                    {/* Footer Metadata & CTA */}
                    <div className="pt-6 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span className="flex items-center gap-1.5">
                                <User className="h-3.5 w-3.5 text-amber-400" />
                                {news.user?.name || 'Admin Desa'}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                {formattedDate}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 text-slate-400" />
                                {readingTime} min baca
                            </span>
                        </div>

                        <Link
                            href={`/berita/${news.slug}`}
                            className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-600 text-white font-medium text-sm px-6 py-2.5  shadow-lg hover:shadow-amber-700/30 transition-all group"
                        >
                            Baca Berita Lengkap
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Media Image Side */}
                <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-slate-950">
                    {news.thumbnail ? (
                        <div className="absolute inset-0">
                            <img
                                src={`/storage/${news.thumbnail}`}
                                alt={news.title}
                                className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-slate-900 lg:via-transparent lg:to-transparent"></div>
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 bg-slate-900/50 p-8 text-center">
                            <Newspaper className="h-16 w-16 mb-3 text-slate-700" />
                            <span className="text-sm font-medium text-slate-500">Sausu Trans Update</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
