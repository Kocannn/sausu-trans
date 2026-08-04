import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import {
    Users,
    Home as HomeIcon,
    MapPin,
    GraduationCap,
    HeartPulse,
    Building2,
    CheckCircle2,
    Award
} from 'lucide-react';

type Props = {
    profile: any;
};

export default function Profile({ profile }: Props) {
    const demographics = profile?.demographics && !Array.isArray(profile.demographics)
        ? profile.demographics
        : null;

    return (
        <PublicLayout>
            <Head title={`Profil & Demografi Desa - ${profile?.name || 'Sausu Trans'}`} />

            {/* Page Header */}
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
                    <div className="max-w-3xl">
                        <span className="text-xs font-bold text-amber-700 tracking-widest uppercase font-sans">Profil & Identitas Resmi</span>
                        <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-serif text-slate-900 leading-tight">
                            Mengenal Desa {profile?.name || 'Sausu Trans'}
                        </h1>
                        <p className="mt-4 text-lg text-slate-600 leading-relaxed font-sans max-w-2xl">
                            Informasi lengkap mengenai sejarah, visi-misi, riwayat kepemimpinan, serta statistik demografi & kependudukan Desa {profile?.name || 'Sausu Trans'}.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content: Sejarah, Visi, Misi & Kepemimpinan */}
            <section className="bg-slate-50 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
                    <div className="space-y-16">
                        {/* Sejarah Desa */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="h-6 w-1 bg-amber-700"></span>
                                <h2 className="text-3xl font-serif font-bold text-slate-900">Sejarah Desa</h2>
                            </div>
                            <div className="bg-white p-8 border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-wrap font-sans text-base">
                                {profile?.history ? profile.history : 'Belum ada informasi sejarah desa yang ditambahkan.'}
                            </div>
                        </div>

                        {/* Visi & Misi */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="h-6 w-1 bg-amber-700"></span>
                                <h2 className="text-3xl font-serif font-bold text-slate-900">Visi & Misi</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white p-8 border border-slate-200 flex flex-col">
                                    <h3 className="text-xl font-bold font-serif text-slate-900 mb-4 flex items-center gap-2">
                                        <Award className="h-5 w-5 text-amber-700" />
                                        Visi Desa
                                    </h3>
                                    <p className="text-slate-700 italic leading-relaxed whitespace-pre-wrap flex-1 border-l-2 border-amber-700 pl-4 py-1">
                                        {profile?.vision ? profile.vision : 'Belum ada informasi visi desa yang ditambahkan.'}
                                    </p>
                                </div>
                                <div className="bg-white p-8 border border-slate-200 flex flex-col">
                                    <h3 className="text-xl font-bold font-serif text-slate-900 mb-4 flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-amber-700" />
                                        Misi Desa
                                    </h3>
                                    <div className="text-slate-700 leading-relaxed whitespace-pre-wrap flex-1">
                                        {profile?.mission ? profile.mission : 'Belum ada informasi misi desa yang ditambahkan.'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Kepemimpinan */}
                        {profile?.leadership_timeline && profile.leadership_timeline.length > 0 && (
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="h-6 w-1 bg-amber-700"></span>
                                    <h2 className="text-3xl font-serif font-bold text-slate-900">Riwayat Kepemimpinan</h2>
                                </div>
                                <div className="bg-white p-8 border border-slate-200">
                                    <div className="relative border-l-2 border-amber-700/30 ml-4 pl-6 space-y-6">
                                        {profile.leadership_timeline.map((leader: any, idx: number) => (
                                            <div key={idx} className="relative">
                                                <div className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-amber-700 border-2 border-white ring-2 ring-amber-700/20"></div>
                                                <h4 className="text-lg font-bold text-slate-900 font-serif">{leader.name}</h4>
                                                {/* {leader.period && <p className="text-xs text-slate-500 mt-0.5 font-sans">Masa Jabatan: {leader.period}</p>}*/}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Demografi & Kependudukan Section */}
            <section className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="max-w-3xl mb-12">
                        <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Data Statistik Resmi</span>
                        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-2">
                            Demografi & Kependudukan Desa
                        </h2>
                        <p className="text-slate-600 mt-3 leading-relaxed">
                            Gambaran umum statistik kependudukan, luas wilayah teritorial, sarana pendidikan, serta fasilitas publik di Desa {profile?.name || 'Sausu Trans'}.
                        </p>
                        <div className="h-1 w-16 bg-amber-700 mt-4"></div>
                    </div>

                    {demographics ? (
                        <div className="space-y-12">
                            {/* Summary Stat Highlight Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {/* Total Penduduk */}
                                <div className="p-6 bg-slate-50 border border-slate-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Penduduk</span>
                                        <Users className="h-6 w-6 text-amber-700" />
                                    </div>
                                    <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                                        {demographics.population?.total || '0'}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">Jiwa Terdaftar</p>
                                </div>

                                {/* Kepala Keluarga */}
                                <div className="p-6 bg-slate-50 border border-slate-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Kepala Keluarga</span>
                                        <HomeIcon className="h-6 w-6 text-amber-700" />
                                    </div>
                                    <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                                        {demographics.population?.kk || '0'}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">Kepala Keluarga (KK)</p>
                                </div>

                                {/* Luas Wilayah */}
                                <div className="p-6 bg-slate-50 border border-slate-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Luas Wilayah</span>
                                        <MapPin className="h-6 w-6 text-amber-700" />
                                    </div>
                                    <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                                        {demographics.territorial?.area || '0'} <span className="text-lg font-normal text-slate-600">Ha</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">Hektar Wilayah Desa</p>
                                </div>

                                {/* Pembagian Dusun */}
                                <div className="p-6 bg-slate-50 border border-slate-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Wilayah Dusun</span>
                                        <Building2 className="h-6 w-6 text-amber-700" />
                                    </div>
                                    <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
                                        {demographics.territorial?.dusun || '0'}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-2">Wilayah Dusun Aktif</p>
                                </div>
                            </div>

                            {/* Detail Breakdown Tables Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* 1. Pembagian Wilayah Administrative */}
                                <div className="bg-white border border-slate-200 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
                                            <MapPin className="h-5 w-5 text-amber-700" />
                                            <h3 className="font-serif font-bold text-slate-900 text-lg">Administratif Wilayah</h3>
                                        </div>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between py-2 border-b border-slate-100">
                                                <span className="text-slate-600">Luas Total</span>
                                                <span className="font-bold text-slate-900">{demographics.territorial?.area || '0'} Ha</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-slate-100">
                                                <span className="text-slate-600">Jumlah Dusun</span>
                                                <span className="font-bold text-slate-900">{demographics.territorial?.dusun || '0'} Dusun</span>
                                            </div>
                                            {demographics.territorial?.rw && (
                                                <div className="flex justify-between py-2 border-b border-slate-100">
                                                    <span className="text-slate-600">Jumlah RW</span>
                                                    <span className="font-bold text-slate-900">{demographics.territorial.rw} RW</span>
                                                </div>
                                            )}
                                            {demographics.territorial?.rt && (
                                                <div className="flex justify-between py-2">
                                                    <span className="text-slate-600">Jumlah RT</span>
                                                    <span className="font-bold text-slate-900">{demographics.territorial.rt} RT</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Sarana Pendidikan */}
                                <div className="bg-white border border-slate-200 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
                                            <GraduationCap className="h-5 w-5 text-amber-700" />
                                            <h3 className="font-serif font-bold text-slate-900 text-lg">Fasilitas Pendidikan</h3>
                                        </div>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between py-2 border-b border-slate-100">
                                                <span className="text-slate-600">TK / PAUD</span>
                                                <span className="font-bold text-slate-900">{demographics.education?.tk || '0'} Unit</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-slate-100">
                                                <span className="text-slate-600">SD / MI</span>
                                                <span className="font-bold text-slate-900">{demographics.education?.sd || '0'} Unit</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-slate-100">
                                                <span className="text-slate-600">SMP / MTs</span>
                                                <span className="font-bold text-slate-900">{demographics.education?.smp || '0'} Unit</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-slate-100">
                                                <span className="text-slate-600">SMA / SMK</span>
                                                <span className="font-bold text-slate-900">{demographics.education?.sma || '0'} Unit</span>
                                            </div>
                                            {/*<div className="flex justify-between py-2">
                                                <span className="text-slate-600">TPA / TPQ</span>
                                                <span className="font-bold text-slate-900">{demographics.education?.tpa || '0'} Unit</span>
                                            </div>*/}
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Fasilitas Kesehatan & Umum */}
                                <div className="bg-white border border-slate-200 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
                                            <HeartPulse className="h-5 w-5 text-amber-700" />
                                            <h3 className="font-serif font-bold text-slate-900 text-lg">Kesehatan & Umum</h3>
                                        </div>
                                        <div className="space-y-3 text-sm">
                                            <div className="flex justify-between py-2 border-b border-slate-100">
                                                <span className="text-slate-600">Posyandu</span>
                                                <span className="font-bold text-slate-900">{demographics.facilities?.posyandu || '0'} Pos</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-slate-100">
                                                <span className="text-slate-600">Polindes / Puskesmas</span>
                                                <span className="font-bold text-slate-900">{demographics.facilities?.polindes || '0'} Unit</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b border-slate-100">
                                                <span className="text-slate-600">Tempat Ibadah</span>
                                                <span className="font-bold text-slate-900">{demographics.facilities?.worship || '0'} Lokasi</span>
                                            </div>
                                            <div className="flex justify-between py-2">
                                                <span className="text-slate-600">Sarana Olahraga</span>
                                                <span className="font-bold text-slate-900">{demographics.facilities?.sports || '0'} Lapangan</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="p-12 text-center bg-slate-50 border border-slate-200 text-slate-500">
                            <p className="text-base font-serif">Data statistik demografi sedang dalam proses pembaruan oleh pemerintah desa.</p>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
