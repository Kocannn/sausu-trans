import { router } from '@inertiajs/react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormEventHandler, useState } from 'react';

type Props = {
    initialSearch?: string;
    activeCategory?: string;
};

export default function NewsSearchBar({ initialSearch = '', activeCategory }: Props) {
    const [search, setSearch] = useState(initialSearch);

    const handleSearch: FormEventHandler = (e) => {
        e.preventDefault();
        const query: Record<string, string> = {};
        if (search.trim()) query.search = search.trim();
        if (activeCategory) query.category = activeCategory;

        router.get('/berita', query, { preserveState: true });
    };

    const handleClear = () => {
        setSearch('');
        const query: Record<string, string> = {};
        if (activeCategory) query.category = activeCategory;

        router.get('/berita', query, { preserveState: true });
    };

    return (
        <form onSubmit={handleSearch} className="relative flex items-center gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                    type="text"
                    placeholder="Cari berita, informasi, atau kegiatan desa..."
                    className="pl-11 pr-10  bg-white border-slate-200 focus-visible:ring-amber-700 h-12 text-sm shadow-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600  hover:bg-slate-100 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
            <Button
                type="submit"
                className=" h-12 px-6 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-sm shadow-sm transition-all"
            >
                Cari
            </Button>
        </form>
    );
}
