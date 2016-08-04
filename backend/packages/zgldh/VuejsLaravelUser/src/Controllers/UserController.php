<?php namespace zgldh\VuejsLaravelUser\Controllers;

use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;
use zgldh\VuejsLaravelUser\User;
use zgldh\VuejsLaravelUser\UserRepository;
use zgldh\VuejsLaravelUser\UserRepositoryInterface;

/**
 * Created by PhpStorm.
 * User: zhangwb-pc
 * Date: 2016/7/19
 * Time: 15:34
 */
class UserController extends BaseController
{
    public function getCurrentUser(Request $request, UserRepositoryInterface $repository)
    {
        $user = $repository->getOne(\Auth::id());
        return $user;
    }

    public function index(Request $request, UserRepositoryInterface $repository)
    {
        $users = $repository->getList();
        return $users;
    }

    public function show($userId, Request $request, UserRepositoryInterface $repository)
    {
        $user = $repository->getOne($userId);
        return $user;
    }

    public function store(Request $request, UserRepositoryInterface $repository)
    {
        $userId = $repository->create($request->all());
        return $userId;
    }

    public function update($userId, Request $request, UserRepositoryInterface $repository)
    {
        $requestData = $request->all();
        $requestData['id'] = $userId;
        $repository->update($requestData);
        return "true";
    }

    public function destroy($userId, Request $request, UserRepositoryInterface $repository)
    {
        $repository->remove($userId);
        return "true";
    }

//    public function create(Request $request, UserRepository $repository)
//    {
//        return $request->create($request);
//    }


//    public function edit(Request $request, UserRepository $repository)
//    {
//        return $request->all();
//    }

}