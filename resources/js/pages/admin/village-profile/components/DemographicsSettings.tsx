import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash } from 'lucide-react';
export type DemographicItem = { label: string; count: number | string };
export type DemographicCategory = { category: string; items: DemographicItem[] };

type Props = {
    data: any;
    setData: (key: string, value: any) => void;
};

export default function DemographicsSettings({ data, setData }: Props) {
    const addCategory = () => {
        setData('demographics', [...data.demographics, { category: '', items: [{ label: '', count: '' }] }]);
    };

    const removeCategory = (index: number) => {
        const newDemographics = [...data.demographics];
        newDemographics.splice(index, 1);
        setData('demographics', newDemographics);
    };

    const updateCategoryName = (index: number, value: string) => {
        const newDemographics = [...data.demographics];
        newDemographics[index].category = value;
        setData('demographics', newDemographics);
    };

    const addItem = (categoryIndex: number) => {
        const newDemographics = [...data.demographics];
        newDemographics[categoryIndex].items.push({ label: '', count: '' });
        setData('demographics', newDemographics);
    };

    const removeItem = (categoryIndex: number, itemIndex: number) => {
        const newDemographics = [...data.demographics];
        newDemographics[categoryIndex].items.splice(itemIndex, 1);
        setData('demographics', newDemographics);
    };

    const updateItem = (categoryIndex: number, itemIndex: number, field: keyof DemographicItem, value: string) => {
        const newDemographics = [...data.demographics];
        newDemographics[categoryIndex].items[itemIndex][field] = value;
        setData('demographics', newDemographics);
    };

    return (
        <div className="border border-slate-200 dark:border-zinc-800 rounded-xl p-4 bg-slate-50 dark:bg-zinc-900/50">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                    <Label className="text-base font-semibold">Data Demografi Penduduk</Label>
                    <p className="text-sm text-slate-500">Kelompokkan data demografi berdasarkan kategori (cth: Agama, Pekerjaan).</p>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addCategory}>
                    <Plus className="mr-2 h-4 w-4" /> Tambah Kategori
                </Button>
            </div>
            
            <div className="space-y-8">
                {data.demographics.map((category: DemographicCategory, cIndex: number) => (
                    <div key={cIndex} className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm">
                        <div className="flex gap-4 items-end mb-4 border-b pb-4">
                            <div className="flex-1">
                                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nama Kategori (Cth: Berdasarkan Agama)</Label>
                                <Input 
                                    className="mt-1 font-semibold"
                                    value={category.category} 
                                    onChange={e => updateCategoryName(cIndex, e.target.value)} 
                                    placeholder="Contoh: Berdasarkan Agama" 
                                />
                            </div>
                            <Button type="button" variant="destructive" size="icon" onClick={() => removeCategory(cIndex)} title="Hapus Kategori Ini">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="space-y-3 pl-2">
                            <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Item Kategori</Label>
                            {category.items.map((item: DemographicItem, iIndex: number) => (
                                <div key={iIndex} className="flex gap-3 items-start bg-slate-50 dark:bg-zinc-900/50 p-3 rounded-lg border border-slate-100 dark:border-zinc-800/80">
                                    <div className="flex-1">
                                        <Label className="text-xs mb-1 block">Label (Cth: Islam)</Label>
                                        <Input 
                                            value={item.label} 
                                            onChange={e => updateItem(cIndex, iIndex, 'label', e.target.value)} 
                                            placeholder="Contoh: Islam" 
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Label className="text-xs mb-1 block">Jumlah (Cth: 1.500 Jiwa)</Label>
                                        <Input 
                                            value={item.count} 
                                            onChange={e => updateItem(cIndex, iIndex, 'count', e.target.value)} 
                                            placeholder="Contoh: 1.500 Jiwa" 
                                        />
                                    </div>
                                    <div className="mt-6">
                                        <Button type="button" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50" size="icon" onClick={() => removeItem(cIndex, iIndex)}>
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            
                            <Button type="button" variant="secondary" size="sm" className="mt-2 w-full border border-dashed border-slate-300 dark:border-zinc-700 bg-transparent hover:bg-slate-100 dark:hover:bg-zinc-800" onClick={() => addItem(cIndex)}>
                                <Plus className="mr-2 h-3 w-3" /> Tambah Item ke {category.category || 'Kategori Ini'}
                            </Button>
                        </div>
                    </div>
                ))}
                
                {data.demographics.length === 0 && (
                    <div className="text-center py-8 bg-white dark:bg-zinc-950 rounded-xl border border-dashed border-slate-300 dark:border-zinc-700">
                        <p className="text-sm text-slate-500 mb-4">Belum ada kategori demografi yang ditambahkan.</p>
                        <Button type="button" variant="outline" size="sm" onClick={addCategory}>
                            <Plus className="mr-2 h-4 w-4" /> Mulai Tambah Kategori
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
