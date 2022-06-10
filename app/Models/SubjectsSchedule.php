<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubjectsSchedule extends Model
{
    use HasFactory;
    protected $primaryKey = "subject_schedule_id";
    protected $with = ["subject"];

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id', 'subject_id');
    }
}
