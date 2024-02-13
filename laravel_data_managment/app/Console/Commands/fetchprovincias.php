<?php

namespace App\Console\Commands;

use App\Models\Provincia;
use GuzzleHttp\Client;
use Illuminate\Console\Command;

class fetchprovincias extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetchprovincias';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando para guardar los datos de las provincias de la API de El-tiempo en la BBDD';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $apiUrl = 'https://www.el-tiempo.net/api/json/v2/provincias';

        $client = new Client();

        $response = $client->get($apiUrl);

        $data = json_decode($response->getBody(), true);

        $provincias = $data['provincias'];

        foreach($provincias as $provincia) {
            $provinciaET = new Provincia();
            $provinciaET->Nombre = $provincia['NOMBRE_PROVINCIA'];
            $provinciaET->codProv = $provincia['CODPROV'];
            $provinciaET->save();
        }
    }
}
