<?php

namespace App\Http\Controllers;

use App\Models\Municipio;
use Illuminate\Http\Request;

class MunicipioController extends Controller
{
    //
    public function index()
    {
        $municipios = Municipio::all();
        $zonaEltiempoController = new provinciasController();
        $localizacionEuskalmetController = new LocalidadController();

        foreach ($municipios as $municipio) {
            $municipio->id_provincia = $zonaEltiempoController->getById($municipio->id_provincia);
            $municipio->id_localidad = $localizacionEuskalmetController->getById($municipio->id_localidad);
        }

        return response()->json([
            'message' => 'okey',
            'localizaciones' => $municipios
        ], 200);
    }

    public function getAll()
    {
        return Municipio::all();
    }
}
