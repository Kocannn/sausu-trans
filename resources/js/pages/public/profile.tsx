import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { User } from 'lucide-react';

type Official = {
    id: number;
    name: string;
    position: string;
    photo: string | null;
    order: number;
};

type Props = {
    profile: any;
};

export default function Profile({ profile }: Props) {
    return (
        <PublicLayout>
            <Head title="Profil Desa" />

            {/* Page Header */}
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
                    <div className="max-w-2xl">
                        <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">Profil Desa</span>
                        <h1 className="mt-3 text-5xl lg:text-6xl font-serif text-slate-900 leading-tight">
                            Mengenal Desa {profile?.name || 'Sausu Trans'}
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                            Sejarah, visi, misi, dan struktur pemerintahan Desa {profile?.name || 'Sausu Trans'}.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="bg-slate-50 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                        {/* Main Content: Sejarah, Visi, Misi */}
                        <div className="lg:col-span-2 space-y-16">

                            <div>
                                <h2 className="text-3xl font-serif text-slate-900 mb-2">Sejarah Desa</h2>
                                <div className="h-1 w-16 bg-amber-700 mt-4 mb-8"></div>
                                <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                                    {profile?.history ? profile.history : 'Belum ada informasi sejarah desa yang ditambahkan.'}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl font-serif text-slate-900 mb-2">Visi & Misi</h2>
                                <div className="h-1 w-16 bg-amber-700 mt-4 mb-8"></div>
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">Visi</h3>
                                        <div className="text-slate-600 italic leading-relaxed whitespace-pre-wrap border-l-4 border-amber-700 pl-4 py-1 bg-white p-4">
                                            {profile?.vision ? profile.vision : 'Belum ada informasi visi desa yang ditambahkan.'}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">Misi</h3>
                                        <div className="text-slate-600 leading-relaxed whitespace-pre-wrap bg-white p-6 border border-slate-200">
                                            {profile?.mission ? profile.mission : 'Belum ada informasi misi desa yang ditambahkan.'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {profile?.leadership_timeline && profile.leadership_timeline.length > 0 && (
                                <div>
                                    <h2 className="text-3xl font-serif text-slate-900 mb-2">Kepemimpinan</h2>
                                    <div className="h-1 w-16 bg-amber-700 mt-4 mb-8"></div>

                                    <div className="relative border-l border-slate-300 ml-3 pl-8 py-2 space-y-8">
                                        {profile.leadership_timeline.map((leader: any, idx: number) => (
                                            <div key={idx} className="relative">
                                                <div className="absolute -left-[37px] top-1.5 h-3 w-3 bg-white border-2 border-amber-700"></div>
                                                <h4 className="text-lg font-bold text-slate-900">{leader.name}</h4>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar: Statistics & Officials */}
                        <div className="space-y-12">

                            {/* Statistics */}
                            {profile?.demographics && !Array.isArray(profile.demographics) && (
                                <div>
                                    <h3 className="text-xl font-serif text-slate-900 mb-2">Statistik Desa</h3>
                                    <div className="h-1 w-12 bg-amber-700 mt-4 mb-6"></div>

                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Kependudukan</h4>
                                            <div className="bg-white border border-slate-200">
                                                <div className="flex justify-between p-4 border-b border-slate-100">
                                                    <span className="text-sm text-slate-600">Total Penduduk</span>
                                                    <span className="font-bold text-slate-900">{profile.demographics.population?.total || 0}</span>
                                                </div>
                                                <div className="flex justify-between p-4">
                                                    <span className="text-sm text-slate-600">Kepala Keluarga</span>
                                                    <span className="font-bold text-slate-900">{profile.demographics.population?.kk || 0}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Teritorial</h4>
                                            <div className="bg-white border border-slate-200">
                                                <div className="flex justify-between p-4 border-b border-slate-100">
                                                    <span className="text-sm text-slate-600">Luas Wilayah</span>
                                                    <span className="font-bold text-slate-900">{profile.demographics.territorial?.area || 0} Ha</span>
                                                </div>
                                                <div className="flex justify-between p-4 border-b border-slate-100">
                                                    <span className="text-sm text-slate-600">Dusun</span>
                                                    <span className="font-bold text-slate-900">{profile.demographics.territorial?.dusun || 0}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
