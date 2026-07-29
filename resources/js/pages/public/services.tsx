import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { FileText, Clock, Info, ArrowRight } from 'lucide-react';
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
    online_link: string | null;
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
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
                    <div className="max-w-2xl">
                        <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">Layanan Publik</span>
                        <h1 className="mt-3 text-5xl lg:text-6xl font-serif text-slate-900 leading-tight">
                            Portal Layanan
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                            Informasi persyaratan dan prosedur pelayanan administrasi di Kantor Desa {profile?.name || 'Sausu Trans'}.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
                    {services.length > 0 ? (
                        <Accordion type="single" collapsible className="w-full space-y-4 max-w-4xl mx-auto">
                            {services.map((service) => (
                                <AccordionItem key={service.id} value={`item-${service.id}`} className="bg-white border border-slate-200 px-6 data-[state=open]:border-amber-700 transition-colors">
                                    <AccordionTrigger className="hover:no-underline py-6">
                                        <div className="flex items-center gap-4 text-left">
                                            <div className="h-10 w-10 bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
                                                <FileText className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900">{service.name}</h3>
                                                <p className="text-sm text-slate-500 font-normal mt-1 line-clamp-1">{service.description}</p>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2 pb-8 border-t border-slate-100">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                                            <div className="md:col-span-2 space-y-8">
                                                <div>
                                                    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
                                                        <Info className="h-4 w-4 text-amber-700" /> Deskripsi
                                                    </h4>
                                                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm">
                                                        {service.description}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
                                                        <FileText className="h-4 w-4 text-amber-700" /> Persyaratan
                                                    </h4>
                                                    <div className="text-slate-600 bg-slate-50 p-6 border border-slate-200 whitespace-pre-wrap text-sm">
                                                        {service.requirements}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="bg-white p-6 border border-slate-200 h-full flex flex-col">
                                                    <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
                                                        <Clock className="h-4 w-4 text-amber-700" /> Waktu
                                                    </h4>
                                                    <p className="text-slate-600 text-sm whitespace-pre-wrap flex-1">
                                                        {service.operating_hours || 'Senin - Jumat\n08:00 - 15:00 WITA'}
                                                    </p>
                                                    
                                                    {service.online_link && (
                                                        <div className="mt-6 pt-6 border-t border-slate-100">
                                                            <a href={service.online_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors">
                                                                Akses Layanan Online <ArrowRight className="ml-2 h-4 w-4" />
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    ) : (
                        <div className="text-center py-20 bg-white border border-slate-200 max-w-4xl mx-auto">
                            <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Belum Ada Layanan</h3>
                            <p className="text-slate-500 text-sm">Informasi layanan publik belum ditambahkan.</p>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
