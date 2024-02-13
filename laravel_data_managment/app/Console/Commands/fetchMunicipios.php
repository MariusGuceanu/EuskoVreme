<?php

namespace App\Console\Commands;

use App\Http\Controllers\LocalidadController;
use App\Http\Controllers\provinciasController;
use App\Http\Controllers\ZonaEuskalmetController;
use App\Models\Localidad;
use App\Models\Municipio;
use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class fetchMunicipios extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-municipios';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando para guardar los datos de los municipios de la API de El-tiempo en la BBDD, haciendo referencia a las localidades de euskalmet';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $provinciasController = new provinciasController();
        $localidadEuskalmetController = new LocalidadController();
        $zonasElTiempo = $provinciasController->index();

        $provincias = ['01', '48', '20'];
        $municipiosSeleccionados = [
            'Vitoria-Gasteiz' => 'gasteiz',
            'Irun' => 'irun',
            'Hondarribia' => 'hondarribia',
            'Oiartzun' => 'oiartzun',
            'Donostia/San Sebastián' => 'donostia',
            'Bilbao' => 'bilbao'
        ];

        foreach ($provincias as $provincia) {

            $apiUrl = 'https://www.el-tiempo.net/api/json/v2/provincias/' . $provincia . '/municipios';

            $client = new Client();

            $response = $client->get($apiUrl);

            $data = json_decode($response->getBody(), true);

            $municipios = $data['municipios'];
            foreach ($municipios as $municipio) {

                if (!in_array($municipio['NOMBRE'], array_keys($municipiosSeleccionados)))
                    continue;
                $municipioET = new Municipio();
                $municipioET->nombreMunicipio = $municipiosSeleccionados[$municipio['NOMBRE']];
                $municipioET->latitud = $municipio['LATITUD_ETRS89_REGCAN95'];
                $municipioET->longitud = $municipio['LONGITUD_ETRS89_REGCAN95'];
                $municipioET->codigoIne = substr($municipio['CODIGOINE'], 0, 5);
                $provinciaJSON = $provinciasController->getByName($municipio['NOMBRE_PROVINCIA']);
                $provinciaET = json_decode($provinciaJSON, true);
                $municipioET->id_provincia = $provinciaET[0]['id'];
                $zonaEuskalmetJSON = $localidadEuskalmetController->getByName($municipiosSeleccionados[$municipio['NOMBRE']]);
                $localidadEuskalmet = json_decode($zonaEuskalmetJSON, true);
                $municipioET->id_localidad = $localidadEuskalmet[0]['id'];
                Log::info($municipioET);

                $municipioET->save();
            }
        }
    }
}
