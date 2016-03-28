<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class WebpackDev
{
  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request $request
   * @param  \Closure $next
   * @param  string|null $guard
   * @return mixed
   */
  public function handle($request, Closure $next, $guard = null)
  {
    $response = $next($request);
    if (env('APP_ENV') !== 'live') {
      $response->headers->add([
        'Access-Control-Allow-Origin' => $request->headers->get('Origin')
      ]);
    }
    return $response;
  }
}
