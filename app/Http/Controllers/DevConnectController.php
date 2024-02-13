<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;

class DevConnectController extends Controller {
    use ApiResponseTrait;

    public function index() {
        $users = User::paginate(100);



        return $this->successResponse('Got \em', ['users' => $users], 200);
    }
}
