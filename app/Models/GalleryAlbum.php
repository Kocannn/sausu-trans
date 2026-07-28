<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryAlbum extends Model
{
    protected $guarded = [];

    public function media()
    {
        return $this->hasMany(GalleryMedia::class);
    }
}
