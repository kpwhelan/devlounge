import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { useState } from 'react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '', notifySuccess, notifyError }) {
    const user = usePage().props.auth.user;
    const [ isProcessing, setIsProcessing]  = useState(false);

    const { data, setData, errors, isDirty } = useForm({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        username: user.username,
        title: user.title,
    });

    const submit = (e) => {
        e.preventDefault();

        //if no changes were made, don't submit
        if (!isDirty) return;

        setIsProcessing(true);

        axios.patch(route('profile.update'), {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            username: data.username,
            title: data.title
        })
        .then(res => {
            setIsProcessing(false);
            notifySuccess(res.data.data.message);
        })
        .catch(error => {
            setIsProcessing(false);

            if (error.response.data.errors) {
                for (const [key, value] of Object.entries(error.response.data.errors)) {
                    errors[key] = value;
                }
            }

            notifyError(error.response.data.message);
        })
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-xl">{user.first_name} {user.last_name}</h2>

                <p className="mt-1 text-lg">
                    Update all your account info here.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="first_name" value="First Name" />

                    <TextInput
                        id="first_name"
                        className="mt-1 block w-full"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                        required
                        isFocused
                        autoComplete="first_name"
                        disabled={isProcessing}
                    />

                    <InputError className="mt-2" message={errors.first_name} />
                </div>

                <div>
                    <InputLabel htmlFor="last_name" value="Last Name" />

                    <TextInput
                        id="last_name"
                        className="mt-1 block w-full"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                        required
                        isFocused
                        autoComplete="last_name"
                        disabled={isProcessing}
                    />

                    <InputError className="mt-2" message={errors.last_name} />
                </div>

                <div>
                    <InputLabel htmlFor="title" value="Title" />

                    <TextInput
                        id="title"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        required
                        isFocused
                        autoComplete="title"
                        disabled={isProcessing}
                    />

                    <InputError className="mt-2" message={errors.title} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="email"
                        disabled={isProcessing}
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        className="mt-1 block w-full"
                        value={data.username}
                        onChange={(e) => setData('username', e.target.value)}
                        required
                        autoComplete="username"
                        disabled={isProcessing}
                    />

                    <InputError className="mt-2" message={errors.username} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={isProcessing}>Save</PrimaryButton>

                    {/* <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-white">Saved.</p>
                    </Transition> */}
                </div>
            </form>
        </section>
    );
}
