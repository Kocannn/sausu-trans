import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { FormEventHandler } from 'react';

type Props = {
    official: {
        id: number;
        name: string;
        position: string;
        photo: string | null;
        order: number;
    }
};

export default function Edit({ official }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        name: official.name,
        position: official.position,
        photo: null as File | null,
        order: official.order,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/officials/${official.id}`, {
            onSuccess: () => toast.success('Aparatur berhasil diperbarui.'),
        });
    };

    return (
        <>
            <Head title="Edit Aparatur" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="bg-card text-card-foreground shadow rounded-xl p-6 border border-sidebar-border/70 dark:border-sidebar-border max-w-2xl">
                    <h2 className="text-xl font-bold mb-4">Edit Aparatur Desa</h2>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <Label htmlFor="position">Jabatan</Label>
                            <Input id="position" value={data.position} onChange={e => setData('position', e.target.value)} />
                            {errors.position && <p className="text-destructive text-sm mt-1">{errors.position}</p>}
                        </div>
                        <div>
                            <Label htmlFor="photo">Ganti Foto (Biarkan kosong jika tidak ingin mengubah)</Label>
                            {official.photo && (
                                <div className="mb-2">
                                    <img src={`/storage/${official.photo}`} alt={official.name} className="h-20 w-20 rounded object-cover" />
                                </div>
                            )}
                            <Input id="photo" type="file" accept="image/*" onChange={e => setData('photo', e.target.files?.[0] || null)} />
                            {errors.photo && <p className="text-destructive text-sm mt-1">{errors.photo}</p>}
                        </div>
                        <div>
                            <Label htmlFor="order">Urutan Tampil (Opsional)</Label>
                            <Input id="order" type="number" value={data.order} onChange={e => setData('order', parseInt(e.target.value))} />
                            {errors.order && <p className="text-destructive text-sm mt-1">{errors.order}</p>}
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" type="button" asChild>
                                <Link href="/admin/officials">Batal</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>Simpan Perubahan</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
