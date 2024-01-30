<?php

namespace App\Traits;

trait ApiResponseTrait {
    protected function successResponse($message = null, $data, $code = 200) {
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
