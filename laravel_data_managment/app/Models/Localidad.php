<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Localidad extends Model
{
    protected $table = 'localidad';
    public $timestamps = false;
    protected $fillable = ['zona_id', 'localidad_id', 'nombre_localidad'];
}
