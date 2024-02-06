<?php

namespace App\Console\Commands;

use App\Http\Controllers\ZonaEuskalmetController;
use App\Models\Localidad;
use GuzzleHttp\Client;
use Illuminate\Console\Command;

class fetchLocalidad extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-localidad';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //

        $token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXdAcGxhaWF1bmRpLm5ldCJ9.U7-jMY_jTG-Buv0upjjZDLY3dqKe8HzE5Zc2A75JBISEw8YI4-6-hJYPwp1flWhnZr34ubViMZFIM9fFixfLZ0P9selmrkCnQ1LJWCzM-iG58KMxiHVRHVEAzSC_Eog0-QdIwn-Sag_g2TmXLklHFxJFg-9p1kSTcUjpN5vFO1OzSaDZtvipWkWtpoa-LZgF-1_BAg9EbYfEl0U4_eSYa33sjKP3llYbPzfjQIlzIKq-n4Hzq5_AHCtANhkLNGoWf760l1tuSWBolgXOKk7p6FrCARX_NMs8-Pd3a73HbJakto6cLWscX3AYDkszC9zc7dFAsx1bc8Ho1aYRvALtyQ';

        $options = [
            'headers' => [
                'Content-Type' => 'application/json',
                'Authorization' => 'Bearer ' . $token,
            ],
            'ignore_errors' => true,
        ];

        $zonaEuskalmetController = new ZonaEuskalmetController();
        $listaZonasEuskalmet = $zonaEuskalmetController->getAll();

        foreach ($listaZonasEuskalmet as $zonaEuskalmet) {
            $apiUrl = 'https://api.sandbox.euskadi.eus/euskalmet/geo/regions/basque_country/zones/' .$zonaEuskalmet ->cod_zona. '/locations';

            $client = new Client();
            $response = $client->get($apiUrl, $options);


            $data = json_decode($response->getBody(), true);

            foreach ($data as $localidad) {
                $localidad = new Localidad();
                $localidad->cod_zona = $localidad['regionZoneId'];
                $localidad->cod_region = $localidad['regionId'];
                $localidad->save();
            }
        }

        // $table->foreignId('zona_id')->constrained('zona_euskalmet');
        // $table->integer('localidad_id');
        // $table->integer('latitud');
        // $table->integer('altitud');
    }
}
