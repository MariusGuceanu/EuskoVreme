<?php

namespace App\Http\Controllers;

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

        return response()->json([
            'mediciones' => $ultimosRegistros
        ]);
    }

    public function pronosticoPorHora(Request $request)
    {
        $fechaHoy = Carbon::now()->toDateString();
        $fechaInicio = $request['fecha'];
        $idLocalizacion = $request['id'];

        $registrosPorHora = Pronostico::where('localidad_id', $idLocalizacion)
            ->whereBetween('fecha', [$fechaInicio, $fechaHoy])
            ->orderBy('fecha')
            ->orderBy('hora')
            ->get()
            ->groupBy(function ($date) {
                return Carbon::parse("{$date->fecha} {$date->hora}")->format('Y-m-d H:00:00');
            })
            ->map(function ($group) {
                return $group->first();
            });

        return response()->json([
            'registros' => $registrosPorHora
        ]);
    }

}
