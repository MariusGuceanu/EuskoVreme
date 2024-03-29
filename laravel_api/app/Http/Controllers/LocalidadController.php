<?php

namespace App\Http\Controllers;

use App\Models\Localidad;
use Illuminate\Http\Request;

class LocalidadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Localidad $localidad)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Localidad $localidad)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Localidad $localidad)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Localidad $localidad)
    {
        //
    }

    public function getAll()
    {
        return Localidad::all();
    }

    public function getByName($name)
    {
        $resultado = Localidad::where('localidad_id', '=', $name)->get();

        return $resultado;
    }

    public function getById($id)
    {
        $zonaEuskalmetController = new ZonaEuskalmetController();
        $localizacionEuskalmetJSON = Localidad::where('id', '=', $id)->get();
        $localizacionEuskalmet = json_decode($localizacionEuskalmetJSON, true);
        $localizacion = $localizacionEuskalmet[0];
        $localizacion['zona_id'] = $zonaEuskalmetController->getById($localizacion['zona_id']);

        return $localizacion;
    }
}
