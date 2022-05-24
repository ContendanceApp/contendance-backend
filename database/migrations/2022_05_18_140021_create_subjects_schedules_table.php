<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subjects_schedules', function (Blueprint $table) {
            $table->increments("subject_schedule_id");
            $table->unsignedInteger("subject_id");
            $table->foreign("subject_id")->references("subject_id")->on("subjects");
            $table->unsignedInteger("user_id");
            $table->foreign("user_id")->references("user_id")->on("users");
            $table->unsignedInteger("study_group_id");
            $table->foreign("study_group_id")->references("study_group_id")->on("study_groups");
            $table->unsignedInteger("room_id");
            $table->foreign("room_id")->references("room_id")->on("rooms");
            $table->time("start_time");
            $table->time("finish_time");
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
        Schema::dropIfExists('subjects_schedules');
    }
};
