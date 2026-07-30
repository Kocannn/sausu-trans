import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { FormEventHandler, useState, ChangeEvent } from 'react';

export default function Create() {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        abbreviation: '',
        description: '',
        leader_name: '',
        logo: null as File | null,
    });

    const handleLogoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('logo', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/village-institutions', {
            onSuccess: () => toast.success('Lembaga desa berhasil ditambahkan.'),
        });
    };

    return (
        <>
            <Head title="Tambah Lembaga Desa Baru - Desa Sausu Trans" />

            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full bg-white text-slate-900">
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <Link href="/admin/village-institutions" className="text-xs text-amber-700 hover:underline flex items-center gap-1 mb-2 font-medium">
                                <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Daftar Lembaga
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-serif text-slate-900">
                                Tambah Lembaga Desa
                            </h1>
                            <p className="mt-2 text-slate-600">
                                Daftarkan lembaga kemasyarakatan atau BUMDes baru.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/admin/village-institutions"
                                className="px-4 py-2.5 border border-slate-300 text-slate-900 font-medium text-sm hover:bg-slate-50 transition-colors"
                            >
                                Batal
                            </Link>
                            <Button
                                onClick={submit}
                                disabled={processing}
                                className="bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm rounded-none transition-colors"
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" /> Simpan Data
                            </Button>
                        </div>
                    </div>
                </div>

                <form onSubmit={submit} className="border border-slate-200 p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-semibold text-slate-900">Nama Lembaga</Label>
                            <Input
                                id="name"
                                placeholder="Contoh: Badan Permusyawaratan Desa"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                className="h-11 border-slate-300 focus-visible:ring-amber-700 font-serif text-base"
                            />
                            {errors.name && <p className="text-rose-600 text-xs mt-1">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="abbreviation" className="text-sm font-semibold text-slate-900">Singkatan (Opsional)</Label>
                            <Input
                                id="abbreviation"
                                placeholder="Contoh: BPD"
                                value={data.abbreviation}
                                onChange={e => setData('abbreviation', e.target.value)}
                                className="h-11 border-slate-300 focus-visible:ring-amber-700 text-sm"
                            />
                            {errors.abbreviation && <p className="text-rose-600 text-xs mt-1">{errors.abbreviation}</p>}
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="leader_name" className="text-sm font-semibold text-slate-900">Nama Ketua/Pimpinan</Label>
                        <Input
                            id="leader_name"
                            placeholder="Contoh: Bapak Budi Santoso"
                            value={data.leader_name}
                            onChange={e => setData('leader_name', e.target.value)}
                            className="h-11 border-slate-300 focus-visible:ring-amber-700 text-sm"
                        />
                        {errors.leader_name && <p className="text-rose-600 text-xs mt-1">{errors.leader_name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-semibold text-slate-900">Deskripsi Singkat</Label>
                        <Textarea
                            id="description"
                            placeholder="Penjelasan singkat mengenai lembaga ini..."
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className="border-slate-300 focus-visible:ring-amber-700 min-h-[100px]"
                        />
                        {errors.description && <p className="text-rose-600 text-xs mt-1">{errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start pt-4 border-t border-slate-200">
                        <div className="space-y-2">
                            <Label htmlFor="logo" className="text-sm font-semibold text-slate-900">Logo Lembaga (Opsional)</Label>
                            <Input
                                id="logo"
                                type="file"
                                accept="image/*"
                                onChange={handleLogoChange}
                                className="h-10 border-slate-300 cursor-pointer text-xs"
                            />
                            {errors.logo && <p className="text-rose-600 text-xs mt-1">{errors.logo}</p>}
                        </div>

                        <div>
                            <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2 block">Pratinjau Logo</Label>
                            {previewImage ? (
                                <img src={previewImage} alt="Preview" className="h-32 w-32 object-contain border border-slate-300 shadow-sm p-2" />
                            ) : (
                                <div className="h-32 w-32 bg-slate-50 border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 text-xs text-center p-2">
                                    <ImageIcon className="h-6 w-6 opacity-40 mb-1" />
                                    <span>Belum ada logo</span>
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
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Simpan Data
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
