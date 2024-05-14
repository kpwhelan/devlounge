<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoungeRequest;
use App\Models\Lounge;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class LoungesController extends Controller {
    use ApiResponseTrait;

    public function index(): Response {
        $lounges = Lounge::paginate(20);

        return Inertia::render('Lounges', [
            'lounges' => $lounges
        ]);
    }

    public function show($id) {
        $lounge = Lounge::find($id);

        return Inertia::render('Lounge', [
            'lounge' => $lounge
        ]);
    }

    public function store(LoungeRequest $request) {
        $lounge = new Lounge();
        $lounge->name = $request->name;
        $lounge->description = $request->description;

       if (!$lounge->save()) return $this->errorResponse($this::GENERIC_ERROR_RESPONSE, 500);

       return $this->successResponse('Wow, we didn\'t mess up, your new lounge awaits...', [$lounge], 201);
    }
}
