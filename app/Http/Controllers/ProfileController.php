<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use App\Traits\ApiResponseTrait;
use Exception;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\QueryException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Tags\Tag;

class ProfileController extends Controller {
    use ApiResponseTrait;

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): JsonResponse {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        try {
            $request->user()->save();
        } catch (QueryException $e) {
            Log::error($e);
            return $this->errorResponse($this::GENERIC_ERROR_RESPONSE, 500);
        }

        return $this->successResponse('Successfully updated info!', [$request->user()]);
    }

    // public function updateTags(Request $request): JsonResponse {
    //     $tag_string = $request['tags'];


    // }

    public function detachTag(Request $request): JsonResponse {
        try {
            $user = User::with(['followers', 'following', 'tags'])->find(Auth::user()->id);

            $user->detachTag($request->tag['name']['en']);

            $user->refresh();

            return $this->successResponse('Tag removed successfully!', ['user' => $user]);
        } catch(Exception $e) {
            Log::error($e);

            return $this->errorResponse($this::GENERIC_ERROR_RESPONSE);
        }

    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function searchTags($search_term) {
        // $search_term = $request['search_term'];
        $results = Tag::where('name', 'LIKE', "%{$search_term}%")->get();

        return response()->json(['tags' => $results]);
    }
}
