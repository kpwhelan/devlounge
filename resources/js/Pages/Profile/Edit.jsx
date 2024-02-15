import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';
import UpdateLinksForm from './Partials/UpdateLinksForm';
import UpdateAboutMeForm from './Partials/UpdateAboutMeForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 ">
                    <div className="w-[45%] p-4 sm:p-8 bg-primary-color shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="w-[45%] p-4 sm:p-8 bg-primary-color shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="w-[45%] p-4 sm:p-8 bg-primary-color shadow sm:rounded-lg">
                        <UpdateLinksForm className='max-w-xl' />
                    </div>

                    <div className="w-[45%] p-4 sm:p-8 bg-primary-color shadow sm:rounded-lg">
                        <UpdateAboutMeForm className='max-w-xl' />
                    </div>

                    <div className="w-[45%] p-4 sm:p-8 bg-primary-color shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
