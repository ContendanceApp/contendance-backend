<?php

namespace Database\Seeders;

use App\Models\Room;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoomsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Room::create([
            "beacon_id" => 1,
            "name" => "Lab. Jaringan dan Komputer",
            "room_code" => "C-306",
            "location" => "Lantai 3 - Gedung D4",
            "description" => "Digunakan untuk praktikum mata kuliah jaringan dan komputer"
        ]);
    }
}
