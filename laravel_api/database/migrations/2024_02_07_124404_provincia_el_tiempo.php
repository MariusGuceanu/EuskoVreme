<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('municipio', function (Blueprint $table) {
            $table->id();
            $table->string('nombreProvincia');
            $table->string('nombreMunicipio');
            $table->string('latitud');
            $table->string('longitud');
            $table->string('codigoIne');
            $table->unsignedBigInteger('');
            $table->foreign('')->references('id')->on('localidad');
            $table->unsignedBigInteger('id_zona_el_tiempo');
            $table->foreign('id_zona_el_tiempo')->references('id')->on('zona_el_tiempo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
