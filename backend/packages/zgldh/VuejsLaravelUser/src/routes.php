<?php

/*
|--------------------------------------------------------------------------
| User package
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['prefix' => 'api', 'middleware' => ['web']], function () {
    //
    Route::resource('user', 'zgldh\VuejsLaravelUser\Controllers\UserController');

    Route::group([
        'prefix' => 'admin'
    ], function () {

    });
});
