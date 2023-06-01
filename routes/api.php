<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\TodosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;

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

Route::middleware('web')->group(function () {
    Route::prefix('/user')->group(function () {
        Route::post('/create', [RegisterController::class, 'store']);
        Route::post('/auth', [LoginController::class, 'login']);
    });

    Route::prefix('/todo')->group(function () {
        Route::post('/create', [TodosController::class, 'store']);
        Route::get('/get', [TodosController::class, 'fetch']);
        Route::put('/update', [TodosController::class, 'update']);
        Route::put('/destroy', [TodosController::class, 'destroy']);
    });

});





