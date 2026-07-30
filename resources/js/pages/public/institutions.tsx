import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Shield, Users, Image as ImageIcon } from 'lucide-react';

type Member = {
    id: number;
    name: string;
    position: string;
    order: number;
};

type Institution = {
    id: number;
    name: string;
    abbreviation: string | null;
    description: string | null;
    leader_name: string | null;
    logo: string | null;
    members: Member[];
};

type Props = {
    profile: any;
    institutions: Institution[];
};

export default function Institutions({ profile, institutions }: Props) {
    return (
        <PublicLayout>
            <Head title="Lembaga Desa & BUMDes" />

            {/* Page Header */}
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
                    <div className="max-w-2xl">
                        <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">Pemerintahan</span>
                        <h1 className="mt-3 text-5xl lg:text-6xl font-serif text-slate-900 leading-tight">
                            Lembaga Desa & BUMDes
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                            Informasi mengenai kelembagaan masyarakat, BPD, BUMDes, dan berbagai organisasi yang ada di Desa {profile?.name || 'Sausu Trans'}.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="bg-slate-50 border-b border-slate-200 py-16">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-16">
                    {institutions.length > 0 ? institutions.map((inst, index) => (
                        <div key={inst.id} className="bg-white border border-slate-200 overflow-hidden shadow-sm">
                            {/* Institution Header */}
                            <div className="p-8 border-b border-slate-200 bg-white">
                                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                    <div className="h-24 w-24 shrink-0 bg-slate-50 border border-slate-200 p-2 flex items-center justify-center">
                                        {inst.logo ? (
                                            <img src={`/storage/${inst.logo}`} alt={inst.name} className="h-full w-full object-contain" />
                                        ) : (
                                            <ImageIcon className="h-8 w-8 text-slate-300" />
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Shield className="h-4 w-4 text-amber-700" />
                                            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">{inst.abbreviation || 'Lembaga Desa'}</span>
                                        </div>
                                        <h2 className="text-3xl font-serif text-slate-900 mb-2">{inst.name}</h2>
                                        {inst.leader_name && (
                                            <p className="text-sm font-medium text-slate-700 mb-4">Ketua / Pimpinan: <span className="font-bold">{inst.leader_name}</span></p>
                                        )}
                                        {inst.description && (
                                            <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">{inst.description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Institution Members */}
                            <div className="p-8 bg-slate-50">
                                <h3 className="text-lg font-serif text-slate-900 mb-4 flex items-center gap-2">
                                    <Users className="h-5 w-5 text-slate-400" />
                                    Susunan Pengurus
                                </h3>
                                
                                {inst.members && inst.members.length > 0 ? (
                                    <div className="bg-white border border-slate-200 overflow-hidden">
                                        <table className="w-full text-sm text-left">
                                            <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-xs">
                                                <tr>
                                                    <th className="px-6 py-3 w-16 text-center border-r border-slate-200">No</th>
                                                    <th className="px-6 py-3 border-r border-slate-200">Nama Anggota</th>
                                                    <th className="px-6 py-3">Jabatan / Posisi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {inst.members.map((member, idx) => (
                                                    <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                                                        <td className="px-6 py-3 text-center text-slate-500 border-r border-slate-200">{idx + 1}</td>
                                                        <td className="px-6 py-3 font-medium text-slate-900 border-r border-slate-200">{member.name}</td>
                                                        <td className="px-6 py-3 text-slate-600">{member.position}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center text-sm text-slate-500 py-8 border border-slate-200 bg-white">
                                        Belum ada data pengurus yang ditambahkan.
                                    </div>
                                )}
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-20 bg-white border border-slate-200">
                            <Shield className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-serif text-slate-900 mb-2">Belum Ada Lembaga</h3>
                            <p className="text-slate-500 max-w-md mx-auto">
                                Saat ini belum ada data lembaga kemasyarakatan atau BUMDes yang dipublikasikan.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
