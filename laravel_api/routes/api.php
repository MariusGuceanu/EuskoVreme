<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MunicipioController;
use App\Http\Controllers\PronosticoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);


Route::post('register', [AuthController::class, 'register']);

Route::get('municipios', [MunicipioController::class, 'index']);
Route::get('pronosticosHoy/{id}', [PronosticoController::class, 'PronosticoHoy']);
Route::middleware('auth:api')->group(function () {
    Route::get('pronosticos/{municipios}', [PronosticoController::class, 'getByIds']);
});