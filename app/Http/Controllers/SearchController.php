<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlanerCollection;
use App\Models\Planer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SearchController extends Controller
{
    public function searchPlaners(Request $request)
    {
        $query = Planer::query();

        $page = $request->has('page') ? $request->page : 1;
        $size = $request->has('size') ? $request->size : 10;

        if ($request->has('search')) {
            $query->where('name', 'like', '%' . $request->search . '%')->orderByDesc('created_at');
        }

        if(Auth::user()->role->id == 1){
            $query->with('user');
        }

        $planers = $query->paginate($size, ['*'], 'page', $page);

        return response()->json([
            'planers' => new PlanerCollection($planers),
            'size' => $planers->perPage(),
            'total' => $planers->total(),
            'current_page' => $planers->currentPage(),
            'last_page' => $planers->lastPage()
        ]);
    }
}
