import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type NewsItem = {
    id: number;
    title: string;
    category: { name: string };
    status: string;
    published_at: string | null;
    user: { name: string };
};

type Props = {
    news: NewsItem[];
};

export default function Index({ news }: Props) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
            destroy(`/admin/news/${id}`, {
                onSuccess: () => toast.success('Berita berhasil dihapus.'),
            });
        }
    };

    return (
        <>
            <Head title="Berita & Artikel" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-between items-center bg-card text-card-foreground shadow rounded-xl p-4 border border-sidebar-border/70 dark:border-sidebar-border">
                    <h2 className="text-xl font-bold">Daftar Berita</h2>
                    <Button asChild>
                        <Link href="/admin/news/create">
                            <Plus className="mr-2 h-4 w-4" /> Tambah Berita
                        </Link>
                    </Button>
                </div>

                <div className="bg-card text-card-foreground shadow rounded-xl p-6 border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-muted text-muted-foreground">
                                <tr>
                                    <th className="px-6 py-3">Judul</th>
                                    <th className="px-6 py-3">Kategori</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Penulis</th>
                                    <th className="px-6 py-3 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {news.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-muted-foreground">Tidak ada data.</td>
                                    </tr>
                                ) : (
                                    news.map(item => (
                                        <tr key={item.id} className="border-b dark:border-sidebar-border last:border-0">
                                            <td className="px-6 py-4 font-medium">{item.title}</td>
                                            <td className="px-6 py-4">{item.category?.name}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-full text-xs ${item.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{item.user?.name}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="outline" size="icon" asChild>
                                                        <Link href={`/admin/news/${item.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
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
