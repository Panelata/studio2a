<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSessionTokenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('session_token', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('token', 256);
            $table->integer('userID');
            $table->string('expiryDateTime', 256);
            $table->integer('expired');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('session_token');
    }
}
