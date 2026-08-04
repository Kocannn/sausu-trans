import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { convertToWebP } from '@/lib/image-utils';

type Props = {
    data: any;
    setData: (key: string, value: any) => void;
    errors: Record<string, string>;
};

export default function GeneralSettings({ data, setData, errors }: Props) {
    const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawFile = e.target.files?.[0] || null;
        if (rawFile) {
            const webpFile = await convertToWebP(rawFile, { quality: 0.8, maxWidth: 1200 });
            setData('logo', webpFile);
        } else {
            setData('logo', null);
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Informasi Umum</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="name">Nama Desa</Label>
                    <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                    <Label htmlFor="logo">Logo Desa (Opsional)</Label>
                    <Input id="logo" type="file" accept="image/*" onChange={handleLogoChange} />
                    {errors.logo && <p className="text-destructive text-sm mt-1">{errors.logo}</p>}
                    <p className="text-xs text-muted-foreground mt-1">Kosongkan jika tidak ingin mengubah logo.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                    <Label htmlFor="phone">Telepon / WhatsApp</Label>
                    <Input id="phone" value={data.phone} onChange={e => setData('phone', e.target.value)} />
                    {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="address">Alamat</Label>
                    <Textarea id="address" value={data.address} onChange={e => setData('address', e.target.value)} />
                    {errors.address && <p className="text-destructive text-sm mt-1">{errors.address}</p>}
                </div>
                <div>
                    <Label htmlFor="established_year">Tahun Berdiri (Opsional)</Label>
                    <Input id="established_year" value={data.established_year} onChange={e => setData('established_year', e.target.value)} placeholder="Contoh: 1982" />
                    {errors.established_year && <p className="text-destructive text-sm mt-1">{errors.established_year}</p>}
                </div>
            </div>
        </div>
    );
}
