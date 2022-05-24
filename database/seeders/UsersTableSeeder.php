<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            "fullname" => "Muqorroba Lada Sattar",
            "sid_eid" => "3120600005",
            "email" => "sattar@it.student.pens.ac.id",
            "gender" => "L",
            "email_verified_at" => Carbon::now(),
            "password" => bcrypt("12345678"),
            "role_id" => 1,
            "study_group_id" => 1
        ]);

        User::create([
            "fullname" => "Andhik Ampuh Yunanto",
            "sid_eid" => "3120600005",
            "email" => "andhik@it.dosen.pens.ac.id",
            "gender" => "L",
            "email_verified_at" => Carbon::now(),
            "password" => bcrypt("12345678"),
            "role_id" => 2,
            "study_group_id" => null
        ]);
    }
}
