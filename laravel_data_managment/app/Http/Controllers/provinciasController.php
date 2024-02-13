<?php

namespace App\Http\Controllers;

use App\Models\Provincia;
use Illuminate\Http\Request;

class provinciasController extends Controller
{
    //
    public function index()
    {
        //
        return Provincia::all();
    }

    public function getByName($name)
    {
        $resultado = Provincia::where('Nombre', '=', $name)->get();

        return $resultado;
    }

    public function getById($id)
    {
        $resultado = Provincia::where('id', '=', $id)->get();

        return $resultado;
    }
}
