<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PlanerController;
use App\Http\Controllers\PlanerTypeController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use App\Http\Resources\UserCollection;

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

//Auth
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/planers', [PlanerController::class, 'index']);
Route::get('/planer-types', [PlanerTypeController::class, 'index']);
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    //Planer Types
    
    Route::get('/planer-types/{id}', [PlanerTypeController::class, 'show'])->middleware('checkRole:1');
    Route::post('/planer-types', [PlanerTypeController::class, 'store'])->middleware('checkRole:1');
    Route::put('/planer-types/{id}', [PlanerTypeController::class, 'update'])->middleware('checkRole:1');
    Route::delete('/planer-types/{id}', [PlanerTypeController::class, 'destroy'])->middleware('checkRole:1');

    //Search
    Route::get('/search/planers', [SearchController::class, 'searchPlaners'])->middleware('checkRole:1,2');

    //Planers
    
    Route::get('/planers/{id}', [PlanerController::class, 'show'])->middleware('checkRole:1');
    Route::post('/planers', [PlanerController::class, 'store'])->middleware('checkRole:1');
    Route::put('/planers/{id}', [PlanerController::class, 'update'])->middleware('checkRole:1');
    Route::delete('/planers/{id}', [PlanerController::class, 'destroy'])->middleware('checkRole:1');

    //Users
    Route::resource('/users', UserController::class)->middleware('checkRole:1');

});
