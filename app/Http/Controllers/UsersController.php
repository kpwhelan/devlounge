<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Traits\ApiResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller {
    use ApiResponseTrait;

    private const URL_ERROR_MESSAGE = 'Must be a valid URL. e.g. https://example.com';

    public function update(Request $request) {
        $request->validate([
            // 'first_name'      => 'nullable|string|max:255',
            // 'last_name'       => 'nullable|string|max:255',
            // 'email'           => ['nullable', 'string', 'email', 'max:255', Rule::unique('users')->ignore(Auth::user()->id, 'id')],
            'about_me'        => 'nullable|string',
            'username'        => 'string|unique',
            // 'title'           => 'nullable|string',
            // 'facebook_url'    => 'nullable|string|url',
            'instagram_url'   => 'nullable|string|url',
            'x_url'           => 'nullable|string|url',
            'tiktok_url'      => 'nullable|string|url',
            'linkedin_url'    => 'nullable|string|url',
            'website_url'     => 'nullable|string|url',
        ],
        [
            'facebook_url.url' => $this::URL_ERROR_MESSAGE,
            'instagram_url.url' => $this::URL_ERROR_MESSAGE,
            'x_url.url' => $this::URL_ERROR_MESSAGE,
            'tiktok_url.url' => $this::URL_ERROR_MESSAGE,
            'linkedin_url.url' => $this::URL_ERROR_MESSAGE,
            'website_url.url' => $this::URL_ERROR_MESSAGE
        ]);

        $input = $request->all();
        $user  = User::find(Auth::user()->id);

        if (!$user) return $this->errorResponse('Something went wrong, try again.', 404);

        $user->fill($input);

        if (!$user->save()) $this->errorResponse('Something went wrong, try again.', 500);

        return $this->successResponse('Updated Successfully!', ['user' => $user], 200);
    }

    public function updateUserAbout(Request $request) {
        $request->validate([
            'about_me'        => 'nullable|string',
        ]);

        $input = $request->all();
        $user  = User::find(Auth::user()->id);

        if (!$user) return $this->errorResponse('Something went wrong, try again.', 404);

        $user->fill($input);

        if (!$user->save()) $this->errorResponse('Something went wrong, try again.', 500);

        return $this->successResponse('Updated Successfully!', ['user' => $user], 200);
    }
}
