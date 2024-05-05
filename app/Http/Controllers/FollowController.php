<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Traits\ApiResponseTrait;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class FollowController extends Controller {
    use ApiResponseTrait;

    public function followUser(int $user_id): JsonResponse {
        $follow = new Follow();

        $follow->followed_id = $user_id;
        $follow->follower_id = Auth::user()->id;

        $follow_record_exists = Follow::where([
            'followed_id' => $user_id,
            'follower_id' => Auth::user()->id
        ])->exists();

        if ($follow_record_exists) return $this->errorResponse('Looks like you\'re already following this user...', 409);

        try {
            $follow->save();
        } catch(QueryException $e) {
            Log::error($e->getMessage());

            return $this->errorResponse($this::GENERIC_ERROR_RESPONSE, 500);
        }

        return $this->successResponse('Followed!', []);
    }

    public function unfollowUser(int $user_id): JsonResponse {
        try {
            $follow_record = Follow::where([
                'followed_id' => $user_id,
                'follower_id' => Auth::user()->id
            ])->first();

            if ($follow_record)  $follow_record->delete();
        } catch (QueryException $e) {
            Log::error($e->getMessage());
            return $this->errorResponse($this::GENERIC_ERROR_RESPONSE, 500);
        }

        return $this->successResponse('Unfollowed!', []);
    }
}
