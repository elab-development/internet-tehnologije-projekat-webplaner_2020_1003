<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PlanerController;
use App\Http\Controllers\PlanerTypeController;
use App\Http\Controllers\SearchController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [UserController::class, 'logout']);

    //Planer Types
    Route::get('/planer-types', [PlanerTypeController::class, 'index']);
    Route::get('/planer-types/{id}', [PlanerTypeController::class, 'show']);
    Route::post('/planer-types', [PlanerTypeController::class, 'store']);
    Route::put('/planer-types/{id}', [PlanerTypeController::class, 'update']);
    Route::delete('/planer-types/{id}', [PlanerTypeController::class, 'destroy']);

    //Planers
    Route::resource('planers', PlanerController::class);
});

//Users
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

