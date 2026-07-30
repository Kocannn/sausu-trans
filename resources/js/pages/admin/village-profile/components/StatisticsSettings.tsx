import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Map, GraduationCap, HeartPulse, Users } from 'lucide-react';
import { VillageStats } from '../edit';

type Props = {
    data: any;
    setData: (key: string, value: any) => void;
    errors: Record<string, string>;
};

export default function StatisticsSettings({ data, setData }: Props) {

    const updateStat = (section: keyof VillageStats, field: string, value: string) => {
        const newDemographics = { ...data.demographics };
        if (!newDemographics[section]) newDemographics[section] = {};
        newDemographics[section][field] = value;
        setData('demographics', newDemographics);
    };

    const stats: VillageStats = data.demographics;

    return (
        <div className="space-y-8">
            {/* 1. CAKUPAN WILAYAH & TERITORIAL */}
            <div className="bg-slate-50 dark:bg-zinc-900/50 p-6 rounded-xl border border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-4">
                    <Map className="w-5 h-5 text-slate-500" />
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">1. Cakupan Wilayah & Teritorial</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <Label htmlFor="area">Luas Wilayah (Ha)</Label>
                        <Input type="number" id="area" value={stats?.territorial?.area || ''} onChange={e => updateStat('territorial', 'area', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="dusun">Jumlah Dusun</Label>
                        <Input type="number" id="dusun" value={stats?.territorial?.dusun || ''} onChange={e => updateStat('territorial', 'dusun', e.target.value)} />
                    </div>
                    {/* <div>
                        <Label htmlFor="rw">Jumlah RW</Label>
                        <Input type="number" id="rw" value={stats?.territorial?.rw || ''} onChange={e => updateStat('territorial', 'rw', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="rt">Jumlah RT</Label>
                        <Input type="number" id="rt" value={stats?.territorial?.rt || ''} onChange={e => updateStat('territorial', 'rt', e.target.value)} />
                    </div> */}
                </div>
            </div>

            {/* 2. PRASARANA PENDIDIKAN */}
            <div className="bg-slate-50 dark:bg-zinc-900/50 p-6 rounded-xl border border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-4">
                    <GraduationCap className="w-5 h-5 text-slate-500" />
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">2. Prasarana Pendidikan</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                        <Label htmlFor="tk">Gedung TK/PAUD</Label>
                        <Input type="number" id="tk" value={stats?.education?.tk || ''} onChange={e => updateStat('education', 'tk', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="sd">Gedung SD/MI</Label>
                        <Input type="number" id="sd" value={stats?.education?.sd || ''} onChange={e => updateStat('education', 'sd', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="smp">Gedung SMP/MTs</Label>
                        <Input type="number" id="smp" value={stats?.education?.smp || ''} onChange={e => updateStat('education', 'smp', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="sma">Gedung SMA/SMK/MAN</Label>
                        <Input type="number" id="sma" value={stats?.education?.sma || ''} onChange={e => updateStat('education', 'sma', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="tpa">Unit TPA/TPQ</Label>
                        <Input type="number" id="tpa" value={stats?.education?.tpa || ''} onChange={e => updateStat('education', 'tpa', e.target.value)} />
                    </div>
                </div>
            </div>

            {/* 3. FASILITAS KESEHATAN & PUBLIK */}
            <div className="bg-slate-50 dark:bg-zinc-900/50 p-6 rounded-xl border border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-4">
                    <HeartPulse className="w-5 h-5 text-slate-500" />
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">3. Fasilitas Kesehatan & Publik</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                        <Label htmlFor="posyandu">Posyandu</Label>
                        <Input type="number" id="posyandu" value={stats?.facilities?.posyandu || ''} onChange={e => updateStat('facilities', 'posyandu', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="polindes">Polindes</Label>
                        <Input type="number" id="polindes" value={stats?.facilities?.polindes || ''} onChange={e => updateStat('facilities', 'polindes', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="worship">Tempat Ibadah</Label>
                        <Input type="number" id="worship" value={stats?.facilities?.worship || ''} onChange={e => updateStat('facilities', 'worship', e.target.value)} />
                    </div>
                    <div>
                        <Label htmlFor="sports">Lapangan Olahraga</Label>
                        <Input type="number" id="sports" value={stats?.facilities?.sports || ''} onChange={e => updateStat('facilities', 'sports', e.target.value)} />
                    </div>
                </div>
            </div>

            {/* 4. KEPENDUDUKAN & DEMOGRAFI */}
            <div className="bg-slate-50 dark:bg-zinc-900/50 p-6 rounded-xl border border-slate-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-4">
                    <Users className="w-5 h-5 text-slate-500" />
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">4. Kependudukan & Demografi</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="total_pop">Total Jumlah Penduduk (Jiwa)</Label>
                        <Input type="number" id="total_pop" value={stats?.population?.total || ''} onChange={e => updateStat('population', 'total', e.target.value)} />
                        <p className="text-xs text-slate-500 mt-1">Contoh pengisian: 7859 (ditulis tanpa tanda titik).</p>
                    </div>
                    <div>
                        <Label htmlFor="kk">Total Kepala Keluarga (KK)</Label>
                        <Input type="number" id="kk" value={stats?.population?.kk || ''} onChange={e => updateStat('population', 'kk', e.target.value)} />
                        <p className="text-xs text-slate-500 mt-1">Contoh pengisian: 2565 (ditulis tanpa tanda titik).</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
