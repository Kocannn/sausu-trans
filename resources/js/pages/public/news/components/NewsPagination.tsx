import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationLink } from './NewsTypes';

type Props = {
    links: PaginationLink[];
};

export default function NewsPagination({ links }: Props) {
    if (links.length <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-2 mt-12">
            {links.map((link, i) => {
                const isPrevious = link.label.includes('Previous') || link.label.includes('&laquo;');
                const isNext = link.label.includes('Next') || link.label.includes('&raquo;');
                const cleanLabel = link.label.replace(/&laquo;/g, '').replace(/&raquo;/g, '').trim();

                if (link.url === null) {
                    return (
                        <div
                            key={i}
                            className="h-10 px-4 flex items-center justify-center text-xs font-medium text-slate-400 bg-slate-100 border border-slate-200  cursor-not-allowed"
                        >
                            {isPrevious ? <ChevronLeft className="h-4 w-4" /> : isNext ? <ChevronRight className="h-4 w-4" /> : cleanLabel}
                        </div>
                    );
                }

                return (
                    <Link
                        key={i}
                        href={link.url}
                        className={`h-10 px-4 flex items-center justify-center text-xs font-semibold  border transition-all shadow-sm ${link.active
                                ? 'bg-amber-700 text-white border-amber-700 shadow-amber-700/20'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-amber-700 hover:text-amber-700'
                            }`}
                    >
                        {isPrevious ? <ChevronLeft className="h-4 w-4" /> : isNext ? <ChevronRight className="h-4 w-4" /> : cleanLabel}
                    </Link>
                );
            })}
        </div>
    );
}
