<?php

namespace Database\Seeders;

use App\Enums\TeamRole;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Buat roles berdasarkan PRD (Spatie)
        $superAdminRole = Role::firstOrCreate(['name' => 'Super Admin']);
        $editorRole = Role::firstOrCreate(['name' => 'Editor']);

        // 2. Buat tim utama (Desa)
        $team = Team::firstOrCreate(
            ['slug' => 'pemerintah-desa-sausu-trans'],
            [
                'name' => 'Pemerintah Desa Sausu Trans',
                'is_personal' => false,
            ]
        );

        // 3. Buat Akun Super Admin
        $superAdmin = User::firstOrCreate(
            ['email' => 'admin@sausutrans.desa.id'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('password'),
                'current_team_id' => $team->id,
                'email_verified_at' => now(),
            ]
        );
        
        $superAdmin->assignRole($superAdminRole);
        $team->members()->syncWithoutDetaching([
            $superAdmin->id => ['role' => TeamRole::Owner->value]
        ]);

        // 4. Buat Akun Editor
        $editor = User::firstOrCreate(
            ['email' => 'editor@sausutrans.desa.id'],
            [
                'name' => 'Editor Konten',
                'password' => Hash::make('password'),
                'current_team_id' => $team->id,
                'email_verified_at' => now(),
            ]
        );
        
        $editor->assignRole($editorRole);
        $team->members()->syncWithoutDetaching([
            $editor->id => ['role' => TeamRole::Member->value]
        ]);
    }
}
