import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, Users, Search } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

type OfficialItem = {
    id: number;
    name: string;
    position: string;
    photo?: string | null;
    order?: number;
    is_active?: boolean;
};

type Props = {
    officials: OfficialItem[];
};

export default function Index({ officials }: Props) {
    const { delete: destroy } = useForm();
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data aparatur desa ini?')) {
            destroy(`/admin/officials/${id}`, {
                onSuccess: () => toast.success('Aparatur desa berhasil dihapus.'),
            });
        }
    };

    const filteredOfficials = officials.filter(o =>
        o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.position.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Head title="Struktur Aparatur Desa - Desa Sausu Trans" />

            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full bg-white text-slate-900">
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">Pemerintahan Desa</span>
                            <h1 className="mt-2 text-4xl md:text-5xl font-serif text-slate-900">
                                Aparatur & Perangkat Desa
                            </h1>
                            <p className="mt-3 text-lg text-slate-600 max-w-2xl">
                                Kelola struktur organisasi, jabatan, serta jajaran aparatur Pemerintah Desa Sausu Trans.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/admin/officials/create"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Tambah Aparatur Baru</span>
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
                                placeholder="Cari nama aparatur atau jabatan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-amber-700"
                            />
                        </div>

                        <span className="text-xs text-slate-500 font-medium">
                            Total {officials.length} Perangkat Desa Terdaftar
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-slate-50 text-slate-600 border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-3.5 font-semibold">Foto</th>
                                    <th className="px-4 py-3.5 font-semibold">Nama Lengkap</th>
                                    <th className="px-4 py-3.5 font-semibold">Jabatan Structural</th>
                                    <th className="px-4 py-3.5 font-semibold">Urutan</th>
                                    <th className="px-4 py-3.5 font-semibold text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredOfficials.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                            <Users className="h-10 w-10 mx-auto text-amber-700/30 mb-2" />
                                            <p className="font-serif font-bold text-slate-900 text-base">Belum ada data aparatur desa</p>
                                            <p className="text-xs mt-1 text-slate-500">Klik tombol "Tambah Aparatur Baru" untuk mendaftarkan aparatur.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOfficials.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-3.5">
                                                {item.photo ? (
                                                    <img
                                                        src={`/storage/${item.photo}`}
                                                        alt={item.name}
                                                        className="h-12 w-12 rounded-full object-cover border border-slate-200"
                                                    />
                                                ) : (
                                                    <div className="h-12 w-12 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center border border-slate-300">
                                                        {item.name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-4 py-3.5 font-semibold text-slate-900">
                                                {item.name}
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <span className="inline-block text-xs font-medium px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200">
                                                    {item.position}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3.5 text-xs text-slate-600 font-mono">
                                                Urutan #{item.order || 0}
                                            </td>
                                            <td className="px-4 py-3.5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/admin/officials/${item.id}/edit`}
                                                        className="p-2 border border-slate-200 text-slate-600 hover:border-amber-700 hover:text-amber-700 transition-colors"
                                                        title="Edit Aparatur"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-2 border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                                                        title="Hapus Data"
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
