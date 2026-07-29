import { Link } from '@inertiajs/react';
import { Newspaper, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { NewsItem, getReadingTime, formatDate } from './NewsTypes';

type NewsCardProps = {
    news: NewsItem;
    variant?: 'grid' | 'horizontal';
};

export default function NewsCard({ news, variant = 'grid' }: NewsCardProps) {
    const readingTime = getReadingTime(news.content || '');
    const formattedDate = formatDate(news.published_at);
    const cleanExcerpt = news.content ? news.content.replace(/<[^>]*>?/gm, '') : '';

    if (variant === 'horizontal') {
        return (
            <Link
                href={`/berita/${news.slug}`}
                className="group flex flex-col md:flex-row gap-6 bg-white border border-slate-200 hover:border-amber-700 hover:shadow-lg transition-all duration-300 p-5  overflow-hidden"
            >
                {/* Thumbnail */}
                <div className="w-full md:w-64 h-48 bg-slate-100 shrink-0  overflow-hidden relative border border-slate-100">
                    {news.thumbnail ? (
                        <img
                            src={`/storage/${news.thumbnail}`}
                            alt={news.title}
                            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50">
                            <Newspaper className="h-10 w-10 mb-2" />
                            <span className="text-xs text-slate-400">Tidak ada gambar</span>
                        </div>
                    )}
                    {news.category && (
                        <span className="absolute top-3 left-3 bg-amber-700/95 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1  uppercase tracking-wider shadow-sm">
                            {news.category.name}
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div>
                        <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-2.5">
                            <span className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5 text-amber-700" />
                                {formattedDate}
                            </span>
                            <span className="w-1 h-1  bg-slate-300"></span>
                            <span className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 text-slate-400" />
                                {readingTime} min baca
                            </span>
                        </div>

                        <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                            {news.title}
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                            {cleanExcerpt}
                        </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700">
                        <span className="flex items-center gap-1.5 text-slate-500 font-normal">
                            <User className="h-3.5 w-3.5 text-slate-400" />
                            {news.user?.name || 'Admin Desa'}
                        </span>
                        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            Baca Selengkapnya <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link
            href={`/berita/${news.slug}`}
            className="group bg-white border border-slate-200 hover:border-amber-700 hover:shadow-xl transition-all duration-300 flex flex-col  overflow-hidden"
        >
            {/* Thumbnail Header */}
            <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative border-b border-slate-100">
                {news.thumbnail ? (
                    <img
                        src={`/storage/${news.thumbnail}`}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50">
                        <Newspaper className="h-10 w-10 mb-2" />
                        <span className="text-xs text-slate-400">Desa Sausu Trans</span>
                    </div>
                )}
                {news.category && (
                    <span className="absolute top-3 left-3 bg-amber-700/95 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1  uppercase tracking-wider shadow-sm">
                        {news.category.name}
                    </span>
                )}
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium mb-3">
                        <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-amber-700" />
                            {formattedDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-slate-400" />
                            {readingTime} min
                        </span>
                    </div>

                    <h3 className="font-serif font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 text-lg leading-snug mb-3">
                        {news.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {cleanExcerpt}
                    </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-700 mt-auto">
                    <span className="flex items-center gap-1.5 text-slate-500 font-normal">
                        <User className="h-3.5 w-3.5 text-slate-400" />
                        {news.user?.name || 'Admin'}
                    </span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Baca <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                </div>
            </div>
        </Link>
    );
}
