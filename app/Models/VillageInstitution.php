<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VillageInstitution extends Model
{
    protected $fillable = ['name', 'abbreviation', 'description', 'leader_name', 'logo'];

    public function members()
    {
        return $this->hasMany(InstitutionMember::class, 'village_institution_id')->orderBy('order');
    }
}
