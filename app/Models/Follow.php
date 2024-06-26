<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Follow extends Model
{
    use HasFactory;

    public function followable(): MorphTo {
        return $this->morphTo();
    }
}
