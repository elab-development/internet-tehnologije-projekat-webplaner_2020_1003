<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new UserCollection(User::all());
    }


    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Store a newly created resource in storage.
     *  @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullName' => 'required|string|max:255',
            'username' => 'required|string|unique:users|max:255',
            'email' => 'required|email|unique:users',
        ]);

        if ($validator->fails())
            return response()->json($validator->errors());

        $user = User::create([
            'username' => $request->username,
            'full_name' => $request->fullName,
            'email' => $request->email,
            'password' => Hash::make('admin123'),
            'role_id' => 2
        ]);

        return response()->json(['Korisnik je uspešno kreiran.', new UserResource($user)]);
    }

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [ 
            'fullName' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'email' => 'required|email|unique:users,email,' . $user->id
        ]);
        

        if ($validator->fails())
            return response()->json($validator->errors());

        $user->username = $request->username;
        $user->full_name = $request->fullName;
        $user->email = $request->email;
        $user->role_id = $request->roleId;

        $user->save();

        return response()->json(['Korisnik je uspešno izmenjen.', new UserResource($user)]);
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
     
     public function destroy(User $user)
     {
        if($user->hasAnyPlaners())
        {   
            return response()->json(['Korisnik ne može biti obrisan jer ima planere.']);   
        }

         $user->delete();
         return response()->json(['Korisnik je uspešno obrisan.']);
     }
}
