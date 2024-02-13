<?php

namespace App\Console\Commands;

use App\Http\Controllers\LocalidadController;
use App\Http\Controllers\MunicipioController;
use App\Http\Controllers\provinciasController;
use App\Models\Pronostico;
use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Console\Command;

class fetchPronostico extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-pronostico';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando para guardar los datos del pronostico de los municipios en la base de datos';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $municipiosController = new MunicipioController();
        $provinciasController = new provinciasController();

        $municipiosJSON = $municipiosController->getAll();
        $municipios = json_decode($municipiosJSON, true);

        foreach($municipios as $municipio) {
            $zonaElTiempoJSON = $provinciasController->getById($municipio['id_provincia']);

            $zonaElTiempo = json_decode($zonaElTiempoJSON, true);

            $apiUrl = 'https://www.el-tiempo.net/api/json/v2/provincias/' . $zonaElTiempo[0]['codProv'] . '/municipios' . '/' . $municipio['codigoIne'];

            $client = new Client();

            $response = $client->get($apiUrl);

            $data = json_decode($response->getBody(), true);

            $pronostico = new Pronostico();
            $pronostico->localidad_id = $municipio['id'];
            $pronostico->fecha = $data['fecha'];
            $horaActual = Carbon::now();
            $pronostico->hora = $horaActual->toTimeString();
            $pronostico->temperatura_actual = $data['temperatura_actual'];
            $pronostico->estado = $data['stateSky']['description']; 
            $pronostico->humedad = $data['humedad'] == 'Ip' ? '0' : $data['humedad'];
            $pronostico->viento_velocidad = $data['viento'];
            $pronostico->viento_direccion = $data['pronostico']['hoy']['viento'][0]['direccion'];
            $pronostico->precipitacion = $data['precipitacion'] == 'Ip' 
                ? 0 + rand(0, 200) / 100
                : $data['precipitacion'] + rand(0, 200) / 100;

            $pronostico->save();
        }
    }
}
