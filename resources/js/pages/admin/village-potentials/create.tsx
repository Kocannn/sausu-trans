import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, CheckCircle2, Image as ImageIcon, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { FormEventHandler, useState, ChangeEvent, lazy, Suspense, useEffect } from 'react';

import { convertToWebP } from '@/lib/image-utils';

const LocationPicker = lazy(() => import('@/components/LocationPicker'));

export default function Create() {
    const [isMounted, setIsMounted] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category: 'wisata',
        image: null as File | null,
        latitude: '',
        longitude: '',
        address: '',
    });

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const rawFile = e.target.files?.[0] || null;
        if (rawFile) {
            const webpFile = await convertToWebP(rawFile, { quality: 0.8, maxWidth: 1920 });
            setData('image', webpFile);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(webpFile);
        } else {
            setData('image', null);
            setPreviewImage(null);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/village-potentials', {
            onSuccess: () => toast.success('Potensi desa berhasil ditambahkan.'),
        });
    };

    return (
        <>
            <Head title="Tambah Potensi Desa Baru - Desa Sausu Trans" />

            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full bg-white text-slate-900">
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <Link href="/admin/village-potentials" className="text-xs text-amber-700 hover:underline flex items-center gap-1 mb-2 font-medium">
                                <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Etalase Potensi
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-serif text-slate-900">
                                Tambah Potensi Desa
                            </h1>
                            <p className="mt-2 text-slate-600">
                                Tampilkan komoditas lokal, tempat wisata, atau produk unggulan warga.
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
                                <CheckCircle2 className="mr-2 h-4 w-4" /> Simpan Potensi
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
                                placeholder="Contoh: Durian Musang King Sausu"
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
                            placeholder="Jelaskan mengenai keunggulan, lokasi, atau daya tarik dari potensi ini..."
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
                            <Label htmlFor="image" className="text-sm font-semibold text-slate-900">Foto / Gambar Sampul</Label>
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
                            <Label className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2 block">Pratinjau Foto Sampul</Label>
                            {previewImage ? (
                                <img src={previewImage} alt="Preview" className="aspect-video max-h-[500px] w-full object-cover border border-slate-300" />
                            ) : (
                                <div className="aspect-video max-h-[500px] w-full bg-slate-50 border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 text-sm text-center p-6">
                                    <ImageIcon className="h-12 w-12 opacity-40 mb-3" />
                                    <span>Belum ada foto dipilih</span>
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
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Simpan Potensi
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
