import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FormEventHandler, useState } from 'react';
import { Info, BarChart2, FileText, Users, CheckCircle2 } from 'lucide-react';
import GeneralSettings from './components/GeneralSettings';
import StatisticsSettings from './components/StatisticsSettings';
import HistoryVisionMissionSettings from './components/HistoryVisionMissionSettings';
import LeadershipTimelineSettings from './components/LeadershipTimelineSettings';

export type TimelineEntry = {
    name: string;
    period?: string;
};

export type VillageStats = {
    territorial: { area: string; dusun: string };
    education: { tk: string; sd: string; smp: string; sma: string; tpa: string };
    facilities: { posyandu: string; polindes: string; worship: string; sports: string };
    population: { total: string; kk: string };
};

type Props = {
    profile: {
        id?: number;
        name: string;
        history: string;
        vision: string;
        mission: string;
        email: string;
        phone: string;
        address: string;
        map_embed: string;
        leadership_timeline?: TimelineEntry[];
        population?: string;
        area_size?: string;
        established_year?: string;
        demographics?: VillageStats | any;
    };
};

export default function Edit({ profile }: Props) {
    const [activeTab, setActiveTab] = useState('umum');

    const tabs = [
        { id: 'umum', label: 'Informasi Umum', icon: Info },
        { id: 'statistik', label: 'Statistik & Demografi', icon: BarChart2 },
        { id: 'profil', label: 'Sejarah & Visi Misi', icon: FileText },
        { id: 'aparatur', label: 'Riwayat Kepemimpinan', icon: Users },
    ];

    const defaultStats: VillageStats = {
        territorial: { area: '', dusun: '' },
        education: { tk: '', sd: '', smp: '', sma: '', tpa: '' },
        facilities: { posyandu: '', polindes: '', worship: '', sports: '' },
        population: { total: '', kk: '' }
    };

    const { data, setData, post, processing, errors } = useForm({
        _method: 'put',
        name: profile?.name || 'Desa Sausu Trans',
        logo: null as File | null,
        history: profile?.history || '',
        vision: profile?.vision || '',
        mission: profile?.mission || '',
        email: profile?.email || '',
        phone: profile?.phone || '',
        address: profile?.address || '',
        map_embed: profile?.map_embed || '',
        leadership_timeline: profile?.leadership_timeline || [] as TimelineEntry[],
        population: profile?.population || '',
        area_size: profile?.area_size || '',
        established_year: profile?.established_year || '',
        demographics: (profile?.demographics && !Array.isArray(profile.demographics))
            ? profile.demographics as VillageStats
            : defaultStats,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/village-profile', {
            onSuccess: () => toast.success('Profil desa berhasil diperbarui.'),
        });
    };

    return (
        <>
            <Head title="Pengaturan Profil Desa - Desa Sausu Trans" />

            <div className="flex flex-col gap-8 p-6 max-w-7xl mx-auto w-full bg-white text-slate-900">
                {/* Header Section */}
                <div className="border-b border-slate-200 pb-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">Identitas Resmi</span>
                            <h1 className="mt-2 text-4xl md:text-5xl font-serif text-slate-900">
                                Profil & Pengaturan Desa
                            </h1>
                            <p className="mt-3 text-lg text-slate-600 max-w-2xl">
                                Atur informasi umum, data statistik demografi, sejarah, visi misi, serta riwayat kepemimpinan Desa Sausu Trans.
                            </p>
                        </div>

                        <Button
                            onClick={submit}
                            disabled={processing}
                            className="bg-amber-700 hover:bg-amber-800 text-white font-medium text-sm rounded-none px-5 py-2.5 transition-colors shrink-0 self-start md:self-auto"
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Simpan Perubahan
                        </Button>
                    </div>
                </div>

                {/* Main Settings Section */}
                <div className="border border-slate-200 p-6 space-y-6">
                    {/* Navigation Tabs */}
                    <div className="flex space-x-2 border-b border-slate-200 pb-3 overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 ${isActive
                                            ? 'border-amber-700 text-amber-700 bg-amber-50/50'
                                            : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    <form onSubmit={submit} className="space-y-8">
                        {activeTab === 'umum' && (
                            <div>
                                <GeneralSettings data={data} setData={setData} errors={errors} />
                            </div>
                        )}

                        {activeTab === 'statistik' && (
                            <div className="space-y-8">
                                <StatisticsSettings data={data} setData={setData} errors={errors} />
                            </div>
                        )}

                        {activeTab === 'profil' && (
                            <div>
                                <HistoryVisionMissionSettings data={data} setData={setData} errors={errors} />
                            </div>
                        )}

                        {activeTab === 'aparatur' && (
                            <div>
                                <LeadershipTimelineSettings data={data} setData={setData} />
                            </div>
                        )}

                        <div className="pt-6 border-t border-slate-200 flex justify-end">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-amber-700 hover:bg-amber-800 text-white font-medium px-6 py-2.5 rounded-none transition-colors"
                            >
                                <CheckCircle2 className="mr-2 h-4 w-4" /> Simpan Perubahan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
