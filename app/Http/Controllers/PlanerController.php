<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Planer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\PlanerResource;
use App\Http\Resources\PlanerCollection;
use App\Models\PlanerType;
use Illuminate\Support\Facades\Validator;


class PlanerController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new PlanerCollection(Planer::all());
    }

    /**
     * Show the form for creating a new resource.
     *  @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *  @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:planers|max:255',
            'description' => 'required|string|min:5',
            'price' => 'required',
            'planerTypeId' => 'required'
        ]);

        if ($validator->fails())
            return response()->json($validator->errors());

        $planer = Planer::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'planer_type_id' => $request->planerTypeId,
            'user_id' => Auth::user()->id,
        ]);

        return response()->json(['message' => 'Planer je uspesno dodat.', 'data' => new PlanerResource($planer)]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Planer $planer)
    {
        return new PlanerResource($planer);
    }

    /**
     * Show the form for editing the specified resource.
     * @param  \App\Models\Plamer  $planer
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Planer  $planer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Planer $planer)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:planers,name,' . $planer->id,
            'description' => 'required|string|min:5',
            'price' => 'required',
            'planerTypeId' => 'required'
        ]);

        if ($validator->fails())
            return response()->json($validator->errors());

        $planer->name = $request->name;
        $planer->description = $request->description;
        $planer->price = $request->price;
        $planer->planer_type_id = $request->planerTypeId;
        $planer->user_id = Auth::user()->id;

        $planer->save();

        return response()->json(['message' => 'Planer je uspesno izmenjen.', 'data' => new PlanerResource($planer)]);
    }

    /**
     * Remove the specified resource from storage.
     * 
     * @param  \App\Models\Planer  $planer
     * @return \Illuminate\Http\Response
     */

    public function destroy(Planer $planer)
    {
        $planer->delete();
        return response()->json(['message' => 'Planer je uspesno obrisan.']);
    }
}
