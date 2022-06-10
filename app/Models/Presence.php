<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Presence extends Model
{
    use HasFactory;
    protected $primaryKey = "presence_id";
    protected $guarded = ["presence_id", "created_at", "updated_at"];
    protected $hidden = ['room_id', 'subject_schedule_id'];

    public function room()
    {
        return $this->hasOne(Room::class, 'room_id', 'room_id');
    }

    public function subject_schedule()
    {
        return $this->hasOne(
            SubjectsSchedule::class,
            'subject_schedule_id',
            'subject_schedule_id'
        );
    }
}
