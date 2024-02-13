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
    }
}
