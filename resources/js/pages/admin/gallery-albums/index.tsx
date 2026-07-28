import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash, Image as ImageIcon } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Index({ albums }: any) {
    const { delete: destroy } = useForm();
    return (
        <>
            <Head title="Galeri Album" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex justify-between items-center bg-card p-4 rounded-xl border">
                    <h2 className="text-xl font-bold">Album Galeri</h2>
                    <Button asChild><Link href="/admin/gallery-albums/create"><Plus className="mr-2 h-4 w-4" /> Tambah Album</Link></Button>
                </div>
                <div className="bg-card rounded-xl border p-4">
                    <Table>
                        <TableHeader>
                            <TableRow><TableHead>Nama Album</TableHead><TableHead>Aksi</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                            {albums.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Button asChild variant="secondary" size="sm" title="Kelola Foto">
                                            <Link href={`/admin/gallery-media?album_id=${item.id}`}>
                                                <ImageIcon className="h-4 w-4 mr-1" /> Foto
                                            </Link>
                                        </Button>
                                        <Button asChild variant="outline" size="sm"><Link href={`/admin/gallery-albums/${item.id}/edit`}><Edit className="h-4 w-4" /></Link></Button>
                                        <Button variant="destructive" size="sm" onClick={() => { if (confirm('Hapus?')) destroy(`/admin/gallery-albums/${item.id}`) }}><Trash className="h-4 w-4" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}
