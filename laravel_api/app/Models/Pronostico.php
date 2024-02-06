<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pronostico extends Model
{
    protected $table = 'pronostico';
    public $timestamps = false;
    protected $fillable = ['localidad_id', 'nombre_localidad', 'fecha', 'hora', 'temperatura_actual', 'humedad', 'viento_direccion', 'viento_velocidad', 'precipitacion', 'estado'];
}
