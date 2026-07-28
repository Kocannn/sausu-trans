<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VillageProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class VillageProfileController extends Controller
{
    public function edit(): Response
    {
        $profile = VillageProfile::first() ?? new VillageProfile();
        return Inertia::render('admin/village-profile/edit', [
            'profile' => $profile
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'history' => 'nullable|string',
            'vision' => 'nullable|string',
            'mission' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'map_embed' => 'nullable|string',
            'logo' => 'nullable|image|max:2048',
            'social_links' => 'nullable|array',
            'leadership_timeline' => 'nullable|array',
            'population' => 'nullable|string|max:255',
            'area_size' => 'nullable|string|max:255',
            'established_year' => 'nullable|string|max:255',
            'demographics' => 'nullable|array',
        ]);

        $profile = VillageProfile::first() ?? new VillageProfile();
        
        if ($request->hasFile('logo')) {
            if ($profile->logo && \Illuminate\Support\Facades\Storage::disk('public')->exists($profile->logo)) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($profile->logo);
            }
            $validated['logo'] = $request->file('logo')->store('profile', 'public');
        } else {
            unset($validated['logo']);
        }

        $profile->fill($validated);
        $profile->save();

        return redirect()->back()->with('success', 'Profil desa berhasil diperbarui.');
    }
}
