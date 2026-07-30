<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InstitutionMember;
use App\Models\VillageInstitution;
use Illuminate\Http\Request;

class InstitutionMemberController extends Controller
{
    public function store(Request $request, VillageInstitution $village_institution)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'order' => 'required|integer',
        ]);

        $village_institution->members()->create($validated);

        return back()->with('success', 'Anggota berhasil ditambahkan.');
    }

    public function update(Request $request, InstitutionMember $institution_member)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'order' => 'required|integer',
        ]);

        $institution_member->update($validated);

        return back()->with('success', 'Data anggota berhasil diperbarui.');
    }

    public function destroy(InstitutionMember $institution_member)
    {
        $institution_member->delete();

        return back()->with('success', 'Anggota berhasil dihapus.');
    }
}
