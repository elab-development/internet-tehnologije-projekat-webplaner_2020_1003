<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlanerTypeCollection;
use App\Http\Resources\PlanerTypeResource;
use App\Models\PlanerType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PlanerTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new PlanerTypeCollection(PlanerType::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:planer_types|max:255'
        ]);

        if ($validator->fails())
            return response()->json($validator->errors());

        $planerType = PlanerType::create([
            'name' => $request->name
        ]);

        return response()->json(['message' => 'Tip planera je uspešno dodat.', "data" => new PlanerTypeResource($planerType)]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $planerType = PlanerType::find($id);

        if (empty($planerType)) {
            return response()->json(['error' => 'Planer tip ne postoji.'], 404);
        }

        return new PlanerTypeResource($planerType);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $planerType = PlanerType::find($id);

        if (empty($planerType)) {
            return response()->json(['error' => 'Tip planera nije pronađen.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255'
        ]);

        if ($validator->fails())
            return response()->json($validator->errors());

        $planerType->name = $request->name;

        $planerType->save();

        return response()->json(['message' => 'Tip planera je uspešno izmenjen.', 'data' => new PlanerTypeResource($planerType)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $planerType = PlanerType::find($id);

        if ($planerType) {
            if ($planerType->hasAnyPlaners()) {
                return response()->json(['error' => 'Tip planera ne može biti obrisan jer ima planere.']);
            }

            $planerType->delete();
            return response()->json(['message' => 'Tip planera je uspešno obrisan.']);
        } else {
            return response()->json(['error' => 'Tip planera nije pronađen.'], 404);
        }
    }
}
