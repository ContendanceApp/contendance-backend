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
            "study_group_id" => 1,
        ]);

        User::create([
            "fullname" => "Zakariya Al-Ansori",
            "sid_eid" => "3120600019",
            "email" => "zakariya@it.student.pens.ac.id",
            "gender" => "L",
            "email_verified_at" => Carbon::now(),
            "password" => bcrypt("12345678"),
            "role_id" => 1,
            "study_group_id" => 1,
        ]);

        User::create([
            "fullname" => "Adek Wisnu Winata",
            "sid_eid" => "3120600030",
            "email" => "wisnu@it.student.pens.ac.id",
            "gender" => "L",
            "email_verified_at" => Carbon::now(),
            "password" => bcrypt("12345678"),
            "role_id" => 1,
            "study_group_id" => 1,
        ]);

        User::create([
            "fullname" => "Muh. Ghifari Ramadhan",
            "sid_eid" => "3120600029",
            "email" => "ghifari@it.student.pens.ac.id",
            "gender" => "L",
            "email_verified_at" => Carbon::now(),
            "password" => bcrypt("12345678"),
            "role_id" => 1,
            "study_group_id" => 1,
        ]);

        User::create([
            "fullname" => "Mahasiswa PENS",
            "sid_eid" => "3120600029",
            "email" => "mahasiswa@it.student.pens.ac.id",
            "gender" => "L",
            "email_verified_at" => Carbon::now(),
            "password" => bcrypt("12345678"),
            "role_id" => 1,
            "study_group_id" => 1,
        ]);

        User::create([
            "fullname" => "Andhik Ampuh Yunanto",
            "sid_eid" => "199208022019031013",
            "email" => "andhik@it.lecturer.pens.ac.id",
            "gender" => "L",
            "email_verified_at" => Carbon::now(),
            "password" => bcrypt("12345678"),
            "role_id" => 2,
            "study_group_id" => null,
        ]);

        User::create([
            "fullname" => "Dosen PENS",
            "sid_eid" => "199208022019031013",
            "email" => "dosen@it.lecturer.pens.ac.id",
            "gender" => "L",
            "email_verified_at" => Carbon::now(),
            "password" => bcrypt("12345678"),
            "role_id" => 2,
            "study_group_id" => null,
        ]);

        User::create([
            "fullname" => "Demo Contendance",
            "sid_eid" => "3120600001",
            "email" => "demo@contendance.com",
            "gender" => "L",
            "email_verified_at" => Carbon::now(),
            "password" => bcrypt("12345678"),
            "role_id" => 2,
            "study_group_id" => null,
        ]);
    }
}
