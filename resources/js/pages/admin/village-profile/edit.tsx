import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { FormEventHandler, useState } from 'react';
import { Info, BarChart2, FileText, Users } from 'lucide-react';
import GeneralSettings from './components/GeneralSettings';
import StatisticsSettings from './components/StatisticsSettings';
import HistoryVisionMissionSettings from './components/HistoryVisionMissionSettings';
import LeadershipTimelineSettings from './components/LeadershipTimelineSettings';

export type TimelineEntry = {
    name: string;
    period: string;
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
        { id: 'aparatur', label: 'Kepemimpinan', icon: Users },
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
            <Head title="Pengaturan Desa" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="bg-card text-card-foreground shadow rounded-xl p-6 border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Pengaturan Profil Desa</h2>
                    </div>

                    <div className="flex space-x-1 border-b border-slate-200 dark:border-zinc-800 mb-8 overflow-x-auto pb-px">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id
                                        ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-300'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    <form onSubmit={submit} className="space-y-10">
                        {activeTab === 'umum' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <GeneralSettings data={data} setData={setData} errors={errors} />
                            </div>
                        )}

                        {activeTab === 'statistik' && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <StatisticsSettings data={data} setData={setData} errors={errors} />
                            </div>
                        )}

                        {activeTab === 'profil' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <HistoryVisionMissionSettings data={data} setData={setData} errors={errors} />
                            </div>
                        )}

                        {activeTab === 'aparatur' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <LeadershipTimelineSettings data={data} setData={setData} />
                            </div>
                        )}

                        <div className="pt-6 border-t flex justify-end">
                            <Button type="submit" size="lg" disabled={processing} className="w-full sm:w-auto">
                                Simpan Perubahan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
