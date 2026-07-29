import { Share2, Facebook, Twitter, Link as LinkIcon, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type Props = {
    title: string;
};

export default function NewsShareBar({ title }: Props) {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const copyLink = () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(shareUrl);
            toast.success('Tautan berita berhasil disalin!');
        }
    };

    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${shareUrl}`)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`;

    return (
        <div className="bg-slate-50  border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="font-serif font-bold text-slate-900 text-base flex items-center gap-2">
                <Share2 className="h-5 w-5 text-amber-700" />
                Bagikan Berita Ini
            </div>

            <div className="flex flex-wrap items-center gap-2">
                {/* WhatsApp */}
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs px-4 py-2.5  transition-colors shadow-sm"
                >
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp
                </a>

                {/* Facebook */}
                <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4 py-2.5  transition-colors shadow-sm"
                >
                    <Facebook className="h-4 w-4" />
                    Facebook
                </a>

                {/* Twitter / X */}
                <a
                    href={twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs px-4 py-2.5  transition-colors shadow-sm"
                >
                    <Twitter className="h-4 w-4" />
                    X (Twitter)
                </a>

                {/* Copy Link */}
                <Button
                    variant="outline"
                    onClick={copyLink}
                    className="inline-flex items-center gap-2 border-slate-300 hover:bg-slate-100 text-slate-700 font-medium text-xs px-4 py-2.5 h-auto  transition-colors"
                >
                    <LinkIcon className="h-4 w-4 text-slate-500" />
                    Salin Link
                </Button>
            </div>
        </div>
    );
}
