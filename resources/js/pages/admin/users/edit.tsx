import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle2, KeyRound } from 'lucide-react';
import { toast } from 'sonner';
import { FormEventHandler } from 'react';

type Props = {
    user: {
        id: number;
        name: string;
        email: string;
        roles?: { id: number; name: string }[];
    };
};

export default function Edit({ user }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        password_confirmation: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`, {
            onSuccess: () => toast.success('Pengguna berhasil diperbarui.'),
        });
    };

    return (
        <>
            <Head title={`Edit User: ${user.name}`} />

            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full bg-white text-slate-900">
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <Link href="/admin/users" className="text-xs text-amber-700 hover:underline flex items-center gap-1 mb-2 font-medium">
                                <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Manajemen User
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-serif text-slate-900">
                                Edit User Admin
                            </h1>
                            <p className="mt-2 text-slate-600">
                                Perbarui nama, email, atau ganti kata sandi akun pengguna.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/admin/users"
                                className="px-4 py-2.5 border border-slate-300 text-slate-900 font-medium text-sm hover:bg-slate-50 transition-colors"
                            >
                                Batal
                            </Link>
                            <Button
                                onClick={submit}
                                disabled={processing}
                                className="bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm rounded-none transition-colors"
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" /> Simpan Perubahan
                            </Button>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="border border-slate-200 p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-semibold text-slate-900">Nama Lengkap</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="h-11 border-slate-300 focus-visible:ring-amber-700 font-serif text-base"
                            />
                            {errors.name && <p className="text-rose-600 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold text-slate-900">Alamat Email (Login)</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                className="h-11 border-slate-300 focus-visible:ring-amber-700 text-sm"
                            />
                            {errors.email && <p className="text-rose-600 text-xs mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                        <div className="space-y-2 md:col-span-2">
                            <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                                <KeyRound className="h-3.5 w-3.5 text-amber-700" />
                                Kosongkan kolom kata sandi jika tidak ingin mengubah password akun ini.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-semibold text-slate-900">Kata Sandi Baru (Opsional)</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Kosongkan jika tidak diubah"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                className="h-11 border-slate-300 focus-visible:ring-amber-700 text-sm"
                            />
                            {errors.password && <p className="text-rose-600 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation" className="text-sm font-semibold text-slate-900">Konfirmasi Sandi Baru</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                placeholder="Ulangi password baru"
                                value={data.password_confirmation}
                                onChange={e => setData('password_confirmation', e.target.value)}
                                className="h-11 border-slate-300 focus-visible:ring-amber-700 text-sm"
                            />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 flex justify-end">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-amber-700 hover:bg-amber-800 text-white font-medium px-6 py-2.5 rounded-none transition-colors"
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
