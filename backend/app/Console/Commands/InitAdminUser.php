<?php

namespace App\Console\Commands;

use Bican\Roles\Models\Role;
use Illuminate\Console\Command;
use Illuminate\Foundation\Inspiring;
use zgldh\VuejsLaravelUser\User;

class InitAdminUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'init:admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Insert an Admin User';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $name = $this->ask('What is admin user name?');
        $password = $this->secret('What is the password?');

        $adminRole = Role::where('name', 'Admin')->first();
        if (!$adminRole) {
            $adminRole = Role::create([
                'name'        => 'Admin',
                'slug'        => 'admin',
                'description' => '', // optional
                'level'       => 1, // optional, set to 1 by default
            ]);
            $this->comment("Admin role created.");
        } else {
            $this->comment("Admin role retrieved.");
        }

        $user = User::where('name', $name)->first();
        if (!$user) {
            $user = User::create([
                'name'     => $name,
                'password' => bcrypt($password),
            ]);

            $this->comment("User " . $name . " created.");
        } else {
            $this->comment("User " . $name . " retrieved.");
        }

        $user->attachRole($adminRole);
        $this->comment($name . " has been set to Admin role.");
    }
}
