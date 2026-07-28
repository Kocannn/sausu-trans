<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VillageProfile extends Model
{
    /** @use HasFactory<\Database\Factories\VillageProfileFactory> */
    use HasFactory;
    
    protected $guarded = [];

    protected $casts = [
        'social_links' => 'array',
        'leadership_timeline' => 'array',
        'demographics' => 'array',
    ];
}
