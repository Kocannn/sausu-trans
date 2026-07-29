import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Newspaper, ExternalLink, Clock, Tag, User, Search, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

type NewsItem = {
    id: number;
    title: string;
    slug: string;
    category?: { name: string };
    status: string;
    published_at: string | null;
    created_at: string;
    user?: { name: string };
};

type Props = {
    news: NewsItem[];
};

export default function Index({ news }: Props) {
    const { delete: destroy } = useForm();
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
            destroy(`/admin/news/${id}`, {
                onSuccess: () => toast.success('Berita berhasil dihapus.'),
            });
        }
    };

    const filteredNews = news.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const publishedCount = news.filter(n => n.status === 'published').length;
    const draftCount = news.filter(n => n.status === 'draft').length;

    return (
        <>
            <Head title="Kelola Berita & Artikel - Desa Sausu Trans" />

            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full bg-white text-slate-900">
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">Manajemen Publikasi</span>
                            <h1 className="mt-2 text-4xl md:text-5xl font-serif text-slate-900">
                                Berita & Artikel Desa
                            </h1>
                            <p className="mt-3 text-lg text-slate-600 max-w-2xl">
                                Kelola pengumuman publik, berita pembangunan, dan artikel kegiatan kemasyarakatan Desa Sausu Trans.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/admin/news/create"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Tulis Berita Baru</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Key Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-5 border border-slate-200 bg-white">
                        <div className="flex items-center justify-between mb-2">
                            <Newspaper className="h-5 w-5 text-amber-700" />
                            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Total Artikel</span>
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-slate-900">{news.length}</h3>
                    </div>

                    <div className="p-5 border border-slate-200 bg-white">
                        <div className="flex items-center justify-between mb-2">
                            <Clock className="h-5 w-5 text-amber-700" />
                            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Dipublikasikan</span>
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-amber-700">{publishedCount}</h3>
                    </div>

                    <div className="p-5 border border-slate-200 bg-white">
                        <div className="flex items-center justify-between mb-2">
                            <Tag className="h-5 w-5 text-slate-400" />
                            <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Draf Simpanan</span>
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-slate-700">{draftCount}</h3>
                    </div>
                </div>

                {/* Data Table Section */}
                <div className="border border-slate-200 p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari judul berita atau kategori..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-amber-700"
                            />
                        </div>

                        <span className="text-xs text-slate-500 font-medium">
                            Menampilkan {filteredNews.length} dari {news.length} artikel
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-slate-50 text-slate-600 border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-3.5 font-semibold">Judul Artikel</th>
                                    <th className="px-4 py-3.5 font-semibold">Kategori</th>
                                    <th className="px-4 py-3.5 font-semibold">Status</th>
                                    <th className="px-4 py-3.5 font-semibold">Penulis</th>
                                    <th className="px-4 py-3.5 font-semibold text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredNews.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                            <Newspaper className="h-10 w-10 mx-auto text-amber-700/30 mb-2" />
                                            <p className="font-serif font-bold text-slate-900 text-base">Tidak ada data berita</p>
                                            <p className="text-xs mt-1 text-slate-500">Gunakan kata kunci lain atau klik "Tulis Berita Baru".</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredNews.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-4">
                                                <div className="font-medium text-slate-900 line-clamp-2">
                                                    {item.title}
                                                </div>
                                                <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                                    <Clock className="h-3 w-3 text-amber-700" />
                                                    <span>
                                                        {new Date(item.published_at || item.created_at).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                {item.category ? (
                                                    <span className="inline-block text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-700">
                                                        {item.category.name}
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-slate-400 italic">- Umum -</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4">
                                                {item.status === 'published' ? (
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-amber-700" />
                                                        Dipublikasikan
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                                        <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                                                        Draf
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-xs text-slate-600">
                                                <span className="flex items-center gap-1 font-medium text-slate-900">
                                                    <User className="h-3.5 w-3.5 text-amber-700" />
                                                    {item.user?.name || 'Admin'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="flex justify-end items-center gap-2">
                                                    <a
                                                        href={`/berita/${item.slug}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2 border border-slate-200 text-slate-600 hover:border-amber-700 hover:text-amber-700 transition-colors"
                                                        title="Lihat di Website"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                    <Link
                                                        href={`/admin/news/${item.id}/edit`}
                                                        className="p-2 border border-slate-200 text-slate-600 hover:border-amber-700 hover:text-amber-700 transition-colors"
                                                        title="Edit Berita"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-2 border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                                                        title="Hapus Berita"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
