<?php namespace zgldh\VuejsLaravelUser\Controllers;

use App\Http\Controllers\BaseController;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\Else_;
use zgldh\VuejsLaravelUser\User;
use zgldh\VuejsLaravelUser\UserPermissionRequest;
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
    public function getCurrentUserPolicyPermission(UserPermissionRequest $request, UserRepositoryInterface $repository, $permissionName)
    {
        $user = $repository->getOne(\Auth::id());
        $model = $request->getModel();
        if ($model === null) {
            // There should be a model, but can't be found in db.
            return ['result' => false];
        } elseif ($model === false) {
            // Request doesn't need model
            return ['result' => $user->hasPermission($permissionName)];
        } else {
            // Model is needed and the model is retrieved.
            return ['result' => $user->allowed($permissionName, $model)];
        }
    }

    public function getCurrentUserPolicyRole(Request $request, UserRepositoryInterface $repository, $roleName)
    {
        $user = $repository->getOne(\Auth::id());
        if ($user && $user->hasRole($roleName)) {
            return ['result' => true];
        }
        return ['result' => false];
    }

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