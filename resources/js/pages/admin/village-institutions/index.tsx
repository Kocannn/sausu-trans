import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Search, CheckCircle2, Shield, Image as ImageIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

type Institution = {
    id: number;
    name: string;
    abbreviation: string | null;
    description: string | null;
    leader_name: string | null;
    logo: string | null;
};

type Props = {
    institutions: Institution[];
};

export default function Index({ institutions }: Props) {
    const { delete: destroy } = useForm();
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus data lembaga desa ini?')) {
            destroy(`/admin/village-institutions/${id}`, {
                onSuccess: () => toast.success('Lembaga desa berhasil dihapus.'),
            });
        }
    };

    const filteredInstitutions = institutions.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (i.abbreviation && i.abbreviation.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (i.leader_name && i.leader_name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <>
            <Head title="Lembaga Desa - Desa Sausu Trans" />

            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-5 w-5 text-amber-700" />
                            <span className="text-sm font-medium text-amber-700 tracking-wide uppercase">Lembaga Kemasyarakatan</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-serif text-slate-900">
                            Kelola Lembaga Desa & BUMDes
                        </h1>
                        <p className="mt-2 text-slate-600">
                            Kelola profil lembaga kemasyarakatan, BUMDes, PKK, Karang Taruna, dan lembaga lainnya.
                        </p>
                    </div>
                    <Button asChild className="bg-amber-700 hover:bg-amber-800 text-white rounded-none">
                        <Link href="/admin/village-institutions/create" className="flex items-center">
                            <Plus className="mr-2 h-4 w-4" />
                            <span>Tambah Lembaga Baru</span>
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 border border-slate-200">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Cari nama lembaga atau ketua..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 h-10 border-slate-300 focus-visible:ring-amber-700 rounded-none w-full"
                        />
                    </div>
                </div>

                {/* Institution Grid */}
                <div className="bg-white border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-xs">
                                <tr>
                                    <th className="px-6 py-4">Lembaga / Singkatan</th>
                                    <th className="px-6 py-4">Ketua / Pimpinan</th>
                                    <th className="px-6 py-4 w-1/3">Deskripsi Singkat</th>
                                    <th className="px-6 py-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredInstitutions.length > 0 ? (
                                    filteredInstitutions.map((institution) => (
                                        <tr key={institution.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    {institution.logo ? (
                                                        <img src={`/storage/${institution.logo}`} alt={institution.name} className="h-12 w-12 object-contain border border-slate-200 p-1 bg-white" />
                                                    ) : (
                                                        <div className="h-12 w-12 bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                                                            <ImageIcon className="h-5 w-5" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-bold text-slate-900 text-base">{institution.name}</p>
                                                        {institution.abbreviation && (
                                                            <p className="text-amber-700 font-medium text-xs mt-0.5">{institution.abbreviation}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium text-slate-800">{institution.leader_name || '-'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">
                                                <p className="line-clamp-2">{institution.description || '-'}</p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button asChild variant="outline" size="sm" className="h-8 rounded-none border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900" title="Edit Lembaga">
                                                        <Link href={`/admin/village-institutions/${institution.id}/edit`}>
                                                            <Pencil className="h-3.5 w-3.5" />
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        className="h-8 rounded-none border-slate-300 text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200" 
                                                        title="Hapus Lembaga"
                                                        onClick={() => handleDelete(institution.id)}
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center justify-center text-slate-500">
                                                <Shield className="h-12 w-12 text-slate-300 mb-4" />
                                                <p className="font-serif font-bold text-slate-900 text-base">Belum ada data lembaga desa</p>
                                                <p className="text-xs mt-1 text-slate-500">Klik tombol "Tambah Lembaga Baru" untuk mendaftarkan lembaga.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
