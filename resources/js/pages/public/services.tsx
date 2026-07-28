import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { FileText, Clock, Info } from 'lucide-react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type Service = {
    id: number;
    name: string;
    description: string;
    requirements: string;
    operating_hours: string | null;
};

type Props = {
    profile: any;
    services: Service[];
};

export default function Services({ profile, services }: Props) {
    return (
        <PublicLayout>
            <Head title="Layanan Publik" />
            
            {/* Page Header */}
            <div className="bg-slate-900 text-white py-16 md:py-24 border-b border-emerald-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Portal Layanan Publik</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Informasi lengkap mengenai persyaratan dan prosedur pelayanan administrasi di Kantor Desa {profile?.name || 'Sausu Trans'}.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {services.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {services.map((service, index) => (
                            <AccordionItem key={service.id} value={`item-${service.id}`} className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-2xl overflow-hidden px-6">
                                <AccordionTrigger className="hover:no-underline py-6">
                                    <div className="flex items-center gap-4 text-left">
                                        <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{service.name}</h3>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-normal mt-1 line-clamp-1">{service.description}</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pt-2 pb-8 border-t border-slate-100 dark:border-zinc-800">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                                        <div className="md:col-span-2 space-y-6">
                                            <div>
                                                <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-3">
                                                    <Info className="h-5 w-5 text-blue-500" /> Deskripsi Layanan
                                                </h4>
                                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                                                    {service.description}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white mb-3">
                                                    <FileText className="h-5 w-5 text-emerald-500" /> Persyaratan
                                                </h4>
                                                <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-zinc-900 p-6 rounded-xl border border-slate-100 dark:border-zinc-800 whitespace-pre-wrap">
                                                    {service.requirements}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-xl border border-amber-100 dark:border-amber-900/30">
                                                <h4 className="flex items-center gap-2 text-lg font-bold text-amber-900 dark:text-amber-500 mb-3">
                                                    <Clock className="h-5 w-5" /> Jam Pelayanan
                                                </h4>
                                                <p className="text-amber-800 dark:text-amber-400 whitespace-pre-wrap">
                                                    {service.operating_hours || 'Senin - Jumat\n08:00 - 15:00 WITA'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <div className="text-center py-20 bg-white dark:bg-zinc-950 rounded-3xl border border-slate-200 dark:border-zinc-800">
                        <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Belum Ada Layanan</h3>
                        <p className="text-slate-500">Informasi layanan publik belum ditambahkan oleh administrator.</p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
