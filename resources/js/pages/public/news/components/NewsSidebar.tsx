import { Link } from '@inertiajs/react';
import { TrendingUp, Folder, Calendar, ArrowRight, Bell, Newspaper } from 'lucide-react';
import { NewsCategory, NewsItem, formatDate } from './NewsTypes';

type Props = {
    trendingNews: NewsItem[];
    categories: NewsCategory[];
    activeCategory?: string;
};

export default function NewsSidebar({ trendingNews, categories, activeCategory }: Props) {
    return (
        <aside className="space-y-8">
            {/* Trending / Recent News Widget */}
            {trendingNews.length > 0 && (
                <div className="bg-white  border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                        <TrendingUp className="h-5 w-5 text-amber-700" />
                        <h3 className="font-serif font-bold text-slate-900 text-lg">Berita Terkini</h3>
                    </div>

                    <div className="space-y-5">
                        {trendingNews.map((item, idx) => (
                            <Link
                                key={item.id}
                                href={`/berita/${item.slug}`}
                                className="group flex gap-4 items-start pb-4 border-b border-slate-100 last:border-0 last:pb-0"
                            >
                                <span className="font-serif font-bold text-2xl text-slate-300 group-hover:text-amber-700 transition-colors shrink-0 w-6">
                                    0{idx + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    {item.category && (
                                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                                            {item.category.name}
                                        </span>
                                    )}
                                    <h4 className="font-serif font-semibold text-slate-900 text-sm group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                                        {item.title}
                                    </h4>
                                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1.5">
                                        <Calendar className="h-3 w-3" />
                                        {formatDate(item.published_at)}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Categories Directory Widget */}
            {categories.length > 0 && (
                <div className="bg-white  border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                        <Folder className="h-5 w-5 text-amber-700" />
                        <h3 className="font-serif font-bold text-slate-900 text-lg">Kategori Berita</h3>
                    </div>

                    <div className="space-y-2">
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat.slug;
                            return (
                                <Link
                                    key={cat.id}
                                    href={`/berita?category=${cat.slug}`}
                                    className={`flex items-center justify-between p-3  transition-colors text-sm font-medium ${isActive
                                        ? 'bg-amber-700 text-white font-semibold'
                                        : 'text-slate-700 hover:bg-slate-50 hover:text-amber-700'
                                        }`}
                                >
                                    <span>{cat.name}</span>
                                    {cat.news_count !== undefined && (
                                        <span
                                            className={`text-xs px-2 py-0.5  ${isActive ? 'bg-amber-800 text-amber-100' : 'bg-slate-100 text-slate-600'
                                                }`}
                                        >
                                            {cat.news_count}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Village Public Information Card */}
            <div className="bg-gradient-to-br from-amber-700 to-amber-900  p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute right-[-10px] bottom-[-10px] opacity-10 text-white">
                    <Newspaper className="h-36 w-36" />
                </div>
                <div className="relative z-10">
                    <div className="w-10 h-10 bg-amber-600/50  flex items-center justify-center mb-4">
                        <Bell className="h-5 w-5 text-amber-200" />
                    </div>
                    <h4 className="font-serif font-bold text-xl mb-2">Layanan Pengaduan</h4>
                    <p className="text-amber-100 text-xs leading-relaxed mb-6">
                        Punya informasi penting atau pengaduan seputar Desa Sausu Trans? Hubungi perangkat desa kami.
                    </p>
                    <Link
                        href="/kontak"
                        className="inline-flex items-center gap-2 bg-white text-amber-900 hover:bg-amber-50 font-bold text-xs px-4 py-2.5  transition-all shadow"
                    >
                        Hubungi Kami <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </div>
        </aside>
    );
}
