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
        Schema::create('pronostico', function (Blueprint $table) {
            $table->id();
            $table->foreignId('localidad_id')->constrained('localidad');
            $table->date('fecha');
            $table->string('hora');
            $table->integer('temperatura_actual');
            $table->integer('humedad');
            $table->string('viento_direccion');
            $table->integer('viento_velocidad');
            $table->string('precipitacion');
            $table->string('estado');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pronostico');
    }
};
