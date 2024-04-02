<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DevConnectController extends Controller {
    use ApiResponseTrait;

    public function index(): JsonResponse {
        $users = User::paginate(100);



        return $this->successResponse('Got \em', ['users' => $users], 200);
    }
}
