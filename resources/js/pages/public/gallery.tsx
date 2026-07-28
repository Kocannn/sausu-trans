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
            <div className="bg-slate-900 text-white py-16 md:py-24 border-b border-emerald-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Galeri Media</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Dokumentasi foto dan video kegiatan dari Desa {profile?.name || 'Sausu Trans'}.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b border-slate-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2 text-slate-500 mr-4 font-medium">
                        <Filter className="h-5 w-5" /> Filter:
                    </div>
                    <Button 
                        asChild 
                        variant={currentAlbum === 'all' ? 'default' : 'outline'}
                        className={currentAlbum === 'all' ? 'bg-emerald-600 hover:bg-emerald-700 rounded-full' : 'rounded-full'}
                    >
                        <Link href="/galeri">Semua</Link>
                    </Button>
                    {albums.map(album => (
                        <Button 
                            key={album.id}
                            asChild 
                            variant={currentAlbum === album.id.toString() ? 'default' : 'outline'}
                            className={currentAlbum === album.id.toString() ? 'bg-emerald-600 hover:bg-emerald-700 rounded-full' : 'rounded-full'}
                        >
                            <Link href={`/galeri?album_id=${album.id}`}>{album.name}</Link>
                        </Button>
                    ))}
                </div>

                {/* Grid */}
                {media.data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {media.data.map(item => (
                            <div key={item.id} className="group relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-900 aspect-square shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
                                {item.type === 'photo' ? (
                                    <img src={`/storage/${item.file_path}`} alt={item.title || 'Foto Galeri'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full relative">
                                        <video src={`/storage/${item.file_path}`} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                                            <PlayCircle className="h-16 w-16 text-white opacity-80 group-hover:scale-110 transition-transform" />
                                        </div>
                                    </div>
                                )}
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-white font-medium text-sm truncate">{item.title || (item.type === 'photo' ? 'Foto' : 'Video')}</p>
                                    {item.album && (
                                        <p className="text-emerald-300 text-xs mt-1">{item.album.name}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200 dark:border-zinc-800">
                        <ImageIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Galeri Kosong</h3>
                        <p className="text-slate-500">Belum ada media yang ditambahkan pada album ini.</p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
