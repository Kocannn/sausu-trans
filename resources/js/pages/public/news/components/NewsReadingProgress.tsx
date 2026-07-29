import { useEffect, useState } from 'react';

export default function NewsReadingProgress() {
    const [completion, setCompletion] = useState(0);

    useEffect(() => {
        const updateScrollCompletion = () => {
            const currentProgress = window.scrollY;
            const scrollHeight = document.body.scrollHeight - window.innerHeight;
            if (scrollHeight) {
                setCompletion(Number((currentProgress / scrollHeight).toFixed(2)) * 100);
            }
        };

        window.addEventListener('scroll', updateScrollCompletion);
        return () => {
            window.removeEventListener('scroll', updateScrollCompletion);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-slate-100/50 backdrop-blur-sm pointer-events-none">
            <div
                className="h-full bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 transition-all duration-150 ease-out"
                style={{ width: `${completion}%` }}
            />
        </div>
    );
}
