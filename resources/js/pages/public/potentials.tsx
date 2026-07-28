import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Store, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Potential = {
    id: number;
    name: string;
    category: string;
    description: string;
    image: string | null;
};

type Props = {
    profile: any;
    potentials: Potential[];
};

export default function Potentials({ profile, potentials }: Props) {
    const formatCategory = (cat: string) => {
        return cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const getCategoryColor = (cat: string) => {
        switch (cat) {
            case 'wisata': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'produk_umkm': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'pertanian': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'peternakan': return 'bg-orange-100 text-orange-800 border-orange-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    return (
        <PublicLayout>
            <Head title="Etalase Potensi" />
            
            {/* Page Header */}
            <div className="bg-slate-900 text-white py-16 md:py-24 border-b border-emerald-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Etalase Potensi Desa</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Mengenalkan berbagai potensi lokal unggulan dari Desa {profile?.name || 'Sausu Trans'}, mulai dari wisata hingga produk UMKM.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {potentials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {potentials.map(item => (
                            <div key={item.id} className="bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all group">
                                <div className="aspect-[4/3] bg-slate-100 dark:bg-zinc-900 relative overflow-hidden">
                                    {item.image ? (
                                        <img src={`/storage/${item.image}`} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Store className="h-16 w-16 text-slate-300" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="outline" className={`${getCategoryColor(item.category)} font-bold px-3 py-1`}>
                                            {formatCategory(item.category)}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 transition-colors">
                                        {item.name}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 line-clamp-3 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <MapPin className="h-4 w-4" />
                                        <span>Desa {profile?.name || 'Sausu Trans'}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200 dark:border-zinc-800">
                        <Store className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Belum Ada Data Potensi</h3>
                        <p className="text-slate-500">Data potensi desa belum ditambahkan oleh administrator.</p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
