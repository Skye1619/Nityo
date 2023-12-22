<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\ProductModel;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = ProductModel::orderBy('id', 'desc')->get();

        return $product;
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
        $request->validate([
            'name' => 'required|string',
            'unit' => 'required|string',
            'price' => 'required|numeric',
            'date_of_expiry' => 'required|date_format:Y-m-d',
            'available_inventory' => 'required|integer',
            'image' => 'string',
        ]);
        
        $product = ProductModel::create([
            'name' => $request->input('name'),
            'unit' => $request->input('unit'),
            'price' => $request->input('price'),
            'date_of_expiry' => $request->input('date_of_expiry'),
            'available_inventory' => $request->input('available_inventory'),
            'image' => $request->input('image')
        ]);

        return new ProductResource($product);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string',
            'unit' => 'required|string',
            'price' => 'required|numeric',
            'date_of_expiry' => 'required|date_format:Y-m-d',
            'available_inventory' => 'required|integer',
            'image' => 'string',
        ]);

        $info = ProductModel::find($id);
        if (!$info) {
            $response = [
                'code' => 404,
                'message' => 'Info not found',
            ];

            return $response;
        }

        $info->update($validatedData);
    
        return new ProductResource($info);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = ProductModel::find($id);
        if (!$product) {
            $response = [
                'code' => 404,
                'message' => 'Info not found / deleted'
            ];

            return $response;
        }
        $product->delete();

        return new ProductResource($product);
    }
}
