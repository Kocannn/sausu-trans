<?php

use Illuminate\Contracts\Console\Kernel;
use Illuminate\Http\Request;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Kernel::class)->bootstrap();

$request = Request::create('/admin/village-profile', 'PUT', [
    'name' => 'Desa Sausu Trans',
    'vision' => 'Visi Testing',
    'mission' => 'Misi Testing',
]);

// We need to bypass auth or simulate it.
// Easier just to trust the tinker test.
