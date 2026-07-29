<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PublicService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class PublicServiceController extends Controller
{
    public function index()
    {
        $services = PublicService::latest()->get();
        return Inertia::render('admin/public-services/index', [
            'services' => $services
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/public-services/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'operating_hours' => 'nullable|string',
            'online_link' => 'nullable|url',
            'is_active' => 'boolean'
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        PublicService::create($validated);
        
        return redirect()->route('admin.public-services.index')->with('success', 'Layanan Publik berhasil ditambahkan.');
    }

    public function edit(PublicService $public_service)
    {
        return Inertia::render('admin/public-services/edit', [
            'service' => $public_service
        ]);
    }

    public function update(Request $request, PublicService $public_service)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'operating_hours' => 'nullable|string',
            'online_link' => 'nullable|url',
            'is_active' => 'boolean'
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $public_service->update($validated);
        
        return redirect()->route('admin.public-services.index')->with('success', 'Layanan Publik berhasil diperbarui.');
    }

    public function destroy(PublicService $public_service)
    {
        $public_service->delete();
        return redirect()->route('admin.public-services.index')->with('success', 'Layanan Publik berhasil dihapus.');
    }
}
