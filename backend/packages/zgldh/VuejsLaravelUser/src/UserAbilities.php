<?php namespace zgldh\VuejsLaravelUser;

class UserAbilities
{
    public function updateUser(User $user, User $targetUser)
    {
        return $user->id === $targetUser->id;
    }
}