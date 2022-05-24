<?php

namespace Database\Seeders;

use App\Models\Beacon;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BeaconsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Beacon::create([
            'proximity_uuid' => 'fda50693-a4e2-4fb1-afcf-c6eb07647825',
            'major' => 1,
            'minor' => 2,
        ]);
    }
}
