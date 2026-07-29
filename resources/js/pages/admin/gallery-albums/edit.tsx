import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { FormEventHandler } from 'react';

type Props = {
    album: {
        id: number;
        name: string;
        description: string | null;
    };
};

export default function Edit({ album }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: album.name || '',
        description: album.description || '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/gallery-albums/${album.id}`, {
            onSuccess: () => toast.success('Album berhasil diperbarui.'),
        });
    };

    return (
        <>
            <Head title={`Edit Album: ${album.name}`} />

            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full bg-white text-slate-900">
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <Link href="/admin/gallery-albums" className="text-xs text-amber-700 hover:underline flex items-center gap-1 mb-2 font-medium">
                                <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Daftar Album
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-serif text-slate-900">
                                Edit Album Galeri
                            </h1>
                            <p className="mt-2 text-slate-600">
                                Perbarui nama dan deskripsi album galeri desa.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/admin/gallery-albums"
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
                        <Label htmlFor="name" className="text-sm font-semibold text-slate-900">Nama Album</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            className="h-11 border-slate-300 focus-visible:ring-amber-700 text-base font-serif"
                        />
                        {errors.name && <p className="text-rose-600 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-semibold text-slate-900">Deskripsi Ringkas Album</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className="min-h-[120px] border-slate-300 focus-visible:ring-amber-700 text-sm"
                        />
                        {errors.description && <p className="text-rose-600 text-xs mt-1">{errors.description}</p>}
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
