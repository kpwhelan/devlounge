<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Profile extends Model
{
    use HasFactory;

     public function user(): BelongsTo {
        return $this->belongsTo(User::class);
     }

     public function posts(): MorphMany {
        return $this->morphMany(Post::class, 'postable');
     }
}
