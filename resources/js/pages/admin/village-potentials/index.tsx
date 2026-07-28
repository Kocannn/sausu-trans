import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Index({ potentials }: any) {
    const { delete: destroy } = useForm();
    return (
        <>
            <Head title="Etalase Potensi" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex justify-between items-center bg-card p-4 rounded-xl border">
                    <h2 className="text-xl font-bold">Etalase Potensi</h2>
                    <Button asChild><Link href="/admin/village-potentials/create"><Plus className="mr-2 h-4 w-4" /> Tambah Potensi</Link></Button>
                </div>
                <div className="bg-card rounded-xl border p-4">
                    <Table>
                        <TableHeader>
                            <TableRow><TableHead>Judul</TableHead><TableHead>Kategori</TableHead><TableHead>Aksi</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                            {potentials.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Button asChild variant="outline" size="sm"><Link href={`/admin/village-potentials/${item.id}/edit`}><Edit className="h-4 w-4" /></Link></Button>
                                        <Button variant="destructive" size="sm" onClick={() => { if (confirm('Hapus?')) destroy(`/admin/village-potentials/${item.id}`) }}><Trash className="h-4 w-4" /></Button>
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
