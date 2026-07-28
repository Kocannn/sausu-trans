<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryAlbum;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class GalleryAlbumController extends Controller
{
    public function index()
    {
        $albums = GalleryAlbum::withCount('media')->latest()->get();
        return Inertia::render('admin/gallery-albums/index', [
            'albums' => $albums
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/gallery-albums/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        
        $validated['slug'] = Str::slug($validated['name']);
        GalleryAlbum::create($validated);
        
        return redirect()->route('admin.gallery-albums.index')->with('success', 'Album berhasil ditambahkan.');
    }

    public function edit(GalleryAlbum $gallery_album)
    {
        return Inertia::render('admin/gallery-albums/edit', [
            'album' => $gallery_album
        ]);
    }

    public function update(Request $request, GalleryAlbum $gallery_album)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        
        $validated['slug'] = Str::slug($validated['name']);
        $gallery_album->update($validated);
        
        return redirect()->route('admin.gallery-albums.index')->with('success', 'Album berhasil diperbarui.');
    }

    public function destroy(GalleryAlbum $gallery_album)
    {
        $gallery_album->delete();
        return redirect()->route('admin.gallery-albums.index')->with('success', 'Album berhasil dihapus.');
    }
}
