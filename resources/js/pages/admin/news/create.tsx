import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import RichTextEditor from '@/components/RichTextEditor';
import { ArrowLeft, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { FormEventHandler, useState, ChangeEvent } from 'react';

type CategoryOption = {
    id: number;
    name: string;
};

type Props = {
    categories?: CategoryOption[];
};

export default function Create({ categories = [] }: Props) {
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        news_category_id: categories[0]?.id ? String(categories[0].id) : '',
        status: 'published',
        published_at: new Date().toISOString().split('T')[0],
        image: null as File | null,
    });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image', file);
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
        post('/admin/news', {
            onSuccess: () => toast.success('Berita berhasil dibuat.'),
        });
    };

    return (
        <>
            <Head title="Tulis Berita Baru - Desa Sausu Trans" />

            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full bg-white text-slate-900">
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <Link href="/admin/news" className="text-xs text-amber-700 hover:underline flex items-center gap-1 mb-2 font-medium">
                                <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Manajemen Berita
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-serif text-slate-900">
                                Tulis Berita Baru
                            </h1>
                            <p className="mt-2 text-slate-600 max-w-2xl">
                                Publikasikan artikel berita atau pengumuman resmi Desa Sausu Trans.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/admin/news"
                                className="px-4 py-2.5 border border-slate-300 text-slate-900 font-medium text-sm hover:bg-slate-50 transition-colors"
                            >
                                Batal
                            </Link>
                            <Button
                                onClick={submit}
                                disabled={processing}
                                className="bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm rounded-none transition-colors"
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" /> Simpan & Publikasikan
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Form Layout: 2 Columns */}
                <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Editor Column (8 cols) */}
                    <div className="lg:col-span-8 border border-slate-200 p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-semibold text-slate-900">Judul Berita</Label>
                            <Input
                                id="title"
                                placeholder="Masukkan judul berita artikel..."
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                className="h-12 border-slate-300 focus-visible:ring-amber-700 text-lg font-serif"
                            />
                            {errors.title && <p className="text-rose-600 text-xs mt-1">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content" className="text-sm font-semibold text-slate-900">Isi Berita / Artikel</Label>
                            <RichTextEditor
                                value={data.content}
                                onChange={content => setData('content', content)}
                                placeholder="Tuliskan isi berita secara lengkap di sini..."
                            />
                            {errors.content && <p className="text-rose-600 text-xs mt-1">{errors.content}</p>}
                        </div>
                    </div>

                    {/* Metadata Sidebar Column (4 cols) */}
                    <div className="lg:col-span-4 border border-slate-200 p-6 space-y-6 self-start">
                        <h2 className="font-serif font-bold text-slate-900 text-lg border-b border-slate-200 pb-3">
                            Pengaturan Publikasi
                        </h2>

                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Status</Label>
                            <select
                                id="status"
                                className="w-full h-10 border border-slate-300 bg-white text-slate-900 px-3 py-2 text-sm focus:outline-none focus:border-amber-700"
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                            >
                                <option value="published">Publikasikan Langsung</option>
                                <option value="draft">Simpan Sebagai Draf</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Kategori Berita</Label>
                            <select
                                id="category"
                                className="w-full h-10 border border-slate-300 bg-white text-slate-900 px-3 py-2 text-sm focus:outline-none focus:border-amber-700"
                                value={data.news_category_id}
                                onChange={e => setData('news_category_id', e.target.value)}
                            >
                                <option value="">- Pilih Kategori -</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="published_at" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Tanggal Terbit</Label>
                            <Input
                                id="published_at"
                                type="date"
                                value={data.published_at}
                                onChange={e => setData('published_at', e.target.value)}
                                className="h-10 border-slate-300 focus-visible:ring-amber-700 text-sm"
                            />
                        </div>

                        <div className="space-y-2 pt-4 border-t border-slate-200">
                            <Label htmlFor="image" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Gambar Sampul Utama</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="h-10 border-slate-300 cursor-pointer text-xs"
                            />
                            {previewImage ? (
                                <div className="mt-2 border border-slate-200 overflow-hidden">
                                    <img src={previewImage} alt="Preview" className="w-full h-40 object-cover" />
                                </div>
                            ) : (
                                <div className="mt-2 h-32 bg-slate-50 border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 text-xs">
                                    <ImageIcon className="h-6 w-6 opacity-40 mb-1" />
                                    <span>Belum ada gambar dipilih</span>
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-slate-200">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-medium py-2.5 rounded-none transition-colors"
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" /> Simpan Berita
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
