export type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type NewsCategory = {
    id: number;
    name: string;
    slug: string;
    news_count?: number;
};

export type NewsUser = {
    id: number;
    name: string;
    avatar?: string;
};

export type NewsItem = {
    id: number;
    title: string;
    slug: string;
    content: string;
    thumbnail: string | null;
    published_at: string;
    category?: NewsCategory | null;
    user?: NewsUser | null;
};

export type PaginatedNews = {
    data: NewsItem[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    total: number;
};

export function getReadingTime(text: string): number {
    const wordsPerMinute = 200;
    const cleanText = text.replace(/<[^>]*>?/gm, '');
    const words = cleanText.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function formatDate(dateString: string): string {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('id-ID', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
