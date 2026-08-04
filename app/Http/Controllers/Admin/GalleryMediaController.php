<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryAlbum;
use App\Models\GalleryMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GalleryMediaController extends Controller
{
    public function index(Request $request)
    {
        $albumId = $request->query('album_id');
        $query = GalleryMedia::with('album')->latest();

        if ($albumId) {
            $query->where('gallery_album_id', $albumId);
        }

        $media = $query->get();
        $albums = GalleryAlbum::all();

        return Inertia::render('admin/gallery-media/index', [
            'media' => $media,
            'albums' => $albums,
            'selectedAlbum' => $albumId,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'gallery_album_id' => 'required|exists:gallery_albums,id',
            'files.*' => 'required|file|mimes:jpeg,png,jpg,gif,webp,mp4,webm,quicktime|max:20480',
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('gallery', 'public');
                $type = str_contains($file->getMimeType(), 'video') ? 'video' : 'photo';

                GalleryMedia::create([
                    'gallery_album_id' => $request->gallery_album_id,
                    'type' => $type,
                    'file_path' => $path,
                    'title' => $file->getClientOriginalName(),
                ]);
            }
        }

        return redirect()->back()->with('success', 'Media berhasil diunggah.');
    }

    public function destroy(GalleryMedia $gallery_media)
    {
        if (Storage::disk('public')->exists($gallery_media->file_path)) {
            Storage::disk('public')->delete($gallery_media->file_path);
        }

        $gallery_media->delete();

        return redirect()->back()->with('success', 'Media berhasil dihapus.');
    }
}
