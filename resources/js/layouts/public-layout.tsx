import { Link, usePage } from '@inertiajs/react';
import { Menu, X, MapPin, Mail, Phone } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

type VillageProfile = {
    name: string;
    logo: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    social_links: any;
    history: string | null;
};

type Props = {
    children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
    const { props } = usePage();
    const profile = props.profile as VillageProfile | null;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Profil', href: '/profil' },
        { name: 'Layanan', href: '/layanan' },
        { name: 'Berita', href: '/berita' },
        { name: 'Potensi', href: '/potensi' },
        { name: 'Galeri', href: '/galeri' },
        { name: 'Kontak', href: '/kontak' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950 font-sans text-slate-900 dark:text-slate-100">
            {/* Header / Navbar */}
            <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-zinc-950/70 border-b border-slate-200 dark:border-zinc-800 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center gap-3">
                            {profile?.logo ? (
                                <img src={`/storage/${profile.logo}`} alt="Logo Desa" className="h-10 w-10 object-contain" />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                                    {profile?.name ? profile.name.charAt(0) : 'D'}
                                </div>
                            )}
                            <Link href="/" className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
                                {profile?.name || 'Portal Desa'}
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex space-x-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 dark:text-zinc-300 dark:hover:text-emerald-400 dark:hover:bg-zinc-800/50 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
                            >
                                <span className="sr-only">Buka menu utama</span>
                                {isMobileMenuOpen ? (
                                    <X className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Menu className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 dark:text-zinc-300 dark:hover:text-emerald-400 dark:hover:bg-zinc-800"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            {profile?.logo ? (
                                <img src={`/storage/${profile.logo}`} alt="Logo Desa" className="h-8 w-8 object-contain" />
                            ) : null}
                            <h3 className="text-xl font-bold text-white tracking-tight">
                                Desa {profile?.name || 'Sausu Trans'}
                            </h3>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">
                            {profile?.history ? profile.history.substring(0, 150) + '...' : 'Website resmi portal informasi dan pelayanan administrasi masyarakat desa.'}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Tautan Cepat</h4>
                        <ul className="space-y-2 text-sm">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover:text-emerald-400 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Kontak Kami</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-emerald-500 shrink-0" />
                                <span>{profile?.address || 'Jl. Trans Sulawesi, Sausu Trans'}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-emerald-500 shrink-0" />
                                <span>{profile?.phone || '(0451) 1234567'}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-emerald-500 shrink-0" />
                                <span>{profile?.email || 'admin@sausu-trans.desa.id'}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
                    &copy; {new Date().getFullYear()} Pemerintah Desa {profile?.name || 'Sausu Trans'}. Hak cipta dilindungi.
                </div>
            </footer>
        </div>
    );
}
