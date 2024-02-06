<?php

namespace App\Http\Controllers;

use App\Models\Zona_Euskalmet;
use Illuminate\Http\Request;

class ZonaEuskalmetController extends Controller
{
    //
    public function getAll(){
        return Zona_Euskalmet::all();
    }   
}
