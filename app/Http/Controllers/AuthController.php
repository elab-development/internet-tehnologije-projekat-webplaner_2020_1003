<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|unique:users',
            'fullName' => 'required|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'confirm_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = User::create([
            'username' => $request->username,
            'full_name' => $request->fullName,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        $token = $user->createToken('authToken')->plainTextToken;

        return  response()->json(['access_token' => $token, 'data' => new UserResource($user)]);
    }

    public function login(Request $request)
    {
        $success = Auth::attempt([
            'email' => $request->email,
            'password' => $request->password,
        ]);

        if (!$success) {
            return response()->json(['Neispravni podaci'], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json(['message' => 'Uspesno logovanje', 'data' => new UserResource($user), 'token' => $token]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Uspesno odjavljivanje']);
    }
}
