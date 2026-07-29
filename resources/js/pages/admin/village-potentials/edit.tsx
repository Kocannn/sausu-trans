import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CheckCircle2, Image as ImageIcon, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { FormEventHandler, useState, ChangeEvent, lazy, Suspense, useEffect } from 'react';

const LocationPicker = lazy(() => import('@/components/LocationPicker'));

type Props = {
    potential: {
        id: number;
        name?: string;
        title?: string;
        description?: string;
        category: string;
        image?: string | null;
        latitude?: string | null;
        longitude?: string | null;
        address?: string | null;
    };
};

export default function Edit({ potential }: Props) {
    const [isMounted, setIsMounted] = useState(false);
    
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const initialTitle = potential.name || potential.title || '';
    const initialCategory = potential.category === 'produk' ? 'produk_umkm' : potential.category;
    const initialPreview = potential.image ? `/storage/${potential.image}` : null;

    const [previewImage, setPreviewImage] = useState<string | null>(initialPreview);

    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        title: initialTitle,
        description: potential.description || '',
        category: initialCategory || 'wisata',
        image: null as File | null,
        latitude: potential.latitude || '',
        longitude: potential.longitude || '',
        address: potential.address || '',
    });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/admin/village-potentials/${potential.id}`, {
            onSuccess: () => toast.success('Potensi desa berhasil diperbarui.'),
        });
    };

    return (
        <>
            <Head title={`Edit Potensi: ${initialTitle}`} />

            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full bg-white text-slate-900">
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <Link href="/admin/village-potentials" className="text-xs text-amber-700 hover:underline flex items-center gap-1 mb-2 font-medium">
                                <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Etalase Potensi
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-serif text-slate-900">
                                Edit Potensi Desa
                            </h1>
                            <p className="mt-2 text-slate-600">
                                Perbarui judul, kategori, deskripsi, atau foto potensi desa.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/admin/village-potentials"
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
                            <Label htmlFor="title" className="text-sm font-semibold text-slate-900">Nama / Judul Potensi</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="h-11 border-slate-300 focus-visible:ring-amber-700 font-serif text-base"
                            />
                            {errors.title && <p className="text-rose-600 text-xs mt-1">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm font-semibold text-slate-900">Kategori Potensi</Label>
                            <select
                                id="category"
                                className="w-full h-11 border border-slate-300 bg-white text-slate-900 px-3 py-2 text-sm focus:outline-none focus:border-amber-700"
                                value={data.category}
                                onChange={e => setData('category', e.target.value)}
                            >
                                <option value="wisata">Wisata Alam & Kebudayaan</option>
                                <option value="produk_umkm">Produk & Olahan UMKM</option>
                                <option value="pertanian">Pertanian & Perkebunan</option>
                                <option value="peternakan">Peternakan & Perikanan</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-sm font-semibold text-slate-900">Deskripsi & Keunggulan</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            className="min-h-[120px] border-slate-300 focus-visible:ring-amber-700 text-sm"
                        />
                        {errors.description && <p className="text-rose-600 text-xs mt-1">{errors.description}</p>}
                    </div>

                    {/* Location Information Section */}
                    <div className="pt-6 border-t border-slate-200">
                        <div className="mb-4">
                            <h3 className="text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-amber-700" />
                                Informasi Lokasi
                            </h3>
                            <p className="text-sm text-slate-600">Tentukan lokasi potensi ini pada peta untuk mempermudah pengunjung.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="address" className="text-sm font-semibold text-slate-900">Alamat Lengkap</Label>
                                    <Textarea
                                        id="address"
                                        placeholder="Contoh: Jl. Poros Sausu Trans, Dusun 2..."
                                        value={data.address}
                                        onChange={e => setData('address', e.target.value)}
                                        className="min-h-[80px] border-slate-300 focus-visible:ring-amber-700 text-sm"
                                    />
                                    {errors.address && <p className="text-rose-600 text-xs mt-1">{errors.address}</p>}
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="latitude" className="text-sm font-semibold text-slate-900">Latitude</Label>
                                        <Input
                                            id="latitude"
                                            placeholder="-0.9317"
                                            value={data.latitude}
                                            onChange={e => setData('latitude', e.target.value)}
                                            className="h-11 border-slate-300 font-mono text-sm focus-visible:ring-amber-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="longitude" className="text-sm font-semibold text-slate-900">Longitude</Label>
                                        <Input
                                            id="longitude"
                                            placeholder="120.2520"
                                            value={data.longitude}
                                            onChange={e => setData('longitude', e.target.value)}
                                            className="h-11 border-slate-300 font-mono text-sm focus-visible:ring-amber-700"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-slate-900 mb-1 block">Pilih Titik di Peta</Label>
                                {isMounted ? (
                                    <Suspense fallback={<div className="h-[300px] w-full border border-slate-300 flex items-center justify-center text-slate-400 bg-slate-50 text-sm">Memuat peta...</div>}>
                                        <LocationPicker 
                                            latitude={data.latitude}
                                            longitude={data.longitude}
                                            onChange={(lat: number, lng: number) => {
                                                setData('latitude', String(lat));
                                                setData('longitude', String(lng));
                                            }}
                                        />
                                    </Suspense>
                                ) : (
                                    <div className="h-[300px] w-full border border-slate-300 flex items-center justify-center text-slate-400 bg-slate-50 text-sm">
                                        Memuat peta...
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6 pt-6 border-t border-slate-200">
                        <div className="space-y-2">
                            <Label htmlFor="image" className="text-sm font-semibold text-slate-900">Ganti Gambar Sampul (Opsional)</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="h-10 border-slate-300 cursor-pointer text-xs w-full md:w-1/2"
                            />
                            {errors.image && <p className="text-rose-600 text-xs mt-1">{errors.image}</p>}
                        </div>

                        <div>
                            <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2 block">Gambar Sampul Terpasang</Label>
                            {previewImage ? (
                                <img src={previewImage} alt="Preview" className="aspect-video max-h-[500px] w-full object-cover border border-slate-300" />
                            ) : (
                                <div className="aspect-video max-h-[500px] w-full bg-slate-50 border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 text-sm text-center p-6">
                                    <ImageIcon className="h-12 w-12 opacity-40 mb-3" />
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
