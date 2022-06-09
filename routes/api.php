<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BeaconController;
use App\Http\Controllers\PresenceController;
use App\Http\Controllers\PresencesDetailController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(
    [
        'middleware' => 'api',
        'prefix' => 'auth',
    ],
    function ($router) {
        Route::post('login', [AuthController::class, 'login']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::get('me', [AuthController::class, 'me']);
    }
);

Route::group(
    [
        'middleware' => 'api',
        'prefix' => 'beacon',
    ],
    function ($router) {
        Route::get("/", [BeaconController::class, 'index']);
        Route::post("/create", [BeaconController::class, 'store']);
        Route::post("/validate-schedule", [
            BeaconController::class,
            'searchClassAndSchedule',
        ]);
    }
);

Route::group(
    [
        'middleware' => 'api',
        'prefix' => 'presence',
    ],
    function ($router) {
        Route::post("/open", [PresenceController::class, 'store'])->middleware(
            'auth'
        );
        Route::post("/create", [
            PresencesDetailController::class,
            'store',
        ])->middleware('auth');
    }
);
