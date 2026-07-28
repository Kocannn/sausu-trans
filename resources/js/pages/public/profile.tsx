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
    officials: Official[];
};

export default function Profile({ profile, officials }: Props) {
    return (
        <PublicLayout>
            <Head title="Profil Desa" />

            {/* Page Header */}
            <div className="bg-slate-900 text-white py-16 md:py-24 border-b border-emerald-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Profil Desa</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Mengenal lebih dekat sejarah, visi, misi, dan struktur pemerintahan Desa {profile?.name || 'Sausu Trans'}.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Sejarah & Visi Misi */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Sejarah */}
                        <section className="bg-white dark:bg-zinc-950 rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 dark:border-zinc-800">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <div className="h-10 w-3 rounded-full bg-emerald-500"></div>
                                Sejarah Desa
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                                {profile?.history ? (
                                    <>{profile.history}</>
                                ) : (
                                    <p>Belum ada informasi sejarah desa yang ditambahkan.</p>
                                )}
                            </div>
                        </section>


                        {/* Visi */}
                        <section className="bg-white dark:bg-zinc-950 rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 dark:border-zinc-800">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <div className="h-10 w-3 rounded-full bg-teal-500"></div>
                                Visi
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                                {profile?.vision ? (
                                    <>{profile.vision}</>
                                ) : (
                                    <p>Belum ada informasi visi desa yang ditambahkan.</p>
                                )}
                            </div>
                        </section>

                        {/* Misi */}
                        <section className="bg-white dark:bg-zinc-950 rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 dark:border-zinc-800">
                            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <div className="h-10 w-3 rounded-full bg-indigo-500"></div>
                                Misi
                            </h2>
                            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                                {profile?.mission ? (
                                    <>{profile.mission}</>
                                ) : (
                                    <p>Belum ada informasi misi desa yang ditambahkan.</p>
                                )}
                            </div>
                        </section>

                        {/* Timeline Kepemimpinan */}
                        {profile?.leadership_timeline && profile.leadership_timeline.length > 0 && (
                            <section className="bg-white dark:bg-zinc-950 rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 dark:border-zinc-800">
                                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                    <div className="h-10 w-3 rounded-full bg-amber-500"></div>
                                    Kepemimpinan Kepala Desa
                                </h2>

                                <div className="relative border-l-2 border-emerald-500/30 ml-4 pl-8 py-2 space-y-8">
                                    {profile.leadership_timeline.map((leader: any, idx: number) => (
                                        <div key={idx} className="relative">
                                            <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-white dark:border-zinc-950 bg-emerald-500"></div>
                                            <h4 className="text-xl font-bold text-slate-900 dark:text-white">{leader.name}</h4>
                                            <p className="text-emerald-600 dark:text-emerald-400 font-medium mt-1">{leader.period}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Side Info / Aparatur */}
                    <div className="space-y-12">
                        {/* Data Statistik Penduduk */}
                        {profile?.demographics && !Array.isArray(profile.demographics) && (
                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                    <div className="h-8 w-2 rounded-full bg-indigo-500"></div>
                                    Statistik Desa
                                </h2>
                                <div className="space-y-6">
                                    {/* Kependudukan & Demografi */}
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Kependudukan</h3>
                                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 overflow-hidden">
                                            <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">Total Penduduk</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.demographics.population?.total || 0} Jiwa</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">Kepala Keluarga (KK)</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.demographics.population?.kk || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Cakupan Wilayah */}
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Teritorial</h3>
                                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 overflow-hidden">
                                            <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">Luas Wilayah</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.demographics.territorial?.area || 0} Ha</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">Jumlah Dusun</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.demographics.territorial?.dusun || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">Jumlah RW</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.demographics.territorial?.rw || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">Jumlah RT</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.demographics.territorial?.rt || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Pendidikan */}
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Prasarana Pendidikan</h3>
                                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 overflow-hidden">
                                            <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">Gedung TK/PAUD</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.demographics.education?.tk || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">Gedung SD/MI</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.demographics.education?.sd || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">Gedung SMP/MTs</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.demographics.education?.smp || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">Gedung SMA/SMK</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.demographics.education?.sma || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">Unit TPA/TPQ</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.demographics.education?.tpa || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Kesehatan & Fasilitas */}
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Kesehatan & Fasilitas Publik</h3>
                                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-slate-100 dark:border-zinc-800 overflow-hidden">
                                            <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">Posyandu</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.demographics.facilities?.posyandu || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">Polindes</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.demographics.facilities?.polindes || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">Tempat Ibadah</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.demographics.facilities?.worship || 0}</span>
                                            </div>
                                            <div className="flex justify-between items-center p-4 hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">Lapangan Olahraga</span>
                                                <span className="font-bold text-emerald-600 dark:text-emerald-400">{profile.demographics.facilities?.sports || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <div className="h-8 w-2 rounded-full bg-blue-500"></div>
                                Aparatur Desa
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                                {officials.length > 0 ? officials.map(official => (
                                    <div key={official.id} className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-100 dark:border-zinc-800 flex items-center gap-4 hover:border-emerald-500 transition-colors">
                                        <div className="h-16 w-16 rounded-xl bg-slate-100 dark:bg-zinc-800 overflow-hidden shrink-0">
                                            {official.photo ? (
                                                <img src={`/storage/${official.photo}`} alt={official.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-slate-400">
                                                    <User className="h-8 w-8" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">{official.name}</h4>
                                            <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">{official.position}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center text-slate-500 py-8 bg-slate-50 dark:bg-zinc-900 rounded-2xl">
                                        Belum ada data aparatur.
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
