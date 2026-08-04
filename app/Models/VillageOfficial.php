<?php

namespace App\Models;

use Database\Factories\VillageOfficialFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VillageOfficial extends Model
{
    /** @use HasFactory<VillageOfficialFactory> */
    use HasFactory;

    protected $guarded = [];
}
