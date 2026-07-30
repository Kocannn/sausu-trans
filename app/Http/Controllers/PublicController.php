<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsCategory;
use App\Models\PublicService;
use App\Models\VillageProfile;
use App\Models\VillageOfficial;
use App\Models\VillagePotential;
use App\Models\VillageInstitution;
use App\Models\GalleryAlbum;
use App\Models\GalleryMedia;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function index()
    {
        $profile = VillageProfile::first();
        $latestNews = News::with('category', 'user')->where('status', 'published')->latest()->take(3)->get();
        $services = PublicService::where('is_active', true)->take(4)->get();

        return Inertia::render('public/home', [
            'profile' => $profile,
            'latestNews' => $latestNews,
            'services' => $services
        ]);
    }

    public function profile()
    {
        $profile = VillageProfile::first();

        return Inertia::render('public/profile', [
            'profile' => $profile
        ]);
    }

    public function officials()
    {
        $profile = VillageProfile::first();
        $officials = VillageOfficial::orderBy('order')->get();

        return Inertia::render('public/officials', [
            'profile' => $profile,
            'officials' => $officials
        ]);
    }

    public function institutions()
    {
        $profile = VillageProfile::first();
        // Get institutions with their members, ordered by member order
        $institutions = VillageInstitution::with(['members' => function($query) {
            $query->orderBy('order');
        }])->latest()->get();

        return Inertia::render('public/institutions', [
            'profile' => $profile,
            'institutions' => $institutions
        ]);
    }

    public function services()
    {
        $profile = VillageProfile::first();
        $services = PublicService::where('is_active', true)->get();

        return Inertia::render('public/services', [
            'profile' => $profile,
            'services' => $services
        ]);
    }

    public function news(Request $request)
    {
        $profile = VillageProfile::first();
        $query = News::with('category', 'user')->where('status', 'published')->latest();

        if ($request->filled('search')) {
            $search = $request->query('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $categorySlug = $request->query('category');
            $query->whereHas('category', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }

        $news = $query->paginate(9)->withQueryString();

        $categories = NewsCategory::withCount(['news' => function ($q) {
            $q->where('status', 'published');
        }])->get();

        $featuredNews = null;
        if (!$request->filled('search') && !$request->filled('category') && $news->currentPage() === 1 && count($news->items()) > 0) {
            $featuredNews = $news->items()[0];
        }

        $trendingNews = News::with('category')
            ->where('status', 'published')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('public/news/index', [
            'profile' => $profile,
            'news' => $news,
            'categories' => $categories,
            'featuredNews' => $featuredNews,
            'trendingNews' => $trendingNews,
            'filters' => $request->only(['search', 'category'])
        ]);
    }

    public function newsDetail($slug)
    {
        $profile = VillageProfile::first();
        $newsItem = News::with('category', 'user')->where('slug', $slug)->where('status', 'published')->firstOrFail();

        $relatedNews = News::with('category')
            ->where('id', '!=', $newsItem->id)
            ->where('status', 'published')
            ->when($newsItem->news_category_id, function ($q) use ($newsItem) {
                $q->where('news_category_id', $newsItem->news_category_id);
            })
            ->latest()
            ->take(3)
            ->get();

        if ($relatedNews->isEmpty()) {
            $relatedNews = News::with('category')
                ->where('id', '!=', $newsItem->id)
                ->where('status', 'published')
                ->latest()
                ->take(3)
                ->get();
        }

        $categories = NewsCategory::withCount(['news' => function ($q) {
            $q->where('status', 'published');
        }])->get();

        return Inertia::render('public/news/show', [
            'profile' => $profile,
            'newsItem' => $newsItem,
            'relatedNews' => $relatedNews,
            'categories' => $categories,
        ]);
    }

    public function potentials()
    {
        $profile = VillageProfile::first();
        $potentials = VillagePotential::latest()->get();

        return Inertia::render('public/potentials', [
            'profile' => $profile,
            'potentials' => $potentials
        ]);
    }

    public function gallery(Request $request)
    {
        $profile = VillageProfile::first();
        $albums = GalleryAlbum::has('media')->get();

        $query = GalleryMedia::with('album')->latest();
        if ($request->has('album_id') && $request->album_id !== 'all') {
            $query->where('gallery_album_id', $request->album_id);
        }

        $media = $query->paginate(12)->withQueryString();

        return Inertia::render('public/gallery', [
            'profile' => $profile,
            'albums' => $albums,
            'media' => $media,
            'currentAlbum' => $request->album_id ?? 'all'
        ]);
    }

    public function contact()
    {
        $profile = VillageProfile::first();

        return Inertia::render('public/contact', [
            'profile' => $profile
        ]);
    }
}
