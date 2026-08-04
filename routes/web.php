<?php

use App\Http\Controllers\Admin\GalleryAlbumController;
use App\Http\Controllers\Admin\GalleryMediaController;
use App\Http\Controllers\Admin\InstitutionMemberController;
use App\Http\Controllers\Admin\NewsCategoryController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\PublicServiceController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VillageInstitutionController;
use App\Http\Controllers\Admin\VillageOfficialController;
use App\Http\Controllers\Admin\VillagePotentialController;
use App\Http\Controllers\Admin\VillageProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\Teams\TeamInvitationController;
use App\Http\Middleware\EnsureTeamMembership;
use Illuminate\Support\Facades\Route;

Route::get('/', [PublicController::class, 'index'])->name('home');
Route::get('/profil', [PublicController::class, 'profile'])->name('public.profile');
Route::get('/aparatur-desa', [PublicController::class, 'officials'])->name('public.officials');
Route::get('/lembaga-desa', [PublicController::class, 'institutions'])->name('public.institutions');
Route::get('/layanan', [PublicController::class, 'services'])->name('public.services');
Route::get('/berita', [PublicController::class, 'news'])->name('public.news.index');
Route::get('/berita/{slug}', [PublicController::class, 'newsDetail'])->name('public.news.show');
Route::get('/potensi', [PublicController::class, 'potentials'])->name('public.potentials');
Route::get('/galeri', [PublicController::class, 'gallery'])->name('public.gallery');
Route::get('/kontak', [PublicController::class, 'contact'])->name('public.contact');

Route::prefix('{current_team}')
    ->middleware(['auth', 'verified', EnsureTeamMembership::class])
    ->group(function () {
        Route::get('dashboard', DashboardController::class)->name('dashboard');
    });

// Admin Routes (Global, no team prefix)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('admin/village-profile', [VillageProfileController::class, 'edit'])->name('admin.village-profile.edit');
    Route::put('admin/village-profile', [VillageProfileController::class, 'update'])->name('admin.village-profile.update');
    Route::resource('admin/officials', VillageOfficialController::class)->names('admin.officials');
    Route::resource('admin/village-institutions', VillageInstitutionController::class)->names('admin.village-institutions');
    Route::post('admin/village-institutions/{village_institution}/members', [InstitutionMemberController::class, 'store'])->name('admin.institution-members.store');
    Route::put('admin/institution-members/{institution_member}', [InstitutionMemberController::class, 'update'])->name('admin.institution-members.update');
    Route::delete('admin/institution-members/{institution_member}', [InstitutionMemberController::class, 'destroy'])->name('admin.institution-members.destroy');
    Route::resource('admin/news-categories', NewsCategoryController::class)->names('admin.news-categories');
    Route::resource('admin/news', NewsController::class)->names('admin.news');
    Route::resource('admin/gallery-albums', GalleryAlbumController::class)->names('admin.gallery-albums');
    Route::resource('admin/gallery-media', GalleryMediaController::class)->only(['index', 'store', 'destroy'])->names('admin.gallery-media');
    Route::resource('admin/public-services', PublicServiceController::class)->names('admin.public-services');
    Route::resource('admin/village-potentials', VillagePotentialController::class)->names('admin.village-potentials');
    Route::resource('admin/users', UserController::class)->names('admin.users');
});

Route::middleware(['auth'])->group(function () {
    Route::get('invitations/{invitation}/accept', [TeamInvitationController::class, 'accept'])->name('invitations.accept');
    Route::delete('invitations/{invitation}', [TeamInvitationController::class, 'decline'])->name('invitations.decline');
});

require __DIR__.'/settings.php';
