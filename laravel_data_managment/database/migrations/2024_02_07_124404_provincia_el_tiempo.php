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
            $table->string('nombreMunicipio');
            $table->string('latitud');
            $table->string('longitud');
            $table->string('codigoIne');
            $table->unsignedBigInteger('id_localidad');
            $table->foreign('id_localidad')->references('id')->on('localidad');
            $table->unsignedBigInteger('id_provincia');
            $table->foreign('id_provincia')->references('id')->on('provincia');
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
