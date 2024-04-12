<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class DevConnectController extends Controller {
    use ApiResponseTrait;

    public function index(): JsonResponse {
        $users = User::with(['followers', 'following', 'tags'])
            ->where('id', '!=', Auth::user()->id)
            ->paginate(100);

        return $this->successResponse('Got \em', ['users' => $users], 200);
    }
}
