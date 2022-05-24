<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('presences_details', function (Blueprint $table) {
            $table->increments("presence_detail_id");
            $table->unsignedInteger("presence_id");
            $table
                ->foreign("presence_id")
                ->references("presence_id")
                ->on("presences");
            $table->unsignedInteger("user_id");
            $table
                ->foreign("user_id")
                ->references("user_id")
                ->on("users");
            $table->time("presence_time");
            $table->boolean("is_inclass")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('presences_details');
    }
};
