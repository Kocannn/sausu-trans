import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Index({ users }: any) {
    const { delete: destroy } = useForm();
    return (
        <>
            <Head title="Manajemen User" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex justify-between items-center bg-card p-4 rounded-xl border">
                    <h2 className="text-xl font-bold">Daftar Pengguna</h2>
                    <Button asChild><Link href="/admin/users/create"><Plus className="mr-2 h-4 w-4" /> Tambah User</Link></Button>
                </div>
                <div className="bg-card rounded-xl border p-4">
                    <Table>
                        <TableHeader>
                            <TableRow><TableHead>Nama</TableHead><TableHead>Email</TableHead><TableHead>Aksi</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Button asChild variant="outline" size="sm"><Link href={`/admin/users/${item.id}/edit`}><Edit className="h-4 w-4" /></Link></Button>
                                        <Button variant="destructive" size="sm" onClick={() => { if (confirm('Hapus?')) destroy(`/admin/users/${item.id}`) }}><Trash className="h-4 w-4" /></Button>
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
