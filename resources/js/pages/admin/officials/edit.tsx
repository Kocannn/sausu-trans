import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { FormEventHandler, useState, ChangeEvent } from 'react';

type Props = {
    official: {
        id: number;
        name: string;
        position: string;
        order?: number;
        photo?: string | null;
    };
};

export default function Edit({ official }: Props) {
    const initialPreview = official.photo ? `/storage/${official.photo}` : null;
    const [previewImage, setPreviewImage] = useState<string | null>(initialPreview);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        name: official.name || '',
        position: official.position || '',
        order: String(official.order ?? 0),
        photo: null as File | null,
    });

    const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('photo', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/officials/${official.id}`, {
            onSuccess: () => toast.success('Data aparatur desa berhasil diperbarui.'),
        });
    };

    return (
        <>
            <Head title={`Edit Aparatur: ${official.name}`} />

            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full bg-white text-slate-900">
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <Link href="/admin/officials" className="text-xs text-amber-700 hover:underline flex items-center gap-1 mb-2 font-medium">
                                <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Daftar Aparatur
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-serif text-slate-900">
                                Edit Aparatur Desa
                            </h1>
                            <p className="mt-2 text-slate-600">
                                Perbarui nama, jabatan, urutan, atau foto profil aparatur desa.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/admin/officials"
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
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-slate-900">Nama Lengkap & Gelar</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="h-11 border-slate-300 focus-visible:ring-amber-700 font-serif text-base"
                        />
                        {errors.name && <p className="text-rose-600 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="position" className="text-sm font-semibold text-slate-900">Jabatan Struktural</Label>
                            <Input
                                id="position"
                                value={data.position}
                                onChange={e => setData('position', e.target.value)}
                                className="h-11 border-slate-300 focus-visible:ring-amber-700 text-sm"
                            />
                            {errors.position && <p className="text-rose-600 text-xs mt-1">{errors.position}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order" className="text-sm font-semibold text-slate-900">Urutan Tampil (Posisi)</Label>
                            <Input
                                id="order"
                                type="number"
                                value={data.order}
                                onChange={e => setData('order', e.target.value)}
                                className="h-11 border-slate-300 focus-visible:ring-amber-700 text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start pt-4 border-t border-slate-200">
                        <div className="space-y-2">
                            <Label htmlFor="photo" className="text-sm font-semibold text-slate-900">Ganti Foto Resmi (Opsional)</Label>
                            <Input
                                id="photo"
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="h-10 border-slate-300 cursor-pointer text-xs"
                            />
                            {errors.photo && <p className="text-rose-600 text-xs mt-1">{errors.photo}</p>}
                        </div>

                        <div>
                            <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2 block">Foto Profil Terpasang</Label>
                            {previewImage ? (
                                <img src={previewImage} alt="Preview" className="h-32 w-32 object-cover border border-slate-300 shadow-sm" />
                            ) : (
                                <div className="h-32 w-32 bg-slate-50 border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 text-xs text-center p-2">
                                    <ImageIcon className="h-6 w-6 opacity-40 mb-1" />
                                    <span>Belum ada foto</span>
                                </div>
                            )}
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
