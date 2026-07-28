import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type Official = {
    id: number;
    name: string;
    position: string;
    photo: string | null;
    order: number;
};

type Props = {
    officials: Official[];
};

export default function Index({ officials }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus aparatur ini?')) {
            destroy(`/admin/officials/${id}`, {
                onSuccess: () => toast.success('Aparatur berhasil dihapus.'),
            });
        }
    };

    return (
        <>
            <Head title="Aparatur Desa" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-between items-center bg-card text-card-foreground shadow rounded-xl p-4 border border-sidebar-border/70 dark:border-sidebar-border">
                    <h2 className="text-xl font-bold">Daftar Aparatur Desa</h2>
                    <Button asChild>
                        <Link href="/admin/officials/create">
                            <Plus className="mr-2 h-4 w-4" /> Tambah Aparatur
                        </Link>
                    </Button>
                </div>

                <div className="bg-card text-card-foreground shadow rounded-xl p-6 border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-muted text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-3">Foto</th>
                                    <th className="px-6 py-3">Nama</th>
                                    <th className="px-6 py-3">Jabatan</th>
                                    <th className="px-6 py-3">Urutan</th>
                                    <th className="px-6 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {officials.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-muted-foreground">Tidak ada data.</td>
                                    </tr>
                                ) : (
                                    officials.map(official => (
                                        <tr key={official.id} className="border-b dark:border-sidebar-border last:border-0">
                                            <td className="px-6 py-4">
                                                {official.photo ? (
                                                    <img src={`/storage/${official.photo}`} alt={official.name} className="h-10 w-10 rounded-full object-cover" />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                                        N/A
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 font-medium">{official.name}</td>
                                            <td className="px-6 py-4">{official.position}</td>
                                            <td className="px-6 py-4">{official.order}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="icon" asChild>
                                                        <Link href={`/admin/officials/${official.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="destructive" size="icon" onClick={() => handleDelete(official.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
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
