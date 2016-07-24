<?php namespace zgldh\VuejsLaravelUser;

use Illuminate\Contracts\Auth\Access\Gate;
use Illuminate\Support\ServiceProvider;

/**
 * Created by PhpStorm.
 * User: zhangwb-pc
 * Date: 2016/7/19
 * Time: 15:24
 */
class UserServiceProvider extends ServiceProvider
{

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        // TODO: Implement register() method.
        require __DIR__ . '/routes.php';
        $this->app->singleton(UserRepositoryInterface::class, UserRepository::class);
    }

    public function boot(Gate $gate)
    {
        $gate->define('list-users', UserAbilities::class . '@updateUser');
    }
}