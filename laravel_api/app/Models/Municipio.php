<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Municipio extends Model
{
    protected $table = 'municipio';
    public $timestamps = false;
    protected $fillable = [
        'nombreMunicipio',
        'latitud',
        'longitud',
        'codigoIne',
        'id_localidad',
        'id_provincia'
    ];
}
