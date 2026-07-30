import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { User, Users } from 'lucide-react';

type Official = {
    id: number;
    name: string;
    position: string;
    photo: string | null;
    order: number;
};

type Props = {
    profile: any;
    officials: Official[];
};

export default function Officials({ profile, officials }: Props) {
    return (
        <PublicLayout>
            <Head title="Aparatur Desa" />

            {/* Page Header */}
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
                    <div className="max-w-2xl">
                        <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">Pemerintahan</span>
                        <h1 className="mt-3 text-5xl lg:text-6xl font-serif text-slate-900 leading-tight">
                            Aparatur Desa
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                            Struktur organisasi dan jajaran aparatur pemerintah Desa {profile?.name || 'Sausu Trans'}.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="bg-slate-50 border-b border-slate-200 py-16">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    
                    <div className="bg-white p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-xl font-serif text-slate-900 mb-2 flex items-center gap-2">
                            <Users className="h-6 w-6 text-slate-400" />
                            Struktur Organisasi Pemerintahan Desa
                        </h3>
                        <div className="h-1 w-16 bg-amber-700 mt-4 mb-8"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {officials.length > 0 ? officials.map(official => (
                                <div key={official.id} className="bg-slate-50 border border-slate-200 flex flex-col items-center text-center p-6 hover:border-amber-700 hover:shadow-md transition-all">
                                    <div className="h-32 w-32 bg-white rounded-full shrink-0 border-4 border-white shadow-sm overflow-hidden mb-4">
                                        {official.photo ? (
                                            <img src={`/storage/${official.photo}`} alt={official.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-slate-300 bg-slate-100">
                                                <User className="h-12 w-12" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-lg mb-1">{official.name}</h4>
                                        <p className="text-sm text-amber-700 font-medium">{official.position}</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-span-full text-center text-sm text-slate-500 py-12 border border-slate-200 bg-slate-50">
                                    Belum ada data aparatur desa.
                                </div>
                            )}
                        </div>
                    </div>
                    
                </div>
            </section>
        </PublicLayout>
    );
}
