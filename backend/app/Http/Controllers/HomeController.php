<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

class HomeController extends BaseController
{
  public function getCurrentUser(Request $request)
  {
    return '123';
    return $request->all();
  }

  public function postCurrentUser(Request $request)
  {
    return 'post';
    return $request->all();
  }
}
