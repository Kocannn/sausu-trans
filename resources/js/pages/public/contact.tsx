import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Props = {
    profile: any;
};

export default function Contact({ profile }: Props) {
    return (
        <PublicLayout>
            <Head title="Kontak Kami" />
            
            {/* Page Header */}
            <div className="bg-slate-900 text-white py-16 md:py-24 border-b border-emerald-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Hubungi Kami</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Kami siap melayani Anda. Kunjungi kantor desa atau hubungi kami melalui kontak di bawah ini.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* Contact Info & Map */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Informasi Kontak</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center shrink-0">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">Alamat Kantor</h4>
                                        <p className="text-slate-600 dark:text-slate-400 mt-1">{profile?.address || 'Kantor Kepala Desa Sausu Trans, Kec. Sausu'}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0">
                                        <Phone className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">Telepon</h4>
                                        <p className="text-slate-600 dark:text-slate-400 mt-1">{profile?.phone || '(0451) 1234567'}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center shrink-0">
                                        <Mail className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">Email</h4>
                                        <p className="text-slate-600 dark:text-slate-400 mt-1">{profile?.email || 'admin@sausu-trans.desa.id'}</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center shrink-0">
                                        <Clock className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-lg">Jam Operasional</h4>
                                        <p className="text-slate-600 dark:text-slate-400 mt-1">Senin - Jumat: 08.00 - 15.00 WITA<br />Sabtu - Minggu: Tutup</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {profile?.map_embed && (
                            <div className="bg-white dark:bg-zinc-950 p-4 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm overflow-hidden h-80">
                                <div dangerouslySetInnerHTML={{ __html: profile.map_embed }} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:rounded-2xl" />
                            </div>
                        )}
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white dark:bg-zinc-950 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Kirim Pesan</h3>
                        <p className="text-slate-500 mb-8">Punya pertanyaan atau masukan? Jangan ragu untuk mengirim pesan kepada kami.</p>
                        
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Fitur pengiriman pesan akan segera hadir!'); }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Nama Lengkap</label>
                                    <Input id="name" placeholder="Masukkan nama Anda" className="h-12 bg-slate-50 dark:bg-zinc-900" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Alamat Email</label>
                                    <Input id="email" type="email" placeholder="email@contoh.com" className="h-12 bg-slate-50 dark:bg-zinc-900" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-slate-700 dark:text-slate-300">Subjek</label>
                                <Input id="subject" placeholder="Subjek pesan" className="h-12 bg-slate-50 dark:bg-zinc-900" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-300">Pesan</label>
                                <Textarea id="message" placeholder="Tuliskan pesan Anda di sini..." className="min-h-[150px] bg-slate-50 dark:bg-zinc-900" />
                            </div>
                            <Button type="submit" size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 text-base">
                                <Send className="mr-2 h-5 w-5" /> Kirim Pesan
                            </Button>
                        </form>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
