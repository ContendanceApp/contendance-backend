<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Beacon extends Model
{
    use HasFactory;
    protected $primaryKey = "beacon_id";
    protected $fillable = ["proximity_uuid", "major", "minor"];
}
