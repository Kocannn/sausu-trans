#!/bin/bash
mkdir -p resources/js/pages/admin/public-services
mkdir -p resources/js/pages/admin/village-potentials
mkdir -p resources/js/pages/admin/users
mkdir -p resources/js/pages/admin/gallery-albums

cat << 'INNER_EOF' > resources/js/pages/admin/public-services/index.tsx
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Index({ services }: any) {
    const { delete: destroy } = useForm();
    return (
        <AppLayout breadcrumbs={[{ title: 'Layanan Publik', href: '/admin/public-services' }]}>
            <Head title="Layanan Publik" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex justify-between items-center bg-card p-4 rounded-xl border">
                    <h2 className="text-xl font-bold">Daftar Layanan Publik</h2>
                    <Button asChild><Link href="/admin/public-services/create"><Plus className="mr-2 h-4 w-4" /> Tambah Layanan</Link></Button>
                </div>
                <div className="bg-card rounded-xl border p-4">
                    <Table>
                        <TableHeader>
                            <TableRow><TableHead>Nama Layanan</TableHead><TableHead>Status</TableHead><TableHead>Aksi</TableHead></TableRow>
                        </TableHeader>
                        <TableBody>
                            {services.map((item: any) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.is_active ? 'Aktif' : 'Non-aktif'}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Button asChild variant="outline" size="sm"><Link href={`/admin/public-services/${item.id}/edit`}><Edit className="h-4 w-4" /></Link></Button>
                                        <Button variant="destructive" size="sm" onClick={() => { if(confirm('Hapus?')) destroy(`/admin/public-services/${item.id}`) }}><Trash className="h-4 w-4" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
INNER_EOF

cat << 'INNER_EOF' > resources/js/pages/admin/public-services/create.tsx
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '', description: '', requirements: '', operating_hours: '', is_active: true
    });
    return (
        <AppLayout breadcrumbs={[{ title: 'Layanan Publik', href: '/admin/public-services' }, { title: 'Tambah', href: '/admin/public-services/create' }]}>
            <Head title="Tambah Layanan" />
            <div className="p-4"><div className="bg-card p-6 rounded-xl border">
                <form onSubmit={e => { e.preventDefault(); post('/admin/public-services'); }} className="space-y-4">
                    <div><Label>Nama Layanan</Label><Input value={data.name} onChange={e => setData('name', e.target.value)} /></div>
                    <div><Label>Deskripsi</Label><Textarea value={data.description} onChange={e => setData('description', e.target.value)} /></div>
                    <div><Label>Persyaratan</Label><Textarea value={data.requirements} onChange={e => setData('requirements', e.target.value)} /></div>
                    <div><Label>Jam Operasional</Label><Input value={data.operating_hours} onChange={e => setData('operating_hours', e.target.value)} /></div>
                    <Button type="submit" disabled={processing}>Simpan</Button>
                </form>
            </div></div>
        </AppLayout>
    );
}
INNER_EOF

cat << 'INNER_EOF' > resources/js/pages/admin/public-services/edit.tsx
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Edit({ service }: any) {
    const { data, setData, put, processing, errors } = useForm({
        name: service.name, description: service.description, requirements: service.requirements, operating_hours: service.operating_hours || '', is_active: service.is_active
    });
    return (
        <AppLayout breadcrumbs={[{ title: 'Layanan Publik', href: '/admin/public-services' }, { title: 'Edit', href: '#' }]}>
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
        </AppLayout>
    );
}
INNER_EOF

cat << 'INNER_EOF' > resources/js/pages/admin/village-potentials/index.tsx
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Index({ potentials }: any) {
    const { delete: destroy } = useForm();
    return (
        <AppLayout breadcrumbs={[{ title: 'Etalase Potensi', href: '/admin/village-potentials' }]}>
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
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.category}</TableCell>
                                    <TableCell className="space-x-2">
                                        <Button asChild variant="outline" size="sm"><Link href={`/admin/village-potentials/${item.id}/edit`}><Edit className="h-4 w-4" /></Link></Button>
                                        <Button variant="destructive" size="sm" onClick={() => { if(confirm('Hapus?')) destroy(`/admin/village-potentials/${item.id}`) }}><Trash className="h-4 w-4" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
INNER_EOF

cat << 'INNER_EOF' > resources/js/pages/admin/village-potentials/create.tsx
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Create() {
    const { data, setData, post, processing } = useForm({
        title: '', description: '', category: 'wisata', image: null
    });
    return (
        <AppLayout breadcrumbs={[{ title: 'Etalase Potensi', href: '/admin/village-potentials' }, { title: 'Tambah', href: '/admin/village-potentials/create' }]}>
            <Head title="Tambah Potensi" />
            <div className="p-4"><div className="bg-card p-6 rounded-xl border">
                <form onSubmit={e => { e.preventDefault(); post('/admin/village-potentials'); }} className="space-y-4">
                    <div><Label>Judul</Label><Input value={data.title} onChange={e => setData('title', e.target.value)} /></div>
                    <div><Label>Kategori</Label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.category} onChange={e => setData('category', e.target.value)}>
                            <option value="wisata">Wisata</option><option value="produk_umkm">Produk UMKM</option>
                            <option value="pertanian">Pertanian</option><option value="peternakan">Peternakan</option>
                        </select>
                    </div>
                    <div><Label>Deskripsi</Label><Textarea value={data.description} onChange={e => setData('description', e.target.value)} /></div>
                    <div><Label>Gambar (Opsional)</Label><Input type="file" onChange={e => setData('image', e.target.files[0] as any)} /></div>
                    <Button type="submit" disabled={processing}>Simpan</Button>
                </form>
            </div></div>
        </AppLayout>
    );
}
INNER_EOF

cat << 'INNER_EOF' > resources/js/pages/admin/village-potentials/edit.tsx
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Edit({ potential }: any) {
    const { data, setData, post, processing } = useForm({
        _method: 'put', title: potential.title, description: potential.description, category: potential.category, image: null
    });
    return (
        <AppLayout breadcrumbs={[{ title: 'Etalase Potensi', href: '/admin/village-potentials' }, { title: 'Edit', href: '#' }]}>
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
        </AppLayout>
    );
}
INNER_EOF

cat << 'INNER_EOF' > resources/js/pages/admin/users/index.tsx
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Index({ users }: any) {
    const { delete: destroy } = useForm();
    return (
        <AppLayout breadcrumbs={[{ title: 'Manajemen User', href: '/admin/users' }]}>
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
                                        <Button variant="destructive" size="sm" onClick={() => { if(confirm('Hapus?')) destroy(`/admin/users/${item.id}`) }}><Trash className="h-4 w-4" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
INNER_EOF

cat << 'INNER_EOF' > resources/js/pages/admin/users/create.tsx
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Create() {
    const { data, setData, post, processing } = useForm({
        name: '', email: '', password: '', password_confirmation: ''
    });
    return (
        <AppLayout breadcrumbs={[{ title: 'Manajemen User', href: '/admin/users' }, { title: 'Tambah', href: '/admin/users/create' }]}>
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
        </AppLayout>
    );
}
INNER_EOF

cat << 'INNER_EOF' > resources/js/pages/admin/users/edit.tsx
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Edit({ user_data }: any) {
    const { data, setData, put, processing } = useForm({
        name: user_data.name, email: user_data.email, password: '', password_confirmation: ''
    });
    return (
        <AppLayout breadcrumbs={[{ title: 'Manajemen User', href: '/admin/users' }, { title: 'Edit', href: '#' }]}>
            <Head title="Edit User" />
            <div className="p-4"><div className="bg-card p-6 rounded-xl border">
                <form onSubmit={e => { e.preventDefault(); put(`/admin/users/${user_data.id}`); }} className="space-y-4">
                    <div><Label>Nama</Label><Input value={data.name} onChange={e => setData('name', e.target.value)} /></div>
                    <div><Label>Email</Label><Input type="email" value={data.email} onChange={e => setData('email', e.target.value)} /></div>
                    <div><Label>Password (Kosongkan jika tidak ingin diubah)</Label><Input type="password" value={data.password} onChange={e => setData('password', e.target.value)} /></div>
                    <div><Label>Konfirmasi Password</Label><Input type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} /></div>
                    <Button type="submit" disabled={processing}>Simpan Perubahan</Button>
                </form>
            </div></div>
        </AppLayout>
    );
}
INNER_EOF

cat << 'INNER_EOF' > resources/js/pages/admin/gallery-albums/index.tsx
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Index({ albums }: any) {
    const { delete: destroy } = useForm();
    return (
        <AppLayout breadcrumbs={[{ title: 'Galeri Album', href: '/admin/gallery-albums' }]}>
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
                                        <Button asChild variant="outline" size="sm"><Link href={`/admin/gallery-albums/${item.id}/edit`}><Edit className="h-4 w-4" /></Link></Button>
                                        <Button variant="destructive" size="sm" onClick={() => { if(confirm('Hapus?')) destroy(`/admin/gallery-albums/${item.id}`) }}><Trash className="h-4 w-4" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
INNER_EOF

cat << 'INNER_EOF' > resources/js/pages/admin/gallery-albums/create.tsx
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Create() {
    const { data, setData, post, processing } = useForm({
        name: '', description: ''
    });
    return (
        <AppLayout breadcrumbs={[{ title: 'Galeri Album', href: '/admin/gallery-albums' }, { title: 'Tambah', href: '/admin/gallery-albums/create' }]}>
            <Head title="Tambah Album" />
            <div className="p-4"><div className="bg-card p-6 rounded-xl border">
                <form onSubmit={e => { e.preventDefault(); post('/admin/gallery-albums'); }} className="space-y-4">
                    <div><Label>Nama Album</Label><Input value={data.name} onChange={e => setData('name', e.target.value)} /></div>
                    <div><Label>Deskripsi (Opsional)</Label><Textarea value={data.description} onChange={e => setData('description', e.target.value)} /></div>
                    <Button type="submit" disabled={processing}>Simpan</Button>
                </form>
            </div></div>
        </AppLayout>
    );
}
INNER_EOF

cat << 'INNER_EOF' > resources/js/pages/admin/gallery-albums/edit.tsx
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Edit({ album }: any) {
    const { data, setData, put, processing } = useForm({
        name: album.name, description: album.description || ''
    });
    return (
        <AppLayout breadcrumbs={[{ title: 'Galeri Album', href: '/admin/gallery-albums' }, { title: 'Edit', href: '#' }]}>
            <Head title="Edit Album" />
            <div className="p-4"><div className="bg-card p-6 rounded-xl border">
                <form onSubmit={e => { e.preventDefault(); put(`/admin/gallery-albums/${album.id}`); }} className="space-y-4">
                    <div><Label>Nama Album</Label><Input value={data.name} onChange={e => setData('name', e.target.value)} /></div>
                    <div><Label>Deskripsi (Opsional)</Label><Textarea value={data.description} onChange={e => setData('description', e.target.value)} /></div>
                    <Button type="submit" disabled={processing}>Simpan Perubahan</Button>
                </form>
            </div></div>
        </AppLayout>
    );
}
INNER_EOF

