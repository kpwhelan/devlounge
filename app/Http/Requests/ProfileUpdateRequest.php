<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'title' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'username' => ['required', 'string', Rule::unique(User::class)->ignore($this->user()->id)],
            'about_me' => ['nullable', 'string'],
            'instagram_url' => ['nullable', 'string', 'url'],
            'x_url' => ['nullable', 'string', 'url'],
            'tiktok_url' => ['nullable', 'string', 'url'],
            'linkedin_url' => ['nullable', 'string', 'url'],
            'website_url' => ['nullable', 'string', 'url'],
        ];
    }
}
