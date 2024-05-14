<?php

namespace App\Http\Controllers;

use App\Http\Requests\Posts\PostRequest;
use App\Models\Post;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;

class PostsController extends Controller {
    use ApiResponseTrait;

    public function create(PostRequest $request): JsonResponse {
        $post = new Post();
        $post->user_id = $request->user_id;
        $post->body    = $request->body;

        if (!$post->save()) return $this->errorResponse($this::GENERIC_ERROR_RESPONSE);

        return $this->successResponse('Success!', [], 201);
    }
}
