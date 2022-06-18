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
        Schema::create('presences', function (Blueprint $table) {
            $table->increments("presence_id");
            $table->unsignedInteger("subject_schedule_id");
            $table
                ->foreign("subject_schedule_id")
                ->references("subject_schedule_id")
                ->on("subjects_schedules");
            $table->unsignedInteger("room_id");
            $table
                ->foreign("room_id")
                ->references("room_id")
                ->on("rooms");
            $table->unsignedInteger("user_id");
            $table
                ->foreign("user_id")
                ->references("user_id")
                ->on("users");
            $table->boolean("is_open")->default(false);
            $table->time("open_time");
            $table->time("close_time")->nullable();
            $table->date("presence_date");
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
        Schema::dropIfExists('presences');
    }
};
