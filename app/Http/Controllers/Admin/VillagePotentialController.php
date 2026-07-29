<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VillagePotential;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class VillagePotentialController extends Controller
{
    public function index()
    {
        $potentials = VillagePotential::latest()->get();
        return Inertia::render('admin/village-potentials/index', [
            'potentials' => $potentials
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/village-potentials/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|in:wisata,produk_umkm,pertanian,peternakan,lainnya',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'address' => 'nullable|string',
        ]);

        $dbCategory = match($validated['category']) {
             'wisata' => 'wisata',
             'produk_umkm' => 'produk',
             default => 'lainnya'
        };

        $insertData = [
            'name' => $validated['title'],
            'slug' => \Illuminate\Support\Str::slug($validated['title']) . '-' . uniqid(),
            'category' => $dbCategory,
            'description' => $validated['description'],
            'latitude' => $validated['latitude'] ?? null,
            'longitude' => $validated['longitude'] ?? null,
            'address' => $validated['address'] ?? null,
        ];

        if ($request->hasFile('image')) {
            $insertData['image'] = $request->file('image')->store('potentials', 'public');
        }

        VillagePotential::create($insertData);
        
        return redirect()->route('admin.village-potentials.index')->with('success', 'Potensi Desa berhasil ditambahkan.');
    }

    public function edit(VillagePotential $village_potential)
    {
        return Inertia::render('admin/village-potentials/edit', [
            'potential' => $village_potential
        ]);
    }

    public function update(Request $request, VillagePotential $village_potential)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|in:wisata,produk_umkm,pertanian,peternakan,lainnya',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'address' => 'nullable|string',
        ]);

        $dbCategory = match($validated['category']) {
             'wisata' => 'wisata',
             'produk_umkm' => 'produk',
             default => 'lainnya'
        };

        $updateData = [
            'name' => $validated['title'],
            'slug' => \Illuminate\Support\Str::slug($validated['title']) . '-' . uniqid(),
            'category' => $dbCategory,
            'description' => $validated['description'],
            'latitude' => $validated['latitude'] ?? null,
            'longitude' => $validated['longitude'] ?? null,
            'address' => $validated['address'] ?? null,
        ];

        if ($request->hasFile('image')) {
            if ($village_potential->image && Storage::disk('public')->exists($village_potential->image)) {
                Storage::disk('public')->delete($village_potential->image);
            }
            $updateData['image'] = $request->file('image')->store('potentials', 'public');
        }

        $village_potential->update($updateData);
        
        return redirect()->route('admin.village-potentials.index')->with('success', 'Potensi Desa berhasil diperbarui.');
    }

    public function destroy(VillagePotential $village_potential)
    {
        if ($village_potential->image && Storage::disk('public')->exists($village_potential->image)) {
            Storage::disk('public')->delete($village_potential->image);
        }
        $village_potential->delete();
        return redirect()->route('admin.village-potentials.index')->with('success', 'Potensi Desa berhasil dihapus.');
    }
}
