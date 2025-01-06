<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['user_id', 'description', 'start_time', 'end_time'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
