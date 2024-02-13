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
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('user')->middleware('auth')->group(function() {
    Route::patch('/update', [UsersController::class, 'update'])->name('update-user');
});

Route::prefix('dev-connect')->middleware('auth')->group(function() {
    Route::get('/load-users', [DevConnectController::class, 'index'])->name('load-users');
});

Route::prefix('follow')->middleware('auth')->group(function() {
    Route::post('/', [FollowController::class, 'followUser'])->name('follow-user');
});

require __DIR__.'/auth.php';
