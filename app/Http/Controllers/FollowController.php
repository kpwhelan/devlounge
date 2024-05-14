<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\User;
use App\Traits\ApiResponseTrait;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class FollowController extends Controller {
    use ApiResponseTrait;

    public function followUser(int $user_id): JsonResponse {
        $follow = new Follow();

        $follow->followable_id = $user_id;
        $follow->user_id = Auth::user()->id;
        $follow->followable_type = User::class;

        $follow_record_exists = Follow::where([
            'followable_id' => $user_id,
            'user_id' => Auth::user()->id
        ])->exists();

        $user_to_follow = User::find($user_id);
        $user = User::find(Auth::user()->id);

        if ($follow_record_exists) return $this->errorResponse('Looks like you\'re already following this user...', 409);

        try {
            DB::transaction(function() use($follow, $user_to_follow, $user) {
                $follow->save();
                $user_to_follow->increment('follower_count');
                $user->increment('following_count');
            });
        } catch(QueryException $e) {
            Log::error($e->getMessage());

            return $this->errorResponse($this::GENERIC_ERROR_RESPONSE, 500);
        }

        return $this->successResponse('Followed!', [
            'updated_follower_count' => $user_to_follow->follower_count,
            'updated_following_count' => $user->following_count
        ]);
    }

    public function unfollowUser(int $user_id): JsonResponse {
        try {
            $follow_record = Follow::where([
                'followable_id' => $user_id,
                'user_id' => Auth::user()->id
            ])->first();

            $user_to_unfollow = User::find($user_id);
            $user = User::find(Auth::user()->id);

            DB::transaction(function() use($follow_record, $user_to_unfollow, $user) {
                $follow_record->delete();
                $user_to_unfollow->decrement('follower_count');
                $user->decrement('following_count');
            });
        } catch (QueryException $e) {
            Log::error($e->getMessage());
            return $this->errorResponse($this::GENERIC_ERROR_RESPONSE, 500);
        }

        return $this->successResponse('Unfollowed!', [
            'updated_follower_count' => $user_to_unfollow->follower_count,
            'updated_following_count' => $user->following_count
        ]);


    }
}
