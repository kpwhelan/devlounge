<?php

use App\Http\Controllers\DevConnectController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dev-connect', function() {
    return Inertia::render('DevConnect');
})->middleware(['auth'])->name('dev-connect');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile', [ProfileController::class, 'updateTags'])->name('profile.update.tags');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::put('/profile/detach/tag', [ProfileController::class, 'detachTag'])->name('profile.detach.tag');
    Route::put('/profile/add/tag', [ProfileController::class, 'addTag'])->name('profile.add.tag');
    Route::get('/profile/{searchTerm}', [ProfileController::class, 'searchTags'])->name('profile.search.tags');
});

Route::prefix('user')->middleware('auth')->group(function() {
    Route::patch('/update', [UsersController::class, 'update'])->name('update-user');
    Route::post('/update-profile-picture', [UsersController::class, 'updateProfilePicture'])->name('update-profile-picture');
});

Route::prefix('dev-connect')->middleware('auth')->group(function() {
    Route::get('/load-users', [DevConnectController::class, 'index'])->name('load-users');
});

Route::post('/follow/{user_id}', [FollowController::class, 'followUser'])->middleware('auth')->name('follow-user');
Route::post('/unfollow/{user_id}', [FollowController::class, 'unfollowUser'])->middleware('auth')->name('unfollow-user');

require __DIR__.'/auth.php';
