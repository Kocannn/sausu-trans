import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Edit({ service }: any) {
    const { data, setData, put, processing } = useForm({
        name: service.name, description: service.description, requirements: service.requirements, operating_hours: service.operating_hours || '', is_active: service.is_active
    });
    return (
        <>
            <Head title="Edit Layanan" />
            <div className="p-4"><div className="bg-card p-6 rounded-xl border">
                <form onSubmit={e => { e.preventDefault(); put(`/admin/public-services/${service.id}`); }} className="space-y-4">
                    <div><Label>Nama Layanan</Label><Input value={data.name} onChange={e => setData('name', e.target.value)} /></div>
                    <div><Label>Deskripsi</Label><Textarea value={data.description} onChange={e => setData('description', e.target.value)} /></div>
                    <div><Label>Persyaratan</Label><Textarea value={data.requirements} onChange={e => setData('requirements', e.target.value)} /></div>
                    <div><Label>Jam Operasional</Label><Input value={data.operating_hours} onChange={e => setData('operating_hours', e.target.value)} /></div>
                    <Button type="submit" disabled={processing}>Simpan Perubahan</Button>
                </form>
            </div></div>
        </>
    );
}
