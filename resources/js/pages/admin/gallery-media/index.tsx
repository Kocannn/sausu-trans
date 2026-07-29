import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Trash2, ArrowLeft, Image as ImageIcon, Video, Folder, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { FormEventHandler, useState, ChangeEvent } from 'react';

type AlbumItem = {
    id: number;
    name: string;
};

type MediaItem = {
    id: number;
    title: string;
    file_path: string;
    type: 'photo' | 'video';
    gallery_album_id: number;
};

type Props = {
    albums: AlbumItem[];
    media: MediaItem[];
    selectedAlbumId?: number | string;
};

export default function Index({ albums, media, selectedAlbumId }: Props) {
    const activeAlbumId = selectedAlbumId ? String(selectedAlbumId) : (albums[0]?.id ? String(albums[0].id) : '');

    const { data, setData, post, processing, errors, delete: destroy } = useForm({
        gallery_album_id: activeAlbumId,
        title: '',
        file: null as File | null,
    });

    const [filePreview, setFilePreview] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0] || null;
        setData('file', selected);
        if (selected && selected.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => setFilePreview(reader.result as string);
            reader.readAsDataURL(selected);
        } else {
            setFilePreview(null);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!data.file) {
            toast.error('Silakan pilih berkas foto atau video terlebih dahulu.');
            return;
        }
        post('/admin/gallery-media', {
            onSuccess: () => {
                toast.success('Media berhasil diunggah ke galeri.');
                setData('title', '');
                setData('file', null);
                setFilePreview(null);
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus berkas media ini?')) {
            destroy(`/admin/gallery-media/${id}`, {
                onSuccess: () => toast.success('Media berhasil dihapus.'),
            });
        }
    };

    const filteredMedia = media.filter(
        m => !activeAlbumId || String(m.gallery_album_id) === String(activeAlbumId)
    );

    return (
        <>
            <Head title="Kelola Isi Media Galeri - Desa Sausu Trans" />

            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full bg-white text-slate-900">
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <Link href="/admin/gallery-albums" className="text-xs text-amber-700 hover:underline flex items-center gap-1 mb-2 font-medium">
                                <ArrowLeft className="h-3.5 w-3.5" /> Kembali ke Daftar Album
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-serif text-slate-900">
                                Upload & Kelola Media
                            </h1>
                            <p className="mt-2 text-slate-600 max-w-2xl">
                                Upload foto dan video kegiatan ke album galeri yang ditentukan.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Upload Form Column (4 cols) */}
                    <div className="lg:col-span-4 border border-slate-200 p-6 space-y-6 self-start">
                        <h2 className="font-serif font-bold text-slate-900 text-lg border-b border-slate-200 pb-3 flex items-center gap-2">
                            <Upload className="h-5 w-5 text-amber-700" />
                            Upload Media Baru
                        </h2>

                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="album_id" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Pilih Album Tujuan</Label>
                                <select
                                    id="album_id"
                                    className="w-full h-10 border border-slate-300 bg-white text-slate-900 px-3 py-2 text-sm focus:outline-none focus:border-amber-700"
                                    value={data.gallery_album_id}
                                    onChange={e => setData('gallery_album_id', e.target.value)}
                                >
                                    {albums.map(a => (
                                        <option key={a.id} value={a.id}>{a.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Judul / Keterangan Media (Opsional)</Label>
                                <Input
                                    id="title"
                                    placeholder="Contoh: Foto Peresmian Balai Desa"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="h-10 border-slate-300 focus-visible:ring-amber-700 text-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="file" className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Pilih Berkas (Foto/Video)</Label>
                                <Input
                                    id="file"
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleFileChange}
                                    className="h-10 border-slate-300 cursor-pointer text-xs"
                                />
                                {errors.file && <p className="text-rose-600 text-xs mt-1">{errors.file}</p>}
                            </div>

                            {filePreview && (
                                <div className="border border-slate-200 overflow-hidden">
                                    <img src={filePreview} alt="Preview Upload" className="w-full h-40 object-cover" />
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-medium py-2.5 rounded-none transition-colors"
                            >
                                <Upload className="mr-2 h-4 w-4" /> Unggah Sekarang
                            </Button>
                        </form>
                    </div>

                    {/* Media Display Grid Column (8 cols) */}
                    <div className="lg:col-span-8 border border-slate-200 p-6 space-y-6">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                            <div>
                                <h2 className="font-serif font-bold text-slate-900 text-xl">Daftar Berkas Media</h2>
                                <p className="text-xs text-slate-500 mt-0.5">Media yang ada pada album ini</p>
                            </div>

                            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 self-start sm:self-auto">
                                Total {filteredMedia.length} berkas
                            </span>
                        </div>

                        {filteredMedia.length === 0 ? (
                            <div className="py-16 text-center text-slate-500">
                                <Folder className="h-12 w-12 mx-auto text-amber-700/30 mb-2" />
                                <p className="font-serif font-bold text-slate-900 text-base">Belum ada media di album ini</p>
                                <p className="text-xs mt-1 text-slate-500">Gunakan form di samping kiri untuk mengunggah foto atau video.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {filteredMedia.map((item) => (
                                    <div
                                        key={item.id}
                                        className="border border-slate-200 overflow-hidden group relative bg-slate-50"
                                    >
                                        <div className="aspect-square overflow-hidden bg-slate-200 flex items-center justify-center">
                                            {item.type === 'video' ? (
                                                <div className="w-full h-full flex items-center justify-center bg-slate-900 text-white font-semibold text-xs">
                                                    <Video className="h-6 w-6 text-amber-500 mr-1" /> Video
                                                </div>
                                            ) : (
                                                <img
                                                    src={`/storage/${item.file_path}`}
                                                    alt={item.title || 'Foto Galeri'}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            )}
                                        </div>

                                        <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between gap-2">
                                            <span className="text-xs font-medium text-slate-900 truncate">
                                                {item.title || 'Tanpa Judul'}
                                            </span>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-1 border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                                                title="Hapus Media"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
