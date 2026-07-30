import { useState, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, Users, Pencil, Check, X } from 'lucide-react';
import { toast } from 'sonner';

type Member = {
    id: number;
    name: string;
    position: string;
    order: number;
};

type Props = {
    institutionId: number;
    members: Member[];
};

export default function MembersManager({ institutionId, members }: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);

    // Form for creating
    const createForm = useForm({
        name: '',
        position: '',
        order: members.length + 1,
    });

    // Form for editing
    const editForm = useForm({
        name: '',
        position: '',
        order: 1,
    });

    const handleCreate: FormEventHandler = (e) => {
        e.preventDefault();
        createForm.post(`/admin/village-institutions/${institutionId}/members`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Anggota berhasil ditambahkan.');
                createForm.reset();
            },
        });
    };

    const startEditing = (member: Member) => {
        setEditingId(member.id);
        editForm.setData({
            name: member.name,
            position: member.position,
            order: member.order,
        });
    };

    const cancelEditing = () => {
        setEditingId(null);
        editForm.reset();
    };

    const handleUpdate = (id: number) => {
        editForm.put(`/admin/institution-members/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Data anggota berhasil diperbarui.');
                setEditingId(null);
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus anggota ini?')) {
            createForm.delete(`/admin/institution-members/${id}`, {
                preserveScroll: true,
                onSuccess: () => toast.success('Anggota berhasil dihapus.'),
            });
        }
    };

    return (
        <div className="bg-white border border-slate-200 p-6 mt-8">
            <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-amber-700" />
                <h2 className="text-xl font-serif text-slate-900">Kelola Anggota / Pengurus</h2>
            </div>

            {/* Create Form */}
            <form onSubmit={handleCreate} className="bg-slate-50 p-4 border border-slate-200 mb-6 flex flex-col sm:flex-row items-end gap-4">
                <div className="w-full space-y-1">
                    <Label htmlFor="new-name" className="text-xs">Nama Anggota</Label>
                    <Input
                        id="new-name"
                        value={createForm.data.name}
                        onChange={e => createForm.setData('name', e.target.value)}
                        placeholder="Contoh: Budi Santoso"
                        required
                        className="h-9 text-sm rounded-none border-slate-300"
                    />
                </div>
                <div className="w-full space-y-1">
                    <Label htmlFor="new-position" className="text-xs">Jabatan / Posisi</Label>
                    <Input
                        id="new-position"
                        value={createForm.data.position}
                        onChange={e => createForm.setData('position', e.target.value)}
                        placeholder="Contoh: Sekretaris"
                        required
                        className="h-9 text-sm rounded-none border-slate-300"
                    />
                </div>
                <div className="w-full sm:w-32 space-y-1 shrink-0">
                    <Label htmlFor="new-order" className="text-xs">Urutan</Label>
                    <Input
                        id="new-order"
                        type="number"
                        value={createForm.data.order}
                        onChange={e => createForm.setData('order', Number(e.target.value))}
                        required
                        className="h-9 text-sm rounded-none border-slate-300"
                    />
                </div>
                <Button type="submit" disabled={createForm.processing} className="h-9 bg-amber-700 hover:bg-amber-800 rounded-none shrink-0 w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" /> Tambah
                </Button>
            </form>

            {/* Members Table */}
            <div className="border border-slate-200 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-xs">
                        <tr>
                            <th className="px-4 py-3 w-16 text-center">No</th>
                            <th className="px-4 py-3">Nama Anggota</th>
                            <th className="px-4 py-3">Jabatan</th>
                            <th className="px-4 py-3 w-20 text-center">Urutan</th>
                            <th className="px-4 py-3 text-right w-32">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {members.length > 0 ? members.map((member, idx) => (
                            <tr key={member.id} className="hover:bg-slate-50/50">
                                <td className="px-4 py-3 text-center text-slate-500">{idx + 1}</td>
                                
                                {editingId === member.id ? (
                                    <>
                                        <td className="px-4 py-3">
                                            <Input
                                                value={editForm.data.name}
                                                onChange={e => editForm.setData('name', e.target.value)}
                                                className="h-8 text-sm rounded-none border-slate-300"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <Input
                                                value={editForm.data.position}
                                                onChange={e => editForm.setData('position', e.target.value)}
                                                className="h-8 text-sm rounded-none border-slate-300"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <Input
                                                type="number"
                                                value={editForm.data.order}
                                                onChange={e => editForm.setData('order', Number(e.target.value))}
                                                className="h-8 text-sm rounded-none border-slate-300 w-16 text-center mx-auto"
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button 
                                                    onClick={() => handleUpdate(member.id)}
                                                    disabled={editForm.processing}
                                                    variant="outline" size="sm" className="h-7 w-7 p-0 rounded-none border-green-600 text-green-600 hover:bg-green-50" title="Simpan">
                                                    <Check className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button 
                                                    onClick={cancelEditing}
                                                    variant="outline" size="sm" className="h-7 w-7 p-0 rounded-none border-slate-300 text-slate-500 hover:bg-slate-100" title="Batal">
                                                    <X className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="px-4 py-3 font-medium text-slate-900">{member.name}</td>
                                        <td className="px-4 py-3 text-slate-600">{member.position}</td>
                                        <td className="px-4 py-3 text-center text-slate-500">{member.order}</td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button onClick={() => startEditing(member)} variant="outline" size="sm" className="h-7 w-7 p-0 rounded-none border-slate-300 text-slate-700 hover:bg-slate-100" title="Edit">
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button onClick={() => handleDelete(member.id)} variant="outline" size="sm" className="h-7 w-7 p-0 rounded-none border-slate-300 text-rose-600 hover:bg-rose-50" title="Hapus">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                                    Belum ada anggota yang ditambahkan.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
