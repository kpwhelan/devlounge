<?php

namespace App\Traits;

trait ApiResponseTrait {
    public CONST GENERIC_ERROR_RESPONSE = 'Uh oh, something went wrong. It\'s not you, it\s us';

    protected function successResponse($message = null, $data = [], $code = 200) {
        return response()->json([
            'success'  => true,
            'message' => $message,
            'data'    => $data,
        ], $code);
    }

    protected function errorResponse($message = null, $code = null) {
        return response()->json([
            'success'  => false,
            'message' => $message,
            'data'    => null,
        ], $code);
    }
}
