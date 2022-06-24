<?php

namespace Database\Seeders;

use App\Models\SubjectsSchedule;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectsSchedulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SubjectsSchedule::create([
            "subject_id" => 1,
            "user_id" => 6,
            "study_group_id" => 1,
            "room_id" => 1,
            "start_time" => Carbon::createFromTime(18, 00, 00),
            "finish_time" => Carbon::createFromTime(20, 00, 00),
        ]);
    }
}
