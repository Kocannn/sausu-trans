import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Plus, Trash, ArrowLeft, Image as ImageIcon, PlayCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useState, useRef } from 'react';
import { toast } from 'sonner';

export default function GalleryMediaIndex({ media, albums, selectedAlbum }: any) {
    const { data, setData, post, processing, progress, errors, reset } = useForm({
        gallery_album_id: selectedAlbum || '',
        files: [] as File[],
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!data.gallery_album_id) {
            toast.error('Silakan pilih album terlebih dahulu');
            return;
        }

        if (data.files.length === 0) {
            toast.error('Pilih minimal satu file');
            return;
        }

        post('/admin/gallery-media', {
            onSuccess: () => {
                toast.success('Media berhasil diunggah.');
                reset('files');
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus media ini?')) {
            destroy(`/admin/gallery-media/${id}`, {
                onSuccess: () => toast.success('Media berhasil dihapus.')
            });
        }
    };

    return (
        <>
            <Head title="Manajemen Galeri Media" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                
                {/* Upload Form */}
                <div className="bg-card text-card-foreground shadow rounded-xl p-6 border border-sidebar-border/70 dark:border-sidebar-border max-w-4xl">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Unggah Media Baru</h2>
                        <Button asChild variant="outline" size="sm">
                            <Link href="/admin/gallery-albums"><ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Album</Link>
                        </Button>
                    </div>
                    
                    <form onSubmit={submit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="gallery_album_id">Pilih Album</Label>
                                <select
                                    id="gallery_album_id"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.gallery_album_id}
                                    onChange={e => setData('gallery_album_id', e.target.value)}
                                >
                                    <option value="">-- Pilih Album --</option>
                                    {albums.map((a: any) => <option key={a.id} value={a.id}>{a.name}</option>)}
                                </select>
                                {errors.gallery_album_id && <p className="text-destructive text-sm mt-1">{errors.gallery_album_id}</p>}
                            </div>
                            <div>
                                <Label htmlFor="files">Pilih File (Foto / Video)</Label>
                                <Input 
                                    id="files" 
                                    type="file" 
                                    multiple 
                                    accept="image/*,video/mp4" 
                                    ref={fileInputRef}
                                    onChange={e => setData('files', Array.from(e.target.files || []))} 
                                />
                                {errors.files && <p className="text-destructive text-sm mt-1">{errors.files}</p>}
                                <p className="text-muted-foreground text-xs mt-1">Bisa pilih lebih dari satu file sekaligus (Maks 20MB/file).</p>
                            </div>
                        </div>
                        
                        {progress && (
                            <div className="w-full bg-secondary rounded-full h-2.5 mt-2">
                                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${progress.percentage}%` }}></div>
                            </div>
                        )}

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}><Plus className="mr-2 h-4 w-4" /> Unggah Media</Button>
                        </div>
                    </form>
                </div>

                {/* Media Grid */}
                <div className="bg-card text-card-foreground shadow rounded-xl p-6 border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">Daftar Media</h2>
                        {selectedAlbum && (
                            <p className="text-muted-foreground text-sm">Menampilkan media dari album yang dipilih.</p>
                        )}
                    </div>
                    
                    {media.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {media.map((item: any) => (
                                <div key={item.id} className="relative group rounded-lg overflow-hidden border bg-slate-100 dark:bg-zinc-900 aspect-square">
                                    {item.type === 'photo' ? (
                                        <img src={`/storage/${item.file_path}`} alt={item.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center relative bg-black/80">
                                            <video src={`/storage/${item.file_path}`} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                                            <PlayCircle className="h-12 w-12 text-white/80 z-10" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-4 text-center">
                                        <span className="text-white text-xs truncate w-full">{item.title}</span>
                                        <span className="text-emerald-400 text-xs truncate w-full">{item.album?.name}</span>
                                        <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)} className="mt-2">
                                            <Trash className="h-4 w-4 mr-1" /> Hapus
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                            <ImageIcon className="mx-auto h-12 w-12 mb-4 opacity-50" />
                            <p>Belum ada media. Unggah foto atau video di form atas.</p>
                        </div>
                    )}
                </div>
                
            </div>
        </>
    );
}
