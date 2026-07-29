import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Pencil, Trash2, UserCheck, ShieldCheck, Mail, Search } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

type UserItem = {
    id: number;
    name: string;
    email: string;
    roles?: { id: number; name: string }[];
    created_at?: string;
};

type Props = {
    users: UserItem[];
};

export default function Index({ users }: Props) {
    const { delete: destroy } = useForm();
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus akun pengguna ini?')) {
            destroy(`/admin/users/${id}`, {
                onSuccess: () => toast.success('Pengguna berhasil dihapus.'),
            });
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Head title="Manajemen Pengguna - Desa Sausu Trans" />

            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full bg-white text-slate-900">
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">Keamanan & Hak Akses</span>
                            <h1 className="mt-2 text-4xl md:text-5xl font-serif text-slate-900">
                                Manajemen Pengguna System
                            </h1>
                            <p className="mt-3 text-lg text-slate-600 max-w-2xl">
                                Kelola akun login administrator dan operator yang mengelola data portal desa.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/admin/users/create"
                                className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Tambah User Baru</span>
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
                                placeholder="Cari nama atau email pengguna..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-amber-700"
                            />
                        </div>

                        <span className="text-xs text-slate-500 font-medium">
                            Total {users.length} Akun Terdaftar
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-slate-50 text-slate-600 border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-3.5 font-semibold">Profil Pengguna</th>
                                    <th className="px-4 py-3.5 font-semibold">Alamat Email</th>
                                    <th className="px-4 py-3.5 font-semibold">Role</th>
                                    <th className="px-4 py-3.5 font-semibold text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                            <UserCheck className="h-10 w-10 mx-auto text-amber-700/30 mb-2" />
                                            <p className="font-serif font-bold text-slate-900 text-base">Tidak ada data pengguna</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map(item => (
                                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center border border-amber-300 shrink-0">
                                                        {item.name.substring(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-slate-900">{item.name}</div>
                                                        <div className="text-[11px] text-slate-500">ID: #{item.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-xs font-mono text-slate-700">
                                                <span className="inline-flex items-center gap-1.5">
                                                    <Mail className="h-3.5 w-3.5 text-amber-700" />
                                                    {item.email}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200">
                                                    <ShieldCheck className="h-3.5 w-3.5 text-amber-700" />
                                                    {item.roles && item.roles.length > 0 ? item.roles.map(r => r.name).join(', ') : 'Administrator'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/admin/users/${item.id}/edit`}
                                                        className="p-2 border border-slate-200 text-slate-600 hover:border-amber-700 hover:text-amber-700 transition-colors"
                                                        title="Edit User"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-2 border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                                                        title="Hapus User"
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
