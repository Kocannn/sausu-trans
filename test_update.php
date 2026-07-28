<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$request = Illuminate\Http\Request::create('/admin/village-profile', 'PUT', [
    'name' => 'Desa Sausu Trans',
    'vision' => 'Visi Testing',
    'mission' => 'Misi Testing',
]);

// We need to bypass auth or simulate it. 
// Easier just to trust the tinker test. 
