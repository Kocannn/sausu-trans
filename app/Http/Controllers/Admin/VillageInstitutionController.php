<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VillageInstitution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VillageInstitutionController extends Controller
{
    public function index()
    {
        $institutions = VillageInstitution::latest()->get();

        return Inertia::render('admin/village-institutions/index', [
            'institutions' => $institutions,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/village-institutions/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'abbreviation' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'leader_name' => 'nullable|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('institutions', 'public');
            $validated['logo'] = $path;
        }

        VillageInstitution::create($validated);

        return redirect()->route('admin.village-institutions.index')->with('success', 'Lembaga Desa berhasil ditambahkan.');
    }

    public function edit(VillageInstitution $village_institution)
    {
        $village_institution->load('members');

        return Inertia::render('admin/village-institutions/edit', [
            'institution' => $village_institution,
        ]);
    }

    public function update(Request $request, VillageInstitution $village_institution)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'abbreviation' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'leader_name' => 'nullable|string|max:255',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            if ($village_institution->logo) {
                Storage::disk('public')->delete($village_institution->logo);
            }
            $path = $request->file('logo')->store('institutions', 'public');
            $validated['logo'] = $path;
        }

        $village_institution->update($validated);

        return redirect()->route('admin.village-institutions.index')->with('success', 'Lembaga Desa berhasil diperbarui.');
    }

    public function destroy(VillageInstitution $village_institution)
    {
        if ($village_institution->logo) {
            Storage::disk('public')->delete($village_institution->logo);
        }
        $village_institution->delete();

        return redirect()->route('admin.village-institutions.index')->with('success', 'Lembaga Desa berhasil dihapus.');
    }
}
