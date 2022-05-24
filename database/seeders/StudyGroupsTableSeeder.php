<?php

namespace Database\Seeders;

use App\Models\StudyGroup;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudyGroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        StudyGroup::create([
            "name" => "2 D4 IT A"
        ]);
    }
}
