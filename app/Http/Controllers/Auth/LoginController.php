<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;

class LoginController extends Controller
{
    public function create(): RedirectResponse|View
    {
        return view('auth.login');
    }

    public function login(Request $request): JsonResponse
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $request->session()->regenerate();
            $user = Auth::user();
            $request->session()->put('user', $user);

            return response()->json([
                'status' => 'success',
                'message' => 'You have successfully logged in. Redirecting...'
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials.'
            ]);
        }
    }
}
