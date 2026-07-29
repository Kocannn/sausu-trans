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
    latitude: string | null;
    longitude: string | null;
    address: string | null;
};

type Props = {
    profile: any;
    potentials: Potential[];
};

import React, { useState, useEffect, lazy, Suspense } from 'react';

const PotentialsMap = lazy(() => import('@/components/PotentialsMap'));

export default function Potentials({ profile, potentials }: Props) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const formatCategory = (cat: string) => {
        return cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    // Filter potentials that have valid coordinates
    const hasMapData = potentials.some(p => p.latitude && p.longitude);

    return (
        <PublicLayout>
            <Head title="Etalase Potensi" />
            
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
                    <div className="max-w-2xl">
                        <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">Etalase</span>
                        <h1 className="mt-3 text-5xl lg:text-6xl font-serif text-slate-900 leading-tight">
                            Potensi Desa
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                            Mengenalkan berbagai potensi lokal unggulan dari Desa {profile?.name || 'Sausu Trans'}, mulai dari wisata hingga produk UMKM.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
                    {potentials.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {potentials.map(item => (
                                <div key={item.id} className="bg-white border border-slate-200 hover:border-amber-700 transition-colors group flex flex-col">
                                    <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden border-b border-slate-200">
                                        {item.image ? (
                                            <img src={`/storage/${item.image}`} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Store className="h-12 w-12 text-slate-300" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-amber-700 text-white text-xs font-bold uppercase tracking-wide px-3 py-1">
                                                {formatCategory(item.category)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold font-serif text-slate-900 mb-3 group-hover:text-amber-700 transition-colors">
                                            {item.name}
                                        </h3>
                                        <p className="text-slate-600 text-sm leading-relaxed mb-6 whitespace-pre-wrap flex-1">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wide pt-4 border-t border-slate-100">
                                            <MapPin className="h-4 w-4 text-amber-700 shrink-0" />
                                            <span className="line-clamp-1">{item.address || `Desa ${profile?.name || 'Sausu Trans'}`}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white border border-slate-200">
                            <Store className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Belum Ada Data</h3>
                            <p className="text-slate-500 text-sm">Data potensi desa belum ditambahkan.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Peta Potensi Desa Section */}
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
                    <div className="mb-8">
                        <h2 className="text-3xl font-serif text-slate-900 mb-2">Peta Potensi Desa</h2>
                        <p className="text-slate-600">Jelajahi lokasi potensi desa melalui peta interaktif.</p>
                    </div>
                    
                    <div className="h-[500px] w-full border border-slate-200 bg-slate-50 z-0 relative">
                        {isMounted && hasMapData ? (
                            <Suspense fallback={
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                    Memuat peta...
                                </div>
                            }>
                                <PotentialsMap potentials={potentials} formatCategory={formatCategory} />
                            </Suspense>
                        ) : isMounted && !hasMapData ? (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                Belum ada data lokasi pada potensi desa.
                            </div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                                Memuat peta...
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
