<?php

    /*
    |--------------------------------------------------------------------------
    | Routes File
    |--------------------------------------------------------------------------
    |
    | Here is where you will register all of the routes in an application.
    | It's a breeze. Simply tell Laravel the URIs it should respond to
    | and give it the controller to call when that URI is requested.
    |
    */

    Route::get('/', function () {
        return view('welcome');
    });

    /*
    |--------------------------------------------------------------------------
    | Application Routes
    |--------------------------------------------------------------------------
    |
    | This route group applies the "web" middleware group to every route
    | it contains. The "web" middleware group is defined in your HTTP
    | kernel and includes session state, CSRF protection, and more.
    |
    */

    Route::group(['prefix' => 'api', 'middleware' => ['web']], function () {
        //
        Route::post('auth/register', 'Auth\AuthController@postRegister');
        Route::post('auth/login', 'Auth\AuthController@postLogin');
        Route::get('auth/logout', 'Auth\AuthController@getLogout');
        Route::get('current_user', 'HomeController@getCurrentUser');
        Route::post('current_user', 'HomeController@postCurrentUser');
        Route::delete('current_user', 'HomeController@deleteCurrentUser');
    });
