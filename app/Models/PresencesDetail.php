<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PresencesDetail extends Model
{
    use HasFactory;
    protected $primaryKey = "presence_detail_id";
    protected $guarded = ["presence_detail_id", "created_at", "updated_at"];

    public function presences()
    {
        return $this->belongsTo(Presence::class, 'presence_id');
    }
}
