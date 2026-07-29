import { Link, usePage } from '@inertiajs/react';
import { Menu, X, MapPin, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

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
    console.log('Logo', profile?.logo);

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
        <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
            {/* Header / Navbar */}
            <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo & Branding */}
                        <div className="flex items-center gap-3">
                            {profile?.logo ? (
                                <img src={`/storage/${profile.logo}`} alt="Logo Desa" className="h-10 w-10 object-contain" />
                            ) : (
                                <div className="h-10 w-10 rounded bg-amber-700 flex items-center justify-center text-white font-serif font-bold text-lg">
                                    {profile?.name ? profile.name.charAt(0) : 'D'}
                                </div>
                            )}
                            <Link href="/" className="font-serif font-bold text-lg text-slate-900 hover:text-amber-700 transition-colors">
                                {profile?.name || 'Portal Desa'}
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm text-slate-600 hover:text-amber-700 font-medium transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="inline-flex items-center justify-center p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            >
                                <span className="sr-only">Buka menu</span>
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-200 bg-white">
                        <div className="px-6 py-3 space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block py-2 text-sm text-slate-600 hover:text-amber-700 font-medium transition-colors"
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
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 mt-auto">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        {/* Column 1: About */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                {profile?.logo ? (
                                    <img src={`/storage/${profile.logo}`} alt="Logo Desa" className="h-8 w-8 object-contain" />
                                ) : null}
                                <h3 className="font-serif font-bold text-slate-900">
                                    Desa {profile?.name || 'Sausu Trans'}
                                </h3>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {profile?.history ? profile.history.substring(0, 150) + '...' : 'Portal informasi dan layanan administrasi desa yang transparan dan mudah diakses.'}
                            </p>
                            <div className="mt-4 h-1 w-12 bg-amber-700"></div>
                        </div>

                        {/* Column 2: Quick Links */}
                        <div>
                            <h4 className="font-serif font-bold text-slate-900 mb-4">Tautan Cepat</h4>
                            <ul className="space-y-2">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-sm text-slate-600 hover:text-amber-700 transition-colors">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 3: Contact */}
                        <div>
                            <h4 className="font-serif font-bold text-slate-900 mb-4">Kontak</h4>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-amber-700 shrink-0 mt-0.5" />
                                    <span className="text-sm text-slate-600">
                                        {profile?.address || 'Jl. Trans Sulawesi, Sausu Trans'}
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone className="h-5 w-5 text-amber-700 shrink-0" />
                                    <a href={`tel:${profile?.phone}`} className="text-sm text-slate-600 hover:text-amber-700 transition-colors">
                                        {profile?.phone || '(0451) 1234567'}
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail className="h-5 w-5 text-amber-700 shrink-0" />
                                    <a href={`mailto:${profile?.email}`} className="text-sm text-slate-600 hover:text-amber-700 transition-colors">
                                        {profile?.email || 'admin@sausu-trans.desa.id'}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-slate-200 pt-8">
                        <p className="text-xs text-slate-500 text-center">
                            © {new Date().getFullYear()} Pemerintah {profile?.name || 'Sausu Trans'}. Hak cipta dilindungi.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
