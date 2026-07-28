import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { FormEventHandler, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import axios from 'axios';

type Props = {
    categories: { id: number; name: string }[];
};

export default function Create({ categories }: Props) {
    const [localCategories, setLocalCategories] = useState(categories);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [isSubmittingCategory, setIsSubmittingCategory] = useState(false);

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return toast.error('Nama kategori tidak boleh kosong');
        setIsSubmittingCategory(true);
        try {
            const res = await axios.post('/admin/news-categories', { name: newCategoryName }, {
                headers: { 'Accept': 'application/json' }
            });
            const newCategory = res.data.category;
            setLocalCategories([...localCategories, newCategory]);
            setData('news_category_id', newCategory.id.toString());
            setNewCategoryName('');
            setIsCategoryModalOpen(false);
            toast.success(res.data.message || 'Kategori berhasil ditambahkan');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Gagal menambahkan kategori');
        } finally {
            setIsSubmittingCategory(false);
        }
    };
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        news_category_id: '',
        content: '',
        thumbnail: null as File | null,
        status: 'draft',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/news', {
            onSuccess: () => toast.success('Berita berhasil ditambahkan.'),
        });
    };

    return (
        <>
            <Head title="Tambah Berita" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="bg-card text-card-foreground shadow rounded-xl p-6 border border-sidebar-border/70 dark:border-sidebar-border max-w-3xl">
                    <h2 className="text-xl font-bold mb-4">Tambah Berita</h2>
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Label htmlFor="title">Judul Berita</Label>
                            <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} />
                            {errors.title && <p className="text-destructive text-sm mt-1">{errors.title}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="news_category_id">Kategori</Label>
                                <div className="flex gap-2 items-center">
                                    <select
                                        id="news_category_id"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={data.news_category_id}
                                        onChange={e => setData('news_category_id', e.target.value)}
                                    >
                                        <option value="">-- Pilih Kategori --</option>
                                        {localCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                    <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
                                        <DialogTrigger asChild>
                                            <Button type="button" variant="outline" size="icon" className="shrink-0" title="Tambah Kategori Baru">
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Tambah Kategori Baru</DialogTitle>
                                            </DialogHeader>
                                            <div className="py-4">
                                                <Label htmlFor="newCategory">Nama Kategori</Label>
                                                <Input id="newCategory" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="Contoh: Pengumuman" />
                                            </div>
                                            <DialogFooter>
                                                <Button type="button" variant="outline" onClick={() => setIsCategoryModalOpen(false)}>Batal</Button>
                                                <Button type="button" onClick={handleAddCategory} disabled={isSubmittingCategory}>Simpan Kategori</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                {errors.news_category_id && <p className="text-destructive text-sm mt-1">{errors.news_category_id}</p>}
                            </div>
                            <div>
                                <Label htmlFor="status">Status</Label>
                                <select
                                    id="status"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={data.status}
                                    onChange={e => setData('status', e.target.value)}
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Publish</option>
                                </select>
                                {errors.status && <p className="text-destructive text-sm mt-1">{errors.status}</p>}
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="thumbnail">Thumbnail</Label>
                            <Input id="thumbnail" type="file" accept="image/*" onChange={e => setData('thumbnail', e.target.files?.[0] || null)} />
                            {errors.thumbnail && <p className="text-destructive text-sm mt-1">{errors.thumbnail}</p>}
                        </div>
                        <div>
                            <Label htmlFor="content">Konten (Text / HTML)</Label>
                            <Textarea id="content" className="min-h-[300px]" value={data.content} onChange={e => setData('content', e.target.value)} placeholder="Tulis konten berita di sini... (Integrasi Rich Text Editor dapat ditambahkan nanti)" />
                            {errors.content && <p className="text-destructive text-sm mt-1">{errors.content}</p>}
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline" type="button" asChild>
                                <Link href="/admin/news">Batal</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>Simpan</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
