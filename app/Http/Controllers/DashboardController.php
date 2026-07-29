<?php

namespace App\Http\Controllers;

use App\Models\TeamInvitation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

use App\Models\News;
use App\Models\GalleryMedia;
use App\Models\GalleryAlbum;
use App\Models\VillageOfficial;
use App\Models\PublicService;
use App\Models\VillagePotential;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $email = strtolower($request->user()->email);

        $pendingInvitations = TeamInvitation::query()
            ->with(['inviter', 'team'])
            ->whereRaw('LOWER(email) = ?', [$email])
            ->whereNull('accepted_at')
            ->where(fn ($query) => $query
                ->whereNull('expires_at')
                ->orWhere('expires_at', '>=', now()))
            ->latest()
            ->get()
            ->map(fn (TeamInvitation $invitation) => [
                'code' => $invitation->code,
                'inviterName' => $invitation->inviter->name,
                'team' => [
                    'name' => $invitation->team->name,
                    'slug' => $invitation->team->slug,
                ],
            ]);

        $stats = [
            'news_count' => News::count(),
            'news_published' => News::where('status', 'published')->count(),
            'news_draft' => News::where('status', 'draft')->count(),
            'gallery_count' => GalleryMedia::count(),
            'albums_count' => class_exists(GalleryAlbum::class) ? GalleryAlbum::count() : 0,
            'officials_count' => VillageOfficial::count(),
            'services_count' => PublicService::count(),
            'potentials_count' => class_exists(VillagePotential::class) ? VillagePotential::count() : 0,
        ];

        $recentNews = News::with(['category'])
            ->latest()
            ->take(5)
            ->get()
            ->map(fn ($item) => [
                'id' => $item->id,
                'title' => $item->title,
                'slug' => $item->slug,
                'status' => $item->status,
                'category_name' => $item->category?->name ?? 'Umum',
                'created_at' => $item->created_at ? $item->created_at->diffForHumans() : '-',
            ]);

        $recentMedia = GalleryMedia::with(['album'])
            ->latest()
            ->take(6)
            ->get()
            ->map(fn ($item) => [
                'id' => $item->id,
                'title' => $item->title,
                'file_path' => $item->file_path,
                'type' => $item->type,
                'album_title' => $item->album?->title ?? 'Galeri',
                'created_at' => $item->created_at ? $item->created_at->diffForHumans() : '-',
            ]);

        return Inertia::render('dashboard', [
            'pendingInvitations' => $pendingInvitations,
            'stats' => $stats,
            'recentNews' => $recentNews,
            'recentMedia' => $recentMedia,
        ]);
    }
}
