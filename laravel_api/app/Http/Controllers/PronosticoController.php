<?php

namespace App\Http\Controllers;

use App\Models\Localidad;
use App\Models\Pronostico;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PronosticoController extends Controller
{
    //
    public function getByIds(Request $request)
    {
        $municipios = $request['municipios'];
        $listaMunicipios = explode(',', $municipios);

        $ultimosRegistros = Pronostico::whereIn('localidad_id', $listaMunicipios)
            ->orderBy('fecha', 'desc')
            ->orderBy('hora', 'desc')
            ->take(count($listaMunicipios))
            ->get();

        foreach ($ultimosRegistros as $ultimoRegistro) {
            $ultimoRegistro -> localidad_id = Localidad::find($ultimoRegistro -> localidad_id);
        }    
        return response()->json([
            'mediciones' => $ultimosRegistros
        ]);

    }

    public function pronosticoHoy(Request $request)
    {
        $fechaHoy = Carbon::now()->toDateString();
        $idLocalizacion = $request['id'];

        $registrosPorHora = Pronostico::where('localidad_id', $idLocalizacion)
            ->where('fecha', $fechaHoy)
            ->orderBy('hora')
            ->get();

        return response()->json([
            'registros' => $registrosPorHora
        ]);
    }

}
