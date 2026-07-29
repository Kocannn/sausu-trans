import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ImageIcon, PlayCircle, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Album = {
    id: number;
    name: string;
};

type MediaItem = {
    id: number;
    type: 'photo' | 'video';
    file_path: string;
    title: string | null;
    album: Album | null;
};

type Props = {
    profile: any;
    albums: Album[];
    media: {
        data: MediaItem[];
        links: any[];
    };
    currentAlbum: string;
};

export default function Gallery({ profile, albums, media, currentAlbum }: Props) {
    return (
        <PublicLayout>
            <Head title="Galeri Media" />
            
            {/* Page Header */}
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
                    <div className="max-w-2xl">
                        <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">Dokumentasi</span>
                        <h1 className="mt-3 text-5xl lg:text-6xl font-serif text-slate-900 leading-tight">
                            Galeri Desa
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                            Foto dan video kegiatan dari Desa {profile?.name || 'Sausu Trans'}.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-3 mb-12">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-900 uppercase tracking-wide mr-4">
                            <Filter className="h-4 w-4 text-amber-700" /> Filter
                        </div>
                        <Button 
                            asChild 
                            variant={currentAlbum === 'all' ? 'default' : 'outline'}
                            className={`rounded-none ${currentAlbum === 'all' ? 'bg-amber-700 hover:bg-amber-800 text-white border-transparent' : 'border-slate-300 hover:bg-white text-slate-700'}`}
                        >
                            <Link href="/galeri">Semua</Link>
                        </Button>
                        {albums.map(album => (
                            <Button 
                                key={album.id}
                                asChild 
                                variant={currentAlbum === album.id.toString() ? 'default' : 'outline'}
                                className={`rounded-none ${currentAlbum === album.id.toString() ? 'bg-amber-700 hover:bg-amber-800 text-white border-transparent' : 'border-slate-300 hover:bg-white text-slate-700'}`}
                            >
                                <Link href={`/galeri?album_id=${album.id}`}>{album.name}</Link>
                            </Button>
                        ))}
                    </div>

                    {/* Grid */}
                    {media.data.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                            {media.data.map(item => (
                                <div key={item.id} className="group relative bg-slate-200 aspect-square overflow-hidden">
                                    {item.type === 'photo' ? (
                                        <img src={`/storage/${item.file_path}`} alt={item.title || 'Foto Galeri'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full relative">
                                            <video src={`/storage/${item.file_path}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                                <PlayCircle className="h-12 w-12 text-white/90 group-hover:scale-110 transition-transform" />
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <p className="text-white font-medium text-sm truncate">{item.title || (item.type === 'photo' ? 'Foto' : 'Video')}</p>
                                        {item.album && (
                                            <p className="text-amber-500 text-xs mt-1 font-medium">{item.album.name}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white border border-slate-200">
                            <ImageIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Galeri Kosong</h3>
                            <p className="text-slate-500 text-sm">Belum ada media yang ditambahkan pada album ini.</p>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
