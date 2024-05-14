<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Table extends Model {
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function lounge(): BelongsTo {
        return $this->belongsTo(Lounge::class);
    }

    public function posts(): MorphMany {
        return $this->morphMany(Post::class, 'postable');
    }
}
