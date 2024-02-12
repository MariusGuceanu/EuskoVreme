<?php

namespace App\Http\Controllers;

use App\Console\Commands\fetchLocalidad;
use Illuminate\Http\Request;

class LocalidadController extends Controller
{
    //
    public function getAll()
    {
        return fetchLocalidad::all();
    }
}
