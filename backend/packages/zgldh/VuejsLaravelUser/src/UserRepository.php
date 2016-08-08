<?php namespace zgldh\VuejsLaravelUser;

/**
 * Created by PhpStorm.
 * User: zhangwb-pc
 * Date: 2016/7/19
 * Time: 16:37
 */


class UserRepository implements UserRepositoryInterface
{

    public function getList()
    {
        $users = User::orderBy('created_at', 'desc')->get();
        return $users;
    }

    public function getOne($userId)
    {
        $user = User::find($userId);
        return $user;
    }

    public function create($userData)
    {
        $user = User::create([
            'name'     => $userData['name'],
            'email'    => $userData['email'],
            'password' => bcrypt($userData['password']),
        ]);
        return $user->id;
    }

    public function update($userData)
    {
        $user = User::find($userData['id']);

        if (\Gate::denies('update-user', $user)) {
            abort(403);
        }
        $user->name = $userData['name'];
        $user->email = $userData['email'];
        $user->save();
    }

    public function remove($userId)
    {
        $user = User::find($userId);
        if ($user) {
            $user->delete();
        }
    }
}