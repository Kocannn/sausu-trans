<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

Route::get('/', [\App\Http\Controllers\PublicController::class, 'index'])->name('home');
Route::get('/profil', [\App\Http\Controllers\PublicController::class, 'profile'])->name('public.profile');
Route::get('/layanan', [\App\Http\Controllers\PublicController::class, 'services'])->name('public.services');
Route::get('/berita', [\App\Http\Controllers\PublicController::class, 'news'])->name('public.news.index');
Route::get('/berita/{slug}', [\App\Http\Controllers\PublicController::class, 'newsDetail'])->name('public.news.show');
Route::get('/potensi', [\App\Http\Controllers\PublicController::class, 'potentials'])->name('public.potentials');
Route::get('/galeri', [\App\Http\Controllers\PublicController::class, 'gallery'])->name('public.gallery');
Route::get('/kontak', [\App\Http\Controllers\PublicController::class, 'contact'])->name('public.contact');

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
    });

// Admin Routes (Global, no team prefix)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('admin/village-profile', [App\Http\Controllers\Admin\VillageProfileController::class, 'edit'])->name('admin.village-profile.edit');
    Route::put('admin/village-profile', [App\Http\Controllers\Admin\VillageProfileController::class, 'update'])->name('admin.village-profile.update');
    Route::resource('admin/officials', App\Http\Controllers\Admin\VillageOfficialController::class)->names('admin.officials');
    Route::resource('admin/news-categories', App\Http\Controllers\Admin\NewsCategoryController::class)->names('admin.news-categories');
    Route::resource('admin/news', App\Http\Controllers\Admin\NewsController::class)->names('admin.news');
    Route::resource('admin/gallery-albums', App\Http\Controllers\Admin\GalleryAlbumController::class)->names('admin.gallery-albums');
    Route::resource('admin/gallery-media', App\Http\Controllers\Admin\GalleryMediaController::class)->only(['index', 'store', 'destroy'])->names('admin.gallery-media');
    Route::resource('admin/public-services', App\Http\Controllers\Admin\PublicServiceController::class)->names('admin.public-services');
    Route::resource('admin/village-potentials', App\Http\Controllers\Admin\VillagePotentialController::class)->names('admin.village-potentials');
    Route::resource('admin/users', App\Http\Controllers\Admin\UserController::class)->names('admin.users');
});

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__.'/settings.php';
