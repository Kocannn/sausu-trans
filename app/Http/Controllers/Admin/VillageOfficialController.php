<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VillageOfficial;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VillageOfficialController extends Controller
{
    public function index()
    {
        $officials = VillageOfficial::orderBy('order')->get();

        return Inertia::render('admin/officials/index', [
            'officials' => $officials,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/officials/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'nullable|image|max:2048',
            'order' => 'nullable|integer|min:0',
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('officials', 'public');
        }

        VillageOfficial::create($validated);

        return redirect()->route('admin.officials.index')->with('success', 'Aparatur berhasil ditambahkan.');
    }

    public function edit(VillageOfficial $official)
    {
        return Inertia::render('admin/officials/edit', [
            'official' => $official,
        ]);
    }

    public function update(Request $request, VillageOfficial $official)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'nullable|image|max:2048',
            'order' => 'nullable|integer|min:0',
        ]);

        if ($request->hasFile('photo')) {
            if ($official->photo && Storage::disk('public')->exists($official->photo)) {
                Storage::disk('public')->delete($official->photo);
            }
            $validated['photo'] = $request->file('photo')->store('officials', 'public');
        } else {
            unset($validated['photo']);
        }

        $official->update($validated);

        return redirect()->route('admin.officials.index')->with('success', 'Aparatur berhasil diperbarui.');
    }

    public function destroy(VillageOfficial $official)
    {
        if ($official->photo && Storage::disk('public')->exists($official->photo)) {
            Storage::disk('public')->delete($official->photo);
        }
        $official->delete();

        return redirect()->route('admin.officials.index')->with('success', 'Aparatur berhasil dihapus.');
    }
}
