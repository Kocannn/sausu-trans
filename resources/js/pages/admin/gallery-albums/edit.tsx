import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Edit({ album }: any) {
    const { data, setData, put, processing } = useForm({
        name: album.name, description: album.description || ''
    });
    return (
        <>
            <Head title="Edit Album" />
            <div className="p-4"><div className="bg-card p-6 rounded-xl border">
                <form onSubmit={e => { e.preventDefault(); put(`/admin/gallery-albums/${album.id}`); }} className="space-y-4">
                    <div><Label>Nama Album</Label><Input value={data.name} onChange={e => setData('name', e.target.value)} /></div>
                    <div><Label>Deskripsi (Opsional)</Label><Textarea value={data.description} onChange={e => setData('description', e.target.value)} /></div>
                    <Button type="submit" disabled={processing}>Simpan Perubahan</Button>
                </form>
            </div></div>
        </>
    );
}
