import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Folder, Image as ImageIcon, Video, Search, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

type AlbumItem = {
    id: number;
    name: string;
    description: string | null;
    slug: string;
    media_count?: number;
    created_at: string;
};

type Props = {
    albums: AlbumItem[];
};

export default function Index({ albums }: Props) {
    const { delete: destroy } = useForm();
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus album galeri ini beserta isinya?')) {
            destroy(`/admin/gallery-albums/${id}`, {
                onSuccess: () => toast.success('Album berhasil dihapus.'),
            });
        }
    };

    const filteredAlbums = albums.filter(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Head title="Album Galeri - Desa Sausu Trans" />

            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full bg-white text-slate-900">
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">Dokumentasi & Galeri</span>
                            <h1 className="mt-2 text-4xl md:text-5xl font-serif text-slate-900">
                                Album Galeri Desa
                            </h1>
                            <p className="mt-3 text-lg text-slate-600 max-w-2xl">
                                Kelola album foto dan video dokumentasi kegiatan kemasyarakatan serta pembangunan Desa Sausu Trans.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/admin/gallery-albums/create"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Buat Album Baru</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Filter and Search */}
                <div className="border border-slate-200 p-6 space-y-6">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari nama album..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-amber-700"
                            />
                        </div>

                        <span className="text-xs text-slate-500 font-medium">
                            Total {albums.length} Album Dokumentasi
                        </span>
                    </div>

                    {/* Album Grid */}
                    {filteredAlbums.length === 0 ? (
                        <div className="py-12 text-center text-slate-500">
                            <Folder className="h-10 w-10 mx-auto text-amber-700/30 mb-2" />
                            <p className="font-serif font-bold text-slate-900 text-base">Belum ada album galeri</p>
                            <p className="text-xs mt-1 text-slate-500">Klik "Buat Album Baru" untuk menambahkan album dokumentasi pertama.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredAlbums.map((album) => (
                                <div
                                    key={album.id}
                                    className="border border-slate-200 p-5 hover:border-amber-700 transition-colors flex flex-col justify-between group"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-700">
                                                <ImageIcon className="h-3.5 w-3.5 text-amber-700" />
                                                {album.media_count || 0} Media Terdaftar
                                            </span>
                                        </div>

                                        <h3 className="font-serif font-bold text-slate-900 text-xl group-hover:text-amber-700 transition-colors line-clamp-1">
                                            {album.name}
                                        </h3>

                                        <p className="text-sm text-slate-600 mt-2 line-clamp-2 min-h-[40px]">
                                            {album.description || 'Tidak ada deskripsi album.'}
                                        </p>
                                    </div>

                                    <div className="pt-4 mt-4 border-t border-slate-200 flex items-center justify-between gap-2">
                                        <Link
                                            href={`/admin/gallery-media?album_id=${album.id}`}
                                            className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 bg-amber-700 text-white hover:bg-amber-800 transition-colors"
                                        >
                                            <span>Kelola Isi Album</span>
                                            <ChevronRight className="h-3 w-3" />
                                        </Link>

                                        <div className="flex items-center gap-1">
                                            <Link
                                                href={`/admin/gallery-albums/${album.id}/edit`}
                                                className="p-1.5 border border-slate-200 text-slate-600 hover:border-amber-700 hover:text-amber-700 transition-colors"
                                                title="Edit Nama Album"
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(album.id)}
                                                className="p-1.5 border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                                                title="Hapus Album"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
