<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zona_Euskalmet extends Model
{
    protected $table = 'zona_euskalmet';
    protected $fillable = ['cod_zona', 'cod_region'];
    public $timestamps = false;
}
