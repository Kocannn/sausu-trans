<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InstitutionMember extends Model
{
    protected $fillable = ['village_institution_id', 'name', 'position', 'order'];

    public function institution()
    {
        return $this->belongsTo(VillageInstitution::class, 'village_institution_id');
    }
}
