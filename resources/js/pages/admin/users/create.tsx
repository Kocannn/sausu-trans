import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Create() {
    const { data, setData, post, processing } = useForm({
        name: '', email: '', password: '', password_confirmation: ''
    });
    return (
        <>
            <Head title="Tambah User" />
            <div className="p-4"><div className="bg-card p-6 rounded-xl border">
                <form onSubmit={e => { e.preventDefault(); post('/admin/users'); }} className="space-y-4">
                    <div><Label>Nama</Label><Input value={data.name} onChange={e => setData('name', e.target.value)} /></div>
                    <div><Label>Email</Label><Input type="email" value={data.email} onChange={e => setData('email', e.target.value)} /></div>
                    <div><Label>Password</Label><Input type="password" value={data.password} onChange={e => setData('password', e.target.value)} /></div>
                    <div><Label>Konfirmasi Password</Label><Input type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} /></div>
                    <Button type="submit" disabled={processing}>Simpan</Button>
                </form>
            </div></div>
        </>
    );
}
