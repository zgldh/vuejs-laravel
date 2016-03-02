<?php
return [
    'defaults' => [
        'guard' => env('AUTH_GUARD', 'user'),
    ],
    'guards' => [
        'user' => [
            'driver' => 'jwt',
            'provider' => 'user',
        ],
//        'client' => [
//            'driver' => 'jwt',
//            'provider' => 'client',
//        ],
    ],
    'providers' => [
        'user' => [
            'driver' => 'eloquent',
            'model' => \App\User::class
        ],
//        'client' => [
//            'driver' => 'eloquent',
//            'model' => App\Models\Client::class
//        ]
    ]
];