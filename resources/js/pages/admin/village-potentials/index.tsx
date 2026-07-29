import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Store, Search, Tag, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

type PotentialItem = {
    id: number;
    name?: string;
    title?: string;
    category: string;
    description?: string;
    image?: string | null;
};

type Props = {
    potentials: PotentialItem[];
};

export default function Index({ potentials }: Props) {
    const { delete: destroy } = useForm();
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus potensi desa ini?')) {
            destroy(`/admin/village-potentials/${id}`, {
                onSuccess: () => toast.success('Potensi desa berhasil dihapus.'),
            });
        }
    };

    const filteredPotentials = potentials.filter(item => {
        const titleText = item.name || item.title || '';
        return titleText.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const getCategoryLabel = (cat: string) => {
        switch (cat) {
            case 'wisata': return 'Wisata Alam & Budaya';
            case 'produk_umkm':
            case 'produk': return 'Produk UMKM';
            case 'pertanian': return 'Hasil Pertanian';
            case 'peternakan': return 'Peternakan';
            default: return cat;
        }
    };

    return (
        <>
            <Head title="Etalase Potensi Desa - Desa Sausu Trans" />

            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full bg-white text-slate-900">
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">Kekayaan & Komoditas</span>
                            <h1 className="mt-2 text-4xl md:text-5xl font-serif text-slate-900">
                                Etalase Potensi Desa
                            </h1>
                            <p className="mt-3 text-lg text-slate-600 max-w-2xl">
                                Kelola direktori produk UMKM unggulan, komoditas pertanian, dan objek wisata Desa Sausu Trans.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/admin/village-potentials/create"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Tambah Potensi Baru</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Data Table Section */}
                <div className="border border-slate-200 p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Cari potensi atau kategori..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-amber-700"
                            />
                        </div>

                        <span className="text-xs text-slate-500 font-medium">
                            Total {potentials.length} Potensi Terdaftar
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-slate-50 text-slate-600 border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-3.5 font-semibold">Gambar</th>
                                    <th className="px-4 py-3.5 font-semibold">Nama / Judul Potensi</th>
                                    <th className="px-4 py-3.5 font-semibold">Kategori</th>
                                    <th className="px-4 py-3.5 font-semibold text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredPotentials.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                            <Store className="h-10 w-10 mx-auto text-amber-700/30 mb-2" />
                                            <p className="font-serif font-bold text-slate-900 text-base">Belum ada potensi desa</p>
                                            <p className="text-xs mt-1 text-slate-500">Klik "Tambah Potensi Baru" untuk mendaftarkan potensi pertama.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPotentials.map(item => {
                                        const title = item.name || item.title || 'Potensi Desa';
                                        return (
                                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-4 py-3.5">
                                                    {item.image ? (
                                                        <img
                                                            src={`/storage/${item.image}`}
                                                            alt={title}
                                                            className="h-12 w-16 object-cover border border-slate-200"
                                                        />
                                                    ) : (
                                                        <div className="h-12 w-16 bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                                                            <ImageIcon className="h-4 w-4 opacity-40" />
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3.5 font-medium text-slate-900">
                                                    {title}
                                                    {item.description && (
                                                        <p className="text-xs font-normal text-slate-500 line-clamp-1 mt-0.5 max-w-md">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3.5">
                                                    <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200">
                                                        <Tag className="h-3 w-3 text-amber-700" />
                                                        {getCategoryLabel(item.category)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3.5 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link
                                                            href={`/admin/village-potentials/${item.id}/edit`}
                                                            className="p-2 border border-slate-200 text-slate-600 hover:border-amber-700 hover:text-amber-700 transition-colors"
                                                            title="Edit Potensi"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(item.id)}
                                                            className="p-2 border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                                                            title="Hapus Potensi"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
