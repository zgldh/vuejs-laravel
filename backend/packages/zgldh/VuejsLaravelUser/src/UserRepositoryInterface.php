<?php namespace zgldh\VuejsLaravelUser;

/**
 * Created by PhpStorm.
 * User: zhangwb-pc
 * Date: 2016/7/19
 * Time: 16:37
 */


interface UserRepositoryInterface
{
    public function getList();

    public function getOne($userId):User;

    public function create($userData);

    public function update($userData);

    public function remove($userId);
}