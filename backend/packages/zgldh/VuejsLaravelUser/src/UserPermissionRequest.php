<?php
/**
 * Created by PhpStorm.
 * User: zhangwb-pc
 * Date: 2016/8/8
 * Time: 17:49
 */

namespace zgldh\VuejsLaravelUser;


use Illuminate\Http\Request;

class UserPermissionRequest extends Request
{
    public function getModel()
    {
        if ($this->has('_modelClass') && $this->has('_modelId')) {
            $model = \App::make($this->get('_modelClass'));
            $model = $model->find($this->get('_modelId'));
            if ($model) {
                return $model;
            }
            return null;
        }
        return false;
    }
}