import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Edit({ user }: any) {
    const { data, setData, put, processing } = useForm({
        name: user.name, email: user.email, password: '', password_confirmation: '', roles: user.roles?.map((r: any) => r.name) || []
    });
    return (
        <>
            <Head title="Edit User" />
            <div className="p-4"><div className="bg-card p-6 rounded-xl border">
                <form onSubmit={e => { e.preventDefault(); put(`/admin/users/${user.id}`); }} className="space-y-4">
                    <div><Label>Nama</Label><Input value={data.name} onChange={e => setData('name', e.target.value)} /></div>
                    <div><Label>Email</Label><Input type="email" value={data.email} onChange={e => setData('email', e.target.value)} /></div>
                    <div><Label>Password (Kosongkan jika tidak ingin diubah)</Label><Input type="password" value={data.password} onChange={e => setData('password', e.target.value)} /></div>
                    <div><Label>Konfirmasi Password</Label><Input type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} /></div>
                    <Button type="submit" disabled={processing}>Simpan Perubahan</Button>
                </form>
            </div></div>
        </>
    );
}
