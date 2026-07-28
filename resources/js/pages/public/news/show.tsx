import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type NewsItem = {
    id: number;
    title: string;
    slug: string;
    content: string;
    thumbnail: string | null;
    published_at: string;
    category: { name: string };
    user: { name: string };
};

type Props = {
    profile: any;
    newsItem: NewsItem;
    relatedNews: NewsItem[];
};

export default function NewsShow({ profile, newsItem, relatedNews }: Props) {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        toast.success('Tautan berhasil disalin!');
    };

    return (
        <PublicLayout>
            <Head title={newsItem.title} />
            
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
                {/* Back button */}
                <div className="mb-8">
                    <Link href="/berita" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Indeks Berita
                    </Link>
                </div>

                {/* Article Header */}
                <header className="mb-10 text-center">
                    {newsItem.category && (
                        <div className="mb-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                                {newsItem.category.name}
                            </span>
                        </div>
                    )}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                        {newsItem.title}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(newsItem.published_at).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Ditulis oleh <span className="font-semibold text-slate-700 dark:text-slate-300">{newsItem.user?.name || 'Admin'}</span></span>
                        </div>
                    </div>
                </header>

                {/* Thumbnail */}
                {newsItem.thumbnail && (
                    <figure className="mb-12 rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-zinc-800">
                        <img src={`/storage/${newsItem.thumbnail}`} alt={newsItem.title} className="w-full h-auto object-cover max-h-[500px]" />
                    </figure>
                )}

                {/* Content */}
                <article className="prose prose-lg dark:prose-invert prose-emerald max-w-none mb-16 font-sans">
                    <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
                </article>

                {/* Share & Actions */}
                <div className="border-t border-slate-200 dark:border-zinc-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 mb-16">
                    <div className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                        <Share2 className="h-5 w-5" /> Bagikan berita ini:
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="rounded-full" asChild>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" title="Bagikan ke Facebook">
                                <Facebook className="h-4 w-4" />
                            </a>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full" asChild>
                            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(newsItem.title)}`} target="_blank" rel="noopener noreferrer" title="Bagikan ke Twitter">
                                <Twitter className="h-4 w-4" />
                            </a>
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full" onClick={copyLink} title="Salin Tautan">
                            <LinkIcon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Related News */}
                {relatedNews.length > 0 && (
                    <div className="bg-slate-50 dark:bg-zinc-900/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-zinc-800">
                        <div className="max-w-4xl mx-auto">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Berita Terkait</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedNews.map(item => (
                                    <Link key={item.id} href={`/berita/${item.slug}`} className="group bg-white dark:bg-zinc-950 rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                                        <div className="aspect-video bg-slate-100 dark:bg-zinc-900 relative">
                                            {item.thumbnail && (
                                                <img src={`/storage/${item.thumbnail}`} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <div className="text-xs text-slate-500 mb-2">
                                                {new Date(item.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </div>
                                            <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 line-clamp-2">
                                                {item.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
