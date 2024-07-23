<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanerType extends Model
{
    
    use HasFactory;

    protected $fillable =['name'];

    public function planers(){
        
        return $this->hasMany(Planer::class);
    }

    public function hasAnyPlaners()
    {
        return $this->planers()->exists();
    }
}
