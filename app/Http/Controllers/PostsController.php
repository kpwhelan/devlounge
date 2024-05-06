<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePostRequest;
use App\Models\Post;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;

class PostsController extends Controller {
    use ApiResponseTrait;

    public function create(CreatePostRequest $request): JsonResponse {
        $post = new Post();
        $post->body = $request->body;

        if (!$post->save()) return $this->errorResponse($this::GENERIC_ERROR_RESPONSE);

        return $this->successResponse('Success!', [], 201);
    }
}
