<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'username',
        'password',
        'title',
        'about_me',
        'profile_picture_url',
        'github_url',
        'linkedin_url',
        'x_url',
        'instagram_url',
        'website_url'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // protected $with = ['following', 'followers'];

    public function followers(): HasManyThrough {
        return $this->hasManyThrough(User::class, Follow::class, 'followed_id', 'id', 'id', 'follower_id');
    }
    public function following(): HasManyThrough {
        return $this->HasManyThrough(User::class, Follow::class, 'follower_id', 'id', 'id', 'followed_id');
    }

    public function tags(): HasMany {
        return $this->hasMany(Taggable::class, 'taggable_id');
    }
}
