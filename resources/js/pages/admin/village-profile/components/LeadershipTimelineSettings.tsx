import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash } from 'lucide-react';

type TimelineEntry = {
    name: string;
    period: string;
};

type Props = {
    data: any;
    setData: (key: string, value: any) => void;
};

export default function LeadershipTimelineSettings({ data, setData }: Props) {
    const addTimeline = () => {
        setData('leadership_timeline', [...data.leadership_timeline, { name: '', period: '' }]);
    };

    const removeTimeline = (index: number) => {
        const newTimeline = [...data.leadership_timeline];
        newTimeline.splice(index, 1);
        setData('leadership_timeline', newTimeline);
    };

    const updateTimeline = (index: number, field: keyof TimelineEntry, value: string) => {
        const newTimeline = [...data.leadership_timeline];
        newTimeline[index][field] = value;
        setData('leadership_timeline', newTimeline);
    };

    return (
        <div className="border border-slate-200 dark:border-zinc-800 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
                <Label className="text-base font-semibold">Timeline Kepemimpinan Kepala Desa</Label>
                <Button type="button" variant="outline" size="sm" onClick={addTimeline}>
                    <Plus className="mr-2 h-4 w-4" /> Tambah Periode
                </Button>
            </div>

            <div className="space-y-4">
                {data.leadership_timeline.map((item: TimelineEntry, index: number) => (
                    <div key={index} className="flex gap-4 items-start">
                        <div className="flex-1">
                            <Label className="text-xs">Nama Kepala Desa</Label>
                            <Input value={item.name} onChange={e => updateTimeline(index, 'name', e.target.value)} placeholder="Contoh: Bpk. Sugiono" />
                        </div>
                        <div className="flex-1">
                            <Label className="text-xs">Periode Jabatan</Label>
                            <Input value={item.period} onChange={e => updateTimeline(index, 'period', e.target.value)} placeholder="Contoh: 2010 - 2015" />
                        </div>
                        <div className="mt-6">
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeTimeline(index)}>
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
                {data.leadership_timeline.length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-4">Belum ada data timeline kepemimpinan.</p>
                )}
            </div>
        </div>
    );
}
