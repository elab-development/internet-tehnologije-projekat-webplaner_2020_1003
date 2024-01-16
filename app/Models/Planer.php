<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planer extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected $fillable = ['name', 'description', 'price', 'planer_type_id', 'user_id'];

    public function type()
    {
        return $this->belongsTo(PlanerType::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
