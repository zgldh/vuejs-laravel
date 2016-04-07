<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;

class HomeController extends BaseController
{
  public function getCurrentUser(Request $request)
  {
    return array_merge($request->all(), [__METHOD__]);
  }

  public function postCurrentUser(Request $request)
  {
    return array_merge($request->all(), [__METHOD__]);
  }

  public function deleteCurrentUser(Request $request)
  {
    return array_merge($request->all(), [__METHOD__]);
  }
}
