import { router } from '@inertiajs/react';
import { Layers } from 'lucide-react';
import { NewsCategory } from './NewsTypes';

type Props = {
    categories: NewsCategory[];
    activeCategory?: string;
    currentSearch?: string;
};

export default function NewsCategoryTabs({ categories, activeCategory, currentSearch }: Props) {
    const handleCategoryClick = (slug?: string) => {
        const query: Record<string, string> = {};
        if (slug) query.category = slug;
        if (currentSearch) query.search = currentSearch;

        router.get('/berita', query, { preserveState: true });
    };

    const totalNewsCount = categories.reduce((acc, cat) => acc + (cat.news_count || 0), 0);

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar scroll-smooth">
            {/* All Category Pill */}
            <button
                onClick={() => handleCategoryClick(undefined)}
                className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5  transition-all whitespace-nowrap border shrink-0 ${!activeCategory
                        ? 'bg-amber-700 text-white border-amber-700 shadow-md shadow-amber-700/20'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
            >
                <Layers className="h-3.5 w-3.5" />
                Semua Berita
                {totalNewsCount > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5  ${!activeCategory ? 'bg-amber-800 text-amber-100' : 'bg-slate-100 text-slate-600'}`}>
                        {totalNewsCount}
                    </span>
                )}
            </button>

            {/* Individual Categories */}
            {categories.map((cat) => {
                const isActive = activeCategory === cat.slug;
                return (
                    <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.slug)}
                        className={`inline-flex items-center gap-2 text-xs font-medium px-4 py-2.5  transition-all whitespace-nowrap border shrink-0 ${isActive
                                ? 'bg-amber-700 text-white border-amber-700 shadow-md shadow-amber-700/20 font-semibold'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                            }`}
                    >
                        {cat.name}
                        {cat.news_count !== undefined && (
                            <span className={`text-[10px] px-1.5 py-0.5  ${isActive ? 'bg-amber-800 text-amber-100' : 'bg-slate-100 text-slate-600'}`}>
                                {cat.news_count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
