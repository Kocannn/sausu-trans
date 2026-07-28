import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Edit({ potential }: any) {
    const { data, setData, post, processing } = useForm({
        _method: 'put', 
        title: potential.name || '', 
        description: potential.description || '', 
        category: potential.category === 'produk' ? 'produk_umkm' : potential.category, 
        image: null
    });
    return (
        <>
            <Head title="Edit Potensi" />
            <div className="p-4"><div className="bg-card p-6 rounded-xl border">
                <form onSubmit={e => { e.preventDefault(); post(`/admin/village-potentials/${potential.id}`); }} className="space-y-4">
                    <div><Label>Judul</Label><Input value={data.title} onChange={e => setData('title', e.target.value)} /></div>
                    <div><Label>Kategori</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.category} onChange={e => setData('category', e.target.value)}>
                            <option value="wisata">Wisata</option><option value="produk_umkm">Produk UMKM</option>
                            <option value="pertanian">Pertanian</option><option value="peternakan">Peternakan</option>
                        </select>
                    </div>
                    <div><Label>Deskripsi</Label><Textarea value={data.description} onChange={e => setData('description', e.target.value)} /></div>
                    <div><Label>Gambar Baru (Kosongkan jika tidak ingin mengubah)</Label><Input type="file" onChange={e => setData('image', e.target.files[0] as any)} /></div>
                    <Button type="submit" disabled={processing}>Simpan Perubahan</Button>
                </form>
            </div></div>
        </>
    );
}
