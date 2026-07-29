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
            
            <section className="bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-24">
                    <div className="max-w-2xl">
                        <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">Layanan Informasi</span>
                        <h1 className="mt-3 text-5xl lg:text-6xl font-serif text-slate-900 leading-tight">
                            Hubungi Kami
                        </h1>
                        <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                            Kami siap melayani Anda. Kunjungi kantor desa atau hubungi kami melalui kontak di bawah ini.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-50 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        
                        {/* Contact Info & Map */}
                        <div className="space-y-12">
                            <div>
                                <h2 className="text-3xl font-serif text-slate-900 mb-2">Informasi Kontak</h2>
                                <div className="h-1 w-16 bg-amber-700 mt-4 mb-8"></div>
                                
                                <ul className="space-y-8">
                                    <li className="flex items-start gap-4">
                                        <div className="h-12 w-12 bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
                                            <MapPin className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-lg">Alamat Kantor</h4>
                                            <p className="text-slate-600 mt-1">{profile?.address || 'Kantor Kepala Desa Sausu Trans, Kec. Sausu'}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="h-12 w-12 bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
                                            <Phone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-lg">Telepon</h4>
                                            <p className="text-slate-600 mt-1">{profile?.phone || '(0451) 1234567'}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="h-12 w-12 bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-lg">Email</h4>
                                            <p className="text-slate-600 mt-1">{profile?.email || 'admin@sausu-trans.desa.id'}</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <div className="h-12 w-12 bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-100">
                                            <Clock className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-lg">Jam Operasional</h4>
                                            <p className="text-slate-600 mt-1">Senin - Jumat: 08.00 - 15.00 WITA<br />Sabtu - Minggu: Tutup</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {profile?.map_embed && (
                                <div className="bg-white border border-slate-200 p-2 h-80">
                                    <div dangerouslySetInnerHTML={{ __html: profile.map_embed }} className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full" />
                                </div>
                            )}
                        </div>

                        {/* Contact Form */}
                        <div>
                            <div className="bg-white p-10 border border-slate-200">
                                <h3 className="text-2xl font-serif text-slate-900 mb-2">Kirim Pesan</h3>
                                <div className="h-1 w-16 bg-amber-700 mt-4 mb-8"></div>
                                <p className="text-slate-500 mb-8 text-sm">Punya pertanyaan atau masukan? Jangan ragu untuk mengirim pesan kepada kami.</p>
                                
                                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Fitur pengiriman pesan akan segera hadir!'); }}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-xs font-bold text-slate-900 uppercase tracking-wide">Nama Lengkap</label>
                                            <Input id="name" placeholder="Masukkan nama Anda" className="h-12 rounded-none border-slate-300 focus-visible:ring-amber-700" />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-xs font-bold text-slate-900 uppercase tracking-wide">Alamat Email</label>
                                            <Input id="email" type="email" placeholder="email@contoh.com" className="h-12 rounded-none border-slate-300 focus-visible:ring-amber-700" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-xs font-bold text-slate-900 uppercase tracking-wide">Subjek</label>
                                        <Input id="subject" placeholder="Subjek pesan" className="h-12 rounded-none border-slate-300 focus-visible:ring-amber-700" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-xs font-bold text-slate-900 uppercase tracking-wide">Pesan</label>
                                        <Textarea id="message" placeholder="Tuliskan pesan Anda di sini..." className="min-h-[150px] rounded-none border-slate-300 focus-visible:ring-amber-700" />
                                    </div>
                                    <Button type="submit" className="w-full bg-amber-700 hover:bg-amber-800 text-white rounded-none h-14 text-base tracking-wide font-medium">
                                        <Send className="mr-2 h-5 w-5" /> Kirim Pesan
                                    </Button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
