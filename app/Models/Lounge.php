<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lounge extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function tables(): HasMany {
        return $this->hasMany(Table::class);
    }
}
