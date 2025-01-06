<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;



/*
*   Cadastro e Autenticação de Usuários
*/

Route::post("/registrar", action: [AuthController::class, 'register']);
Route::post("/login", action: [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function() {
    Route::get('/usuario', [AuthController::class, 'show']);
    Route::put('/usuario', [AuthController::class, 'update']);
    Route::delete('/usuario', [AuthController::class, 'destroy']);
});


/*
*   CRUD de Eventos
*
*/
Route::middleware('auth:sanctum')->group(function() {
    Route::resource('eventos', EventController::class);
});