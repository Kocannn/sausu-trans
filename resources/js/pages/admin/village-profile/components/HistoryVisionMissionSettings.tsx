import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Props = {
    data: any;
    setData: (key: string, value: any) => void;
    errors: Record<string, string>;
};

export default function HistoryVisionMissionSettings({ data, setData, errors }: Props) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Sejarah, Visi & Misi</h3>
            <div>
                <Label htmlFor="history">Sejarah Desa</Label>
                <Textarea id="history" className="h-32" value={data.history} onChange={e => setData('history', e.target.value)} />
                {errors.history && <p className="text-destructive text-sm mt-1">{errors.history}</p>}
            </div>
            <div>
                <Label htmlFor="vision">Visi</Label>
                <Textarea id="vision" className="h-24" value={data.vision} onChange={e => setData('vision', e.target.value)} />
                {errors.vision && <p className="text-destructive text-sm mt-1">{errors.vision}</p>}
            </div>
            <div>
                <Label htmlFor="mission">Misi</Label>
                <Textarea id="mission" className="h-32" value={data.mission} onChange={e => setData('mission', e.target.value)} />
                {errors.mission && <p className="text-destructive text-sm mt-1">{errors.mission}</p>}
            </div>
            <div>
                <Label htmlFor="map_embed">Google Maps Embed HTML</Label>
                <Textarea id="map_embed" value={data.map_embed} onChange={e => setData('map_embed', e.target.value)} />
                {errors.map_embed && <p className="text-destructive text-sm mt-1">{errors.map_embed}</p>}
            </div>
        </div>
    );
}
