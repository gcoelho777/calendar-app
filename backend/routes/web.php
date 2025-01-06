<?php

use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/events', action: [EventController::class, 'index'])->name('events.index');
Route::post('/events', action: [EventController::class, 'store'])->name('events.store');
